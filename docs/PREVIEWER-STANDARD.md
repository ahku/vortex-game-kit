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

## 10. The layer editor description

A game whose map is pictures on a flat stage (a top-down or side-on 2D game) may add `layers` to its `content` entry in
the manifest. The layer editor then lets the owner drag, resize, flip and re-layer the pictures. A game without it keeps
the plain JSON editor, and a game of another kind (3D, say) gets an editor of its own instead.

The editor owns the names of a picture's fields. The game's map must call them exactly this:
`id`, `src`, `x`, `y`, `width` (always) and `layer`, `rotation`, `flipX`, `flipY`, `anchor`, `sortY`, `parallax`,
`animation` (optional: the description lists which ones the game understands in `pictureFields`; the editor shows
controls only for those). The game says only where things live and what is special about it:

```json
"layers": {
  "version": 1,
  "stage": { "width": ["arena", "width"], "height": ["arena", "height"], "backdrop": ["arena", "backdrop"] },
  "pictures": ["arena", "sprites"],
  "bands": [
    { "value": "under", "label": "Under characters" },
    { "value": "sorted", "label": "With characters", "sorted": true },
    { "value": "over", "label": "Over characters" }
  ],
  "defaultBand": "sorted",
  "pictureFields": ["rotation", "flipX", "flipY", "anchor", "sortY"],
  "fields": [{ "key": "solid", "label": "Solid", "type": "boolean", "default": false }]
}
```

- A path is a list of keys from the top of the map, 1 to 12 long. No path may be inside another one.
- `bands` are the values of `layer`, from back to front, with labels the owner sees. `sorted: true` marks a band whose
  pictures are ordered by `sortY` together with characters.
- `defaultBand` is the band of a picture that has no `layer`; the editor leaves `layer` out when a picture is put in
  that band. Without it, every picture must have a `layer`.
- `fields` are the game's own extra picture properties: `number`, `text`, `boolean` or `choice` (with 2 to 20
  `choices`). A key may not be a standard field name.
- The editor changes only the fields it knows. Everything else in the map, and any picture field it does not know, is
  kept exactly as it was.
- A broken or newer `layers` is left out by `readManifest` with a warning; the game is still added.
- Test it: run `checkLayerEditorAgainst(descriptor, map)` over every shipped map in the game's own tests; it returns
  sentences about what does not fit, or nothing.

### Optional terrain shapes (phase 4 foundation)

A layer descriptor may add `terrain: { path, kinds, constraints }`. `path` is the map's terrain-list path and must
not overlap the stage or pictures paths. `kinds` is the game's list of `{ value, label }` choices. A terrain row has
`id`, `kind` and ordered `points: [{ x, y }]` in stage/world units; either winding is accepted. Other row and map
fields must survive edits unchanged. An absent list means no terrain; a malformed list must never be replaced silently.

`constraints` declares `minPoints`, `maxPoints`, `convex: true`, `withinStage` (boolean), `grid` (positive snap step),
`maxShapes`, and optional hard `minEdge`. Grid is an editor snap preference, not a validity requirement. Games whose
short edges are advice omit `minEdge`; game validation remains authoritative for advice and gameplay. Terrain areas
may overlap. An absent terrain descriptor leaves existing picture-only editing unchanged. Older v1 readers ignore
this optional addition; no protocol or map-schema version changes. Collision-wall declarations reuse the geometry tools through a separate optional declaration below.


### Optional collision shapes

`layers.collisions` declares `{ path, presets, constraints }` for convex collision rows (`id`, `points`, plus
opaque game properties). Paths must not overlap terrain, stage or picture paths. Constraints have the same meaning
as terrain constraints; grid and short-edge advice are not hard validity rules.

Each preset has `value`, `label` and `values`: safe property names mapped to strings, finite numbers, booleans or
null. Null removes that property and restores the game's absent-field default. Applying a preset removes the union
of properties declared by the presets before writing its non-null values; every undeclared map/row/corner field
survives. `id`, `points`, `kind` and prototype keys cannot be preset properties. Presets do not write a terrain
`kind` into a collision row. To display a row, prefer the matching preset with the most non-null values, then a
fallback preset with no non-null values. The game declares the meaning of every property.

The optional addition does not change protocol, layer-description or map-schema versions. Older readers ignore
it. Editors can display terrain and collision rows together but must keep their source paths, counts and per-kind
limits separate; ids in different lists may be identical.


### Optional rectangle lists

