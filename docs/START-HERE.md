# Start here: play Vortex Studio stories in your game

For a game (or the AI working on it) that wants to show stories written in Vortex Studio. Start at level 0, which needs
no gameplay at all, and go up only as far as your game needs.

| Level | You get                                                         | Game work                                    | Studio work                              |
| ----- | --------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| 0     | A story plays on its own screen                                 | A page, the player, the engine               | A published story                        |
| 1     | The story hands over to your gameplay and continues with result | One handler for the story's game events      | Event steps in the story                 |
| 2     | The story talks over your running game                          | Tell the player who has the screen           | Stories that pick "overlay" presentation |
| 3     | It feels like part of your game                                 | Shared audio, language, controls, styling    | Nothing                                  |
| 4     | The editor knows your game's events                             | A declaration, conformance tests             | An entry for your game in the editor     |

## If you are an AI agent guiding a person

The person you are helping may not know how any of this works, and you do not have the Studio's or any other game's source.
This file, the standard and the package are everything. So:

1. **Ask first, in plain words, before you write code.** You need: (a) the **Studio's address**, (b) the **slug** of a
   published story to test with (the part of its public link after `/play/`; if there is none, tell them to ask the writer to
   press **Publish** and send the link), (c) **how far they want to go** (the levels above; if unsure, level 1 for a game
   with gameplay in the middle of a story, level 0 otherwise), (d) what the game's gameplay moment is, if any (what starts
   it, what ends it, what the results are), (e) where the game draws, and whether it has its own audio and mute.
2. **Tell them which steps only a human can do**, and what to click: publish a story in the Studio (**Publish**, next to
   Save); copy the link; run commands that need their credentials; add their game to the Studio's editor (level 4 is a change
   in the Studio repository, so ask who maintains it). Never invent a slug or a Studio address.
3. **Work level by level, and show each result.** Get level 0 playing before level 1. After each level say what now works and
   what the person should see on screen, so they can check it.
4. **Read before you build.** Section 1 and 8 of `docs/GAME-INTEGRATION-STANDARD.md` say who owns what. The story names, the
   game decides. Do not put story knowledge into the game loop.
5. **Say what you did not do or could not test**, in the end, in plain words.

## Pitfalls we have met

- **The player needs its properties before it is on the page** (`bundle`, `engine`), or it fails when it mounts.
- **Your page's CSS does not reach inside the player** (it has a shadow root). Style the dialog with `::part()` (level 3).
  The player lets clicks through to your game in overlay mode except on its dialog; keep your buttons outside it.
- **Browsers start audio only after a click or key press.** Show a start button before the first story.
- **One music channel.** If your game starts its own music while the story is on screen (a victory theme), stop the story's
  voice yourself (`audio.stopVoice()` on the audio you share) and let the story's music be restored only when the story
  comes back (`active` true again).
- **Layers: the player is above the game.** Give the overlay a z-index above your HUD, and keep your own full-screen curtain
  above both.
- **Every file is an address in the bundle.** Make them absolute (level 0) and let your server send the right content type.
- **Answer a game event once.** A late or repeated answer is refused; one for an older session too.
- **Version check.** Compare `PLAYER_CONTRACT` once at start and show a clear error on a mismatch.

## What the package gives you

| You need                             | It is                                       | Import                        |
| ------------------------------------ | ------------------------------------------- | ----------------------------- |
| To show the story on screen          | The player, a web component, `<vns-player>` | `vortex-game-kit/story`       |
| To run the story's logic             | The engine                                  | `vortex-game-kit/engine`      |
| To read a story file                 | The story format and its validator          | `vortex-game-kit/schema`      |
| Types and the player's version check | The protocol                                | `vortex-game-kit/protocol`    |
| To prove your hand-over is right     | Conformance tests                           | `vortex-game-kit/conformance` |
| To get a published story into a game | The importer, a command                     | `vortex-story-import`         |

The player, engine and schema are built from the same Studio source, so they always fit each other. **Do not copy the
Studio's engine or schema into your repository.** Install this package (`zod` comes with it):

```
pnpm add vortex-game-kit
```

