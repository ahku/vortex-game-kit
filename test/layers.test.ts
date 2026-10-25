import { describe, expect, it } from 'vitest';
import {
  LAYER_OPTIONAL_FIELDS,
  checkLayerEditorAgainst,
  readLayerEditor,
  readManifest,
  valueAt,
} from '../src/protocol/index.js';

const good = {
  version: 1,
  stage: {
    width: ['arena', 'width'],
    height: ['arena', 'height'],
    backdrop: ['arena', 'backdrop'],
  },
  pictures: ['arena', 'sprites'],
  bands: [
    { value: 'under', label: 'Under' },
    { value: 'sorted', label: 'With characters', sorted: true },
  ],
  defaultBand: 'sorted',
  pictureFields: ['flipX', 'flipY', 'rotation'],
  fields: [{ key: 'solid', label: 'Solid', type: 'boolean', default: false }],
};

describe('readLayerEditor', () => {
  it('reads a good descriptor', () => {
    const r = readLayerEditor(good);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.descriptor.pictureFields).toEqual(['rotation', 'flipX', 'flipY']);
  });
  it('knows flipY as a standard field', () => {
    expect(LAYER_OPTIONAL_FIELDS).toContain('flipY');
    expect(LAYER_OPTIONAL_FIELDS).toContain('flipX');
  });
  it('refuses broken parts', () => {
    const bad = (patch: object) => readLayerEditor({ ...good, ...patch });
    expect(bad({ version: 2 }).ok).toBe(false);
    expect(bad({ pictures: ['__proto__'] }).ok).toBe(false);
    expect(bad({ pictures: [] }).ok).toBe(false);
    expect(bad({ pictures: ['arena', 'width'] }).ok).toBe(false);
    expect(bad({ bands: [] }).ok).toBe(false);
    expect(bad({ bands: [good.bands[0], good.bands[0]] }).ok).toBe(false);
    expect(bad({ pictureFields: ['spin'] }).ok).toBe(false);
    expect(bad({ defaultBand: 'nope' }).ok).toBe(false);
    expect(bad({ fields: [{ key: 'x', label: 'X', type: 'number' }] }).ok).toBe(false);
    expect(
      bad({
        fields: [
          {
            key: 'k',
            label: 'K',
            type: 'choice',
            choices: [{ value: 'a', label: 'A' }],
          },
        ],
      }).ok,
    ).toBe(false);
    expect(bad({ fields: [{ key: 'k', label: 'K', type: 'number', default: 'a' }] }).ok).toBe(false);
    expect(readLayerEditor(null).ok).toBe(false);
  });
});

describe('valueAt', () => {
  it('follows own keys only', () => {
    expect(valueAt({ a: { b: 3 } }, ['a', 'b'])).toBe(3);
    expect(valueAt({ a: 1 }, ['a', 'b'])).toBeUndefined();
    expect(valueAt({}, ['constructor'])).toBeUndefined();
  });
});

describe('checkLayerEditorAgainst', () => {
  const d = (() => {
    const r = readLayerEditor(good);
    if (!r.ok) throw new Error('bad');
    return r.descriptor;
  })();
  const map = (sprites: unknown) => ({
    arena: { width: 16, height: 10, backdrop: 'a.png', sprites },
  });
  it('accepts a fitting map', () => {
    expect(checkLayerEditorAgainst(d, map([{ id: 'a', src: 's.png', x: 1, y: 2, width: 1, layer: 'under' }]))).toEqual(
      [],
    );
    expect(checkLayerEditorAgainst(d, map(undefined))).toEqual([]);
    expect(checkLayerEditorAgainst(d, map([{ id: 'a', src: 's.png', x: 1, y: 2, width: 1 }]))).toEqual([]);
    const { defaultBand: _omit, ...strict } = d;
    expect(checkLayerEditorAgainst(strict, map([{ id: 'a', src: 's.png', x: 1, y: 2, width: 1 }])).length).toBe(1);
  });
  it('lists what does not fit', () => {
    const p = checkLayerEditorAgainst(
      d,
      map([{ id: 'a', src: 's.png', x: 1, y: 2, width: 1, layer: 'sky' }, { id: 'a' }]),
    );
    expect(p.length).toBeGreaterThanOrEqual(3);
    expect(checkLayerEditorAgainst(d, { arena: {} }).length).toBe(2);
  });
});

describe('manifest layers', () => {
  const base = { contract: 1, id: 'g', name: 'G' };
  const entry = { module: 'map', type: 'map', title: 'Map', schemaVersion: 1 };
  it('keeps a good descriptor', () => {
    const r = readManifest({ ...base, content: [{ ...entry, layers: good }] });
    expect(r.ok && r.manifest.content[0]?.layers?.pictures).toEqual(['arena', 'sprites']);
    expect(r.ok && r.warnings).toBeUndefined();
  });
  it('leaves out a broken or newer one with a warning, not an error', () => {
    for (const layers of [
      { ...good, bands: [] },
      { ...good, version: 9 },
    ]) {
      const r = readManifest({ ...base, content: [{ ...entry, layers }] });
      expect(r.ok).toBe(true);
      if (r.ok) {
        expect(r.manifest.content[0]?.layers).toBeUndefined();
        expect(r.warnings?.length).toBe(1);
      }
    }
  });
});
