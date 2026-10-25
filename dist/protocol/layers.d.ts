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
export declare const LAYER_REQUIRED_FIELDS: readonly ["id", "src", "x", "y", "width", "layer"];
/** The fields a game may or may not have. The descriptor says which ones it understands. */
export declare const LAYER_OPTIONAL_FIELDS: readonly ["rotation", "flipX", "flipY", "anchor", "sortY", "parallax", "animation"];
export type LayerOptionalField = (typeof LAYER_OPTIONAL_FIELDS)[number];
/** A depth band, as the value stored in the picture's `layer` field. `sorted` bands sort by `sortY` with characters. */
export interface LayerBand {
    value: string;
    label: string;
    sorted?: boolean;
}
export type LayerFieldType = "number" | "text" | "boolean" | "choice";
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
export interface LayerEditorDescriptor {
    version: typeof LAYER_EDITOR_VERSION;
    stage: {
        width: FieldPath;
        height: FieldPath;
        backdrop?: FieldPath;
    };
    /** The list of pictures. */
    pictures: FieldPath;
    bands: LayerBand[];
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
