import { describe, expect, it } from 'vitest';
import { readLayerEditor } from '../src/protocol/index.js';
const constraints = { minPoints: 3, maxPoints: 8, convex: true, withinStage: true, grid: 0.125, maxShapes: 24 };
const icon = { path: 'M1 1h10v10H1z' };
const good = { version: 1, stage: { width: ['width'], height: ['height'] }, pictures: ['pictures'], bands: [{ value: 'main', label: 'Main' }], defaultBand: 'main', terrain: { path: ['zones'], kinds: [{ value: 'zone', label: 'Zone' }], constraints, icon }, collisions: { path: ['walls'], presets: [{ value: 'wall', label: 'Wall', values: {} }], constraints, icon }, rectangles: [{ id: 'raised', label: 'Raised', group: 'Raised', path: ['raised'], presets: [{ value: 'raised', label: 'Raised', values: {} }], rectangle: { x: 'x', y: 'y', width: 'w', height: 'h' }, constraints: { ...constraints, minPoints: 4, maxPoints: 4 }, icon }] };
describe('game-declared monochrome layer icons', () => {
  it('preserves safe paths on terrain, collision and rectangle declarations', () => {
    const result = readLayerEditor(good);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.descriptor.terrain?.icon).toEqual(icon);
    expect(result.descriptor.collisions?.icon).toEqual(icon);
    expect(result.descriptor.rectangles?.[0]?.icon).toEqual(icon);
  });
  it('rejects markup, URLs, invalid object values and excessive paths', () => {
    for (const invalid of [{ path: '<svg onload="alert(1)">' }, { path: 'https://example.com/image.svg' }, { path: 123 }, { path: 'M'.repeat(8193) }]) {
      expect(readLayerEditor({ ...good, terrain: { ...good.terrain, icon: invalid } }).ok).toBe(false);
      expect(readLayerEditor({ ...good, collisions: { ...good.collisions, icon: invalid } }).ok).toBe(false);
    }
  });
});

describe('type icons and SVG coordinates', () => {
  it('preserves type overrides, custom view boxes and evenodd fill rules', () => {
    const custom = {path:'M0 0h640v640z',viewBox:[0,0,640,640],fillRule:'evenodd'};
    const result = readLayerEditor({...good,terrain:{...good.terrain,kinds:[{value:'zone',label:'Zone',icon:custom}]},collisions:{...good.collisions,presets:[{value:'wall',label:'Wall',values:{},icon:custom}]},rectangles:[{...good.rectangles[0],presets:[{value:'raised',label:'Raised',values:{},icon:custom}]}]});
    expect(result.ok).toBe(true);
    if(!result.ok) return;
    expect(result.descriptor.terrain?.kinds[0]?.icon).toEqual(custom);
    expect(result.descriptor.collisions?.presets[0]?.icon).toEqual(custom);
    expect(result.descriptor.rectangles?.[0]?.presets[0]?.icon).toEqual(custom);
    expect(result.descriptor.terrain?.icon).toEqual(icon);
  });
  it('rejects unsafe icons at every override location and malformed coordinates', () => {
    const invalids=[{path:'<svg>'},{path:'M0 0',viewBox:[0,0,0,24]},{path:'M0 0',viewBox:'0 0 24 24'},{path:'M0 0',viewBox:[0,0,24,Infinity]},{path:'M0 0',viewBox:[0,0,-1,24]},{path:'M0 0',viewBox:[0,0,24]},{path:'M0 0',fillRule:'url(unsafe)'}];
    for(const bad of invalids){
      expect(readLayerEditor({...good,terrain:{...good.terrain,kinds:[{value:'zone',label:'Zone',icon:bad}]}}).ok).toBe(false);
      expect(readLayerEditor({...good,collisions:{...good.collisions,presets:[{value:'wall',label:'Wall',values:{},icon:bad}]}}).ok).toBe(false);
      expect(readLayerEditor({...good,rectangles:[{...good.rectangles[0],presets:[{value:'raised',label:'Raised',values:{},icon:bad}]}]}).ok).toBe(false);
    }
  });
});

describe('separate short type labels and descriptions', () => {
  it('preserves trimmed descriptions on every type family', () => {
    const result=readLayerEditor({...good,terrain:{...good.terrain,kinds:[{value:'zone',label:'Zone',shortDesc:'  Slows movement  '}]},collisions:{...good.collisions,presets:[{value:'wall',label:'Wall',shortDesc:'Blocks movement',values:{}}]},rectangles:[{...good.rectangles[0],presets:[{value:'raised',label:'Raised',shortDesc:'Higher ground',values:{}}]}]});
    expect(result.ok).toBe(true);
    if(!result.ok)return;
    expect(result.descriptor.terrain?.kinds[0]?.shortDesc).toBe('Slows movement');
    expect(result.descriptor.collisions?.presets[0]?.shortDesc).toBe('Blocks movement');
    expect(result.descriptor.rectangles?.[0]?.presets[0]?.shortDesc).toBe('Higher ground');
  });
  it('rejects malformed descriptions rather than coercing them into labels', () => {
    for(const shortDesc of [null,42,'','  ','x'.repeat(241)]) expect(readLayerEditor({...good,terrain:{...good.terrain,kinds:[{value:'zone',label:'Zone',shortDesc}]}}).ok).toBe(false);
  });
});

it('reads the previous description field as a shortDesc alias',()=>{
  const result=readLayerEditor({...good,terrain:{...good.terrain,kinds:[{value:'zone',label:'Zone',description:'Legacy explanation'}]}});
  expect(result.ok && result.descriptor.terrain?.kinds[0]?.shortDesc).toBe('Legacy explanation');
});
