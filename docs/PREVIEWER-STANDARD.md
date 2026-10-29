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
| `shortcut` | `name`: `toggle-preview`              | The person pressed the editor's preview shortcut inside the game. *(optional)* |
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

> **Status: experimental.** The layer editor description, with the terrain, collision, rectangle, event, battle and
> enablement parts below, was written from one game (Downbeat). The picture fields, depth bands and manifest wiring
> are expected to suit other 2D stage games; the `battle` block and the terrain/collision split carry Downbeat's
> encounter model. Until a second game uses them, treat the whole section as able to change, and do not add to it for
> one game's sake.

The editor owns the names of a picture's fields. The game's map must call them exactly this:
`id`, `src`, `x`, `y`, `width` (always) and `layer`, `rotation`, `flipX`, `flipY`, `anchor`, `sortY`, `parallax`,
`animation` (optional: the description lists which ones the game understands in `pictureFields`; the editor shows
controls only for those).

Games can declare presentation extras through `fields`, without extending `pictureFields`: for example `opacity`
(number 0–1, default 1) and `blendMode` (choice, default `source-over`). Studio presents declared opacity as percent
and composites declared blend modes on the stage; each game must implement and validate the modes it advertises.
An editor may resolve linked asset appearance defaults into detached Preview data for declared fields. An absent
instance field inherits; an explicit instance value wins, including 100% opacity and Normal blending. Editors must
preserve these explicit values when writing map data, and must not persist resolved inheritance as an override.
Map width/height and picture dimensions use the game's world/map units, independent of image pixels and editor
snap-grid spacing. Source-grid margin/spacing and frame rectangles remain image pixels.

A game declaring `animation` accepts a resolved uniform spritesheet definition on each picture:
`{ columns, rows, margin, spacing, firstFrame, frameCount, fps, playback, randomStart?, animated? }`. Rows/columns are integers 1–256,
with at most 4,096 cells. Margin/spacing are integer source pixels 0–4,096. Frames are zero-based, read left-to-right
then top-to-bottom; firstFrame is nonnegative, frameCount is 1–4,096 and their sum must fit the grid. FPS is finite,
0.1–120. Playback is `loop`, `once` (hold the last frame), or `ping-pong` (do not double the endpoints).
Source dimensions minus outer margins/inter-cell spacing must leave at least one source pixel per cell axis.
Exact divisibility is preferred. For resized sheets with fractional nominal cell dimensions, round each cell's
start and end boundary independently to source pixels; shared boundaries must agree without gaps or overlaps.
Display size/aspect ratio uses the nominal cell dimensions, so uneven pixel rounding never changes a sprite's
screen size between frames. Editors may show a nonblocking warning for fractional cells.
Picture width/implicit height and local coordinates refer to one cell, including its transparent padding, rather
than the complete sheet. Explicit height, transforms, ground lines and depth behavior remain placement properties.
The game validates animation data and draws/samples the current cell using its pause-aware presentation clock;
reduced motion freezes on firstFrame. Absence means a static picture.

`animated` is an optional boolean, default true for existing sheets. When false, retain the grid and all playback
settings but always draw firstFrame, ignoring elapsed time and randomStart. New library sheets start with animation
disabled; layout fields remain editable and playback controls appear only when animation is enabled.

`randomStart` is an optional boolean, default false. When enabled, each placed picture starts at a stable phase
based on its `id`, without changing FPS or the authored frame range. Hash UTF-16 code units with FNV-1a: start at
2166136261 and apply `Math.imul(hash ^ charCode, 16777619)` per code unit, then use `(hash >>> 0) % frameCount`
as a frame-step offset before the usual loop/once/ping-pong calculation. With no instance id, use zero offset.
Once starts partway through and still holds the final frame. Reduced motion and an editor's Animations Off show
firstFrame without the offset. Library thumbnails and frame scrubbing retain their explicit frame selection.

An editor may resolve library animation into a detached Preview document at the picture path declared by the game;
it must preserve authored transforms and opaque fields. Explicit per-picture animation wins over library defaults.
Replacing or editing a library asset must refresh both its file URL and animation metadata. Games without the
reserved `animation` capability do not receive inferred animation fields. This fills the existing optional field;
the message envelope, descriptor version and kit runtime exports are unchanged.

