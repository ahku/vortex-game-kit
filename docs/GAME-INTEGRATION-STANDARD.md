# Game integration standard

**Read this before you build or change anything where a story and a game meet.** It lives in the Vortex Game Kit
(`vortex-game-kit`) and is the one process every game follows, whoever writes it: Downbeat today, any game after it.
The types, the message names and the conformance tests it describes are the kit's `protocol` and `conformance` entry
points. The contract itself (commands, events, saves) is in each project's `docs/GAME-HANDOFF.md` and
`docs/GAME-SPEC.md`; this file says _where each decision lives_ and _how to add things_, so two agents in two
repositories end up with the same design.

## 1. Who owns what

| The story (this studio) owns                                          | The game owns                                                         |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| What is said, when, in which language, with which pictures            | The rules, the numbers and how the game looks and sounds              |
| Which game event happens at which step, and what to do on each result | What an objective _means_, when it is done, and when it failed        |
| The forks on a game's result (`completed`, `failed`, `win`)           | How input behaves while an objective waits (`ObjectiveInput`)         |
| Music the story chose, passed as event params                         | The game's own cue music, and the fallback when the story passes none |

Three rules follow, and every other rule in this file is a consequence of them:

1. **The story names; the game decides.** A story step carries an id (`attack-enemy`) and plain params. It never
   carries a rule, a condition, a coordinate or an input restriction.
2. **Behaviour is declared with the thing it belongs to, never written into the game loop.** If a lesson needs the
   player to only select a unit, that is a field on the objective, not an `if (encounter === 5)` in the input code.
3. **One list, two readers.** The game's declaration of what it supports is the source of truth. The studio's editor
   module (`app/handover/games.ts`) is a copy for writers; keep them in step (section 6). Declarations are checked by
   the kit's `checkDeclaration`.

## 1b. Boundaries: each layer owns its own state

There are up to three layers: the **story**, the **game** and the **campaign** (what carries across stories and games).
Each owns its own flags and its own rules.

- **No layer writes another layer's state.** The story never sets a game flag, the game never sets a story flag, and
  the campaign writes neither. There is no shared flag store.
- **Layers inform each other with messages.** A message says what happened or what is now true. The receiver decides what
  to do with it, including nothing. Two kinds exist:
  - a **signal** (the editor calls it a message): a named message such as `introduce-enemy` or `hello`, sent once, with
    optional values. It may describe what happened or just greet the game;
  - a **flag update**: a flag in the sender's own state changed (`met_kestrel` is now `true`), with its previous value.
- **Reading is by subscription.** A layer that wants to know about another's flags subscribes to the updates, keeps its
  own copy and treats it as read-only. The sender decides which of its flags are shared; a layer declares which it wants.
- **Results are the way back.** A game answers a story only through the outcome of an event the story started. That
  outcome is what the story forks on.
- **A message the receiver does not know is ignored and logged,** never an error, so layers can change independently.
- **The host carries the messages.** It is the composition layer (for Downbeat, the bridge). It forwards them and never
  interprets them, so no layer imports another.

The story sends a signal with the Game event action "Message game" (section 4). Sharing flags as updates is the next
addition to the hosts; this section is the rule it must follow.

## 2. The objective: the unit of a lesson

An objective is a declaration in the game, in a typed list (Downbeat: `src/data/objectives.ts`):

```ts
interface ObjectiveDecl {
  id: string; // stable slug the story uses: "attack-enemy"
  aliases?: string[]; // ids a published story already uses; never break a published story
  description: string; // for the editor and the docs
  encounters: number[]; // where it is offered (the game's own scope: level, stage, scene)
  allowEndTurn: boolean; // may the player leave the lesson?
  complete: ObjectiveCondition; // plain data, never a story expression
  fail?: ObjectiveCondition[]; // what counts as failing; omit for an objective that cannot fail
  revertOnFail?: boolean; // take the failed action back so the story can ask again
  input?: ObjectiveInput; // how input behaves while it waits (section 3)
}
```

- **Conditions are data.** A closed union of kinds (`unit-selected`, `unit-in-reach`, `action-resolved`, ...), judged by
  one pure function (`evaluateObjective`). A new kind is a new member of the union, a new `case` in that function and a
  test; the compiler flags every place that must handle it.
- **Completion wins over failure,** so one action never reports both.
- **Report after the action has landed** (the move ends, the hit connects), never on the frame the condition becomes
  true. Settle time is passed with the notice.
