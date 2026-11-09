import type { AssetManifest } from './assets';
import type { Story, Contract } from './story';
import type { Step } from './steps';
import type { StringTable } from './strings';
import { type Character } from './character';
import type { FlagRegistry } from './workspace';
export interface Issue {
    level: 'error' | 'warning';
    code: string;
    message: string;
    /** Human-readable location, e.g. "scenes[0].steps[2]". */
    path: string;
}
/** Optional workspace context. Without it, only the checks that need no outside data run. */
export interface ValidateContext {
    strings?: StringTable;
    registry?: FlagRegistry;
    characters?: Character[];
    assets?: AssetManifest;
}
/** The flag an event step's outcome is stored in. */
export declare function eventResultFlag(step: Extract<Step, {
    type: 'event';
}>): string;
/**
 * The event steps a game would decide: they report more than one outcome and something in the story (a condition on a
 * step, a fork route, a choice or a scene) reads the result. The editor preview stops at these so the author can pick
 * the outcome; an event nothing branches on plays its default.
 */
export declare function branchingEventSteps(story: Story): string[];
/** Compute a story's contract from its steps, so it never has to be filled in by hand. */
export declare function deriveContract(story: Story): Required<Contract>;
export declare function validateStory(story: Story, ctx?: ValidateContext): Issue[];
export declare const hasErrors: (issues: Issue[]) => boolean;
