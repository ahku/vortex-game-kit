import { describe, expect, it } from 'vitest';
import { previewerCases } from '../src/conformance/index.js';
import type { PreviewerSubject } from '../src/conformance/index.js';
import {
  MAX_PREVIEW_ASSETS,
  PREVIEWER_PROTOCOL_VERSION,
  assetIdOf,
  assetIdsIn,
  assetRef,
  isAssetRef,
  isSafePictureUrl,
  previewerCommand,
  previewerLoad,
  previewerMigrate,
  previewerReferences,
  previewerValidate,
  previewerUrl,
  readPreviewerMessage,
  readPreviewerReply,
} from '../src/protocol/index.js';
import type { PreviewerOutgoing } from '../src/protocol/index.js';

const BASE = 'https://game.example/previewer.html';

describe('asset references', () => {
  it('writes and reads asset:<id>', () => {
    expect(assetRef('abc-1_X')).toBe('asset:abc-1_X');
    expect(assetIdOf('asset:abc-1_X')).toBe('abc-1_X');
    expect(isAssetRef('asset:abc')).toBe(true);
  });

  it('refuses ids an editor does not hand out, and texts that are not references', () => {
    expect(assetRef('a b')).toBeNull();
    expect(assetRef('')).toBeNull();
    for (const text of ['asset:', 'asset:a b', 'xasset:q', 'maps/plaza.webp', 5, null, undefined])
      expect(assetIdOf(text)).toBeNull();
    expect(assetIdOf(`asset:${'a'.repeat(65)}`)).toBeNull();
  });

  it('finds each reference once, anywhere in a map', () => {
    const map = {
      arena: { backdrop: 'asset:abc', walls: [{ pic: 'asset:def_1' }, { pic: 'asset:abc' }] },
      sprites: [{ picture: 'asset:x-y' }, 'maps/site.png'],
    };
    expect(assetIdsIn(map)).toEqual(['abc', 'def_1', 'x-y']);
    expect(assetIdsIn({ a: 'maps/plaza.webp', b: 'asset:', c: 5 })).toEqual([]);
  });
});

describe('picture addresses', () => {
  it('accepts web addresses and paths on the game site only', () => {
    expect(isSafePictureUrl('https://studio.example/a.png', BASE)).toBe(true);
    expect(isSafePictureUrl('/maps/a.png', BASE)).toBe(true);
    expect(isSafePictureUrl('javascript:alert(1)', BASE)).toBe(false);
    expect(isSafePictureUrl('data:image/png;base64,AAAA', BASE)).toBe(false);
    expect(isSafePictureUrl('', BASE)).toBe(false);
    expect(isSafePictureUrl(5, BASE)).toBe(false);
  });
});

describe('readPreviewerMessage', () => {
  const load = { protocol: PREVIEWER_PROTOCOL_VERSION, type: 'load', document: { a: 1 }, assets: { x: 'https://u/x.png' } };

  it('reads a load and a command', () => {
    expect(readPreviewerMessage(load, BASE)).toEqual({ ok: true, message: load });
    expect(readPreviewerMessage({ protocol: 1, type: 'command', name: 'pause' }, BASE)).toEqual({
      ok: true,
      message: { protocol: 1, type: 'command', name: 'pause' },
    });
  });

  it('takes a load without assets as having none', () => {
    const r = readPreviewerMessage({ protocol: 1, type: 'load', document: {} }, BASE);
    expect(r).toEqual({ ok: true, message: { protocol: 1, type: 'load', document: {}, assets: {} } });
  });

  it('refuses what it does not understand, with a reason', () => {
    for (const data of [
      null,
      'load',
      [],
      { protocol: 2, type: 'load', document: {} },
      { type: 'load', document: {} },
      { protocol: 1, type: 'dance' },
      { protocol: 1, type: 'command', name: 'explode' },
      { protocol: 1, type: 'load' },
      { protocol: 1, type: 'load', document: [] },
      { protocol: 1, type: 'load', document: {}, assets: [] },
      { protocol: 1, type: 'load', document: {}, assets: { x: 'javascript:1' } },
    ]) {
      const r = readPreviewerMessage(data, BASE);
      expect(r.ok, JSON.stringify(data)).toBe(false);
      if (!r.ok) expect(r.error).not.toBe('');
    }
  });

  it('refuses too many assets', () => {
    const assets = Object.fromEntries(Array.from({ length: MAX_PREVIEW_ASSETS + 1 }, (_, i) => [`a${i}`, 'https://u/x.png']));
    expect(readPreviewerMessage({ protocol: 1, type: 'load', document: {}, assets }, BASE).ok).toBe(false);
  });

  it("lets the game add its own rule for what a map contains", () => {
    const needsArena = (d: unknown) => ((d as { arena?: unknown })?.arena ? null : 'needs an arena');
    expect(readPreviewerMessage({ protocol: 1, type: 'load', document: {} }, BASE, needsArena)).toEqual({ ok: false, error: 'needs an arena' });
    expect(readPreviewerMessage({ protocol: 1, type: 'load', document: { arena: {} } }, BASE, needsArena).ok).toBe(true);
  });
});

