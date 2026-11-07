# Vortex Game Kit

Everything a game needs to run Vortex Studio stories, and nothing about any one game: the story player (a web
component, the same one the studio uses), the story integration standard, the previewer standard (show a map in the real
game from the editor), the protocol (types, message names and validators) and the conformance tests any game can run.

- Start with [AGENTS.md](AGENTS.md) (for people and for AI agents) and
  [docs/GAME-INTEGRATION-STANDARD.md](docs/GAME-INTEGRATION-STANDARD.md) (stories) and
  [docs/PREVIEWER-STANDARD.md](docs/PREVIEWER-STANDARD.md) (map previews).
- Entry points: `vortex-game-kit/protocol`, `vortex-game-kit/conformance`, `vortex-game-kit/story` (the player),
  `vortex-game-kit/engine` and `vortex-game-kit/schema` (what the player runs on).
- Install: `pnpm add vortex-game-kit`

```
npm install
npm run check     # typecheck, test, build
```

## Releasing

See `docs/PLAYER-RELEASING.md` for how a player change goes from the studio to a game: local iteration, a `next` prerelease, and a release.
