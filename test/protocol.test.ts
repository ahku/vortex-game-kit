import { describe, expect, it } from 'vitest';
import {
  PROTOCOL_VERSION,
  SIGNAL_ACTION,
  STANDARD_GAME,
  STANDARD_OUTCOMES,
  checkDeclaration,
  isSlug,
  readSignalCommand,
  withStandardEvents,
} from '../src/protocol/index.js';
import type { HandoverGame } from '../src/protocol/index.js';

const small: HandoverGame = {
  id: 'puzzle',
  name: 'Puzzle',
  actions: [
    { id: 'play', label: 'Play', params: [], outcomes: [{ id: 'done' }], default: 'done' },
  ],
};

describe('the standard events', () => {
  it('reports win, lose and give_up', () => {
    expect(STANDARD_OUTCOMES.map((o) => o.id)).toEqual(['win', 'lose', 'give_up']);
  });

  it('gives every game a result event and a one-way message, with the message last', () => {
    const game = withStandardEvents(small);
    expect(game.actions.map((a) => a.id)).toEqual(['play', 'result', 'signal']);
    expect(game.actions.at(-1)).toBe(SIGNAL_ACTION);
    expect(SIGNAL_ACTION.oneWay).toBe(true);
  });

  it('leaves a game that already has both alone', () => {
    const game = withStandardEvents(small);
    expect(withStandardEvents(game)).toBe(game);
  });
});

describe('checkDeclaration', () => {
  it('accepts the standard game and a game that was given the standard events', () => {
    expect(checkDeclaration(STANDARD_GAME)).toEqual([]);
    expect(checkDeclaration(withStandardEvents(small))).toEqual([]);
  });

  it('says what is wrong, in sentences', () => {
    const bad: HandoverGame = {
      ...small,
      id: 'Bad Game',
      actions: [{ ...small.actions[0]!, default: 'nope', after: 'start' }],
    };
    const issues = checkDeclaration(bad).join('\n');
    expect(issues).toContain('"Bad Game" is not a slug');
    expect(issues).toContain('default "nope"');
    expect(issues).toContain('needs "start"');
    expect(issues).toContain('standard outcomes');
    expect(issues).toContain('signal');
  });
});

describe('readSignalCommand', () => {
  it('needs a request id and reads the rest leniently', () => {
    expect(readSignalCommand({})).toEqual({ ok: false, error: 'bad-request' });
    const read = readSignalCommand({ requestId: 'r', sessionId: 's', signal: 'hello', values: { a: 1 } });
    expect(read).toEqual({
      ok: true,
      command: { requestId: 'r', sessionId: 's', signal: 'hello', values: { a: 1 } },
    });
  });
});

it('knows what a slug is and which protocol version this is', () => {
  expect(isSlug('move-near-enemy')).toBe(true);
  expect(isSlug('Moved near enemey')).toBe(false);
  expect(PROTOCOL_VERSION).toBe(1);
});
