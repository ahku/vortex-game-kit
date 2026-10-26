import {describe,it,expect} from 'vitest';
import {readLayerEditor} from '../src/protocol/index.js';
const base={version:1,stage:{width:['width'],height:['height']},pictures:['pictures'],bands:[{value:'over',label:'Over'}]};
const rectangle={id:'raised',label:'Raised',group:'Raised',path:['world','raised'],rectangle:{x:'left',y:'top',width:'span',height:'depth'},presets:[{value:'top',label:'Top',values:{}}],constraints:{minPoints:4,maxPoints:4,convex:true,withinStage:true,grid:0.125,maxShapes:24},fields:[{key:'height',label:'Height',type:'number',default:0.65}]};
describe('rectangular collection descriptors',()=>{
 it('retains generic field mappings, presets, group labels and fields',()=>{const read=readLayerEditor({...base,rectangles:[rectangle]});expect(read.ok&&read.descriptor.rectangles).toEqual([rectangle]);});
 it('rejects unsafe mappings, duplicate ids, overlapping paths and coordinate-overwriting properties',()=>{
  for(const patch of [{path:['pictures']},{rectangle:{...rectangle.rectangle,x:'__proto__'}},{rectangle:{...rectangle.rectangle,height:'span'}},{presets:[{value:'top',label:'Top',values:{left:1}}]},{fields:[{key:'span',label:'Span',type:'number'}]},{constraints:{...rectangle.constraints,minPoints:3}},{id:'bad-id'},{group:''}])expect(readLayerEditor({...base,rectangles:[{...rectangle,...patch}]}).ok).toBe(false);
  expect(readLayerEditor({...base,rectangles:[rectangle,rectangle]}).ok).toBe(false);
 });
});
