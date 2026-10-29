# Vortex Game Kit

The shared package for games that talk to Vortex Studio: the story integration standard, the previewer standard (show a
map in the real game from the editor), the protocol (types, message names and validators) and the conformance tests
any game can run.

- Start with [AGENTS.md](AGENTS.md) (for people and for AI agents) and
  [docs/GAME-INTEGRATION-STANDARD.md](docs/GAME-INTEGRATION-STANDARD.md) (stories) and
  [docs/PREVIEWER-STANDARD.md](docs/PREVIEWER-STANDARD.md) (map previews).
- Entry points: `vortex-game-kit/protocol`, `vortex-game-kit/conformance`.
- Install: `pnpm add https://github.com/ahku/vortex-game-kit/archive/refs/tags/v0.16.1.tar.gz`

```
npm install
npm run check     # typecheck, test, build
```
