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
function referencePreviewer(options: { acceptsAnyUrl?: boolean; breaksAfterRefusal?: boolean } = {}): PreviewerSubject {
  return {
    async create() {
      let refused = false;
      const playable = { arena: { width: 4, height: 4 } };
      const check = (d: unknown) => ((d as { arena?: unknown })?.arena ? null : 'needs an arena');
      return {
        playableMap: playable,
        unplayableMap: { arena: { width: -1, height: 4 } },
        async send(message: unknown): Promise<PreviewerOutgoing[]> {
          const read = readPreviewerMessage(message, BASE, check);
          const V = PREVIEWER_PROTOCOL_VERSION;
          if (options.acceptsAnyUrl && !read.ok && read.error.includes('http or https')) {
            return [{ protocol: V, type: 'loaded', warnings: [] }];
          }
          if (!read.ok) return [{ protocol: V, type: 'error', code: 'bad_message', message: read.error }];
          if (read.message.type === 'command') return [];
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