The game says where things live and what is special about it:

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

The layer descriptor may also declare `regions`, `sections`, `events` and `battle`. Older editors ignore these optional fields.
They describe forms and data locations, never executable rules. Games still validate and interpret the map, and the
normal previewer `load`/`validate` messages remain authoritative.

- `regions` uses the collision descriptor's polygon path, presets and geometry limits for non-gameplay named areas.
  Presets may have empty `values`. Saved region IDs stay stable; display names and shape forms use editor metadata.
- `sections` (optional) describes the parts of a long battle. It has everything `regions` has (`path`, `presets`,
  `constraints`, `icon`) plus `fields`, a list of per-row settings in the same form as `battle` fields (paths are
  inside one row; a `reference` field may point at the sections' own path, for example the section that comes next),
  an optional `help`, and an optional `previewStart`: a path in the map where an editor writes the id of the section
  a preview should start in. The editor writes it only into the copy it sends in `load` and `validate`, never into the
  saved map. The game decides what a section is and how the party moves between them.
- `events` describes an ID-bearing row list: `path`, `maxItems`, scalar `defaults`, `fields`, optional `help`.
  Every new row gets a fresh ID. Editors must refuse malformed lists rather than replace them.
- `battle` describes root-relative `fields` and optional `help`.
- `units` (optional) describes characters placed on the map. It is an ID-bearing row list like `events` (`path`,
  `maxItems`, scalar `defaults`, `fields`, optional `help`/`groups`) plus `kit` (the row field holding the game kit the
  row is based on), `position` (the row field holding an `{x, y}` point) and optional `character` (the row field linking
  a row to an authored character). `kit`, `position`, `character` and `id` must not overlap each other or any form
  field. The `fields` are the game's optional per-row settings; use `when` and nested paths such as
  `["waitUntil","kind"]` for conditional controls, and `reference` fields into the `units` list itself for targets.
  The kit values offered come from the character editor's presets. Games still validate placements.
  Optional `libraryGroups` (`{id, label, kits}`, each kit in at most one group) tell the editor how to sort the kit
  library, for example players and enemies; the editor draws no conclusions from the labels. Optional `definitions`
  is a root path where the editor puts the authored characters a map uses, as `{ [characterId]: definition }`, in the
  copy it sends to the game for a preview or release. It is never saved in the map. A row's `character` field names
  the entry; the game resolves it against its own character rules and validates it.
- A game may send `shortcut` (`name: "toggle-preview"`) when the person presses the editor's preview shortcut
  (Alt/Option+Enter) while the game page has the keyboard, so the editor can close the preview. Editors ignore names
  they do not know.
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

## Character authoring capability (version 1)

A content entry may declare `module: "character"`, `type: "character"`, `editor: "characters"` and a `characters`
descriptor read by `readCharacterEditor`. This is an optional additive manifest capability; old map integrations
remain unchanged and unknown/future character descriptors are ignored with a warning.

> **Status: experimental.** Written from one game (Downbeat, whose sprites are a body plus a head that looks down or
> up). `head-down`, `head-up` and the blink rule describe that sprite, so this descriptor is for games with that kind
> of character. A game with a different kind of character needs its own editor kind and descriptor, not this one.

The descriptor supplies `version: 1`, a safe relative `previewPage`, `presetPath` (the kit/preset identifier in the
game document), `presets` (`id`, `label`, opaque seed `data`), `properties` (the existing safe declarative form field
contract), `images` (`path`, `label` for `asset:<id>` image assignments), and `inherit` (paths whose reset restores
game defaults). Optional `layeredPath` marks a graphics subtree that only has controls while present. Paths are
validated against prototype pollution. The Studio must not infer combat mechanics from player/enemy labels.

Character data uses the same versioned content envelope, signed-asset preview messages and game-owned semantic
validation as maps. The editor preserves unknown game data. The game resolves absent overrides from its supported
kit, and its preview renders/plays the resolved definition. Draft persistence may permit incomplete documents;
preview rejection must identify problems. Publishing/placement resolution and action clip schemas are not defined
by this first capability.

Character graphic entries may additionally declare a setup `role` (`head-down`, `head-up`, `idle-body`, `portrait`,
`animation`) and `setupStep` 1–3, grouping/help, kit restrictions, initial part defaults, per-slot declarative
properties, source `sheet` paths (columns/rows/frame and optional margin/spacing), and an `animationPath`. Up to 64
slots are supported. The Studio must render the selected cell, preserving transparent padding and its pivot.

Optional root `layeredDefaults` initializes an empty layered character. `previewPath` identifies a transient hint
object in the document sent to the game. Each slot may supply plain scalar `preview` values: these are game-owned
context hints, never persisted by the editor. Frame inspection may add a source frame number to that transient
object. The game must validate/limit all hints, keep physical rules independent, and distinguish inspection of
authored artwork from actual gameplay playback. A character inspection page may accept incomplete artwork while
a real battle page applies stricter playability checks.

Slots may declare `state: {id,label,part,idle?}` to group body/head-down/head-up artwork in a state-first workbench.
`fallback` names another image slot's path used when this slot is unassigned. Editors display inherited artwork
without copying it into the document. Customizing starts a detached copy; Use Idle removes only that override.
Idle is the foundation; other states and animation are optional. Games must implement the same fallback resolution.

A slot may declare `sequencePath` for optional ordered image-frame authoring: `{frames,fps,playback}`. Each frame
contains `src`, `columns`, `rows`, `frame`, optional `margin`/`spacing`, and local `x`,`y`,`scale`. Sources may differ
per frame; source cropping lets existing spritesheets be converted without image processing. A sequence takes
precedence over the legacy uniform-sheet animation; removing it restores the part's base still. Frames are bounded
at 256; FPS/playback use the existing animation limits/modes. Frame offsets compose with the part alignment. Changes
use normal save/history; deleting a frame removes only its reference, never the uploaded asset. The game validates,
preloads and renders this optional data. Absent sequences preserve legacy documents.

An Idle `head-down` slot with a sheet may opt into `blinkPath`: `{frames:number[],fps,minInterval,maxInterval}`.
Frames are zero-based cells from the part's base sheet (1–256 ordered/repeated entries); FPS is 0.1–120 and
intervals are seconds, 0.1–120 with min <= max. This is a random one-shot overlay on normal Idle playback,
not a looping animation. The game cancels it outside Idle/front-facing and never inherits its behavior into
other states. Source, padding, scale and pivot come from the base part; no new asset references are introduced.
Preview uses the same game-owned scheduler. A transient `blink` counter requests one immediate blink without
saving that trigger or affecting gameplay. Older documents without the field retain their existing playback.

Slots with `sequencePath` may opt into `frameMotion: true`. Frames then additionally allow `rotation` in degrees
(default 0), `duration` in milliseconds (1–60000, absent means 1000/fps), and `transition: 'hold' | 'linear' | 'smooth'`
(default hold). Local x/y/scale keep their existing defaults. A transition interpolates transforms toward the next
pose, retaining the current source cell until the next frame boundary; smooth uses t*t*(3-2*t). Rotation follows
the shortest arc. Loop includes the last-to-first transition; Once holds its final pose; Ping-pong reverses the
pose path without duplicating end frames and uses the same transition on each edge in reverse. Each visited
frame owns its duration. Base part alignment composes outside the animated pose; game facing composes outside
both. Uniform FPS remains the default for frames without explicit duration. These are presentation transforms,
never gameplay movement/collision data. No image packing or pixel morphing occurs.

Frame poses may also set `mirror: boolean` (default false) to flip artwork left/right about the frame's local
pivot, after translation/rotation. It does not negate the authored offsets or rotation. Mirroring switches at
frame boundaries, including during a tween; it never interpolates through zero scale. Resetting frame motion
clears it along with other pose overrides. Blink artwork retains the underlying head pose's mirror flag.

### Character size inspection

A character editor may declare optional `sizing: {width, collisionRadius, movementRadius}`, each a safe path to a declared numeric property. Studio can highlight these fields in preview and offer a session-only proportional width/collision link. Both value edits share one history entry and honor declared radius bounds. These are editor capabilities, not simulation rules. Omission retains prior behavior.

Field focus supplies the opaque transient game hint `measurement` at `previewPath`; Downbeat accepts `width`, `collisionRadius`, and `movementRadius`. This hint is sent on a cloned preview document and is never saved. The game owns units, fixed references, default radius resolution and framing. Restoring focus restores the user's preview settings.
