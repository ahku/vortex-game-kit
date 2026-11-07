import { z } from 'zod';
/**
 * A string entry is plain text, or text plus the hash of the source-language text it was
 * translated from. When the source changes, the stored hash no longer matches and the
 * translation is reported as stale.
 */
export declare const StringEntrySchema: z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
    text: z.ZodString;
    sourceHash: z.ZodOptional<z.ZodString>;
}, z.core.$strict>]>;
export type StringEntry = z.infer<typeof StringEntrySchema>;
export declare const StringTableSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    lang: z.ZodString;
    entries: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        text: z.ZodString;
        sourceHash: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>]>>;
}, z.core.$strict>;
export type StringTable = z.infer<typeof StringTableSchema>;
export declare function textOf(entry: StringEntry | undefined): string | undefined;
/** Build a translation entry that remembers which source text it answers. */
export declare function translationEntry(sourceText: string, translated: string): StringEntry;
/** Keys present in the source table but absent from the translation. */
export declare function findMissingTranslations(source: StringTable, translation: StringTable): string[];
/**
 * Keys whose translation was made from different source text (or has no recorded hash).
 * Keys missing from the translation are reported by findMissingTranslations instead.
 */
export declare function findStaleTranslations(source: StringTable, translation: StringTable): string[];
/** Tag names (with a leading "/" for closers) found in a string, sorted. */
export declare function extractMarkupTags(text: string): string[];
/** Translations must keep the same markup tags as the source (arguments may differ). */
export declare function markupMatches(sourceText: string, translatedText: string): boolean;
