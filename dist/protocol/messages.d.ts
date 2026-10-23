/**
 * The messages every game answers, whatever it is. Payloads are plain data. A game ignores fields it does not know, and
 * a message it does not know is ignored and reported, never an error (docs/GAME-INTEGRATION-STANDARD.md, section 1b).
 */
/** Host to game: the story sends a message. Accepted once per `requestId`, and only for the running session. */
export declare const SIGNAL = "game:signal";
/** Game to host: the signal was known and has been handled. */
export declare const SIGNAL_RECEIVED = "game:signal-received";
/** Game to host: the signal is not one the game knows. Not an error. */
export declare const SIGNAL_IGNORED = "game:signal-ignored";
/** Game to host: a command was refused. */
export declare const ERROR = "game:error";
/** Game to host: the battle or level exists. Carries the session id and the protocol version. */
export declare const STARTED = "game:started";
export interface SignalCommand {
    requestId: string;
    sessionId: string;
    signal: string;
    values?: Record<string, unknown>;
}
export interface SignalReply {
    requestId: string;
    signal: string;
}
export type ErrorCode = 'bad-request' | 'stale-session' | (string & {});
export interface GameError {
    requestId?: string;
    code: ErrorCode;
    message: string;
}
export interface StartedPayload {
    requestId: string;
    sessionId: string;
    /** The protocol version the game was built against (see PROTOCOL_VERSION). */
    protocolVersion?: number;
}