The rules behind everything here are in `docs/GAME-INTEGRATION-STANDARD.md` in this package. Read sections 1, 4 and 8 when you
reach level 1.

## Before level 0: publish a story and bring it into the game

**In the Studio (the writer):**

1. Write the story, save it, and press **Publish** (next to Save). The Studio checks the story and lists problems instead
   of publishing one that would not play.
2. Copy the link it gives. It looks like `https://<studio>/play/<name>-<random>`. The part after `/play/` is the story's
   **slug**. The link stays the same when the writer republishes.

**In the game:** import the published story, which downloads the story and every picture, sound and video it uses into
your repository, so the game needs no Studio account or network connection at run time:

```
npx vortex-story-import <slug> <folder> --studio https://<studio-address>
```

This writes `public/story/<folder>/bundle.json` and the media next to it. Pictures come down at the size their use needs
(`--original` keeps the uploaded files). `--event <name>` stops the import if the story does not declare a host event your
game needs (repeat it for several). Put the command in a script (`"story:refresh": "vortex-story-import ..."`) and run it
again whenever the writer republishes; it is an explicit refresh, not a live link. The bundle is replaced only after
every file has arrived.

## Level 0: show a story

The game is the **host**: it owns the engine, the audio and the page. The player only draws the story and takes the
reader's clicks. A story's game events (a battle, a puzzle) are skipped on their default result when the host does not
claim them, so any story plays to its end with no gameplay.

```ts
import { createEngine } from 'vortex-game-kit/engine';
import { ExportBundleSchema } from 'vortex-game-kit/schema';
import { PLAYER_CONTRACT, defineVnsPlayer } from 'vortex-game-kit/story';

// The version of what the player and a host agree on. Check it once, when you start.
const EXPECTED_PLAYER_CONTRACT = 1;
if (PLAYER_CONTRACT !== EXPECTED_PLAYER_CONTRACT)
  throw new Error(`Player contract ${PLAYER_CONTRACT}, this game expects ${EXPECTED_PLAYER_CONTRACT}.`);

defineVnsPlayer(); // registers <vns-player>

const bundleUrl = new URL('/story/my-story/bundle.json', location.href);
const bundle = ExportBundleSchema.parse(await (await fetch(bundleUrl)).json());
// The player loads each file from the address in the bundle, so make them absolute.
for (const asset of Object.values(bundle.assets.assets))
  if (asset.url) asset.url = new URL(asset.url, bundleUrl).href;

const engine = createEngine();
engine.load(bundle);

const player = document.createElement('vns-player') as HTMLElement & Record<string, unknown>;
player.bundle = bundle;
player.engine = engine;
player.addEventListener('exit', () => showMenu()); // the reader left from the end screen
player.addEventListener('restart', () => engine.start()); // ... or played again
document.body.append(player); // only after bundle and engine are set: the player needs both when it mounts
engine.start(); // last, so the player sees every view
```

Things that go wrong if you skip them:

