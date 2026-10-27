import { describe, expect, it } from 'vitest';
import { readLayerEditor } from '../src/protocol/index.js';
const base = { version: 1, stage: { width: ['width'], height: ['height'], backdrop: ['background'] }, pictures: ['pictures'], bands: [{value: 'main', label: 'Main'}], defaultBand: 'main' };
describe('game-owned layer enablement capability', () => {
  it('is optional, and preserves explicit opt-in and the independent backdrop path', () => {
    const old = readLayerEditor(base);
    expect(old.ok && old.descriptor.enablement).toBeUndefined();
    for (const enablement of [{}, {backdrop: ['backgroundEnabled']}]) {
      const result = readLayerEditor({...base, enablement});
      expect(result.ok && result.descriptor.enablement).toEqual(enablement);
    }
  });
  it('rejects malformed, unsafe, overlapping and orphaned paths', () => {
    for (const enablement of [false, [], {backdrop: ['__proto__']}, {backdrop: ['width']}, {backdrop: ['pictures','enabled']}, {backdrop: []}]) expect(readLayerEditor({...base, enablement}).ok).toBe(false);
    expect(readLayerEditor({...base, stage: {width: ['width'],height: ['height']}, enablement: {backdrop: ['on']}}).ok).toBe(false);
  });
});
