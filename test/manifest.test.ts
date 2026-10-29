import { describe, expect, it } from 'vitest';
import {
  MANIFEST_CONTRACT,
  MANIFEST_PATH,
  manifestUrl,
  readManifest,
  translateTexts,
  translationsFor,
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

describe('translations', () => {
  const translations = { zh: { Behaviour: '行为', 'Pick one.': '请选择。' }, 'pt-BR': { Behaviour: 'Comportamento' } };

  it('reads valid tables and drops broken ones', () => {
    const r = readManifest({
      ...good,
      translations: { ...translations, 'not a locale!': { a: 'b' }, fr: 'nope', de: { x: '', y: 3, Behaviour: 'Verhalten' } },
    });
    expect(r.ok && r.manifest.translations).toEqual({ ...translations, de: { Behaviour: 'Verhalten' } });
    const none = readManifest({ ...good, translations: [] });
    expect(none.ok && none.manifest.translations).toBeUndefined();
    expect(none.ok && none.warnings?.length).toBe(1);
  });

  it('finds the table of a language, with or without its region', () => {
    expect(translationsFor(translations, 'zh')).toBe(translations.zh);
    expect(translationsFor(translations, 'zh-CN')).toBe(translations.zh);
    expect(translationsFor(translations, 'pt-BR')).toBe(translations['pt-BR']);
    expect(translationsFor(translations, 'en')).toBeUndefined();
    expect(translationsFor(undefined, 'zh')).toBeUndefined();
    expect(translationsFor(translations, '__proto__')).toBeUndefined();
  });

  it('translates only the texts people read', () => {
    const layers = {
      fields: [{ path: ['Behaviour'], label: 'Behaviour', help: 'Pick one.', type: 'Behaviour', choices: [{ value: 'Behaviour', label: 'Behaviour' }] }],
    };
    const out = translateTexts(layers, translations.zh);
    expect(out.fields[0]).toEqual({
      path: ['Behaviour'],
      label: '行为',
      help: '请选择。',
      type: 'Behaviour',
      choices: [{ value: 'Behaviour', label: '行为' }],
    });
    expect(layers.fields[0]!.label).toBe('Behaviour');
    expect(translateTexts(layers, undefined)).toBe(layers);
  });
});
