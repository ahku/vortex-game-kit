import { describe, expect, it } from 'vitest';
import { readLayerEditor, readManifest } from '../src/protocol/index.js';

const terrain = {
  path: ['world', 'zones'],
  kinds: [
    { value: 'mud', label: 'Mud' },
    { value: 'ice', label: 'Ice' },
  ],
  constraints: {
    minPoints: 3,
    maxPoints: 8,
    convex: true,
    withinStage: true,
    grid: 0.125,
    maxShapes: 100,
  },
};
const base = {
  version: 1,
  stage: { width: ['width'], height: ['height'] },
  pictures: ['pictures'],
  bands: [{ value: 'ground', label: 'Ground' }],
  defaultBand: 'ground',
};
describe('optional terrain contract', () => {
  it('keeps old picture-only descriptors unchanged', () => {
    const result = readLayerEditor(base);
    expect(result.ok && result.descriptor).not.toHaveProperty('terrain');
  });
  it('retains the game-owned path, kinds and constraints through manifest parsing', () => {
    const result = readManifest({
      contract: 1,
      id: 'game',
      name: 'Game',
      content: [
        {
          module: 'map',
          type: 'map',
          title: 'Map',
          schemaVersion: 1,
          layers: { ...base, terrain },
        },
      ],
    });
    expect(result.ok && result.manifest.content[0].layers?.terrain).toEqual(terrain);
  });
  it('refuses unsafe, overlapping and duplicate paths or kinds', () => {
    for (const patch of [
      { path: ['__proto__'] },
      { path: ['pictures', 'zones'] },
      { path: ['width'] },
      { kinds: [] },
      { kinds: [terrain.kinds[0], terrain.kinds[0]] },
      { kinds: [{ value: 'x', label: '  ' }] },
    ])
      expect(readLayerEditor({ ...base, terrain: { ...terrain, ...patch } }).ok).toBe(false);
  });
  it('refuses invalid geometry limits instead of inventing defaults', () => {
    for (const patch of [
      { minPoints: 2 },
      { maxPoints: 2 },
      { maxPoints: 3.5 },
      { grid: 0 },
      { grid: Infinity },
      { convex: false },
      { withinStage: 'yes' },
      { maxShapes: -1 },
      { minEdge: 0 },
    ])
      expect(
        readLayerEditor({
          ...base,
          terrain: {
            ...terrain,
            constraints: { ...terrain.constraints, ...patch },
          },
        }).ok,
      ).toBe(false);
  });
});
