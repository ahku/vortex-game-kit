import type { HandoverGame } from './types.js';
import type { SignalCommand } from './messages.js';
export declare const isSlug: (value: unknown) => value is string;
/**
 * What is wrong with a game's declaration, as plain sentences; an empty list means it is fine. Checks the rules the
 * standard states: ids are slugs and unique, every default is one of the action's outcomes, the game can report the
 * standard outcomes, and it can take a message.
 */
export declare function checkDeclaration(game: HandoverGame): string[];
/** Reads a `game:signal` payload. `error` is the code a game answers with when it is refused. */
export declare function readSignalCommand(payload: unknown): {
    ok: true;
    command: SignalCommand;
} | {
    ok: false;
    error: 'bad-request';
};
