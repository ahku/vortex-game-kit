# Vortex Game Kit: instructions for AI agents

This file is for any agent working in or with this repository (Claude, Codex, anything else). Follow it as written.

## What this is

- **Vortex Studio (VS)** is the editor that hosts our projects as modules. Its **story module** writes dialogs.
- **Vortex Game Kit (VGK)**, this repository, is the package every game shares. Today it holds the standard for
  connecting a game to a VS story, the standard for letting VS preview a game's maps (the previewer), the protocol
  (types, message names, validators) and the conformance tests. Sound and other shared game logic may arrive later.
- **A game** (Downbeat is the first) is its own project. It imports VGK, never VS.

## Read this first

1. [docs/GAME-INTEGRATION-STANDARD.md](docs/GAME-INTEGRATION-STANDARD.md) before you build or change anything where a
   story and a game meet. It says who owns what and how to add an objective, a parameter, a message or a game.
2. [docs/PREVIEWER-STANDARD.md](docs/PREVIEWER-STANDARD.md) before you make a game's maps previewable in the studio
   (section 6 is the checklist, in order; section 9 is the manifest, section 10 the layer editor description).
3. The game's own `docs/STORY-INTEGRATION.md`, if you are in a game.

**Adding stories to a game? Read [docs/START-HERE.md](docs/START-HERE.md) first**, then the standard it points to. If you are
helping a person who is not sure how it works, follow its section "If you are an AI agent guiding a person": ask them what
you need, tell them which steps only they can do, and go level by level.

## Rules for this repository

- **Entry points are layers.** `vortex-game-kit/protocol` is pure types and validators with no runtime and no
  dependencies. **Vortex Studio imports `protocol` only.** `vortex-game-kit/conformance` is for tests.
  `vortex-game-kit/story` is the story player as a web component, built from the studio's source and copied here by the
  studio's `pnpm player:sync` (never edit `story/` by hand: its `STAMP.json` and a test catch that; the process is in `docs/PLAYER-RELEASING.md`); games import it, the
  studio never does. `vortex-game-kit/engine` and `vortex-game-kit/schema` are the story engine and the story format the player
  runs on, built from the studio's own packages and copied the same way (never edit `engine/`, `schema/` or `shared/`; the
  stamp `engine/STAMP.json` and a test catch that). A game creates its engine with `engine`, and `schema` is its story format
  and validator. A runtime for games (`vortex-game-kit/game`) comes later and must never be imported by the studio.
- **General utilities only.** Nothing in this package names a game, a unit, a battle or a lesson. It holds what any game
  needs to run a story: the standard, the protocol, the player, the engine and schema, and the tests.
- **No game logic until two games need it.** Rendering, units and combat stay each game's own. Do not extract something
  from one game into the kit.
- **Editor descriptors are experimental.** The layer and character editor descriptions (`layers`, `characters`) were
  written from one game. Do not widen them for a single game; wait for a second game, then keep what both need.
- **No dependencies** in `protocol` and `conformance`. The package's one dependency, `zod`, is for `schema` and `engine` only.
- **`dist` is not committed.** It is built when the package is packed (`prepack`), so run `npm run check` before you commit.
- **Versions are tags, and tags are releases.** A change that older code cannot ignore raises `PROTOCOL_VERSION` (or
  `PLAYER_CONTRACT` for the player) and the package's minor version. Release: update `CHANGELOG.md` and `package.json`,
  run `npm run check`, commit, then `npm run release`. Pushing the tag `vX.Y.Z` runs the Publish workflow, which checks
  that the tag matches `package.json` and publishes to npm with provenance (it needs the repository secret `NPM_TOKEN`).
  A tag with a hyphen (`v0.19.1-next.1`) is a prerelease and is published under the npm tag `next`, never `latest`.
- **Published stories keep working.** Never rename an id without an alias for the old one.
- **Say what you did not do.** If something cannot meet a rule yet, write it under "Open" in the game's docs.

## Installing and updating

Install into a project: `pnpm add vortex-game-kit` (or `npm install vortex-game-kit`). Update: `pnpm update vortex-game-kit`,
or change the version in the project's `package.json`. Projects that still use the old tarball URL
(`https://github.com/ahku/vortex-game-kit/archive/refs/tags/vX.Y.Z.tar.gz`) keep working for tags up to v0.18.0, which carry
a built `dist`; later tags do not, so switch them to the npm version.

Use it in a game's tests:

```ts
import { signalCases, handshakeCases, declarationCase, previewerCases } from 'vortex-game-kit/conformance';
for (const c of signalCases(subject)) it(c.name, c.run);
for (const c of previewerCases(previewerSubject)) it(c.name, c.run); // see docs/PREVIEWER-STANDARD.md, section 7
```

Use the player (see docs/GAME-INTEGRATION-STANDARD.md, section 8):

```ts
import { defineVnsPlayer } from 'vortex-game-kit/story';
import { createEngine } from 'vortex-game-kit/engine';
import { validateStory } from 'vortex-game-kit/schema';
import { PLAYER_CONTRACT } from 'vortex-game-kit/protocol';
```
