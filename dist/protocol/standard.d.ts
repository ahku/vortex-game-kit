import type { HandoverAction, HandoverGame, HandoverOutcome } from './types.js';
/**
 * How a game ended, the same for every game: the contract a game module follows for its final result. A story forks
 * on these without knowing which game it was.
 */
export declare const STANDARD_OUTCOMES: HandoverOutcome[];
/**
 * "Message game" for any game: send it a message (a ping, a hello, something that happened) and carry on. The story does not wait and no
 * result comes back; the game decides what the signal means and ignores one it does not know. A game that lists its own
 * signals declares its own `signal` action instead (Downbeat does), and keeps this one's shape.
 */
export declare const SIGNAL_ACTION: HandoverAction;
/** Any game: the standard events every game can answer. It is the choice for a game the studio has no module for. */
export declare const STANDARD_GAME: HandoverGame;
/** The final-result event added to a game that declares none of its own: it reports the standard outcomes. */
export declare const RESULT_ACTION: HandoverAction;
export declare const reportsStandard: (a: HandoverAction) => boolean;
/**
 * Every game must be able to report how it ended with the standard outcomes. A game that has an event for that
 * (Downbeat's finish) keeps it; one that has none gets a "Game result" event.
 */
export declare function withStandardEvents(game: HandoverGame): HandoverGame;
