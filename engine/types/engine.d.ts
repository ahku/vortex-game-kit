import { type Engine } from './types';
/**
 * Create an engine instance. One instance runs one story at a time and holds no global state, so a
 * host may run several (for example the studio preview next to a diff view).
 *
 * Model: the story is a flat list of steps. The engine walks it, skipping steps whose `when` fails,
 * applying `set` steps and stage operations, and stops at steps that need the host or the player
 * (a line, a choice, a blocking sequence, a host event). There is no branching in v1.
 */
/** Jumps in a row, with nothing for the player in between, after which the story is stopped as a loop. */
export declare const MAX_JUMPS = 1000;
export declare function createEngine(): Engine;
