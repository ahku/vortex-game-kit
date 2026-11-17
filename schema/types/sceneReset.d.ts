import type { StageOp } from './stage';
import type { SceneReset, StorySettings } from './settings';
/** What a scene puts away when it starts, every choice made. */
export interface ResolvedSceneReset {
    people: boolean;
    world: boolean;
    music: boolean;
}
/** The choices of a scene: its own, else the story's, else nothing is put away. */
export declare function resolveSceneReset(scene: {
    meta: {
        reset?: SceneReset | undefined;
    };
}, settings: Pick<StorySettings, 'sceneReset'> | undefined): ResolvedSceneReset;
/**
 * The stage operations the choices mean, to run ahead of the scene's first step. The people leave `before` the step
 * shows. "Put the world back" is the neutral look: the day mood, no dimming and the background picture as drawn.
 * The background itself and the one-shot effects are not touched. Empty when nothing is chosen.
 */
export declare function sceneResetOps(reset: ResolvedSceneReset): StageOp[];
