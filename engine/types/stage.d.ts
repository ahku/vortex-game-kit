import { type LinePortrait, type Slot, type StageOp, type Step } from '../../schema/types/index';
import type { StageState } from './types';
export declare function emptyStage(): StageState;
/** Resolves the expression a character enters with when the step names none. */
export type DefaultExpression = (characterId: string) => string | undefined;
/** What the stage logic needs to know about characters. */
export interface StageContext {
    defaultExpression?: DefaultExpression;
    /** Whether a character has any stage picture at all. A line that says nothing only shows one who has. */
    hasPicture?: (characterId: string) => boolean;
    /** Where a character stands when put on stage without a position. */
    home?: (characterId: string) => Slot | undefined;
    /**
     * The side of the dialog box a speaker's dialog portrait is on for this line, when it is shown and the side is a
     * fixed one. A stage portrait with no position of its own stands on that side, unless its character has a home.
     */
    speakerSide?: (characterId: string, portrait: LinePortrait | undefined) => Slot | undefined;
    /**
     * Whether the story puts its speakers on stage by itself (its portraits setting is `both` or `stage`). Default yes.
     * When not, only a line that asks for a stage picture, or a stage change, puts anyone on stage.
     */
    stageByDefault?: boolean;
}
/**
 * Apply one stage operation. Pure: returns a new state and never mutates the input.
 * `sfx` and `effect` are one-shots and do not change the persistent state.
 * `clear: "all"` removes portraits and objects; background, music and tone stay.
 */
export declare function applyStageOp(stage: StageState, op: StageOp, context?: DefaultExpression | StageContext): StageState;
export declare function applyStageOps(stage: StageState, ops: readonly StageOp[], context?: DefaultExpression | StageContext): StageState;
/**
 * What running one step does to the stage: its stage operations, and for a `transition` step the veil. `out` leaves
 * the screen faded, `in` and `through` leave it clear. Everything that folds steps into a stage uses this.
 */
export declare function applyStep(stage: StageState, step: Step, context?: DefaultExpression | StageContext): StageState;
