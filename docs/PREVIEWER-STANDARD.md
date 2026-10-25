# Previewer standard

How a game lets an editor (Vortex Studio) show a map in the real game, with pictures taken live from the editor.
This file is written so a person or an AI agent can follow it step by step. If you are an agent, read
[AGENTS.md](../AGENTS.md) first, then this file, and follow section 6 in order.

## 1. The idea

```
 Vortex Studio (editor)                          the game (its own site)
 ┌───────────────────────┐   iframe src          ┌──────────────────────────┐
 │ stores maps + pictures│ ────────────────────▶ │ /previewer.html          │
 │                       │ ◀── ready ─────────── │ listens for messages     │
 │ signs picture links   │ ── load {map, links}▶ │ checks, mounts, plays    │
 │                       │ ◀── loaded / error ── │ loads pictures by link   │
 └───────────────────────┘                       └──────────────────────────┘
```

- The game keeps its own map format, its own rules and its own deploy. The editor never imports game code.
- The editor sends **data, never code**. The game treats every message as untrusted.
- The pictures stay in the editor. The map names them as `asset:<id>`; the editor sends a short-lived web address for
  each one, and the game fetches them straight from the editor.

Who owns what:

| Part                                                                       | Owner  |
| -------------------------------------------------------------------------- | ------ |
| Map format, what is playable, rendering, the previewer page                | game   |
| Storing maps and pictures, signing picture links, the iframe, the editor UI | editor |
| The message envelope, `asset:<id>`, the checks in this file                | this kit |

## 2. The kit pieces

All in `vortex-game-kit/protocol` (pure, no dependencies):

- `PREVIEWER_PROTOCOL_VERSION`, the message types, `PreviewerErrorCode`.
- `readPreviewerMessage(data, base, checkDocument?)`: the game's one entry point for incoming messages.
- `assetIdOf(text)`, `assetRef(id)`, `isAssetRef(text)`: the `asset:<id>` rule. Ids are 1 to 64 of `A-Z a-z 0-9 _ -`.
- `isSafePictureUrl(url, base)`, `MAX_PREVIEW_ASSETS` (500).
- Editor side: `assetIdsIn`, `previewerUrl`, `previewerLoad`, `previewerCommand`, `readPreviewerReply`.

And in `vortex-game-kit/conformance`: `previewerCases(subject)`, test cases a game runs against its previewer.

## 3. The messages

Every message is an object with `protocol` (the version, 1) and `type`. Anything else is refused.

**Editor to game**

| type      | fields                                       | meaning                                                  |
| --------- | -------------------------------------------- | -------------------------------------------------------- |
| `load`    | `document` (the map), `assets` (id to URL)   | Play this map. The newest `load` wins.                   |
| `command` | `name`: `restart`, `pause` or `resume`       | Restart reloads the last map. Pause and resume hold/run. |
| `validate`   | `document`, optional `id`                 | List what is wrong with this map, without playing it. *(optional, section 9)* |
| `references` | `document`, optional `id`                 | Which pictures and characters does this map use? *(optional)* |
| `migrate`    | `document`, `from` (its schemaVersion), optional `id` | Bring an older map up to date. *(optional)* |

**Game to editor**

| type     | fields                                  | meaning                                                              |
| -------- | --------------------------------------- | -------------------------------------------------------------------- |
| `ready`  | none                                    | The page is listening. Sent once, after the listener is installed.   |
| `loaded` | `warnings`: list of sentences           | The map is playing. Pictures that failed to load are warnings here.  |
| `error`  | `code`, `message`, optional `details`   | Something was refused. Codes below.                                  |
| `validated`  | `problems`: list of sentences, `id`  | Answer to `validate`. An empty list means the map is fine.           |
| `referenced` | `assets`: picture ids, `characters`: `{id, slot?}`, `id` | Answer to `references`. Picture ids are the part after `asset:`. |
| `migrated`   | `schemaVersion`, `document`, `id`    | Answer to `migrate`: the map as the current version writes it.       |

Error codes: `bad_message` (not a message this standard defines, wrong version, unsafe picture address, unknown
command), `invalid_map` (well formed but the game cannot play it; `details` lists why), `start_failed` (the map was
fine but the game could not start it).

Rules:

1. Install the listener first, then send `ready`. The editor waits for `ready` before it sends a map.
2. An unknown or bad message is answered with `error` and `bad_message`. It never throws and never stops the page.
3. A refused map leaves the page usable: the next `load` works.
4. A picture that cannot load is a **warning**, not an error. Draw a visible placeholder (a dashed box with the name)
   and carry on. Never wait forever on a picture: use a time limit (Downbeat uses 20 seconds).
5. `restart` reloads the last map. Without one, it is ignored.
6. A game ignores fields it does not know.
7. `validate`, `references` and `migrate` are optional and need only an object as `document`: a map the game would
   refuse to play must still be described, so do not use the `load` rule on them. A game answers one only if its
   manifest names it (section 9). A game that does not know one answers `bad_message`, which is how an editor learns
   it is missing. The `id`, if sent, is copied into the reply.

## 4. Pictures

- A map names an editor picture as `asset:<id>` wherever it names a picture. Treat `asset:<id>` as a different kind of
  value from a path on the game's own site (`sprites/tree.png`); a map validator must accept both.
- Resolve `asset:<id>` through the `assets` object of the latest `load`. An id with no address is a warning.
- Load them with `crossOrigin = 'anonymous'`. The editor sends the matching CORS headers, and without it a picture
  drawn to a canvas cannot be read back.
