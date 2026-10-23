import { checkDeclaration } from '../protocol/validate.js';
import type { HandoverGame } from '../protocol/types.js';
export { checkDeclaration };
/** What the suite needs from a game: a running session it can talk to like a host. */
export interface ConformanceSubject {
    /** Makes a fresh game with a running session. Called once per case. */
    create(): Promise<{
        game: {
            send(name: string, payload?: unknown): void;
            on(name: string, fn: (payload?: unknown) => void): () => void;
        };
        sessionId: string;
        /** A signal this game knows, in a session where it applies. */
        knownSignal: string;
        /** The payload of the game's `game:started`, for the handshake cases. */
        started?: unknown;
    }>;
}
export interface ConformanceCase {
    name: string;
    run(): Promise<void>;
}
/** The rules for a game's declaration, as a case a test runner can list. */
export declare function declarationCase(game: HandoverGame): ConformanceCase;
/**
 * The wire rules for `game:signal` (docs/GAME-INTEGRATION-STANDARD.md, sections 1b and 4). Each case throws when the
 * game breaks a rule, so any test runner can list them:
 *
 *   for (const c of signalCases(subject)) it(c.name, c.run);
 */
export declare function signalCases(subject: ConformanceSubject): ConformanceCase[];
/** The handshake: the game says which protocol version it was built against. */
export declare function handshakeCases(subject: ConformanceSubject): ConformanceCase[];