- **Ids are slugs** (`move-near-enemy`). A story that typed another spelling stays working through `aliases`.
- **An objective that cannot fail** declares no `fail`. The editor then shows no failure route and the writer does not
  have to build an empty one.

## 3. Input rules: how the game behaves while an objective waits

```ts
interface ObjectiveInput {
  selectOnly?: boolean; // the player can only select a unit: no drag, no tap-to-move, no action buttons or keys
  deferChoices?: boolean; // attack / push / throw are not offered, even after a move, until the next objective arms
}
```

How it works, and what every game must preserve:

- **Declared on the objective.** The story cannot override it, so every story that uses the objective teaches the same
  lesson.
- **The tracker owns the active rules** (`objectives.input()`): the armed objective's, or, after it ends, the rules of the
  objective that just ended, **until the next one is armed**, the story finishes the battle or the battle resets. This
  closes the gap in which the story is talking and the game would otherwise show choices the player may not use yet.
- **One question, asked everywhere.** The game narrows what it offers in a single function (`available()`), and the
  buttons, the keys, dragging, tapping and the HUD all ask it. Do not add a second check next to a button. Logic that
  must see the real state (is a follow-up possible at all?) asks the unfiltered function (`rawAvailable()`).
- **A change of rules redraws** (`inputChanged`): arming the next objective brings back what it now allows.
- **Adding a rule** means: a field on `ObjectiveInput`, the one place that reads it, a test on the tracker, a line
  here and in the game's `STORY-INTEGRATION.md`. Never a check on an objective id inside the game loop.

## 4. Adding things

### A new objective in an existing game

1. Add the declaration to the game's objective list (section 2). Reuse a condition kind if one fits.
2. Add the matching option to the studio module: `app/handover/games.ts`, the `objective` action's `options`, with its
   `value` (the slug), `label` and `outcomes` (`['completed']` if it cannot fail, else both).
3. Write the game's tests: the condition, the tracker (arm, settle, report once), and the input rules if it has any.
4. Add it to the game's `STORY-INTEGRATION.md` and, if players see a change, the game's changelog.
5. Tell the writer to republish the story and refresh the game's copy of it (section 6).

### A new kind of condition

Union member, `case` in the pure evaluator, tests for completing and not completing, then steps 1 to 4 above.

### A new parameter on a game event (for example music)

1. The game reads it in its bridge (`downbeatBridge.ts`), validates it and ignores what it does not know.
2. The studio declares it in `games.ts` with a `type`, a `label` and a `help`. Assets use the `music` type so the
   publisher ships the files.
3. A param the story does not set must leave the game's own default in place.

### Every game has two kinds of event

The same two base events exist on every game, so a story reads the same whichever game it talks to. In the editor the
second is called a **Message game**; on the wire it stays `signal` (`game:signal`).

Whatever the game, a story can send it two kinds of event: one that **expects a result** (the story waits, the game
answers with an outcome such as win or lose) and one that is **only a message** (a `signal`: the story carries on at
once). "Any game" and every registered game get both automatically (`withStandardEvents`). A host for any game must
accept `game:signal {requestId, sessionId, signal, values}`, answer it, and ignore a signal it does not know. A custom
event (a free event name) is the same choice made by hand: give it outcomes to expect a result, or none to make it a message.

### A new signal

A signal is a named message from the story (`introduce-enemy`, `hello`). It can describe what happened or simply ping the game; the story puts no limits on what a message says. The game decides what it means.

1. The game declares it in its signal table (Downbeat: `src/data/signals.ts`): id, description, the encounters that
   understand it, and its **reaction as data** (today: `highlight`, the units to point at). A new kind of reaction is a
   field on the reaction type, the one place that applies it, and a test. Never a check on a signal id in the game loop.
2. The studio lists it as an option of the game's `signal` action in `games.ts` (`value`, `label`). Writers may also type
   their own slug, so a game can add signals without the editor changing.
3. The story step is a Game event with the `signal` action (`oneWay: true`): the story does not wait, no result comes
   back, and nothing is declared as a result flag. The host answers the step at once, then passes `game:signal`.
4. A signal the game does not know is ignored and reported (`game:signal-ignored`), never an error.

### Pointing at something (spotlight)

A message can make the game point at a unit. This is the technique for tutorials that need the player to look at one thing.

