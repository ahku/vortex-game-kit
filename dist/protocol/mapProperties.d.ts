/** Declarative map forms. Games own paths, values, defaults and validation; editors own controls. */
export interface MapPropertyField {
    path: string[];
    label: string;
    type: "text" | "number" | "boolean" | "choice" | "choices" | "reference" | "references";
    help?: string;
    /** Presentation for the absent/default choice, without writing a value. */
    unsetLabel?: string;
    /** Guidance shown when a reference collection has no targets. */
    emptyLabel?: string;
    group?: string;
    default?: string | number | boolean | string[];
    choices?: {
        value: string;
        label: string;
    }[];
    reference?: {
        path: string[];
        id: string;
        label?: string;
    };
    when?: {
        path: string[];
        values: string[];
    };
    min?: number;
    max?: number;
    integer?: boolean;
    maxLength?: number;
    required?: boolean;
    /** Clearing this multi-value control restores absence/the game default. */
    emptyIsDefault?: boolean;
    /** A short unit an editor shows after a number, such as `%`. Presentation only: the saved value stays a plain number. */
    unit?: string;
}
export interface MapPropertyGroup {
    id: string;
    label: string;
}
export interface MapPropertiesDescriptor {
    help?: string;
    groups?: MapPropertyGroup[];
    fields: MapPropertyField[];
}
export interface MapListEditorDescriptor extends MapPropertiesDescriptor {
    path: string[];
    maxItems: number;
    defaults: Record<string, string | number | boolean>;
}
export declare const safeMapKey: (v: unknown) => v is string;
export declare const safeMapPath: (v: unknown) => v is string[];
export declare function readMapProperties(value: unknown): MapPropertiesDescriptor | null;
export declare function readMapListEditor(value: unknown): MapListEditorDescriptor | null;
/**
 * Placed characters. Rows are ID-bearing like events. `kit` names the field holding the game kit a row is based on,
 * `position` the `{x, y}` point and `character` the optional field linking a row to an authored Studio character.
 * The form `fields` describe the game's optional per-row settings; they never include these three paths or `id`.
 */
/** A distance an editor can draw around a selected character, such as how far it moves. */
export interface MapUnitRange {
    id: string;
    label: string;
    /** A number in the character's own data (a kit preset or an authored character), in map units. */
    stat?: string[];
    /** A number the author may set on the placed row; it wins over `stat`. Must be one of the row's form fields. */
    field?: string[];
    /**
     * Used when neither of the above gives a number: a share of another range. `share` is the share (1 is all of it).
     * `shareField` is the path of a number field on the row, in percent (100 is all of it), that wins over `share`.
     */
    fallback?: {
        of: string;
        share: number;
        shareField?: string[];
    };
}
export interface MapUnitsDescriptor extends MapListEditorDescriptor {
    kit: string[];
    position: string[];
    character?: string[];
    /**
     * Where an editor puts the authored characters the map uses, as `{ [characterId]: definition }`, in the copy it
     * sends to the game (a preview or a release). Never saved in the map itself.
     */
    definitions?: string[];
    /** How the library sorts game kits (and, through their kit, authored characters), such as players and enemies. */
    libraryGroups?: {
        id: string;
        label: string;
        kits: string[];
    }[];
    /** A short label of a row (such as a group tag) that an editor shows beside its name. Must be one of the form fields. */
    tag?: string[];
    /** Distances an editor may draw around the selected character. */
    ranges?: MapUnitRange[];
}
export declare function readMapUnits(value: unknown): MapUnitsDescriptor | null;
