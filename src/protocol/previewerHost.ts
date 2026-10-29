/**
 * The editor's side of the previewer (docs/PREVIEWER-STANDARD.md): finding the pictures a map needs, building the
 * messages and reading what the game answers. Pure functions; Vortex Studio imports this, a game does not need it.
 */
import { MANIFEST_PATH } from './manifest.js';
import { PREVIEWER_PROTOCOL_VERSION, assetIdOf } from './previewer.js';
import type {
  PreviewerCharacterRef,
  PreviewerCommand,
  PreviewerCommandName,
  PreviewerLoad,
  PreviewerMigrate,
  PreviewerOutgoing,
  PreviewerReferences,
  PreviewerValidate,
} from './previewer.js';

/** Every `asset:<id>` text anywhere inside a map, each id once, in the order found. */
export function assetIdsIn(value: unknown): string[] {
  const found = new Set<string>();
  const walk = (node: unknown): void => {
    const id = assetIdOf(node);
    if (id) found.add(id);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === 'object') Object.values(node).forEach(walk);
  };
  walk(value);
  return [...found];
}

/** Where a game's previewer page lives, from the address of the game; `null` unless it is a web address. */
export function previewerUrl(
  gameUrl: string,
  page = 'previewer.html',
): { url: string; origin: string } | null {
  try {
    const base = new URL(gameUrl.trim());
    if (base.protocol !== 'https:' && base.protocol !== 'http:') return null;
    if (!base.pathname.endsWith('/')) base.pathname += '/';
    base.search = '';
    base.hash = '';
    return { url: new URL(page, base).href, origin: base.origin };
  } catch {
    return null;
  }
}

/** Where a game's manifest lives, from the address of the game; `null` unless it is a web address. */
export function manifestUrl(gameUrl: string): string | null {
  return previewerUrl(gameUrl, MANIFEST_PATH)?.url ?? null;
}

export const previewerLoad = (
  document: unknown,
  assets: Record<string, string>,
): PreviewerLoad => ({
  protocol: PREVIEWER_PROTOCOL_VERSION,
  type: 'load',
  document,
  assets,
});

export const previewerCommand = (name: PreviewerCommandName): PreviewerCommand => ({
  protocol: PREVIEWER_PROTOCOL_VERSION,
  type: 'command',
  name,
});

export const previewerValidate = (document: unknown, id?: string): PreviewerValidate => ({
  protocol: PREVIEWER_PROTOCOL_VERSION,
  type: 'validate',
  ...(id !== undefined ? { id } : {}),
  document,
});

export const previewerReferences = (document: unknown, id?: string): PreviewerReferences => ({
  protocol: PREVIEWER_PROTOCOL_VERSION,
  type: 'references',
  ...(id !== undefined ? { id } : {}),
  document,
});

export const previewerMigrate = (document: unknown, from: number, id?: string): PreviewerMigrate => ({
  protocol: PREVIEWER_PROTOCOL_VERSION,
  type: 'migrate',
  ...(id !== undefined ? { id } : {}),
  document,
  from,
});

/**
 * What the previewer said, or `null` for anything else: other pages' messages are none of the editor's business. The
 * editor should also check `event.origin` and `event.source` before it calls this.
 */
export function readPreviewerReply(data: unknown): PreviewerOutgoing | null {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const m = data as Record<string, unknown>;
  if (m.protocol !== PREVIEWER_PROTOCOL_VERSION) return null;
  const texts = (value: unknown): string[] =>
    Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  const id = typeof m.id === 'string' ? { id: m.id } : {};
  if (m.type === 'validated')
    return { protocol: PREVIEWER_PROTOCOL_VERSION, type: 'validated', ...id, problems: texts(m.problems) };
  if (m.type === 'referenced') {
    const characters: PreviewerCharacterRef[] = [];
    if (Array.isArray(m.characters))
      for (const c of m.characters) {
        if (!c || typeof c !== 'object') continue;
        const { id: cid, slot } = c as Record<string, unknown>;
        if (typeof cid !== 'string' || !cid) continue;
        characters.push(typeof slot === 'string' ? { id: cid, slot } : { id: cid });
      }
    return {
      protocol: PREVIEWER_PROTOCOL_VERSION,
      type: 'referenced',
      ...id,
      assets: [...new Set(texts(m.assets))],
      characters,
    };
  }
  if (m.type === 'migrated') {
    const v = m.schemaVersion;
    if (typeof v !== 'number' || !Number.isInteger(v) || v < 0) return null;
    if (!m.document || typeof m.document !== 'object' || Array.isArray(m.document)) return null;
    return { protocol: PREVIEWER_PROTOCOL_VERSION, type: 'migrated', ...id, schemaVersion: v, document: m.document };
  }
  if (m.type === 'shortcut')
    return m.name === 'toggle-preview'
      ? { protocol: PREVIEWER_PROTOCOL_VERSION, type: 'shortcut', name: m.name }
      : null;
  if (m.type === 'ready') return { protocol: PREVIEWER_PROTOCOL_VERSION, type: 'ready' };
  if (m.type === 'loaded')
    return { protocol: PREVIEWER_PROTOCOL_VERSION, type: 'loaded', warnings: texts(m.warnings) };
  if (m.type === 'error') {
    const details = texts(m.details);
    return {
      protocol: PREVIEWER_PROTOCOL_VERSION,
      type: 'error',
      code: typeof m.code === 'string' ? m.code : 'unknown',
      message: typeof m.message === 'string' ? m.message : '',
      ...(details.length > 0 ? { details } : {}),
    };
  }
  return null;
}
