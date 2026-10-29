import { readMapProperties, readMapListEditor, readMapUnits } from './mapProperties.js';
import type { MapPropertiesDescriptor, MapPropertyField, MapListEditorDescriptor, MapUnitsDescriptor } from './mapProperties.js';
/**
 * The layer editor descriptor: what a game tells an editor so it can move the game's pictures around on a stage
 * (docs/PREVIEWER-STANDARD.md, section 10). The editor owns the names of a picture's fields (`x`, `y`, `width`...); the
 * game only says where in its map the stage size and the list of pictures live, which depth bands exist, which optional
 * fields it understands, and any extra properties of its own. Everything else in the map is left alone on every edit.
 *
 * Pure, no dependencies. It is for 2D games whose pictures sit on a stage; a game of another kind (3D, say) gets its own
 * editor and does not use this.
 */

/** Rises only when the descriptor changes in a way an older editor cannot ignore. */
export const LAYER_EDITOR_VERSION = 1;

/** A place in a map: the keys to follow from the top, for example `['arena', 'sprites']`. */
export type FieldPath = string[];

/** The fields every picture has, under these exact names. */
export const LAYER_REQUIRED_FIELDS = ['id', 'src', 'x', 'y', 'width'] as const;

/** The fields a game may or may not have. The descriptor says which ones it understands. */
export const LAYER_OPTIONAL_FIELDS = [
  'layer',
  'rotation',
  'flipX',
  'flipY',
  'anchor',
  'sortY',
  'parallax',
  'animation',
] as const;
export type LayerOptionalField = (typeof LAYER_OPTIONAL_FIELDS)[number];

/** A depth band, as the value stored in the picture's `layer` field. `sorted` bands sort by `sortY` with characters. */
export interface LayerBand {
  value: string;
  label: string;
  sorted?: boolean;
}

export type LayerFieldType = 'number' | 'text' | 'boolean' | 'choice';

/** An extra property of a picture that only this game has, shown in the editor's properties panel. */
export interface LayerField {
  key: string;
  label: string;
  type: LayerFieldType;
  choices?: { value: string; label: string }[];
  default?: number | string | boolean;
}

/** Geometry limits declared by the game, in stage/world units. Grid is a suggested snap step, never mandatory. */
export interface ShapeEditorConstraints {
  minPoints: number;
  maxPoints: number;
  convex: true;
  withinStage: boolean;
  grid: number;
  /** Hard minimum; omit when short edges are advice only. */
  minEdge?: number;
  maxShapes: number;
}

/** Safe monochrome SVG presentation data, independent of gameplay and saved map data. */
export interface LayerIcon {
  path: string;
  /** Defaults to [0, 0, 24, 24]. */
  viewBox?: [number, number, number, number];
  fillRule?: 'nonzero' | 'evenodd';
}

/** Standard terrain rows are { id, kind, points: [{ x, y }] }; other fields belong to the game. */
export interface TerrainEditorDescriptor {
  icon?: LayerIcon;
  path: FieldPath;
  kinds: { value: string; label: string; shortDesc?: string; icon?: LayerIcon }[];
  constraints: ShapeEditorConstraints;
}

/** Game-owned presets for rows without a kind field. Null removes a property when applying a preset. */
export interface CollisionEditorDescriptor {
  icon?: LayerIcon;
  path: FieldPath;
  presets: { value: string; label: string; shortDesc?: string; icon?: LayerIcon; values: Record<string, string | number | boolean | null> }[];
  constraints: ShapeEditorConstraints;
}

/** Rectangular map collections (for example raised areas), edited through the same shape tools. */
export interface RectangleEditorDescriptor extends CollisionEditorDescriptor {
  id: string;
  label: string;
  group: string;
  rectangle: { x: string; y: string; width: string; height: string };
  fields?: LayerField[];
}

/**
 * Sections of a long battle: named convex areas the party moves through one after the other. An editor draws them like
 * regions (same polygon tools and limits) and shows `fields` in the inspector for what else a section has: its title,
 * where the party starts, which section follows and so on. The game owns what the fields mean.
 */
