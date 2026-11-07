# Releasing the story player

The player's source is in the Vortex Studio repository (`packages/player-element`). This repository holds the built file
(`story/`, with a `STAMP.json`) and publishes it. A change travels in three lanes. Use the fastest lane that is honest
about what you have tested.

| Lane        | For                                   | Who sees it                      | Cost                       |
| ----------- | ------------------------------------- | -------------------------------- | -------------------------- |
| **Local**   | Trying a change while you work        | Only your machine                | Seconds, no commit needed  |
| **`next`**  | A change that works, to try elsewhere | Whoever installs `@next`         | One tag, no `latest` move  |
| **`latest`**| A tested change                       | Every game that updates normally | Changelog, version, a tag  |

## Layout on your machine

Keep the checkouts side by side: `vortex-studio`, `vortex-game-kit`, and the game (`gr-downbeat`). The Studio's sync tool
finds the kit at `../vortex-game-kit` (override with `--kit <dir>` or `VGK_DIR`).

## Lane 1: local iteration

1. Change the player in the Studio.
2. In the Studio: `pnpm player:sync --only kit`. It builds the player and writes `vns-player.js`, `vns-player.d.ts` and
   `STAMP.json` straight into the kit's `story/` folder, and the engine and schema into `engine/`, `schema/` and `shared/`
   (with their own `engine/STAMP.json`). Nothing is committed or published.
3. In the game, run its dev server with the kit as a local source: `VGK_DEV=/path/to/vortex-game-kit pnpm dev`. The game's
   Vite config aliases `vortex-game-kit` to that folder in development only (see "Game side" below), so a reload shows
   the change. Production builds ignore it and use the installed package.
4. Repeat. The Studio's own tests and `pnpm check` still apply before you move on.

`pnpm player:sync --check` says whether the copies are stale. `--no-build` copies the last build as it is.

## Lane 2: a `next` prerelease

Use it when the change works locally and you want to try it in an installed game, on another machine, or in CI, without
touching what everyone else gets.

1. In the kit, set `package.json` to a prerelease version of the next release, for example `0.19.1-next.1`.
2. `npm run check`, commit, then `npm run release`. The tag `v0.19.1-next.1` has a hyphen, so the Publish workflow runs
   `npm publish --tag next`. `latest` does not move.
3. In the game: `pnpm add vortex-game-kit@next`. Go back with `pnpm add vortex-game-kit@latest`.
4. Another change: bump the counter (`-next.2`) and repeat. Versions are never reused.

No changelog entry is needed for a prerelease; the release entry covers them.

## Lane 3: a release (`latest`)

1. Studio: `pnpm check`, then `pnpm player:sync --only kit` so the kit has the final build and stamp.
2. Kit: add the `CHANGELOG.md` entry and set `package.json` to the plain version (`0.19.1`).
3. Raise `PLAYER_CONTRACT` (in `src/protocol/player.ts`, and the Studio's copy) and the **minor** version when a host that
   knew the old player would misbehave: the engine views the player draws, a property or an event changed in a way an
   older host does not understand. Adding an optional property or a styling part is not such a change.
4. Kit: `npm run check`, commit, `npm run release`. The Publish workflow verifies that the tag equals `package.json`,
   runs the checks and publishes with provenance as `latest`.
5. Games update: `pnpm update vortex-game-kit`, then run the game's tests and play the story once.

## What to test before `latest`

- A full story in the game with the player in overlay mode: dialog, portraits, choices, a battle hand-over and back.
- Music and voice at a hand-over (the game's victory theme plays to the end; the story's voice stops).
- Click and key input over the overlay, and the game's input while an autoplay line talks.
- A language switch in the middle of a story, and mute.
- Phone width, if the game supports it.
- The Studio's own preview, which uses the same source.

## Game side

A game depends on the published package. For lane 1 only, its Vite config may add, in development:

```ts
if (process.env.VGK_DEV) {
  config.resolve.alias = { ...config.resolve.alias, 'vortex-game-kit': process.env.VGK_DEV };
}
```

Unset `VGK_DEV` and the game uses the version in its `package.json`. Do not commit a `file:` or `link:` dependency.

## Rules

- `story/`, `engine/`, `schema/` and `shared/` are written only by the Studio's sync tool; a test fails if a file and its
  stamp disagree.
- A `next` version is never the one a game's `package.json` pins in a commit that ships. Ship `latest`.
- The kit's own tests do not test the player's look; the lists above do. Say what you did not test.