`layers.rectangles` declares up to 16 rectangle families. Each entry supplies `id`, `label`, `group`, `path`,
`rectangle: { x, y, width, height }` (the game's coordinate property names), `presets`, `constraints`, and optional
`fields` using the existing game-field types. Constraints use the shape rules with both point counts set to four.
Preset values follow collision semantics; neither presets nor fields may overwrite ids or mapped coordinates.
All list paths must be disjoint from stage, pictures, terrain, collision and other rectangle paths.

Rows use the mapped coordinate properties and optional stable `id`; legacy rows without ids may be given an id
when edited. Other properties survive edits. Editors render/edit these as rectangles and must not offer polygon
conversion for a rectangle-only family. Labels, grouping, presets, field defaults and limits come from the game;
placement relationships and gameplay validation remain the game's responsibility. Older readers ignore this
optional addition; protocol and layer-description versions remain unchanged.


### Optional backdrop fit path

`layers.stage.backdropFit` is an optional safe map path, disjoint from every other declared path. It requires a
`stage.backdrop` path. Values use standard image fitting semantics: `stretch` fills the stage (the absent-field
default), `contain` preserves aspect ratio with empty space, and `cover` preserves aspect ratio while cropping.
The game declares this path only when it supports these semantics. Older readers ignore the optional path;
protocol, layer-description and map-schema versions remain unchanged. Editor-only dimming/visibility belongs to
editor preferences or envelope metadata and must not be written to this gameplay path.


### Optional shape icons

Terrain, collision and rectangle-list declarations may include a family `icon`. Each terrain kind and each
collision/rectangle preset can override it with its own `icon`. Editors prefer the type icon, then the family icon,
then a generic fallback. Icons are presentation metadata only, never fields in a saved map.

An icon is `{ path, viewBox?, fillRule? }`: a monochrome SVG path, an optional four-number view box (default
`[0, 0, 24, 24]`), and optional `nonzero` or `evenodd` fill rule (default `nonzero`). View-box width and height must
be positive and all four finite coordinates must have absolute values at most 1,000,000. The path accepts SVG
commands/numbers only, at most 8,192 characters. The editor applies its UI color and preserves aspect ratio. No SVG
markup, URLs or event attributes are accepted. These optional presentation fields do not change gameplay contracts.
A game may maintain its own reusable icon library and copy selected definitions into the static manifest; Studio
needs no knowledge of library names or game-specific types.

### Optional type descriptions

Terrain kinds and collision/rectangle presets can include `shortDesc`, separate from the short `label`.
It is optional plain text (1–240 characters, trimmed), shown as muted supporting information in type pickers and
inspectors (palette explanations use 50% opacity). `description` is accepted as a legacy input alias, but readers return `shortDesc`. Put explanations here rather than parenthesized suffixes in labels. It is presentation metadata only.

### Optional Events and Battle authoring

The layer descriptor may also declare `regions`, `events` and `battle`. Older editors ignore these optional fields.
They describe forms and data locations, never executable rules. Games still validate and interpret the map, and the
normal previewer `load`/`validate` messages remain authoritative.

- `regions` uses the collision descriptor's polygon path, presets and geometry limits for non-gameplay named areas.
  Presets may have empty `values`. Saved region IDs stay stable; display names and shape forms use editor metadata.
- `events` describes an ID-bearing row list: `path`, `maxItems`, scalar `defaults`, `fields`, optional `help`.
  Every new row gets a fresh ID. Editors must refuse malformed lists rather than replace them.
- `battle` describes root-relative `fields` and optional `help`.
- Form fields use `path`, `label`, `type`, optional `help`/`required`/`default`; types are `text`, `number`, `boolean`,
  `choice`, `choices` (multiple), `reference`, `references` (multiple). Choices are `{value,label}` pairs. References
  declare a root-document list `path`, row `id` key and optional `label` key; they do not import game unit definitions.
  A field may constrain `min`, `max`, `integer`, `maxLength` and declare `when: {path,values}` relative to its form.
- Defaults describe absent-field behavior; opening a form must not serialize them. Explicit `false` and `[]` differ
  from absence. Reset removes a property. Changing a discriminator removes only declared inactive dependent fields,
  retaining unknown siblings, and applies required dependent defaults. Missing references stay visible as errors.
- All paths use the same safe-key rules as picture paths. Form write paths must not overlap; collection paths must
  not overlap other layer data. Fields cannot edit an event row's ID. Each action joins the editor's save/lock and
  undo history; continuous numeric scrubbing forms one entry.

Unit reference controls initially list IDs already present in the document. Reusable character definitions, team-aware
character-library pickers and pair authoring require the separate character contract. No game-specific team rules or
fallback-party IDs belong in Studio.

Form presentation may additionally declare `groups: [{id,label}]` and put a field in a `group`. Editors present these
as optional disclosures; hiding a group never removes its values. A choice field's `unsetLabel` supplies an actual
absent/default option, with no synthetic value written to the map. It cannot be required or have another default.
A reference field's `emptyLabel` explains how to add missing targets. Optional multi-value fields can declare
`emptyIsDefault: true` when clearing the control must remove the field; without it, explicit `[]` is preserved.
These are presentation/editing contracts, not gameplay semantics.

### Optional gameplay enablement (0.8.0)

A layer descriptor may opt in with `enablement: {}`. This declares the standard optional `enabled` boolean on
picture, terrain, collision, rectangle, region and event rows: missing/true means included; false means excluded
from gameplay. `enablement.backdrop` may name an independent boolean path for the backdrop. Its path cannot overlap
another declared path. Games without this capability get an unavailable power control in Studio, with an update
explanation, and no writes. Older editors ignore the optional descriptor addition.

The editor preserves disabled records and unknown fields, shows a struck-through name, and applies enablement as
one normal undoable map edit. Disabled records stay editable and visible unless separately hidden with the eye.
Editor visibility/locks are separate editor metadata and must never be interpreted as gameplay enablement.
The game must filter the playable copy before spawn checks, simulation and rendering; Preview and normal game
start must agree. Dependent-reference semantics and validation belong to the game. Ship runtime support before
advertising the capability. Introduced in 0.8.0; earlier published tags remain unchanged.
