import { describe, expect, it } from 'vitest';
import { readCharacterEditor, readManifest } from '../src/protocol/index.js';
const descriptor = { version: 1, presetPath: ['kit'], inherit: [['stats','hp']], previewPage: 'characters/preview.html', properties: { fields: [{ path:['stats','hp'], label:'HP', type:'number', min:1, max:9999 }] }, presets:[{ id:'hero',label:'Hero', data:{kind:'character', kit:'hero', extra:{kept:1}} }], images:[{path:['appearance','body','src'],label:'Body'}] };
describe('character authoring declaration', () => {
 it('preserves game-owned seed documents as detached plain data', () => { const read = readCharacterEditor(descriptor)!; expect(read.presets[0]!.data).toEqual(descriptor.presets[0]!.data); read.presets[0]!.data.extra = null; expect(descriptor.presets[0]!.data.extra).toEqual({kept:1}); });
 it('refuses unsafe pages and property/image paths, duplicate kits and future descriptors', () => { for (const page of ['../evil.html','https://evil.test/x.html','/x.html','a/../x.html']) expect(readCharacterEditor({...descriptor,previewPage:page})).toBeNull(); expect(readCharacterEditor({...descriptor, images:[{path:['__proto__','x'],label:'Bad'}]})).toBeNull(); expect(readCharacterEditor({...descriptor,presets:[descriptor.presets[0],descriptor.presets[0]]})).toBeNull(); expect(readCharacterEditor({...descriptor,version:2})).toBeNull(); });
 it('leaves unsupported character capability out without losing other manifest content', () => { const read = readManifest({contract:1,id:'test',name:'Test',content:[{module:'character',type:'character',title:'Characters',schemaVersion:1,characters:{...descriptor,version:2}}]}); expect(read.ok).toBe(true); if(read.ok){expect(read.manifest.content[0]!.characters).toBeUndefined();expect(read.warnings).toHaveLength(1);} });
});

it('reads optional graphic slots and rejects unsafe slot configuration',()=>{
 const slot={path:['appearance','clips','attack','src'],label:'Attack',animationPath:['appearance','clips','attack','animation'],sheet:{columns:['appearance','clips','attack','columns'],rows:['appearance','clips','attack','rows'],frame:['appearance','clips','attack','frame']},properties:{fields:[{path:['appearance','clips','attack','x'],label:'X',type:'number',min:-100,max:100}]},preview:{clip:'attack',heading:180}};
 expect(readCharacterEditor({...descriptor,previewPath:['editorPreview'],images:[slot]})?.images[0]?.preview).toEqual(slot.preview);
 expect(readCharacterEditor({...descriptor,images:[{...slot,animationPath:['__proto__','polluted']}]})).toBeNull();
 expect(readCharacterEditor({...descriptor,images:[{...slot,sheet:{...slot.sheet,margin:['constructor','x']}}]})).toBeNull();
});

it('accepts state parts and safe inheritance for a complete character roster', () => {
 const image = {path:['appearance','heads','attack','front','src'], label:'Attack head', state:{id:'attack',label:'Attack',part:'head-down'}, fallback:['appearance','front','src']};
 expect(readCharacterEditor({...descriptor,images:Array.from({length:37},()=>image)})?.images).toHaveLength(37);
 expect(readCharacterEditor({...descriptor,images:[{...image,fallback:['__proto__','x']}]})).toBeNull();
 expect(readCharacterEditor({...descriptor,images:[{...image,state:{...image.state,part:'bad'}}]})).toBeNull();
 expect(readCharacterEditor({...descriptor,images:Array.from({length:65},()=>image)})).toBeNull();
});

it('validates image sequence paths', () => {
 const image = {path:['art','src'],label:'Body',sequencePath:['art','sequence']};
 expect(readCharacterEditor({...descriptor,images:[image]})?.images[0]?.sequencePath).toEqual(image.sequencePath);
 expect(readCharacterEditor({...descriptor,images:[{...image,sequencePath:['__proto__','x']}]})).toBeNull();
});

it('limits blinking to an explicitly declared idle forward head with safe paths', () => {
 const image={path:['art','src'],label:'Head',state:{id:'idle',label:'Idle',part:'head-down',idle:true},sheet:{columns:['art','columns'],rows:['art','rows'],frame:['art','frame']},blinkPath:['art','blink']};
 expect(readCharacterEditor({...descriptor,images:[image]})?.images[0]?.blinkPath).toEqual(image.blinkPath);
 for(const bad of [{blinkPath:['__proto__','x']},{state:{...image.state,idle:false}},{state:{...image.state,part:'head-up'}},{sheet:undefined}]) expect(readCharacterEditor({...descriptor,images:[{...image,...bad}]})).toBeNull();
});
