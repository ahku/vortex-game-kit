# FAQ and known problems

Short answers for people (and AI agents) putting a Vortex Studio story into a game. Each answer points to the full
explanation. If you solve something new, add it here.

## Getting started

**Which package do I install?** `npm i vortex-game-kit`. It includes the player (`/story`), the engine (`/engine`), the
story format (`/schema`), the host protocol (`/protocol`), conformance tests (`/conformance`) and the importer
`vortex-story-import`. Start with `docs/START-HERE.md`.

**The story shows nothing / the player throws when it mounts.** Set `bundle` and `engine` (and the other properties) on
the element *before* you add it to the page, and call `engine.start()` last. START-HERE, level 0.

**Images and sound do not load.** Every file in the bundle is an address. Make the addresses absolute, serve them with
the right content type, and use the importer, which downloads the files and rewrites the addresses.

**Where do I get a story?** The writer presses **Publish** in the Studio. That gives a public link `/play/<slug>`.
`vortex-story-import` downloads that story into your project (START-HERE, "Before level 0"). Republish, then import
again, after every change to the story.

**The story I imported is old.** The importer takes the *published* story. Publish again in the Studio, then run the
import again.

**`PLAYER_CONTRACT` does not match.** The game and the player disagree on the protocol version. Update
`vortex-game-kit`; read its `CHANGELOG.md`.

## Sound

**Sound keeps playing when I switch tab.** Your audio manager needs `suspend()`/`resume()`, and you must call them from
`visibilitychange`, `pagehide` and `pageshow`. See `docs/AUDIO.md`.

**Nothing plays until I click.** That is the browser. Show a start button before the first story (AUDIO.md, rule 3).

**Two songs play at once / the voice talks over my victory theme.** The game and the story are using different audio
managers. Share one (`player.audio`), and call `stopVoice()` before your own song starts. AUDIO.md, "Story and game
taking turns".

**My victory song does not play until the next click.** The song was loaded but not unlocked. Unlock the same element
silently in an earlier click. AUDIO.md, "Make it play well".

**Effects are silent on iPhone while the story is audible.** Set `navigator.audioSession.type = 'playback'`.

**Music will not come back on iPhone after the lock screen.** Start the same track again from its position and retry on
the next touch. AUDIO.md, "Stop sound when the tab is hidden".

## Looks and input

**My CSS does not change the dialog.** The player has a shadow root. Use `::part()`: `dialog`, `dialog-name`,
`dialog-face`, `dialog-text`, and the same with a `dialog-automatic` prefix for lines that play over the game.

**Clicks on my game do nothing while a story is on screen.** In overlay mode the player passes clicks through, except on
its dialog. Keep your buttons outside the dialog, and give the overlay a z-index above your HUD but below your own
full-screen curtain.

**Text looks heavy on Mac.** Add `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;` to the page.

## Game events

**My game gets a request but the story never continues.** The game must answer every game event, exactly once, with
`engine.resume(outcome)`. A late, repeated or older-session answer is refused.

**The writer cannot pick my game's action in the editor.** The editor only knows the games it lists. Add the game to
`apps/studio/app/handover/games.ts` in the Studio and declare the events in your game (START-HERE, level 4).
A game that only answers win or lose needs no Studio change.

**Which keys may the player press while the story waits for the game?** The objective declares them (input rules). The
game must ignore everything else while the story is waiting. GAME-INTEGRATION-STANDARD, sections 3 and 6.

## Working on the kit itself

**How do I try a player change in my game before it is released?** Local link or the `next` tag: see
`docs/PLAYER-RELEASING.md`.

**`pnpm install` complains about ignored build scripts.** Allow `esbuild` in `pnpm-workspace.yaml`
(`allowBuilds: esbuild: true`).
