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
