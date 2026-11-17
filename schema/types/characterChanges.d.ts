/**
 * Changes an AI app suggests to a library character (plan 015, section 13): the part of a character it may ask to
 * set, applied to a copy, and described field by field for a person who reviews it. The server uses this to check a
 * suggestion and to apply it on Accept; the Characters page uses it to show before and after.
 */
import { type Character } from './character';
/** What a suggestion may set. A value replaces what the character has; nothing here removes anything. */
export interface CharacterChanges {
    /** Name per language code. */
    names?: Record<string, string>;
    fullNames?: Record<string, string>;
    note?: string;
    label?: string;
    /** Expression name to library file name (the stage picture). */
    expressions?: Record<string, string>;
    /** Expression name to library file name (the face in the dialog box). */
    faces?: Record<string, string>;
}
declare const MAP_FIELDS: readonly ["names", "fullNames", "expressions", "faces"];
declare const TEXT_FIELDS: readonly ["note", "label"];
/** Reads a suggestion's changes. Returns what is wrong in plain words, or the changes. */
export declare function parseCharacterChanges(raw: unknown): CharacterChanges | string;
/** The character with the changes applied, or what is wrong with the result. The input is not touched. */
export declare function applyCharacterChanges(character: Character, changes: CharacterChanges): {
    ok: true;
    character: Character;
} | {
    ok: false;
    message: string;
};
/** One line of a before/after view: `before` is null when the field is new. */
export interface CharacterChangeLine {
    /** The field and key, such as `names` + `zh`, or `note` alone. */
    field: (typeof MAP_FIELDS)[number] | (typeof TEXT_FIELDS)[number];
    key?: string;
    before: string | null;
    after: string;
}
/** What the changes would do to this character, leaving out entries that already hold the same value. */
export declare function describeCharacterChanges(character: Character, changes: CharacterChanges): CharacterChangeLine[];
export {};
