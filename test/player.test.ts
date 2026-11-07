import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PLAYER_CONTRACT } from '../src/protocol/index.js';

const dir = new URL('../player/', import.meta.url);
const stamp = JSON.parse(readFileSync(new URL('STAMP.json', dir), 'utf8')) as {
  contract: number;
  outputHash: string;
  version: string;
};

describe('the story player in `player/`', () => {
  it('is the file its stamp describes (copied whole by `pnpm player:sync` in the Studio)', () => {
    const hash = createHash('sha256').update(readFileSync(new URL('vns-player.js', dir))).digest('hex');
    expect(hash).toBe(stamp.outputHash);
  });

  it('has the contract the protocol declares', () => {
    expect(stamp.contract).toBe(PLAYER_CONTRACT);
  });

  it('names the contract in its types', () => {
    expect(readFileSync(new URL('vns-player.d.ts', dir), 'utf8')).toContain('PLAYER_CONTRACT');
  });
});
