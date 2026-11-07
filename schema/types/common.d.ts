import { z } from 'zod';
/** Current story/strings/collection format version. Bump with a migration in migrate.ts. */
export declare const SCHEMA_VERSION: 1;
/** Stable identifier for scenes, steps, characters, sequences, string keys, event names, exits. */
export declare const Id: z.ZodString;
/** Key into a language string table. */
export declare const StringKey: z.ZodString;
/** Workspace asset key (a slug, resolved to a file by the host). Lower case only, so "Cathedral" and "cathedral" can never be two assets. */
export declare const AssetKey: z.ZodString;
/** Asset reference that may be empty: an empty string is an unlinked placeholder. */
export declare const AssetRefOrEmpty: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
/** Flag name. Dots allow namespacing, e.g. "monk.trusted". */
export declare const FlagName: z.ZodString;
export declare const FlagValue: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
export type FlagValue = z.infer<typeof FlagValue>;
/** BCP-47-ish language tag: "en", "zh", "zh-Hans", "pt-BR". */
export declare const LangCode: z.ZodString;
/** Named stage positions for portraits and objects. */
export declare const SLOTS: readonly ["far-left", "left", "center", "right", "far-right"];
export declare const Slot: z.ZodEnum<{
    "far-left": "far-left";
    left: "left";
    center: "center";
    right: "right";
    "far-right": "far-right";
}>;
export type Slot = z.infer<typeof Slot>;
/** Free position on the 16:9 stage, normalized 0-1 (origin top-left). */
export declare const Pos: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    scale: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>;
export type Pos = z.infer<typeof Pos>;
/** A color as #rrggbb. */
export declare const HexColor: z.ZodString;
export declare const DurationMs: z.ZodNumber;
export declare const Unit: z.ZodNumber;
