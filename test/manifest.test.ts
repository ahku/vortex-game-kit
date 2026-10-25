import { describe, expect, it } from 'vitest';
import {
  MANIFEST_CONTRACT,
  MANIFEST_PATH,
  manifestUrl,
  readManifest,
} from '../src/protocol/index.js';

const good = {
  contract: 1,
  id: 'my-game',
  name: 'My Game',
  version: '1.2.0',
  previewer: { page: 'previewer.html', messages: ['validate', 'references', 'migrate'] },
  content: [{ module: 'map', type: 'map', title: 'Map', schemaVersion: 3, editor: 'json' }],
};

describe('readManifest', () => {
  it('reads a complete manifest', () => {
    expect(readManifest(good)).toEqual({ ok: true, newer: false, manifest: good });
  });

  it('needs only the contract, an id and a name', () => {
    const r = readManifest({ contract: 1, id: 'a', name: 'A' });
    expect(r).toEqual({ ok: true, newer: false, manifest: { contract: 1, id: 'a', name: 'A', content: [] } });
  });

  it('ignores unknown fields and unknown messages', () => {
    const r = readManifest({ ...good, extra: 1, previewer: { messages: ['validate', 'teleport'] } });
    expect(r.ok && r.manifest.previewer).toEqual({ messages: ['validate'] });
  });

  it('refuses a wrong shape with sentences', () => {
    for (const data of [
      null,
      [],
      'x',
      {},
      { ...good, contract: 0 },
      { ...good, contract: 'one' },
      { ...good, id: 'Bad Id' },
      { ...good, name: '  ' },
      { ...good, previewer: 'yes' },
      { ...good, previewer: { messages: 'validate' } },
      { ...good, previewer: { page: '/abs.html', messages: [] } },
      { ...good, previewer: { page: 'https://evil/x.html', messages: [] } },
      { ...good, content: {} },
      { ...good, content: [5] },
      { ...good, content: [{ module: 'Map', type: 'map', title: 't', schemaVersion: 1 }] },
      { ...good, content: [{ module: 'map', type: 'map', title: '', schemaVersion: 1 }] },
      { ...good, content: [{ module: 'map', type: 'map', title: 't', schemaVersion: 1.5 }] },
    ]) {
      const r = readManifest(data);
      expect(r.ok, JSON.stringify(data)).toBe(false);
      if (!r.ok) expect(r.errors.length).toBeGreaterThan(0);
    }
  });

  it('accepts a newer contract and says so', () => {
    const r = readManifest({ ...good, contract: MANIFEST_CONTRACT + 1, future: true });
    expect(r.ok && r.newer).toBe(true);
    expect(r.ok && r.manifest.id).toBe('my-game');
  });

  it('still refuses a plainly broken manifest from a newer contract', () => {
    expect(readManifest({ contract: 9, id: 'Bad', name: 'x' }).ok).toBe(false);
  });
});

describe('manifestUrl', () => {
  it('finds the manifest from the game address', () => {
    expect(MANIFEST_PATH).toBe('vortex-manifest.json');
    expect(manifestUrl('https://game.example')).toBe('https://game.example/vortex-manifest.json');
    expect(manifestUrl('https://example.com/game?x=1')).toBe('https://example.com/game/vortex-manifest.json');
    expect(manifestUrl('javascript:1')).toBeNull();
  });
});