- The addresses expire (Vortex Studio signs them for 10 to 20 minutes). A fresh `load` brings fresh addresses; do not
  store an address anywhere that outlives the page.
- Check each address with `isSafePictureUrl`: only `http` and `https`.

## 5. Who may talk to whom

The page is embedded by an editor on another origin, so both sides check:

- **The game page** accepts a message only when `event.source === window.parent` and `event.origin` is on its list of
  editor origins (the studio's address, plus `localhost` in development). It replies with `postMessage(reply, thatOrigin)`
  and never with `'*'`. The one exception is `ready`, which has to go out before the game knows the origin.
- **The game's host** must allow the framing: send `Content-Security-Policy: frame-ancestors <editor origins>` for the
  previewer page (on Netlify, in `public/_headers`), and do not send `X-Frame-Options` for it.
- **The editor** accepts a reply only from the iframe it opened (`event.source` and `event.origin`).
- **Picture access**: the editor serves private pictures to a game only if the game's origin is on the editor's
  `GAME_ORIGINS` list. The game's owner asks for this to be added. Exact origins, no wildcards.

## 6. Checklist: make a game previewable

Do these in order. Each step says how to know it is done.

1. **Install the kit.** `pnpm add https://github.com/ahku/vortex-game-kit/archive/refs/tags/v0.3.0.tar.gz`.
   Done when `import { readPreviewerMessage } from 'vortex-game-kit/protocol'` type checks.
2. **Let your map format hold `asset:<id>` pictures** next to ordinary site paths (`assetIdOf` / `assetRef`).
   Done when a map with a backdrop of `asset:abc` passes your validator.
3. **Give the game a way to resolve pictures.** A function from an id to an address, set once per `load`, used wherever
   the game turns a picture name into an image, with `crossOrigin = 'anonymous'`, a time limit and a placeholder.
   Done when a map with `asset:abc` and `assets: { abc: <address> }` shows the picture.
4. **Write the previewer session**, a function that takes one parsed message and does the work, so it can be tested
   without a browser: `load` checks the map with your own rules (`invalid_map` with `details`), mounts the game with the
   resolver, waits for the pictures (collect failures as warnings), starts, and replies `loaded`; `command` does
   restart, pause or resume. A newer `load` replaces the older one.
5. **Write the previewer page** (`previewer.html` and a small script): listen for `message`, check the source and the
   origin (section 5), call `readPreviewerMessage(data, location.href, yourDocumentCheck)`, hand the result to the
   session, reply to the sender's origin, and send `ready`. Add the page as a build input if your build is multi-page.
6. **Allow framing.** `frame-ancestors` for the editor origins on the previewer page (section 5).
7. **Run the conformance suite** (section 7).
8. **Tell the editor's owner your origin** so it goes on `GAME_ORIGINS`.
9. **Optional, once the basics work: serve a manifest** (section 9) and answer `validate`, `references` and
   `migrate` for the ones you name in it. Done when the conformance suite runs their cases (section 7).
10. **Check by hand once:** open the previewer page directly (it should wait, not crash), then use the editor's game
   preview page with your game's address and a map that uses one editor picture. Done when the picture shows in the
   game and a deliberately wrong map is reported as `invalid_map`.

## 7. Testing

```ts
import { previewerCases } from 'vortex-game-kit/conformance';

const subject = {
  async create() {
    const session = createYourPreviewerSession(/* fake mount, fake pictures */);
    return {
      // Deliver one message as the editor would; resolve with every reply sent for it.
      send: (message) => session.receive(message),
      playableMap: { /* a map your game can play */ },
      unplayableMap: { /* well formed, but your game refuses it */ },
      // Only if your manifest names them: the cases for those messages then run too.
      supports: ['validate', 'references', 'migrate'],
      oldMap: { document: { /* a map as an older version saved it */ }, from: 1 },
    };
  },
};
for (const c of previewerCases(subject)) it(c.name, c.run);
```

The suite checks the message handling in section 3. It does not check origins or headers; those are the manual steps.

## 8. Versions

- `PREVIEWER_PROTOCOL_VERSION` rises only when a message changes in a way an older side cannot ignore. Adding a field,
  a command or a message type is not such a change: an older game answers a new message with `bad_message`.
- Not yet: a manifest field for character types, objectives and terrain kinds. Until then those live in the editor's
  plan (plan 017 section 10) and each game's own code.

## 9. The manifest

A game may serve `vortex-manifest.json` at its own address (next to the previewer). It is plain data, never code, and
it saves the editor's owner from typing in what the game already knows. The editor reads it when a game is added.

```json
{
  "contract": 1,
  "id": "my-game",
  "name": "My Game",
  "version": "1.2.0",
  "previewer": { "page": "previewer.html", "messages": ["validate", "references", "migrate"] },
  "content": [{ "module": "map", "type": "map", "title": "Map", "schemaVersion": 3, "editor": "json" }]
}
```

- `contract` is the manifest's own version (`MANIFEST_CONTRACT`, 1). An editor that meets a higher one uses what it
  understands and says the game is newer than it. It never refuses a game for that.
- `id` is a lowercase slug (letters, digits, dashes; up to 40). The editor files the game's content under it.
- `previewer.messages` lists only the optional messages the game answers; leave it out if there are none.
- `content` says which kinds of content the game owns and the `schemaVersion` it writes today. `editor` is a
  suggestion, a name the editor knows; an editor that does not know it uses its plain JSON editor.
- Unknown fields are ignored. The kit gives `readManifest(json)` to check one and `manifestUrl(gameUrl)` for the
  address. The game does not need either: it just serves the file with CORS allowing the editor (`Access-Control-Allow-Origin`).