describe('validate, references and migrate', () => {
  it('reads them with an optional id and without the game\'s own map rule', () => {
    const never = () => 'never playable';
    expect(readPreviewerMessage(previewerValidate({ a: 1 }, 'v1'), BASE, never)).toEqual({
      ok: true,
      message: { protocol: 1, type: 'validate', id: 'v1', document: { a: 1 } },
    });
    expect(readPreviewerMessage(previewerReferences({ a: 1 }), BASE, never)).toEqual({
      ok: true,
      message: { protocol: 1, type: 'references', document: { a: 1 } },
    });
    expect(readPreviewerMessage(previewerMigrate({ a: 1 }, 2, 'm.1'), BASE, never)).toEqual({
      ok: true,
      message: { protocol: 1, type: 'migrate', id: 'm.1', document: { a: 1 }, from: 2 },
    });
  });

  it('refuses a bad document, id or version', () => {
    for (const data of [
      { protocol: 1, type: 'validate' },
      { protocol: 1, type: 'validate', document: [] },
      { protocol: 1, type: 'references', document: {}, id: 'a b' },
      { protocol: 1, type: 'references', document: {}, id: 5 },
      { protocol: 1, type: 'migrate', document: {} },
      { protocol: 1, type: 'migrate', document: {}, from: 1.5 },
      { protocol: 1, type: 'migrate', document: {}, from: -1 },
      { protocol: 1, type: 'migrate', document: {}, from: '1' },
    ])
      expect(readPreviewerMessage(data, BASE).ok, JSON.stringify(data)).toBe(false);
  });

  it('reads the three replies', () => {
    expect(readPreviewerReply({ protocol: 1, type: 'validated', id: 'v1', problems: ['p', 2] })).toEqual({
      protocol: 1,
      type: 'validated',
      id: 'v1',
      problems: ['p'],
    });
    expect(
      readPreviewerReply({
        protocol: 1,
        type: 'referenced',
        assets: ['a', 'a', 'b', 3],
        characters: [{ id: 'c1', slot: 'npc' }, { id: 'c2' }, { id: '' }, 'x', null],
      }),
    ).toEqual({
      protocol: 1,
      type: 'referenced',
      assets: ['a', 'b'],
      characters: [{ id: 'c1', slot: 'npc' }, { id: 'c2' }],
    });
    expect(readPreviewerReply({ protocol: 1, type: 'migrated', schemaVersion: 3, document: { a: 1 } })).toEqual({
      protocol: 1,
      type: 'migrated',
      schemaVersion: 3,
      document: { a: 1 },
    });
  });

  it('drops a migrated reply that has no usable version or map', () => {
    for (const r of [
      { protocol: 1, type: 'migrated', schemaVersion: 'x', document: {} },
      { protocol: 1, type: 'migrated', schemaVersion: 2 },
      { protocol: 1, type: 'migrated', schemaVersion: 2, document: [] },
    ])
      expect(readPreviewerReply(r)).toBeNull();
  });
});

describe('the editor side', () => {
  it('finds the previewer page from the game address', () => {
    expect(previewerUrl('https://game.example')).toEqual({ url: 'https://game.example/previewer.html', origin: 'https://game.example' });
    expect(previewerUrl(' http://localhost:5173/?x=1#y ')?.url).toBe('http://localhost:5173/previewer.html');
    expect(previewerUrl('https://example.com/game')?.url).toBe('https://example.com/game/previewer.html');
    expect(previewerUrl('https://example.com', 'preview.html')?.url).toBe('https://example.com/preview.html');
    for (const bad of ['javascript:alert(1)', 'not a url', '']) expect(previewerUrl(bad)).toBeNull();
  });

  it('builds messages that the game side accepts', () => {
    for (const message of [previewerLoad({ a: 1 }, { x: 'https://u/x.png' }), previewerCommand('restart')])
      expect(readPreviewerMessage(message, BASE).ok).toBe(true);
  });

  it('reads the replies and ignores other messages', () => {
    expect(readPreviewerReply({ protocol: 1, type: 'ready' })).toEqual({ protocol: 1, type: 'ready' });
    expect(readPreviewerReply({ protocol: 1, type: 'loaded', warnings: ['w', 3] })).toEqual({ protocol: 1, type: 'loaded', warnings: ['w'] });
    expect(readPreviewerReply({ protocol: 1, type: 'error', code: 'invalid_map', message: 'm', details: ['d'] })).toEqual({
      protocol: 1,
      type: 'error',
      code: 'invalid_map',
      message: 'm',
      details: ['d'],
    });
    expect(readPreviewerReply({ protocol: 1, type: 'error', code: 'something_new' })).toMatchObject({ code: 'something_new', message: '' });
    for (const other of [{ protocol: 2, type: 'ready' }, { type: 'ready' }, 'ready', null, [], { protocol: 1, type: 'x' }])
      expect(readPreviewerReply(other)).toBeNull();
  });
});

