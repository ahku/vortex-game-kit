/**
 * What the "Write with AI" specification page publishes: a JSON Schema for a story draft and a plain list of every
 * field of every step type, both generated from the real step schemas so they cannot drift. A draft is the schema
 * with four conveniences (text written in place, speakers as names, optional ids, inline sequences), applied in
 * `relaxForDraft`.
 */
export type JsonSchema = {
    [key: string]: unknown;
};
export interface FieldInfo {
    name: string;
    /** The type in a few words: `integer 0-600000`, `"fade" | "cut" | "blur"`, `list of ...`. */
    type: string;
    required: boolean;
    /** The value used when the field is left out, as written in JSON. */
    default?: string;
}
export interface ShapeInfo {
    /** The step `type` or the stage `op`. */
    name: string;
    fields: FieldInfo[];
}
/** A schema in a few words. `defs` resolves the references a schema with shared parts has. */
export declare function describeType(schema: JsonSchema, defs?: JsonSchema): string;
/** Every step type with its fields, as a draft writes them: ids optional, text in place, speakers by name. */
export declare const stepReference: () => ShapeInfo[];
/** Every sequence item type with its fields, as a draft writes them: a text item has `text`, not a key. */
export declare const sequenceItemReference: () => ShapeInfo[];
/** Every stage change (`op`) with its fields. */
export declare const stageReference: () => ShapeInfo[];
/** The JSON Schema of a sequence draft (`"grs": "sequence"`). */
export declare function sequenceDraftJsonSchema(): JsonSchema;
/** The JSON Schema of a story draft (`"grs": "story"`). */
export declare function storyDraftJsonSchema(): JsonSchema;