1. The game declares the reaction as data on the signal (`react: { highlight: ['grunt-1'] }`; an empty list clears it).
2. The game draws the pointing itself (a pulsing ring) and publishes where the unit is as CSS variables on its canvas
   (`--spot-x`, `--spot-y`, `--spot-r`, CSS pixels from its top left) and a `data-highlight` attribute.
3. A host that dims the game while it talks reads those and leaves a lit circle in the dimming (a CSS mask). The game
   never knows about the dimming, and the host never knows which unit it is. A host that does not dim ignores them.
4. It stays until a later message clears it, the battle finishes or the battle restarts. It is not tied to objectives.

A new kind of pointing (a tile, an area) follows the same shape: a field on the reaction, the game draws it and
publishes where it is, the host reacts to what is published.

### What an action says on the stage card

Every action in `games.ts` may carry a `card` sentence about what happens at that step, written as a verb addressed to the game ("Tells the game to ...", "Waits for the game: ..."), so a writer sees the story is talking to it (`'Tells the game to wait for the player[: {objectiveId}]'`):
`{key}` is a param as the writer sees it, and `[ ... ]` drops out when a param inside it is empty. An action without one
shows "Sends the game an event" and its name, so a new game works with no card and gets better with one.

### A new game

1. **The game side:** implement the `GameModule` contract and the commands and events in GAME-SPEC. One module, no
   imports from the studio. All sound goes through the audio port; every file is a key through the asset resolver.
2. **The studio side:** add the game to `app/handover/games.ts`: id, name, icon, actions, params, outcomes. If it only
   answers win or lose, the studio's standard game (`STANDARD_GAME`) already covers it with no code.
3. **The composition host** (a bridge in the game's repo) maps story events to game commands and the game's replies back
   to outcomes. Copy the shape of `downbeatBridge.ts`; do not invent a new handshake.
4. **A test story** published from the studio, a `story:refresh` script, and a mock-host test (GAME-HANDOFF section 10).

## 5. Rules that keep it maintainable

- **No story knowledge in the game loop.** The loop reads declarations and the tracker; it does not know a lesson exists.
- **No game knowledge in the story.** A step holds ids and params; the editor describes them in words.
- **Everything is one-shot and session-checked.** Each command carries a `requestId`, is accepted once, and is refused
  for another session, so a late or repeated command cannot touch a newer battle.
- **Input ownership is explicit** (GAME-HANDOFF section 5): the host revokes game input before the story takes it, and
  the dialog's closing click never reaches the game.
- **Published stories keep working.** Rename an id only with an alias for the old one.
- **Decouple from the first tutorial.** Declarations may name units and targets (`khang`, `grunt-1`) today, because
  there is one lesson. A second lesson must not copy them: move the actors into the objective's params first.
- **Tests with every change**, and a changelog line when a player or a writer sees something different.
- **Docs in the same change.** This file lives only in the kit. A change to it is a kit release (a tag); the studio and
  the games update to the new tag. The studio's GAME-HANDOFF and the game's STORY-INTEGRATION and GAME-SPEC must still
  tell the same story as this file.
- **Run the conformance suite.** A game is done when `signalCases`, `handshakeCases` and `declarationCase` from
  `vortex-game-kit/conformance` pass in its tests.

## 6. Keeping the two lists and the published story in step

| Thing                        | Where                                          | How it stays true                                                                                |
| ---------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Objectives the game supports | The game's objective list                      | The source of truth                                                                              |
| Objectives the editor offers | `app/handover/games.ts` (options, outcomes)    | Edited in the same change as the game's list                                                     |
| The story the game plays     | The published story                            | The writer republishes; the game runs `pnpm story:refresh <published-id> <local-name> <game-id>` |
| The editor's warnings        | `app/utils/handoverEdit.ts` (`handoverIssues`) | Derived from the options above                                                                   |

A change to an objective is finished only when both lists match and the story has been republished and refreshed.

## 7. For agents

- Start with the kit's `AGENTS.md`, then this file, then the game's own `docs/STORY-INTEGRATION.md`.
- Work in the layer the decision belongs to (section 1). If a request seems to need a story-specific `if` in a game's
  loop, it needs a declaration instead.
- When you add or change an objective, an input rule or an event param, follow section 4 completely, including both
  repositories' docs, before you say it is done.
- Say what you did not do. If a game cannot meet a rule here yet, write it under "Open" in that game's docs rather than
  working around it.
