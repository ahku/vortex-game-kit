import { checkDeclaration } from '../protocol/validate.js';
import type { HandoverGame } from '../protocol/types.js';
import type { PreviewerOutgoing } from '../protocol/previewer.js';
import type { ManifestMessage } from '../protocol/manifest.js';
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
/** What the suite needs from a game's previewer: a way to send it a message as the editor would. */
export interface PreviewerSubject {
    /** Makes a fresh previewer, ready for messages. Called once per case. */
    create(): Promise<{
        /** Delivers one message and resolves with every reply the previewer sent for it. */
        send(message: unknown): Promise<PreviewerOutgoing[]>;
        /** A `document` the game can play. */
        playableMap: unknown;
        /** A `document` that is well formed but that the game refuses to play. */
        unplayableMap: unknown;
        /**
         * The extra messages this previewer answers, the same list its manifest gives. The cases for `validate`,
         * `references` and `migrate` run only for those named here. Leave it out for a game without them.
         */
        supports?: ManifestMessage[];
        /** For `migrate`: a map as an older version saved it, and that version. */
        oldMap?: {
            document: unknown;
            from: number;
        };
    }>;
}
/**
 * The rules for a game's previewer page (docs/PREVIEWER-STANDARD.md, section 3): what it answers to good, bad and
 * unknown messages. Origins and framing headers are outside these cases; check them by hand once, as the standard
 * says. Use it like the other suites:
 *
 *   for (const c of previewerCases(subject)) it(c.name, c.run);
 */
export declare function previewerCases(subject: PreviewerSubject): ConformanceCase[];
