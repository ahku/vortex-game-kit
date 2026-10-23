import { ERROR, SIGNAL, SIGNAL_IGNORED, SIGNAL_RECEIVED, STARTED } from '../protocol/messages.js';
import type { StartedPayload } from '../protocol/messages.js';
import { PROTOCOL_VERSION } from '../protocol/version.js';
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

function fail(message: string): never {
  throw new Error(`Conformance: ${message}`);
}

const settle = () => new Promise<void>((r) => setTimeout(r, 0));

function listen(game: { on(n: string, f: (p?: unknown) => void): () => void }) {
  const seen: Record<string, unknown[]> = {};
  const names = [SIGNAL_RECEIVED, SIGNAL_IGNORED, ERROR];
  for (const n of names) game.on(n, (p) => void (seen[n] ??= []).push(p));
  return (n: string) => seen[n] ?? [];
}

/** The rules for a game's declaration, as a case a test runner can list. */
export function declarationCase(game: HandoverGame): ConformanceCase {
  return {
    name: `${game.id}: the declaration follows the standard`,
    async run() {
      const issues = checkDeclaration(game);
      if (issues.length > 0) fail(issues.join('; '));
    },
  };
}

/**
 * The wire rules for `game:signal` (docs/GAME-INTEGRATION-STANDARD.md, sections 1b and 4). Each case throws when the
 * game breaks a rule, so any test runner can list them:
 *
 *   for (const c of signalCases(subject)) it(c.name, c.run);
 */
export function signalCases(subject: ConformanceSubject): ConformanceCase[] {
  return [
    {
      name: 'a known signal is handled and reported as received',
      async run() {
        const { game, sessionId, knownSignal } = await subject.create();
        const got = listen(game);
        game.send(SIGNAL, { requestId: 'c1', sessionId, signal: knownSignal, values: {} });
        await settle();
        const reply = got(SIGNAL_RECEIVED)[0] as { requestId?: unknown } | undefined;
        if (reply?.requestId !== 'c1') fail('a known signal was not reported as received');
        if (got(ERROR).length > 0) fail('a known signal produced an error');
      },
    },
    {
      name: 'an unknown signal is ignored and reported, never an error',
      async run() {
        const { game, sessionId } = await subject.create();
        const got = listen(game);
        game.send(SIGNAL, { requestId: 'c2', sessionId, signal: 'vgk-conformance-unknown' });
        await settle();
        const reply = got(SIGNAL_IGNORED)[0] as { requestId?: unknown } | undefined;
        if (reply?.requestId !== 'c2') fail('an unknown signal was not reported as ignored');
        if (got(ERROR).length > 0) fail('an unknown signal produced an error');
      },
    },
    {
      name: 'a request id is accepted once',
      async run() {
        const { game, sessionId, knownSignal } = await subject.create();
        const got = listen(game);
        const payload = { requestId: 'c3', sessionId, signal: knownSignal };
        game.send(SIGNAL, payload);
        game.send(SIGNAL, payload);
        await settle();
        if (got(SIGNAL_RECEIVED).length !== 1)
          fail(`a repeated request was handled ${got(SIGNAL_RECEIVED).length} times, not once`);
      },
    },
    {
      name: 'a signal for another session is refused and not handled',
      async run() {
        const { game, knownSignal } = await subject.create();
        const got = listen(game);
        game.send(SIGNAL, { requestId: 'c4', sessionId: 'not-this-session', signal: knownSignal });
        await settle();
        const reply = got(ERROR)[0] as { code?: unknown; requestId?: unknown } | undefined;
        if (reply?.code !== 'stale-session' || reply.requestId !== 'c4')
          fail('a signal for another session was not refused with "stale-session"');
        if (got(SIGNAL_RECEIVED).length > 0) fail('a signal for another session was handled');
      },
    },
    {
      name: 'a signal without a request id is refused as a bad request',
      async run() {
        const { game, sessionId, knownSignal } = await subject.create();
        const got = listen(game);
        game.send(SIGNAL, { sessionId, signal: knownSignal });
        await settle();
        const reply = got(ERROR)[0] as { code?: unknown } | undefined;
        if (reply?.code !== 'bad-request') fail('a signal without a requestId was not a "bad-request"');
      },
    },
  ];
}

/** The handshake: the game says which protocol version it was built against. */
export function handshakeCases(subject: ConformanceSubject): ConformanceCase[] {
  return [
    {
      name: `game:started carries protocolVersion ${PROTOCOL_VERSION}`,
      async run() {
        const { started } = await subject.create();
        const version = (started as StartedPayload | undefined)?.protocolVersion;
        if (version !== PROTOCOL_VERSION)
          fail(`${STARTED} reported protocolVersion ${String(version)}, expected ${PROTOCOL_VERSION}`);
      },
    },
  ];
}
