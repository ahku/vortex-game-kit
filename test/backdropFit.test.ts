import { describe, expect, it } from 'vitest';
import { readLayerEditor, checkLayerEditorAgainst } from '../src/protocol/index.js';
const good = { version: 1, stage: { width: ['width'], height: ['height'], backdrop: ['background'], backdropFit: ['fit'] }, pictures: ['pictures'], bands: [{ value: 'main', label: 'Main' }], defaultBand: 'main' };
describe('optional backdrop fit declaration', () => {
  it('reads the optional path and checks standard fit values', () => {
    const result = readLayerEditor(good);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.descriptor.stage.backdropFit).toEqual(['fit']);
    for (const fit of [undefined, 'stretch', 'contain', 'cover']) expect(checkLayerEditorAgainst(result.descriptor, { width: 10, height: 10, fit })).toEqual([]);
    expect(checkLayerEditorAgainst(result.descriptor, { width: 10, height: 10, fit: 'bad' })).toContain('The backdrop fit is not stretch, contain or cover.');
  });
  it('rejects overlap, unsafe paths and a fit without a backdrop', () => {
    for (const stage of [{ ...good.stage, backdropFit: ['width'] }, { ...good.stage, backdropFit: ['__proto__'] }, { ...good.stage, backdrop: undefined }]) expect(readLayerEditor({ ...good, stage }).ok).toBe(false);
  });
});
