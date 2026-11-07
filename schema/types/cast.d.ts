import type { Character } from './character';
import type { Story } from './story';
/** Every character id a story mentions: line speakers and anyone placed on stage. */
export declare function referencedCharacters(story: Story): string[];
/**
 * Plain characters for ids the story uses but nobody defined (in the workspace or the story), named after
 * the id. The editor's preview and a published story both use them, so a draft with a speaker who has no
 * profile yet still plays, showing the id as the name.
 */
export declare function standInCharacters(story: Story, known: readonly Character[]): Character[];
/**
 * Rewrites character ids inside a story in place (a line's `speaker`, the `who` of stage operations), using
 * `renames` (old id to new id). Returns how many ids changed. The story's own character list is not touched:
 * those characters keep their ids.
 */
export declare function renameCharacterRefs(node: unknown, renames: ReadonlyMap<string, string>): number;
