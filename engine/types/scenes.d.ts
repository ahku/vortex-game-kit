import { type Condition, type Step, type Story } from '../../schema/types/index';
/** One step of the whole story in play order, with the scene it belongs to. */
export interface FlatStep {
    sceneId: string;
    step: Step;
    /** First step of its scene. */
    sceneStart: boolean;
    /** A step made by the engine that shows the scene's title card alone for this long (ms). */
    title?: number;
    /** The first step of a scene that begins quietly: it announces no title. */
    quiet?: boolean;
    /** The first step of a scene whose title stays in the corner: it announces the title to keep there. */
    corner?: boolean;
    /**
     * Where a `leave` step goes: the id of the step to continue with, or null to finish the story. Absent on every
     * other step, and on a leave step with nowhere to go (it does nothing).
     */
    jump?: string | null;
    /**
     * The routes of forks the step is inside, outermost first, with what each asks for (the fork's own condition and
     * the route's together). Absent on steps outside every fork. "Play from here" uses it: it starts a run in the middle,
     * so the route the step is in has to count as chosen even though nothing set the flags that would choose it.
     */
    chain?: Array<{
        fork: string;
        route: string;
        when?: Condition;
    }>;
    /** The step's own `when` (and its scene's), without the routes'. Only set together with `chain`. */
    own?: Condition;
}
/** Default post-title beat (ms). The story may override it with sceneTitleGapMs. */
export declare const TITLE_TAIL_MS = 1000;
/**
 * All the steps of the story in order. The scene fades of the story settings become steps of their own, so
 * the player, skipping, saving and "play from here" treat them like any fade the author wrote:
 * - At the end of a scene the picture fades out (unless the scene's last step is a fade already). A blocking
 *   sequence that ends the scene is held under the fade and cut once the screen is covered, so its last frame
 *   does not vanish before the fade starts.
 * - Between scenes the screen stays dark for the pause (`sceneGapMs`), then the next scene fades in.
 * - At the start of a scene the picture fades in (instantly when its fade is 0, so a scene after a fade-out is never
 *   left dark). The first step's stage changes move into the fade, so they happen while the screen is covered.
 *   A first step that is a fade itself gets none.
 * Fades of 0 and no pause give the plain list.
 */
export declare function flattenScenes(story: Story): FlatStep[];