export interface SectionEditorDescriptor extends CollisionEditorDescriptor {
  /** Per-section settings, paths inside one row. A `reference` field may point at the sections' own path. */
  fields: MapPropertyField[];
  /**
   * A place in the map where an editor writes the id of the section a preview should start in. It is written into the
   * copy sent to the game only and never saved.
   */
  previewStart?: FieldPath;
  help?: string;
}

export interface LayerEditorDescriptor {
  version: typeof LAYER_EDITOR_VERSION;
  stage: { width: FieldPath; height: FieldPath; backdrop?: FieldPath; backdropFit?: FieldPath };
  /** Opt in to standard enabled?: boolean on every layer row. False excludes it from gameplay, never authoring. */
  enablement?: { backdrop?: FieldPath };
  /** The list of pictures. */
  pictures: FieldPath;
  /** Optional terrain authoring; absence keeps pictures-only editing. */
  terrain?: TerrainEditorDescriptor;
  collisions?: CollisionEditorDescriptor;
  rectangles?: RectangleEditorDescriptor[];
  /** Non-gameplay polygon areas used by events and objectives. */
  regions?: CollisionEditorDescriptor;
  /** Sections of a long battle, drawn like regions with extra per-row fields. */
  sections?: SectionEditorDescriptor;
  events?: MapListEditorDescriptor;
  /** Characters placed on the map, based on game kits and optionally authored Studio characters. */
  units?: MapUnitsDescriptor;
  battle?: MapPropertiesDescriptor;
  bands: LayerBand[];
  /**
   * The band a picture is in when it has no `layer`. The editor leaves `layer` out when a picture goes into this band.
   * Without it, every picture must have a `layer`.
   */
  defaultBand?: string;
  /** Optional standard fields the game understands; the editor shows controls only for these. */
  pictureFields?: LayerOptionalField[];
  /** The game's own extra properties of a picture. */
  fields?: LayerField[];
}

export type LayerEditorReadResult = { ok: true; descriptor: LayerEditorDescriptor } | { ok: false; errors: string[] };

const KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;
const FORBIDDEN = new Set(['__proto__', 'prototype', 'constructor']);
const isObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);
const isKey = (value: unknown): value is string =>
  typeof value === 'string' && KEY.test(value) && !FORBIDDEN.has(value);
const isPath = (value: unknown): value is FieldPath =>
  Array.isArray(value) && value.length > 0 && value.length <= 12 && value.every(isKey);
const startsWith = (a: string[], b: string[]) => a.length <= b.length && a.every((k, i) => k === b[i]);

function shapeConstraintsOf(value: unknown): ShapeEditorConstraints | undefined {
  if (!isObject(value)) return;
  const positive = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v > 0;
  const integer = (v: unknown): v is number => positive(v) && Number.isSafeInteger(v);
  if (
    !integer(value.minPoints) ||
    value.minPoints < 3 ||
    !integer(value.maxPoints) ||
    value.maxPoints < value.minPoints ||
    value.maxPoints > 100 ||
    value.convex !== true ||
    typeof value.withinStage !== 'boolean' ||
    !positive(value.grid) ||
    !integer(value.maxShapes) ||
    (value.minEdge !== undefined && !positive(value.minEdge))
  )
    return;
  return {
    minPoints: value.minPoints,
    maxPoints: value.maxPoints,
    convex: true,
    withinStage: value.withinStage,
    grid: value.grid,
    maxShapes: value.maxShapes,
    ...(value.minEdge !== undefined ? { minEdge: value.minEdge as number } : {}),
  };
}

