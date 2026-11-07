import type { Condition, FlagRegistry, FlagValue, SetOp, Story } from '../../schema/types/index';
/** What a condition is evaluated against. */
export interface ConditionContext {
    /** Current value of a flag, or undefined if it has never been set and has no default. */
    getFlag(name: string): FlagValue | undefined;
    /** Whether a story has been completed (used by collection unlock rules). Defaults to false. */
    isCompleted?(storyId: string): boolean;
}
/**
 * Evaluate a condition. Semantics (these are part of the engine contract and every port must match):
 * - `is` is strict equality; `isNot` is its negation. A flag that is not set is never equal to anything,
 *   so `is` is false and `isNot` is true for it.
 * - `gt`, `gte`, `lt`, `lte` are false when the flag is not a number.
 * - `and` is true when all hold, `or` when any holds, `not` negates.
 * - `completed` asks the host; without a host answer it is false.
 */
export declare function evaluateCondition(cond: Condition, ctx: ConditionContext): boolean;
/**
 * The new value of a flag after a set operation. `add` on a flag that is not a number starts from 0,
 * so a counter never needs initializing.
 */
export declare function applySetOp(current: FlagValue | undefined, op: SetOp): FlagValue;
export type FlagStore = Record<string, FlagValue>;
/**
 * Starting flag values: workspace shared flags first, then the story's local flags (which may not
 * shadow shared ones; the validator rejects that), each at its declared default.
 */
export declare function initialFlags(story: Story, registry?: FlagRegistry): FlagStore;
