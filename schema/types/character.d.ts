import { z } from 'zod';
/** Framing of a dialog portrait; the original asset stays intact. Percent positions and cover zoom. */
export declare const PortraitCropSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    zoom: z.ZodNumber;
}, z.core.$strict>;
export type PortraitCrop = z.infer<typeof PortraitCropSchema>;
/**
 * Where a character's head is in its stage picture, as a circle in the picture's own coordinates, so it follows the
 * picture when its size, height or mirroring change. `x` and `y` are the centre as a share of the picture's width
 * (from the left) and height (from the top); `size` is the diameter as a share of the picture's height. Left to
 * right is as drawn: mirroring is applied by whoever draws it.
 */
export declare const CharacterHeadSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    size: z.ZodNumber;
}, z.core.$strict>;
export type CharacterHead = z.infer<typeof CharacterHeadSchema>;
/** The head of a picture that has none set. */
export declare const DEFAULT_HEAD: CharacterHead;
/** Adjusts one stage picture. All fields are optional; no value means no change. */
export declare const CharacterFitSchema: z.ZodObject<{
    scale: z.ZodOptional<z.ZodNumber>;
    lift: z.ZodOptional<z.ZodNumber>;
    sameAs: z.ZodOptional<z.ZodString>;
    flip: z.ZodOptional<z.ZodBoolean>;
    head: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        size: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type CharacterFit = z.infer<typeof CharacterFitSchema>;
/**
 * A character: a speaker with names, a color and portraits. It lives in the workspace library (shared by
 * every story) or inside one story (`Story.characters`); inside a story, a local character overrides a library
 * character with the same id.
 */
export declare const CharacterSchema: z.ZodObject<{
    id: z.ZodString;
    speakerBadge: z.ZodOptional<z.ZodEnum<{
        filled: "filled";
        outlined: "outlined";
    }>>;
    names: z.ZodRecord<z.ZodString, z.ZodString>;
    fullNames: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    faceCrops: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        zoom: z.ZodNumber;
    }, z.core.$strict>>>;
    color: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    expressions: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    faces: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    expressionOrder: z.ZodOptional<z.ZodArray<z.ZodString>>;
    defaultExpression: z.ZodOptional<z.ZodString>;
    home: z.ZodOptional<z.ZodEnum<{
        "far-left": "far-left";
        left: "left";
        center: "center";
        right: "right";
        "far-right": "far-right";
    }>>;
    faceSide: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        follow: "follow";
    }>>;
    dimExtra: z.ZodOptional<z.ZodNumber>;
    fits: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        scale: z.ZodOptional<z.ZodNumber>;
        lift: z.ZodOptional<z.ZodNumber>;
        sameAs: z.ZodOptional<z.ZodString>;
        flip: z.ZodOptional<z.ZodBoolean>;
        head: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            size: z.ZodNumber;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export type Character = z.infer<typeof CharacterSchema>;
/** Author-facing identity. Legacy characters fall back to their speaker name. */
export declare function characterFullName(character: {
    fullNames?: unknown;
    names?: unknown;
    id?: unknown;
}, language?: string): string;
/** The character as players may see it: without the author-only label and note. */
export declare function publicCharacter(character: Character): Character;
/**
 * A character's name in a language. A story in "zh-Hans" or "zh-CN" finds the name written for "zh" (the
 * character form offers plain "en" and "zh"), then the source language's name, then any name at all.
 */
export declare function nameForLanguage(names: Readonly<Record<string, string>>, lang: string, source: string): string | undefined;
/** Library characters with a story's own characters laid over them: a local one wins on the same id. */
export declare function mergeCharacters(library: readonly Character[], local: readonly Character[]): Character[];
/**
 * A fresh character id from a display name, in snake_case: lowercase Latin letters and digits, words joined by `_`,
 * never starting with a digit, and not in `taken` (a number is added then: `brother_tom_2`). Names with no Latin
 * letters (a Chinese name, say) become "char", "char_2", ...
 */
export declare function characterIdFromName(name: string, taken: ReadonlySet<string>): string;
/** The names an expression can have: any with a stage illustration or a dialog face, in the author's order. */
export declare function expressionNames(character: Pick<Character, 'expressions' | 'faces' | 'expressionOrder'>): string[];
/**
 * The picture for a character showing `expr`, small enough for a dialog box or a list: the expression's own face,
 * else its own stage picture (cropped to the top by whoever draws it), so a character with only stage pictures
 * still has a face. An expression is never filled in from another one's pictures. `art` says it is the stage picture.
 */
export declare function portraitOf(character: Character | undefined, expr?: string): {
    asset: string;
    art: boolean;
    expression: string;
} | undefined;
/**
 * The stage illustration for a character showing `expr`, and the expression it belongs to: its own, else the base
 * expression's, else the first there is.
 */
export declare function stagePictureOf(character: Character | undefined, expr?: string): {
    asset: string;
    expression: string;
} | undefined;
/** The stage illustration (asset name) for a character showing `expr`. */
export declare function stageArtOf(character: Character | undefined, expr?: string): string | undefined;
/** How the stage picture shown for `expr` sits: the adjustments saved for that picture's expression, if any. */
export declare function fitOf(character: Character | undefined, expr?: string): CharacterFit | undefined;
/**
 * Where the head is in the stage picture shown for `expr`, in the picture's own coordinates (see
 * `CharacterHeadSchema`): the picture's own, else the default expression's, else `DEFAULT_HEAD`.
 */
export declare function headOf(character: Character | undefined, expr?: string): CharacterHead | undefined;
/** The dialog-box picture (asset name) for a character speaking with `expr`. */
export declare function faceOf(character: Character | undefined, expr?: string): string | undefined;