/** Reads the parsed JSON of a descriptor. Unknown fields are ignored; anything wrong is listed. */
export function readLayerEditor(data: unknown): LayerEditorReadResult {
  if (!isObject(data))
    return {
      ok: false,
      errors: ['The layer editor description must be an object.'],
    };
  const errors: string[] = [];
  const iconOf = (value: unknown): { icon?: LayerIcon } => {
    if (value === undefined) return {};
    if (!isObject(value) || typeof value.path !== 'string' || !value.path.trim() || value.path.length > 8192 || !/^[MmZzLlHhVvCcSsQqTtAaEe0-9.,+\s-]+$/.test(value.path)) {
      errors.push('A layer icon must contain a safe SVG path.');
      return {};
    }
    const box = value.viewBox;
    if (box !== undefined && (!Array.isArray(box) || box.length !== 4 || !box.every(n => typeof n === 'number' && Number.isFinite(n) && Math.abs(n) <= 1e6) || box[2] <= 0 || box[3] <= 0)) {
      errors.push('An icon viewBox must contain four finite numbers with positive width and height.');
      return {};
    }
    if (value.fillRule !== undefined && value.fillRule !== 'nonzero' && value.fillRule !== 'evenodd') {
      errors.push('An icon fillRule must be nonzero or evenodd.');
      return {};
    }
    return {icon:{path:value.path, ...(box ? {viewBox:[...box] as LayerIcon['viewBox']} : {}), ...(value.fillRule ? {fillRule:value.fillRule as LayerIcon['fillRule']} : {})}};
  };
  const shortDescOf = (value: unknown): {shortDesc?:string} => {
    if (value === undefined) return {};
    if (typeof value !== 'string' || !value.trim() || value.length > 240) {
      errors.push('A type shortDesc must be nonempty text of up to 240 characters.'); return {};
    }
    return {shortDesc:value.trim()};
  };
  if (data.version !== LAYER_EDITOR_VERSION) errors.push(`"version" must be ${LAYER_EDITOR_VERSION}.`);

  const stage = data.stage;
  let width: FieldPath = [];
  let height: FieldPath = [];
  let backdrop: FieldPath | undefined;
  let backdropFit: FieldPath | undefined;
  if (!isObject(stage)) errors.push('"stage" must be an object.');
  else {
    if (isPath(stage.width)) width = stage.width;
    else errors.push('"stage.width" must be a path: a list of keys.');
    if (isPath(stage.height)) height = stage.height;
    else errors.push('"stage.height" must be a path: a list of keys.');
    if (stage.backdrop !== undefined) {
      if (isPath(stage.backdrop)) backdrop = stage.backdrop;
      else errors.push('"stage.backdrop" must be a path: a list of keys.');
    }
    if (stage.backdropFit !== undefined) {
      if (isPath(stage.backdropFit)) backdropFit = stage.backdropFit;
      else errors.push('"stage.backdropFit" must be a path: a list of keys.');
      if (stage.backdrop === undefined) errors.push('"stage.backdropFit" needs a backdrop path.');
    }
  }
  let enablement: LayerEditorDescriptor['enablement'];
  if (data.enablement !== undefined) {
    const raw = data.enablement;
    if (!isObject(raw) || (raw.backdrop !== undefined && !isPath(raw.backdrop)))
      errors.push('"enablement" must be an object with an optional backdrop path.');
    else {
      enablement = raw.backdrop ? { backdrop: [...raw.backdrop as FieldPath] } : {};
      if (raw.backdrop && !backdrop) errors.push('"enablement.backdrop" needs a stage backdrop.');
    }
  }
  let pictures: FieldPath = [];
  if (isPath(data.pictures)) pictures = data.pictures;
  else errors.push('"pictures" must be a path: a list of keys.');

  let terrain: TerrainEditorDescriptor | undefined;
  if (data.terrain !== undefined) {
    const raw = data.terrain;
    if (!isObject(raw) || !isPath(raw.path)) errors.push('"terrain.path" must be a path.');
    else {
      const kinds = raw.kinds;
      const c = raw.constraints;
      if (
        !Array.isArray(kinds) ||
        kinds.length < 1 ||
        kinds.length > 100 ||
        !kinds.every(
          (k) =>
            isObject(k) &&
            typeof k.value === 'string' &&
            k.value.length > 0 &&
            k.value.length <= 64 &&
            typeof k.label === 'string' &&
            k.label.trim().length > 0 &&
            k.label.length <= 80,
        ) ||
        new Set(kinds.map((k) => (k as { value: string }).value)).size !== kinds.length
      )
        errors.push('"terrain.kinds" must be 1 to 100 different { value, label } pairs.');
      if (!shapeConstraintsOf(c))
        errors.push('"terrain.constraints" needs convex geometry limits, a positive grid and a shape count.');
      // Keep only declared fields, as with the picture descriptor.
      if (!errors.length && isObject(c))
        terrain = {
          path: [...raw.path],
          kinds: (kinds as { value: string; label: string; shortDesc?: unknown; description?: unknown; icon?: unknown }[]).map((k) => ({
            value: k.value,
            label: k.label.trim(),
            ...iconOf(k.icon),
            ...shortDescOf(k.shortDesc !== undefined ? k.shortDesc : k.description),
          })),
          constraints: shapeConstraintsOf(c)!,
          ...iconOf(raw.icon),
        };
    }
  }

  let collisions: CollisionEditorDescriptor | undefined;
  if (data.collisions !== undefined) {
    const raw = data.collisions;
    if (!isObject(raw) || !isPath(raw.path)) errors.push('"collisions.path" must be a path.');
    else {
      const presets = raw.presets;
      const constraints = shapeConstraintsOf(raw.constraints);
      const scalar = (v: unknown) =>
        v === null ||
        typeof v === 'boolean' ||
        (typeof v === 'string' && v.length <= 1000) ||
        (typeof v === 'number' && Number.isFinite(v));
      if (!constraints) errors.push('"collisions.constraints" needs convex geometry limits.');
      if (
        !Array.isArray(presets) ||
        !presets.length ||
        presets.length > 100 ||
        !presets.every(
          (p) =>
            isObject(p) &&
            typeof p.value === 'string' &&
            p.value.length > 0 &&
            p.value.length <= 64 &&
            typeof p.label === 'string' &&
            !!p.label.trim() &&
            p.label.length <= 80 &&
            isObject(p.values) &&
            Object.keys(p.values).length <= 20 &&
            Object.entries(p.values).every(
              ([key, value]) => isKey(key) && !['id', 'points', 'kind'].includes(key) && scalar(value),
            ),
        ) ||
        new Set(presets.map((p) => p.value)).size !== presets.length
      )
        errors.push('"collisions.presets" must be different named presets with safe scalar properties.');
      else if (constraints)
        collisions = {
          path: [...raw.path],
          constraints,
          ...iconOf(raw.icon),
          presets: presets.map((p) => ({ value: p.value, label: p.label.trim(), values: { ...p.values }, ...iconOf(p.icon), ...shortDescOf(p.shortDesc !== undefined ? p.shortDesc : p.description) })),
        };
    }
  }

  const rectangles: RectangleEditorDescriptor[] = [];
  if (data.rectangles !== undefined) {
    if (!Array.isArray(data.rectangles) || data.rectangles.length > 16) errors.push('"rectangles" must be up to 16 collections.');
    else for (const raw of data.rectangles) {
      if (!isObject(raw) || !isKey(raw.id) || typeof raw.label !== 'string' || !raw.label.trim() || raw.label.length > 80 ||
          typeof raw.group !== 'string' || !raw.group.trim() || raw.group.length > 80 || !isObject(raw.rectangle) ||
          !['x','y','width','height'].every(key => isKey((raw.rectangle as Record<string, unknown>)[key])) ||
          new Set(Object.values(raw.rectangle)).size !== 4 || Object.values(raw.rectangle).some(key => ['id','points','kind'].includes(key as string)) ||
          rectangles.some(r => r.id === raw.id)) {
        errors.push('Each rectangular collection needs a unique id, labels and four safe coordinate fields.'); continue;
      }
      // Reuse the full preset, constraint and field validator. The recursive call has no rectangle collections.
      const checked = readLayerEditor({ ...data, rectangles: undefined, terrain: undefined, regions: undefined, sections: undefined, events: undefined, units: undefined, battle: undefined,
        collisions: {path:raw.path,presets:raw.presets,constraints:raw.constraints,icon:raw.icon}, fields:raw.fields });
      if (!checked.ok || !checked.descriptor.collisions || checked.descriptor.collisions.constraints.minPoints !== 4 ||
          checked.descriptor.collisions.constraints.maxPoints !== 4) {
        errors.push(`Invalid rectangular collection "${raw.id}".`); continue;
      }
      const coordinateKeys = Object.values(raw.rectangle);
      if ((checked.descriptor.fields ?? []).some(field => coordinateKeys.includes(field.key)) ||
          checked.descriptor.collisions.presets.some(p => Object.keys(p.values).some(key => coordinateKeys.includes(key)))) {
        errors.push('Rectangle properties cannot overwrite coordinates.'); continue;
      }
      rectangles.push({ ...checked.descriptor.collisions, id:raw.id, label:raw.label.trim(), group:raw.group.trim(),
        rectangle:{x:raw.rectangle.x as string,y:raw.rectangle.y as string,width:raw.rectangle.width as string,height:raw.rectangle.height as string},
        ...(checked.descriptor.fields ? {fields:checked.descriptor.fields} : {}),
      });
    }
  }

  let regions: CollisionEditorDescriptor | undefined;
  if (data.regions !== undefined) {
    const checked = readLayerEditor({version:data.version, stage:data.stage, pictures:data.pictures, bands:data.bands, defaultBand:data.defaultBand, collisions:data.regions});
    if (!checked.ok || !checked.descriptor.collisions) errors.push('Invalid regions descriptor.');
    else regions=checked.descriptor.collisions;
  }
  let sections: SectionEditorDescriptor | undefined;
  if (data.sections !== undefined) {
    const raw = data.sections;
    const checked = readLayerEditor({version:data.version, stage:data.stage, pictures:data.pictures, bands:data.bands, defaultBand:data.defaultBand, collisions:raw});
    const fields = isObject(raw) ? readMapProperties({ fields: raw.fields }) : null;
    const previewStart = isObject(raw) ? raw.previewStart : undefined;
    const help = isObject(raw) ? raw.help : undefined;
    if (!checked.ok || !checked.descriptor.collisions || !fields) errors.push('Invalid sections descriptor.');
    else if (previewStart !== undefined && !isPath(previewStart)) errors.push('"sections.previewStart" must be a safe path.');
    else if (help !== undefined && (typeof help !== 'string' || !help.trim() || help.length > 1000)) errors.push('"sections.help" must be nonempty text of up to 1000 characters.');
    else sections = { ...checked.descriptor.collisions, fields: fields.fields,
      ...(previewStart ? { previewStart: previewStart as FieldPath } : {}), ...(help ? { help: help as string } : {}) };
  }
  const events=data.events === undefined ? undefined : readMapListEditor(data.events);
  const units=data.units === undefined ? undefined : readMapUnits(data.units);
  const battle=data.battle === undefined ? undefined : readMapProperties(data.battle);
  if (events === null) errors.push('Invalid events descriptor.');
  if (units === null) errors.push('Invalid units descriptor.');
  if (battle === null) errors.push('Invalid battle descriptor.');
  // A path inside another path would make an edit overwrite the other thing.
  const named: [string, FieldPath | undefined][] = [
    ['stage.width', width],
    ['stage.height', height],
    ['stage.backdrop', backdrop],
    ['stage.backdropFit', backdropFit],
    ['enablement.backdrop', enablement?.backdrop],
    ['pictures', pictures],
    ['terrain.path', terrain?.path],
    ['collisions.path', collisions?.path],
    ['regions.path', regions?.path],
    ['sections.path', sections?.path],
    ['sections.previewStart', sections?.previewStart],
    ['events.path', events?.path],
    ['units.path', units?.path],
    ['units.definitions', units?.definitions],
    ...(battle?.fields.map((f): [string, FieldPath] => [`battle.${f.path.join('.')}`,f.path]) ?? []),
    ...rectangles.map((r): [string, FieldPath] => [`rectangles.${r.id}.path`,r.path]),
  ];
  const present = named.filter((n): n is [string, FieldPath] => !!n[1] && n[1].length > 0);
  for (const [nameA, a] of present)
    for (const [nameB, b] of present)
      if (nameA < nameB && (startsWith(a, b) || startsWith(b, a)))
        errors.push(`"${nameA}" and "${nameB}" must not be the same place or inside each other.`);

  const bands: LayerBand[] = [];
  if (!Array.isArray(data.bands) || data.bands.length < 1 || data.bands.length > 12)
    errors.push('"bands" must be a list of 1 to 12 depth bands.');
  else
    data.bands.forEach((band, i) => {
      if (
        !isObject(band) ||
        typeof band.value !== 'string' ||
        !band.value ||
        band.value.length > 64 ||
        typeof band.label !== 'string' ||
        !band.label.trim() ||
        band.label.length > 80 ||
        (band.sorted !== undefined && typeof band.sorted !== 'boolean')
      )
        return void errors.push(`bands[${i}] needs a "value" and a "label" (and "sorted" must be true or false).`);
      if (bands.some((b) => b.value === band.value)) errors.push(`bands[${i}] repeats the value "${band.value}".`);
      bands.push({
        value: band.value,
        label: band.label.trim(),
        ...(band.sorted ? { sorted: true } : {}),
      });
    });

  let defaultBand: string | undefined;
  if (data.defaultBand !== undefined) {
    if (typeof data.defaultBand === 'string' && bands.some((b) => b.value === data.defaultBand))
      defaultBand = data.defaultBand;
    else errors.push('"defaultBand" must be the value of one of the bands.');
  }

  let pictureFields: LayerOptionalField[] | undefined;
  if (data.pictureFields !== undefined) {
    const list = data.pictureFields;
    if (!Array.isArray(list)) errors.push('"pictureFields" must be a list.');
    else {
      const unknown = list.filter((f) => !(LAYER_OPTIONAL_FIELDS as readonly unknown[]).includes(f));
      if (unknown.length) errors.push(`"pictureFields" has unknown fields: ${unknown.map(String).join(', ')}.`);
      pictureFields = LAYER_OPTIONAL_FIELDS.filter((f) => list.includes(f));
    }
  }

  const fields: LayerField[] = [];
  if (data.fields !== undefined) {
    if (!Array.isArray(data.fields) || data.fields.length > 20) errors.push('"fields" must be a list of at most 20.');
    else
      data.fields.forEach((raw, i) => {
        const at = `fields[${i}]`;
        if (!isObject(raw)) return void errors.push(`${at} must be an object.`);
        const { key, label, type, choices } = raw;
        if (!isKey(key)) return void errors.push(`${at}.key must be a plain name.`);
        if (
          (LAYER_REQUIRED_FIELDS as readonly string[]).includes(key) ||
          (LAYER_OPTIONAL_FIELDS as readonly string[]).includes(key)
        )
          return void errors.push(`${at}.key "${key}" is a standard picture field; pick another name.`);
        if (fields.some((f) => f.key === key)) return void errors.push(`${at} repeats the key "${key}".`);
        if (typeof label !== 'string' || !label.trim()) return void errors.push(`${at}.label must be a text.`);
        if (type !== 'number' && type !== 'text' && type !== 'boolean' && type !== 'choice')
          return void errors.push(`${at}.type must be number, text, boolean or choice.`);
        const field: LayerField = { key, label: label.trim(), type };
        if (type === 'choice') {
          if (
            !Array.isArray(choices) ||
            choices.length < 2 ||
            choices.length > 20 ||
            !choices.every(
              (c) => isObject(c) && typeof c.value === 'string' && typeof c.label === 'string' && c.value && c.label,
            ) ||
            new Set(choices.map((c) => (c as { value: string }).value)).size !== choices.length
          )
            return void errors.push(`${at}.choices must be 2 to 20 different { value, label } pairs.`);
          field.choices = choices.map((c) => ({
            value: (c as { value: string }).value,
            label: (c as { label: string }).label,
          }));
        }
        if (raw.default !== undefined) {
          const d = raw.default;
          const ok =
            (type === 'number' && typeof d === 'number' && Number.isFinite(d)) ||
            (type === 'text' && typeof d === 'string') ||
            (type === 'boolean' && typeof d === 'boolean') ||
            (type === 'choice' && typeof d === 'string' && !!field.choices?.some((c) => c.value === d));
          if (!ok) return void errors.push(`${at}.default does not fit its type.`);
          field.default = d as number | string | boolean;
        }
        fields.push(field);
      });
  }

  if (errors.length > 0) return { ok: false, errors };
  return {
    ok: true,
    descriptor: {
      version: LAYER_EDITOR_VERSION,
      stage: { width, height, ...(backdrop ? { backdrop } : {}), ...(backdropFit ? { backdropFit } : {}) },
      pictures,
      ...(enablement ? { enablement } : {}),
      ...(terrain ? { terrain } : {}),
      ...(collisions ? { collisions } : {}),
      ...(regions ? { regions } : {}),
      ...(sections ? { sections } : {}),
      ...(events ? { events } : {}),
      ...(units ? { units } : {}),
      ...(battle ? { battle } : {}),
      ...(rectangles.length ? {rectangles} : {}),
      bands,
      ...(defaultBand ? { defaultBand } : {}),
      ...(pictureFields ? { pictureFields } : {}),
      ...(fields.length ? { fields } : {}),
    },
  };
}