- Set the player's properties **before** you add it to the page, and start the engine **after** it is there.
- Browsers start audio only after a click or key press. Show a "Start" button first (the player's first click unlocks it).
- Give the player room: it fills its parent, so size the parent.

## Level 1: hand over to your game and back

A story step of type **Game event** names an event and passes parameters. The story waits; your game runs its gameplay;
the game answers with an outcome the step lists, and the story forks on it.

```ts
const engine = createEngine();
engine.load(bundle, { hostEvents: ['my-battle'] }); // the events this game can run; the story's others skip

engine.subscribe({
  hostEvent(event) {
    // event.name, event.params (what the story passes in), event.outcomes (the answers it accepts)
    void playMyBattle(event.params).then((won) => engine.resume(won ? 'success' : 'failure'));
  },
});
```

- Answer each event **once**, with one of `event.outcomes`. Hide your gameplay when the story has the screen and show it when a
  hand-over begins.
- Keep story and game from importing each other: a small **bridge** file in your game subscribes to the engine and talks to
  your gameplay. The standard describes its shape (section 4, "A new game").
- A param the story does not set must leave your game's own default in place.

**In the Studio:** the writer adds a **Game event** step and picks the event. Any game works with no registration for the two
basic kinds the Studio gives every game: an event that **waits for a result** (win or lose, or outcomes you name) and a
**message** that does not wait. The editor shows the step in words and warns when the game does not support the event.

## Level 2: show the story over a running game

For a tutorial that talks over a live game (the dialog and portraits over the game, no background of their own):

```ts
player.mode = 'overlay'; // 'full' (default): the story has the screen
player.paused = false; // true while your game holds the story (your pause menu); sequences wait and the voice is cut
player.active = true; // false while something else is in full view (a full-screen battle): the player takes no keys
player.addEventListener('gameplay', (e) => {
  const [state] = (e as CustomEvent<['active' | 'paused']>).detail;
  // 'paused': the story holds the game while it talks, so lock your input and let the story take the click
  // 'active': an authored autoplay line talks over a game that keeps running, so leave your input live
});
```

Who has the click is the hard part: your game gives up its input before the story takes it, and the closing click must not
reach your game. Section 8 of the standard, and section 5 of its rules, describe it. Place `<vns-player>` over your game's
canvas, and keep your own buttons outside it.

**In the Studio:** the writer chooses the scene's presentation (a scene started over a game shows no background).

## Level 3: make it feel like part of your game

- **Audio and mute.** Pass your audio manager as `player.audio` and your mute setting as `player.mute` so the story's music and
  voices share your channels. Without them, the player makes its own.
- **Language.** Set `player.language` to one of `bundle.story.languages.available`, again when the reader changes it.
- **Controls.** `player.controls = false` hides the player's own language and sound buttons when yours are elsewhere.
- **Dialog style.** The player's styles live inside its shadow root, so a game restyles the dialog with CSS `::part()`:
  `dialog`, `dialog-name`, `dialog-face`, `dialog-text`, and for a line that plays by itself over a running game the same four
  prefixed `dialog-automatic`. Your stylesheet wins over the player's. Example: `vns-player::part(dialog-text) { font-size: 1.1rem }`.

## Level 4: make the editor understand your game

Until now the Studio treated your game as "any game". To make a writer's life better, tell the editor what your game can do:

1. **In the game**, declare what it supports (objectives, signals, their params and results) in a typed list, as the standard
   describes (sections 2, 3 and 6). The declaration is the source of truth. Check it with `checkDeclaration` from
   `vortex-game-kit/protocol` and the cases in `vortex-game-kit/conformance`.
2. **In the Studio** (this is a change to the Studio repository, made by whoever maintains it): add your game to the
   editor's list of games (`app/handover/games.ts`) with its id, name, icon, actions, params and outcomes, so a writer picks
   "My game: Start battle" from a menu, with labelled params, and gets warnings for results nothing reads.
3. **Keep the two lists in step** (standard, section 6) and republish and re-import a story after the game's list changes.

A game that only answers win or lose needs no Studio change at all (level 1 covers it).

## Before you say it works

- Run the conformance suite in your tests: `signalCases`, `handshakeCases` and `declarationCase` from `vortex-game-kit/conformance`.
- Play a real story from the first line to the end screen, through every hand-over, including a lost one if the event allows it.
- Say in your notes what you did not test.

## Paste this to your AI agent

Replace `LEVEL` with 0, 1, 2, 3 or 4 (do the levels below it first), and the story slug and Studio address with yours.

```
Add Vortex Studio story support to this game, up to level LEVEL.

1. Install the package: pnpm add vortex-game-kit
2. Read, in this order: node_modules/vortex-game-kit/AGENTS.md, then docs/START-HERE.md, then, from level 1,
   docs/GAME-INTEGRATION-STANDARD.md (sections 1, 4 and 8), all in the same folder.
3. Import the published story: npx vortex-story-import <slug> <folder> --studio <studio address>
   (and add it to package.json as a script so it can be rerun).
4. Follow START-HERE level by level. Do not copy the Studio's engine or schema into this repository, and do not edit
   anything inside node_modules.
5. Run the conformance tests from level 1, and play a story through.
6. Finish by saying what you did not do or could not test.
```
