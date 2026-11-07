import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ENGINE_API_VERSION, createEngine } from '../engine/index.js';
import { validateStory } from '../schema/index.js';

const root = new URL('../', import.meta.url).pathname;
const stamp = JSON.parse(readFileSync(join(root, 'engine', 'STAMP.json'), 'utf8')) as { outputHash: string };

function files(folder: string, rel = folder): string[] {
  return readdirSync(join(root, rel)).flatMap((name) => {
    const here = `${rel}/${name}`;
    if (statSync(join(root, here)).isDirectory()) return files(folder, here);
    return name === 'STAMP.json' ? [] : [here];
  });
}

describe('the story runtime in `engine/`, `schema/` and `shared/`', () => {
  it('is what its stamp describes (copied whole by `pnpm player:sync` in the Studio)', () => {
    const hash = createHash('sha256');
    for (const file of ['engine', 'schema', 'shared'].flatMap((f) => files(f)).sort()) {
      hash.update(`${file}\0`);
      hash.update(readFileSync(join(root, file)));
      hash.update('\0');
    }
    expect(hash.digest('hex')).toBe(stamp.outputHash);
  });

  it('loads as plain modules and exposes the engine and the validator', () => {
    expect(typeof ENGINE_API_VERSION).toBe('number');
    expect(typeof createEngine).toBe('function');
    expect(typeof validateStory).toBe('function');
  });
});
