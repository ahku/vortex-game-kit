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
   (section 6 is the checklist, in order).
3. The game's own `docs/STORY-INTEGRATION.md`, if you are in a game.

## Rules for this repository

- **Entry points are layers.** `vortex-game-kit/protocol` is pure types and validators with no runtime and no
  dependencies. **Vortex Studio imports `protocol` only.** `vortex-game-kit/conformance` is for tests. A runtime for
  games (`vortex-game-kit/game`) comes later and must never be imported by the studio.
- **No game logic until two games need it.** Rendering, units and combat stay each game's own. Do not extract something
  from one game into the kit.
- **No dependencies** in `protocol` and `conformance`.
- **`dist` is committed.** After changing `src`, run `npm run check` and commit the rebuilt `dist` in the same commit.
- **Versions are tags.** A change that older code cannot ignore raises `PROTOCOL_VERSION` and the package's minor version.
  Release: update `CHANGELOG.md` and `package.json`, run `npm run check`, commit, then `git tag vX.Y.Z`.
- **Published stories keep working.** Never rename an id without an alias for the old one.
- **Say what you did not do.** If something cannot meet a rule yet, write it under "Open" in the game's docs.

## Installing and updating (for people who are new to Git)

Install into a project: `pnpm add https://github.com/ahku/vortex-game-kit/archive/refs/tags/v0.2.0.tar.gz` (or `npm install` with the same URL).
Update: change the version in that URL (`v0.2.0`) to the new one and run it again. The project's `package.json` keeps it.
Use the URL form, not `github:ahku/vortex-game-kit#v0.2.0`: pnpm puts that one in a folder with a `#` in its name, which
Vite and Vitest cannot read.

Use it in a game's tests:

```ts
import { signalCases, handshakeCases, declarationCase, previewerCases } from 'vortex-game-kit/conformance';
for (const c of signalCases(subject)) it(c.name, c.run);
for (const c of previewerCases(previewerSubject)) it(c.name, c.run); // see docs/PREVIEWER-STANDARD.md, section 7
```
