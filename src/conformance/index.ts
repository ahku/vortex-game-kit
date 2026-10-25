import { ERROR, SIGNAL, SIGNAL_IGNORED, SIGNAL_RECEIVED, STARTED } from '../protocol/messages.js';
import type { StartedPayload } from '../protocol/messages.js';
import { PROTOCOL_VERSION } from '../protocol/version.js';
import { checkDeclaration } from '../protocol/validate.js';
import type { HandoverGame } from '../protocol/types.js';
import { PREVIEWER_PROTOCOL_VERSION } from '../protocol/previewer.js';
import type { PreviewerOutgoing } from '../protocol/previewer.js';

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
  }>;
}

const V = PREVIEWER_PROTOCOL_VERSION;
const codes = (replies: PreviewerOutgoing[]) =>
  replies.map((r) => (r.type === 'error' ? `error:${r.code}` : r.type));

/**
 * The rules for a game's previewer page (docs/PREVIEWER-STANDARD.md, section 3): what it answers to good, bad and
 * unknown messages. Origins and framing headers are outside these cases; check them by hand once, as the standard
 * says. Use it like the other suites:
 *
 *   for (const c of previewerCases(subject)) it(c.name, c.run);
 */
export function previewerCases(subject: PreviewerSubject): ConformanceCase[] {
  const load = (document: unknown, assets: Record<string, string> = {}) => ({
    protocol: V,
    type: 'load',
    document,
    assets,
  });
  return [
    {
      name: 'a playable map is loaded and reported with a list of warnings',
      async run() {
        const { send, playableMap } = await subject.create();
        const replies = await send(load(playableMap));
        const loaded = replies.find((r) => r.type === 'loaded');
        if (!loaded || loaded.type !== 'loaded') fail(`a playable map was answered with ${codes(replies).join(', ') || 'nothing'}`);
        if (!Array.isArray(loaded.warnings)) fail('"loaded" must carry a list of warnings');
      },
    },
    {
      name: 'a map the game cannot play is reported as invalid_map with a message',
      async run() {
        const { send, unplayableMap } = await subject.create();
        const replies = await send(load(unplayableMap));
        const error = replies.find((r) => r.type === 'error');
        if (!error || error.type !== 'error' || error.code !== 'invalid_map')
          fail(`an unplayable map was answered with ${codes(replies).join(', ') || 'nothing'}, not invalid_map`);
        if (!error.message) fail('an "error" must carry a message');
        if (replies.some((r) => r.type === 'loaded')) fail('an unplayable map was also reported as loaded');
      },
    },
    {
      name: 'a message from another protocol version is refused as bad_message',
      async run() {
        const { send, playableMap } = await subject.create();
        const replies = await send({ ...load(playableMap), protocol: V + 1000 });
        if (!codes(replies).includes('error:bad_message') || codes(replies).includes('loaded'))
          fail(`another protocol version was answered with ${codes(replies).join(', ') || 'nothing'}`);
      },
    },
    {
      name: 'an unknown message type is refused as bad_message',
      async run() {
        const { send } = await subject.create();
        const replies = await send({ protocol: V, type: 'vgk-conformance-unknown' });
        if (!codes(replies).includes('error:bad_message'))
          fail(`an unknown message was answered with ${codes(replies).join(', ') || 'nothing'}`);
      },
    },
    {
      name: 'a picture address that is not a web address is refused as bad_message',
      async run() {
        const { send, playableMap } = await subject.create();
        const replies = await send(load(playableMap, { x: 'javascript:alert(1)' }));
        if (!codes(replies).includes('error:bad_message') || codes(replies).includes('loaded'))
          fail(`an unsafe picture address was answered with ${codes(replies).join(', ') || 'nothing'}`);
      },
    },
    {
      name: 'an unknown command is refused as bad_message',
      async run() {
        const { send } = await subject.create();
        const replies = await send({ protocol: V, type: 'command', name: 'vgk-conformance-unknown' });
        if (!codes(replies).includes('error:bad_message'))
          fail(`an unknown command was answered with ${codes(replies).join(', ') || 'nothing'}`);
      },
    },
    {
      name: 'restart, pause and resume are accepted after a load, never an error',
      async run() {
        const { send, playableMap } = await subject.create();
        await send(load(playableMap));
        for (const name of ['pause', 'resume', 'restart']) {
          const replies = await send({ protocol: V, type: 'command', name });
          if (replies.some((r) => r.type === 'error')) fail(`the command "${name}" produced an error`);
        }
      },
    },
    {
      name: 'a refused map does not stop the next one from loading',
      async run() {
        const { send, playableMap, unplayableMap } = await subject.create();
        await send(load(unplayableMap));
        const replies = await send(load(playableMap));
        if (!replies.some((r) => r.type === 'loaded'))
          fail(`a playable map after a refused one was answered with ${codes(replies).join(', ') || 'nothing'}`);
      },
    },
  ];
}