/** What is at a path in a map, or `undefined` when any step is missing. Never follows `__proto__` and the like. */
export function valueAt(data: unknown, path: readonly string[]): unknown {
  let value = data;
  for (const key of path) {
    if (!isKey(key) || !isObject(value) || !Object.hasOwn(value, key)) return undefined;
    value = value[key];
  }
  return value;
}

/**
 * For a game's own tests: does this descriptor fit a real map of the game? Returns sentences about what does not, or
 * nothing when the editor could open the map. Run it over every shipped map.
 */
export function checkLayerEditorAgainst(descriptor: LayerEditorDescriptor, map: unknown): string[] {
  const problems: string[] = [];
  const number = (path: FieldPath, name: string) => {
    const v = valueAt(map, path);
    if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0)
      problems.push(`${name} (${path.join('.')}) is not a positive number.`);
  };
  number(descriptor.stage.width, 'The stage width');
  number(descriptor.stage.height, 'The stage height');
  if (descriptor.stage.backdrop) {
    const b = valueAt(map, descriptor.stage.backdrop);
    if (b !== undefined && typeof b !== 'string') problems.push('The backdrop is not a text.');
  }
  if (descriptor.stage.backdropFit) {
    const fit = valueAt(map, descriptor.stage.backdropFit);
    if (fit !== undefined && (typeof fit !== 'string' || !['stretch', 'contain', 'cover'].includes(fit))) problems.push('The backdrop fit is not stretch, contain or cover.');
  }
  const list = valueAt(map, descriptor.pictures) ?? [];
  if (!Array.isArray(list)) return [...problems, `The pictures (${descriptor.pictures.join('.')}) are not a list.`];
  const bands = new Set(descriptor.bands.map((b) => b.value));
  const ids = new Set<string>();
  list.forEach((item, i) => {
    const at = `Picture ${i + 1}`;
    if (!isObject(item)) return void problems.push(`${at} is not an object.`);
    for (const f of ['id', 'src'] as const)
      if (typeof item[f] !== 'string' || !item[f]) problems.push(`${at} has no text "${f}".`);
    for (const f of ['x', 'y', 'width'] as const)
      if (typeof item[f] !== 'number' || !Number.isFinite(item[f])) problems.push(`${at} has no number "${f}".`);
    if (typeof item.id === 'string') {
      if (ids.has(item.id)) problems.push(`${at} repeats the id "${item.id}".`);
      ids.add(item.id);
    }
    if (item.layer === undefined) {
      if (!descriptor.defaultBand) problems.push(`${at} has no "layer" and the descriptor has no defaultBand.`);
    } else if (typeof item.layer !== 'string') problems.push(`${at} has a "layer" that is not a text.`);
    else if (!bands.has(item.layer))
      problems.push(`${at} is in the band "${item.layer}", which the descriptor does not list.`);
  });
  return problems;
}
