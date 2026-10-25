/**
 * The editor's side of the previewer (docs/PREVIEWER-STANDARD.md): finding the pictures a map needs, building the
 * messages and reading what the game answers. Pure functions; Vortex Studio imports this, a game does not need it.
 */
import { PREVIEWER_PROTOCOL_VERSION, assetIdOf } from './previewer.js';
import type {
  PreviewerCommand,
  PreviewerCommandName,
  PreviewerLoad,
  PreviewerOutgoing,
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
