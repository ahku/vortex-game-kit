#!/usr/bin/env node
// Imports a story published in Vortex Studio into a game: the bundle and every picture, sound and video it uses, saved as
// plain files the game serves itself, with the bundle's asset addresses rewritten to the local file names.
//
//   npx vortex-story-import <slug> <folder> --studio <address> [--event <name>]... [--original] [--out <dir>]
//
//   slug      the part of the story's public link after /play/ (the Studio's Publish button gives the link)
//   folder    where it goes: public/story/<folder>/ (or --out <dir>)
//   --studio  the Studio's address, e.g. https://studio.example.com (or the VORTEX_STUDIO_URL variable)
//   --event   a host event the game needs the story to declare; the import stops if it does not. Repeat for several.
//   --original  keep uploaded pictures as they are. By default each comes down at the size its role needs.
//
// It is an explicit refresh, not a live link: run it again after the writer republishes. The bundle is replaced only after
// every file has arrived. Old media stays; remove obsolete files yourself.
/* global URL, fetch, console, process */
import { mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

function parse(argv) {
  const flags = { event: [], original: false };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--original') flags.original = true;
    else if (arg === '--studio' || arg === '--out') flags[arg.slice(2)] = argv[++i];
    else if (arg === '--event') flags.event.push(argv[++i]);
    else if (arg.startsWith('--')) throw new Error(`Unknown option ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

// The widths for each kind of picture. The published bundle says which (`assets.imageSizes`); these fill in for a bundle
// that does not.
const FALLBACK_SIZE = { dialogPortrait: 560, stagePortrait: 1300, background: 1920 };
const UNSIZED_KINDS = new Set(['music', 'sfx', 'voice', 'video']);
const EXTENSIONS = {
  'image/webp': 'webp',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'audio/mpeg': 'mp3',
  'audio/mp4': 'm4a',
  'audio/ogg': 'ogg',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
};

/** The width each picture needs: its widest use as a character's face or stage picture, else the full-screen size. */
function widthsOf(bundle, size) {
  const widths = new Map();
  const want = (key, width) => widths.set(key, Math.max(widths.get(key) ?? 0, width));
  for (const character of bundle.characters ?? []) {
    for (const key of Object.values(character.faces ?? {})) want(key, size.dialogPortrait);
    for (const key of Object.values(character.expressions ?? {})) want(key, size.stagePortrait);
  }
  return widths;
}

const { flags, positional } = parse(process.argv.slice(2));
const [slug, folder] = positional;
const studio = flags.studio ?? process.env.VORTEX_STUDIO_URL;
if (!slug || !folder || !studio) {
  console.error(
    'Usage: vortex-story-import <slug> <folder> --studio <address> [--event <name>]... [--original] [--out <dir>]',
  );
  process.exit(2);
}
const source = new URL(`api/play/${slug}`, `${studio.replace(/\/+$/, '')}/`);
const destination = path.resolve(flags.out ?? path.join('public', 'story', folder));

const response = await fetch(source);
if (!response.ok) throw new Error(`Story download failed: ${response.status} (${source.href})`);
const bundle = await response.json();
for (const name of flags.event)
  if (!bundle.story?.contract?.hostEvents?.includes(name)) throw new Error(`Missing ${name} event`);

await mkdir(destination, { recursive: true });
const size = { ...FALLBACK_SIZE, ...bundle.assets?.imageSizes };
const widths = widthsOf(bundle, size);
// A game's own copy of the schema may not know the field, so it stays out of the saved bundle.
if (bundle.assets) delete bundle.assets.imageSizes;
for (const [key, asset] of Object.entries(bundle.assets?.assets ?? {})) {
  if (!asset.url) continue;
  const url = new URL(asset.url, source);
  if (url.origin !== source.origin) throw new Error(`Unexpected asset origin: ${key}`);
  const width =
    flags.original || UNSIZED_KINDS.has(asset.kind) ? undefined : (widths.get(key) ?? size.background);
  if (width) url.searchParams.set('w', String(width));
  const file = await fetch(url);
  if (!file.ok) throw new Error(`Asset download failed: ${key} (${file.status})`);
  const type = file.headers.get('content-type')?.split(';')[0] ?? '';
  const extension = EXTENSIONS[type];
  if (!extension) throw new Error(`Unsupported asset type: ${key} (${type})`);
  // A resized picture has its own name, so it never replaces (or is mistaken for) the original beside it.
  const name = `${asset.hash ?? path.basename(url.pathname)}${width ? `-${width}` : ''}.${extension}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  await writeFile(path.join(destination, name), bytes);
  asset.url = name;
  if (width) asset.bytes = bytes.length;
  console.log(`Downloaded ${key}`);
}
// Replace the bundle only after all referenced files have arrived successfully.
await writeFile(path.join(destination, 'bundle.pending.json'), JSON.stringify(bundle, null, 2) + '\n');
await rename(path.join(destination, 'bundle.pending.json'), path.join(destination, 'bundle.json'));
console.log(`Story ready in ${destination}`);
