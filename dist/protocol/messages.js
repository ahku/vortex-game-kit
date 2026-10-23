/**
 * The messages every game answers, whatever it is. Payloads are plain data. A game ignores fields it does not know, and
 * a message it does not know is ignored and reported, never an error (docs/GAME-INTEGRATION-STANDARD.md, section 1b).
 */
/** Host to game: the story sends a message. Accepted once per `requestId`, and only for the running session. */
export const SIGNAL = 'game:signal';
/** Game to host: the signal was known and has been handled. */
export const SIGNAL_RECEIVED = 'game:signal-received';
/** Game to host: the signal is not one the game knows. Not an error. */
export const SIGNAL_IGNORED = 'game:signal-ignored';
/** Game to host: a command was refused. */
export const ERROR = 'game:error';
/** Game to host: the battle or level exists. Carries the session id and the protocol version. */
export const STARTED = 'game:started';
