import { readMapProperties } from './mapProperties.js';
import type { MapPropertiesDescriptor } from './mapProperties.js';

/** Data-only authoring contract. Document formats, defaults and preview behavior belong to the game. */
export interface CharacterGraphicSlot {
  path: string[];
  label: string;
  help?: string;
  group?: string;
  role?: 'head-down' | 'head-up' | 'idle-body' | 'portrait' | 'animation';
  setupStep?: number;
  /** State grouping and part identity; the game owns the actual state ids. */
  state?: { id: string; label: string; part: 'body' | 'head-down' | 'head-up'; idle?: boolean };
  /** Source slot used while this part has no artwork override. */
  fallback?: string[];
  kits?: string[];
  /** Initial part metadata when assigning artwork to an empty slot. */
  defaults?: Record<string, unknown>;
  properties?: MapPropertiesDescriptor;
  sheet?: { columns: string[]; rows: string[]; frame: string[]; margin?: string[]; spacing?: string[] };
  animationPath?: string[];
  /** Optional ordered image-frame sequence, independent of the base still/spritesheet. */
  sequencePath?: string[];
  /** Per-frame local transforms, duration (ms) and outgoing hold/linear/smooth transition. */
  frameMotion?: boolean;
  /** Optional random one-shot sheet frames on this idle part: {frames,fps,minInterval,maxInterval}. */
  blinkPath?: string[];
  /** Opaque, game-owned inspection hints; never persisted into the character. */
  preview?: Record<string, string | number | boolean>;
}
export interface CharacterEditorDescriptor {
  version: 1;
  previewPage: string;
  /** Where the document identifies its game preset/kit. */
  presetPath: string[];
  previewPath?: string[];
  /** Optional game-owned size fields. Focus guides and proportional resizing are editor-only. */
  sizing?: { width: string[]; collisionRadius: string[]; movementRadius: string[] };
  layeredDefaults?: Record<string, unknown>;
  /** Optional layered section; controls below this path stay hidden when absent. */
  layeredPath?: string[];
  /** Fields whose reset removes an override and reconnects to the game default. */
  inherit: string[][];
  properties: MapPropertiesDescriptor;
  presets: { id: string; label: string; data: Record<string, unknown> }[];
  /** Image assignments stored as asset:<id>; paths refer to the game document. */
  images: CharacterGraphicSlot[];
}
const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
import { safeMapPath } from './mapProperties.js';
export function readCharacterEditor(value: unknown): CharacterEditorDescriptor | null {
  if (!object(value) || value.version !== 1) return null;
  const { previewPage, presets, images, presetPath, layeredPath, inherit } = value;
  if (!safeMapPath(presetPath) || (layeredPath !== undefined && !safeMapPath(layeredPath)) || !Array.isArray(inherit) || inherit.length > 50 || !inherit.every(safeMapPath)) return null;
  if (value.previewPath !== undefined && !safeMapPath(value.previewPath)) return null;
  if (value.layeredDefaults !== undefined && (!object(value.layeredDefaults) || JSON.stringify(value.layeredDefaults).length > 64000)) return null;
  if (value.sizing !== undefined && (!object(value.sizing) || !['width','collisionRadius','movementRadius'].every(key => safeMapPath((value.sizing as Record<string,unknown>)[key])))) return null;
  const properties = readMapProperties(value.properties);
  if (object(value.sizing) && (!properties || !Object.values(value.sizing).every(path => properties.fields.some(field => field.type === 'number' && field.path.join('.') === (path as string[]).join('.'))))) return null;
  if (!properties || typeof previewPage !== 'string' || !/^[a-zA-Z0-9_/-]+\.html$/.test(previewPage) || previewPage.startsWith('/') || previewPage.split('/').includes('..')) return null;
  if (!Array.isArray(presets) || !presets.length || presets.length > 50 || !Array.isArray(images) || images.length > 64) return null;
  const ids = new Set<string>();
  for (const p of presets) {
    if (!object(p) || typeof p.id !== 'string' || !/^[a-z0-9-]{1,40}$/.test(p.id) || ids.has(p.id) || typeof p.label !== 'string' || !p.label.trim() || !object(p.data)) return null;
    if (JSON.stringify(p.data).length > 64000) return null;
    ids.add(p.id);
  }
  for (const image of images) {
    if (!object(image) || !safeMapPath(image.path) || typeof image.label !== 'string' || !image.label.trim()) return null;
    if (image.fallback !== undefined && !safeMapPath(image.fallback)) return null;
    if (image.state !== undefined && (!object(image.state) || typeof image.state.id !== 'string' || !/^[a-zA-Z0-9_-]{1,40}$/.test(image.state.id) || typeof image.state.label !== 'string' || !image.state.label.trim() || image.state.label.length > 100 || !['body','head-down','head-up'].includes(String(image.state.part)) || (image.state.idle !== undefined && typeof image.state.idle !== 'boolean'))) return null;
    if (image.blinkPath !== undefined && (!safeMapPath(image.blinkPath) || !object(image.state) || image.state.idle !== true || image.state.part !== 'head-down' || !object(image.sheet))) return null;
    if (image.frameMotion !== undefined && (typeof image.frameMotion !== 'boolean' || (image.frameMotion && image.sequencePath === undefined))) return null;
    if (image.sequencePath !== undefined && !safeMapPath(image.sequencePath)) return null;
    if (image.animationPath !== undefined && !safeMapPath(image.animationPath)) return null;
    if (image.help !== undefined && (typeof image.help !== 'string' || image.help.length > 1000)) return null;
    if (image.role !== undefined && !['head-down','head-up','idle-body','portrait','animation'].includes(String(image.role))) return null;
    if (image.setupStep !== undefined && (typeof image.setupStep !== 'number' || !Number.isInteger(image.setupStep) || image.setupStep<1 || image.setupStep>3)) return null;
    if (image.group !== undefined && typeof image.group !== 'string') return null;
    if (image.kits !== undefined && (!Array.isArray(image.kits) || !image.kits.every(id => typeof id === 'string' && ids.has(id)))) return null;
    if (image.sheet !== undefined && (!object(image.sheet) || !['columns','rows','frame'].every(k => safeMapPath((image.sheet as Record<string,unknown>)[k])))) return null;
    if (object(image.sheet) && ['margin','spacing'].some(k => image.sheet && (image.sheet as Record<string,unknown>)[k] !== undefined && !safeMapPath((image.sheet as Record<string,unknown>)[k]))) return null;
    if (image.defaults !== undefined && (!object(image.defaults) || JSON.stringify(image.defaults).length > 64000)) return null;
    if (image.properties !== undefined && !readMapProperties(image.properties)) return null;
    if (image.preview !== undefined && (!object(image.preview) || Object.keys(image.preview).length > 16 || !Object.values(image.preview).every(v => typeof v === 'string' || typeof v === 'boolean' || (typeof v === 'number' && Number.isFinite(v))))) return null;
  }
  return JSON.parse(JSON.stringify({ version: 1, previewPage, presetPath, ...(value.sizing ? { sizing:value.sizing } : {}), ...(value.previewPath ? { previewPath:value.previewPath } : {}), ...(value.layeredDefaults ? { layeredDefaults:value.layeredDefaults } : {}), ...(layeredPath ? { layeredPath } : {}), inherit, properties, presets, images })) as CharacterEditorDescriptor;
}