/** A small reference previewer that follows the standard, to prove the suite passes a good one and fails a bad one. */
function referencePreviewer(
  options: { acceptsAnyUrl?: boolean; breaksAfterRefusal?: boolean; extras?: boolean; noEcho?: boolean } = {},
): PreviewerSubject {
  return {
    async create() {
      let refused = false;
      const playable = { arena: { width: 4, height: 4 } };
      const check = (d: unknown) => ((d as { arena?: unknown })?.arena ? null : 'needs an arena');
      return {
        playableMap: playable,
        ...(options.extras
          ? { supports: ['validate', 'references', 'migrate'] as const as never, oldMap: { document: { arena: { w: 4 } }, from: 1 } }
          : {}),
        unplayableMap: { arena: { width: -1, height: 4 } },
        async send(message: unknown): Promise<PreviewerOutgoing[]> {
          const read = readPreviewerMessage(message, BASE, check);
          const V = PREVIEWER_PROTOCOL_VERSION;
          if (options.acceptsAnyUrl && !read.ok && read.error.includes('http or https')) {
            return [{ protocol: V, type: 'loaded', warnings: [] }];
          }
          if (!read.ok) return [{ protocol: V, type: 'error', code: 'bad_message', message: read.error }];
          if (read.message.type === 'command') return [];
          const msg = read.message;
          if (msg.type === 'validate' || msg.type === 'references' || msg.type === 'migrate') {
            const id = options.noEcho || msg.id === undefined ? {} : { id: msg.id };
            if (msg.type === 'validate') {
              const w = (msg.document as { arena?: { width?: number } }).arena?.width;
              return [{ protocol: V, type: 'validated', ...id, problems: typeof w === 'number' && w > 0 ? [] : ['The arena is empty.'] }];
            }
            if (msg.type === 'references') return [{ protocol: V, type: 'referenced', ...id, assets: [], characters: [] }];
            return [{ protocol: V, type: 'migrated', ...id, schemaVersion: msg.from + 1, document: { arena: { width: 4, height: 4 } } }];
          }
          if (refused && options.breaksAfterRefusal) return [{ protocol: V, type: 'error', code: 'start_failed', message: 'stuck' }];
          const arena = (read.message.document as { arena: { width: number } }).arena;
          if (arena.width < 0) {
            refused = true;
            return [{ protocol: V, type: 'error', code: 'invalid_map', message: 'The arena is empty.', details: ['width must be above 0'] }];
          }
          return [{ protocol: V, type: 'loaded', warnings: [] }];
        },
      };
    },
  };
}

describe('the previewer conformance suite', () => {
  for (const c of previewerCases(referencePreviewer())) it(`passes a good previewer: ${c.name}`, c.run);

  it('fails a previewer that accepts a picture address that is not a web address', async () => {
    const c = previewerCases(referencePreviewer({ acceptsAnyUrl: true })).find((x) => x.name.includes('not a web address'))!;
    await expect(c.run()).rejects.toThrow(/unsafe picture address/);
  });

  it('fails a previewer that cannot load a map after refusing one', async () => {
    const c = previewerCases(referencePreviewer({ breaksAfterRefusal: true })).find((x) => x.name.includes('does not stop'))!;
    await expect(c.run()).rejects.toThrow(/after a refused one/);
  });
});

describe('the extra messages in the conformance suite', () => {
  const names = (o: Parameters<typeof referencePreviewer>[0]) => previewerCases(referencePreviewer(o));

  for (const c of names({ extras: true })) it(`passes a previewer that supports them: ${c.name}`, c.run);

  it('skips them for a game that does not declare support', async () => {
    const extra = names({}).filter((c) => /^(validate|references|migrate):/.test(c.name));
    expect(extra.length).toBe(4);
    for (const c of extra) await expect(c.run()).resolves.toBeUndefined();
  });

  it('fails a previewer that does not repeat the id', async () => {
    const c = names({ extras: true, noEcho: true }).find((x) => x.name.startsWith('validate: a map is answered'))!;
    await expect(c.run()).rejects.toThrow(/repeat the id/);
  });
});
