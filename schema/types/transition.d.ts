import type { Step, TransitionChannel, TransitionMode } from './steps';
type TransitionStep = Extract<Step, {
    type: 'transition';
}>;
/** A transition step with every default filled in, as hosts and the editor read it. */
export interface ResolvedTransition {
    mode: TransitionMode;
    color: string;
    affects: TransitionChannel[];
    outMs: number;
    holdMs: number;
    inMs: number;
    skippable: boolean;
}
export declare const TRANSITION_DEFAULTS: {
    readonly mode: "through";
    readonly color: "#000000";
    readonly affects: ["picture", "music"];
    readonly outMs: 1000;
    readonly holdMs: 500;
    readonly inMs: 1000;
    readonly skippable: false;
};
/** Fills in what a transition step leaves out, and drops the times its mode does not use. */
export declare function resolveTransition(step: Partial<TransitionStep>): ResolvedTransition;
/** How long the whole fade takes. */
export declare const transitionLength: (t: Pick<ResolvedTransition, "outMs" | "holdMs" | "inMs">) => number;
export {};
