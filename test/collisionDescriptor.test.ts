import { describe, it, expect } from 'vitest';
import { readLayerEditor } from '../src/protocol/index.js';
const base = {
  version: 1,
  stage: { width: ['width'], height: ['height'] },
  pictures: ['pictures'],
  bands: [{ value: 'ground', label: 'Ground' }],
};
const collisions = {
  path: ['world', 'walls'],
  presets: [
    { value: 'plain', label: 'Plain', values: { surface: null } },
    { value: 'soft', label: 'Soft', values: { surface: 'soft' } },
  ],
  constraints: { minPoints: 3, maxPoints: 8, convex: true, withinStage: true, grid: 0.125, maxShapes: 200 },
};
describe('collision authoring declaration', () => {
  it('keeps preset data and null removals without introducing game rules', () => {
    const r = readLayerEditor({ ...base, collisions });
    expect(r.ok && r.descriptor.collisions).toEqual(collisions);
  });
  it('rejects unsafe properties, overlapping paths, duplicate presets and invalid constraints', () => {
    for (const patch of [
      { path: ['pictures'] },
      { path: ['world'] },
      { path: ['__proto__'] },
      { presets: [] },
      { presets: [collisions.presets[0], collisions.presets[0]] },
      { presets: [{ value: 'bad', label: 'Bad', values: { id: 'bad' } }] },
      { presets: [{ value: 'bad', label: 'Bad', values: { points: [] } }] },
      { presets: [{ value: 'bad', label: 'Bad', values: { constructor: true } }] },
      { constraints: { ...collisions.constraints, grid: 0 } },
    ])
      expect(
        readLayerEditor({
          ...base,
          terrain: {
            path: ['world', 'terrain'],
            kinds: [{ value: 'mud', label: 'Mud' }],
            constraints: collisions.constraints,
          },
          collisions: { ...collisions, ...patch },
        }).ok,
      ).toBe(false);
  });
});
