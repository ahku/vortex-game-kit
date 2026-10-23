import { describe, expect, it } from 'vitest';
import { declarationCase, handshakeCases, signalCases } from '../src/conformance/index.js';
import type { ConformanceSubject } from '../src/conformance/index.js';
import { PROTOCOL_VERSION, STANDARD_GAME, readSignalCommand } from '../src/protocol/index.js';

type Listener = (payload?: unknown) => void;

/** A small reference game that follows the rules, to prove the suite passes a good one and fails a bad one. */
function referenceGame(options: { forgetSessionCheck?: boolean; protocolVersion?: number } = {}) {
  const listeners = new Map<string, Set<Listener>>();
  const emit = (name: string, payload?: unknown) => listeners.get(name)?.forEach((fn) => fn(payload));
  const seen = new Set<string>();
  const sessionId = 'session-1';
  return {
    sessionId,
    started: { requestId: 'start', sessionId, protocolVersion: options.protocolVersion ?? PROTOCOL_VERSION },
    on(name: string, fn: Listener) {
      const set = listeners.get(name) ?? new Set<Listener>();
      listeners.set(name, set);
      set.add(fn);
      return () => void set.delete(fn);
    },
    send(name: string, payload?: unknown) {
      if (name !== 'game:signal') return;
      const read = readSignalCommand(payload);
      if (!read.ok) return emit('game:error', { code: read.error, message: 'A signal needs a requestId.' });
      const { requestId, sessionId: from, signal } = read.command;
      if (seen.has(requestId)) return;
      if (!options.forgetSessionCheck && from !== sessionId)
        return emit('game:error', { requestId, code: 'stale-session', message: 'Another session.' });
      seen.add(requestId);
      if (signal === 'hello') emit('game:signal-received', { requestId, signal });
      else emit('game:signal-ignored', { requestId, signal });
    },
  };
}

const subjectFor = (options?: Parameters<typeof referenceGame>[0]): ConformanceSubject => ({
  async create() {
    const g = referenceGame(options);
    return { game: g, sessionId: g.sessionId, knownSignal: 'hello', started: g.started };
  },
});

describe('the conformance suite', () => {
  const good = [...signalCases(subjectFor()), ...handshakeCases(subjectFor()), declarationCase(STANDARD_GAME)];
  for (const c of good) it(`passes a good game: ${c.name}`, c.run);

  it('fails a game that does not check the session', async () => {
    const cases = signalCases(subjectFor({ forgetSessionCheck: true }));
    const stale = cases.find((c) => c.name.includes('another session'))!;
    await expect(stale.run()).rejects.toThrow(/stale-session/);
  });

  it('fails a game that reports the wrong protocol version', async () => {
    const [c] = handshakeCases(subjectFor({ protocolVersion: 99 }));
    await expect(c!.run()).rejects.toThrow(/protocolVersion 99/);
  });
});
