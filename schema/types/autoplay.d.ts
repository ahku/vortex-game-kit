import type { Step } from './steps';
/** Innermost authored wrapper surrounding a step. End boundaries are included. */
export declare function autoplayBlockAt(steps: readonly Step[], at: number): Extract<Step, {
    type: 'autoplay-start';
}> | undefined;
