import type { MapPropertiesDescriptor, MapListEditorDescriptor, MapUnitsDescriptor } from './mapProperties.js';
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
export declare const LAYER_EDITOR_VERSION = 1;
/** A place in a map: the keys to follow from the top, for example `['arena', 'sprites']`. */
export type FieldPath = string[];
/** The fields every picture has, under these exact names. */
export declare const LAYER_REQUIRED_FIELDS: readonly ["id", "src", "x", "y", "width"];
/** The fields a game may or may not have. The descriptor says which ones it understands. */
export declare const LAYER_OPTIONAL_FIELDS: readonly ["layer", "rotation", "flipX", "flipY", "anchor", "sortY", "parallax", "animation"];
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
    choices?: {
        value: string;
        label: string;
    }[];
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
    kinds: {
        value: string;
        label: string;
        shortDesc?: string;
        icon?: LayerIcon;
    }[];
    constraints: ShapeEditorConstraints;
}
/** Game-owned presets for rows without a kind field. Null removes a property when applying a preset. */
export interface CollisionEditorDescriptor {
    icon?: LayerIcon;
    path: FieldPath;
    presets: {
        value: string;
        label: string;
        shortDesc?: string;
        icon?: LayerIcon;
        values: Record<string, string | number | boolean | null>;
    }[];
    constraints: ShapeEditorConstraints;
}
/** Rectangular map collections (for example raised areas), edited through the same shape tools. */
export interface RectangleEditorDescriptor extends CollisionEditorDescriptor {
    id: string;
    label: string;
    group: string;
    rectangle: {
        x: string;
        y: string;
        width: string;
        height: string;
    };
    fields?: LayerField[];
}
export interface LayerEditorDescriptor {
    version: typeof LAYER_EDITOR_VERSION;
    stage: {
        width: FieldPath;
        height: FieldPath;
        backdrop?: FieldPath;
        backdropFit?: FieldPath;
    };
    /** Opt in to standard enabled?: boolean on every layer row. False excludes it from gameplay, never authoring. */
    enablement?: {
        backdrop?: FieldPath;
    };
    /** The list of pictures. */
    pictures: FieldPath;
    /** Optional terrain authoring; absence keeps pictures-only editing. */
    terrain?: TerrainEditorDescriptor;
    collisions?: CollisionEditorDescriptor;
    rectangles?: RectangleEditorDescriptor[];
    /** Non-gameplay polygon areas used by events and objectives. */
    regions?: CollisionEditorDescriptor;
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
export type LayerEditorReadResult = {
    ok: true;
    descriptor: LayerEditorDescriptor;
} | {
    ok: false;
    errors: string[];
};
/** Reads the parsed JSON of a descriptor. Unknown fields are ignored; anything wrong is listed. */
export declare function readLayerEditor(data: unknown): LayerEditorReadResult;
/** What is at a path in a map, or `undefined` when any step is missing. Never follows `__proto__` and the like. */
export declare function valueAt(data: unknown, path: readonly string[]): unknown;
/**
 * For a game's own tests: does this descriptor fit a real map of the game? Returns sentences about what does not, or
 * nothing when the editor could open the map. Run it over every shipped map.
 */
export declare function checkLayerEditorAgainst(descriptor: LayerEditorDescriptor, map: unknown): string[];
