# Changelog

## 0.12.0

- Optional `libraryGroups` and `definitions` on the `units` layer descriptor: how the character library sorts kits, and
  where an editor puts the authored characters a map uses when it sends the map to the game.
- Optional `shortcut` message (game to editor, `toggle-preview`) so a game can pass the editor's preview shortcut on
  while it has the keyboard. Existing games and editors are unaffected; protocol and manifest versions are unchanged.

## 0.11.0

- Add optional `units` to the layer descriptor: a row list of placed characters with game-declared per-row settings,
  the `kit`, `position` and optional `character` locations. Editors can offer a character library and a per-unit
  inspector without knowing combat rules. Existing games and editors are unaffected; protocol and manifest versions
  are unchanged. Like the other editor descriptors it is experimental and was written from one game.

## 0.10.0

- Add optional `sizing` to the character editor descriptor: `width`, `collisionRadius` and `movementRadius`, each a safe
  path to a numeric property the descriptor declares. Editors can highlight those fields in the preview and offer
  proportional resizing. The game receives the field in focus as a transient hint at `previewPath`, never saved.
- Document the optional `animated` field of a spritesheet definition (default true for existing sheets). When false the
  grid and playback settings are kept but the sheet always draws its first frame.
- Mark the layer and character editor descriptions experimental in the docs: they were written from one game. Fix the
  install line in the README and AGENTS.md.
- Existing games and published stories remain compatible; protocol and manifest versions are unchanged.

## 0.9.0

- Add optional game-declared character editing: presets, base properties, layered body/front/rear artwork,
  state grouping, setup steps, independent Idle inheritance, safe sheet layouts and inspection hints.
- Describe ordered image-frame sequences and optional Idle/front blinking without introducing gameplay logic.
- Add the optional frame-motion capability for local position, scale, rotation, timing, tweening and mirroring.
- Validate capability declarations and safe authoring paths; preserve other content when a character declaration
  is unsupported. Export the character descriptor types and reader through the pure protocol entry point.
- Document shared graphic animation/appearance defaults and stable randomized sprite starting frames.
- Existing games and published stories remain compatible; protocol and manifest versions are unchanged.

## 0.8.0

- Optional layer `enablement` capability for game-owned enabled/disabled items and an independent backdrop flag.
  Disabled authoring records are retained; games apply enablement before preview and play.
- Validate safe, non-overlapping backdrop enablement paths. Existing descriptors stay valid; protocol and manifest
  versions are unchanged. Studio can also filter its own editor-disabled items without requiring this capability.

## 0.7.0

- Add optional `regions`, `events` and `battle` declarations to the layer editor descriptor. Games declare their
  own map paths, fields and limits; the kit introduces no gameplay rules.
- Event regions reuse convex polygon geometry, presets and constraints. Trigger lists declare stable row IDs,
  scalar defaults and a maximum item count.
- Add shared map-property descriptors and readers for text, number, boolean, single/multiple choice and
  single/multiple reference fields. References point to ID-bearing lists in the map, with optional display labels.
- Support conditional fields, required values, numeric bounds, integer constraints, text lengths and typed defaults.
  Optional groups, default-choice labels and empty-reference guidance describe how editors present the forms.
- Preserve the distinction between absent values, explicit `false` and empty lists. Optional multi-value fields can
  declare `emptyIsDefault` so clearing them restores the game's absent-field default.
- Validate safe paths, overlapping write/collection paths, field groups, choices and defaults. Trigger fields cannot
  overwrite row IDs. Export the new types, readers and safe-path helpers from `vortex-game-kit/protocol`.
- Document editing/reset behavior, unknown-field preservation and character-reference boundaries. Existing layer
  descriptions remain valid; protocol and manifest version numbers are unchanged.

## 0.6.0

- Add optional collision shape declarations with game-owned presets, safe scalar properties and shared convex
  geometry constraints.
- Add optional rectangle-list declarations with mapped coordinate keys, game-owned groups, presets, fields and
  limits.
- Add an optional stage backdrop-fit path with standard stretch/contain/cover values and safe-path validation.
- Support game-declared monochrome SVG path icons for terrain, collision and rectangle families, plus per-type and
  per-preset overrides. Icons can declare finite view boxes and evenodd fill rules, with family-icon fallback.
- Add optional `shortDesc` metadata to keep short type/preset labels separate from explanatory text. Accept
  `description` as a legacy input alias and return `shortDesc`.
- Existing picture and terrain descriptions remain valid.

## 0.5.0

- Add the optional terrain editor descriptor: a game declares its terrain collection path, terrain kinds and convex
  polygon geometry constraints, allowing editors to author terrain without hard-coding game rules.

## 0.4.1

- Layer editor description: `layer` is now an optional picture field, and a descriptor may give `defaultBand`, the band
  of a picture with no `layer`. Without `defaultBand` every picture still needs a `layer`. `LAYER_REQUIRED_FIELDS` no
  longer lists `layer`; `LAYER_OPTIONAL_FIELDS` does.

## 0.4.0

- The layer editor description (`docs/PREVIEWER-STANDARD.md`, section 10): a game with a 2D map of pictures on a stage
  adds `layers` to a manifest `content` entry, so a layer editor can open its maps. The editor owns the picture field
  names (`id`, `src`, `x`, `y`, `width`, `layer`; optional `rotation`, `flipX`, `flipY`, `anchor`, `sortY`, `parallax`,
  `animation`); the game says where things are, the depth bands and its own extra fields.
- `vortex-game-kit/protocol`: `LAYER_EDITOR_VERSION` (1), `readLayerEditor`, `valueAt`, `checkLayerEditorAgainst` (for
  a game's own tests, run over every shipped map), `LAYER_REQUIRED_FIELDS`, `LAYER_OPTIONAL_FIELDS` and the types.
- `readManifest` leaves out a broken or newer `layers` and reports it in a new `warnings` list (present only when not
  empty); the manifest is still accepted. `MANIFEST_CONTRACT` stays 1.

## 0.3.0

- The manifest (`docs/PREVIEWER-STANDARD.md`, section 9): a game serves `vortex-manifest.json` so an editor can learn
  its id, name, content kinds and abilities when the game is added. `vortex-game-kit/protocol`: `MANIFEST_CONTRACT`
  (1), `MANIFEST_PATH`, `readManifest`, `manifestUrl`, `GameManifest` and friends.
- Three optional previewer messages, each answered by the game: `validate` (`validated`), `references`
  (`referenced`) and `migrate` (`migrated`). New: `previewerValidate`, `previewerReferences`, `previewerMigrate`;
  `readPreviewerMessage` and `readPreviewerReply` know them.
- `vortex-game-kit/conformance`: `PreviewerSubject` may give `supports` and `oldMap`; `previewerCases` then also runs the
  cases for those messages. A game that gives neither is tested exactly as before.
- `PREVIEWER_PROTOCOL_VERSION` stays 1: an older game answers a new message with `bad_message`. Code that switches over
  `PreviewerIncoming` or `PreviewerOutgoing` now has more cases to handle.

## 0.2.0

- The previewer standard (`docs/PREVIEWER-STANDARD.md`): how a game lets Vortex Studio show a map in the real game, in
  an iframe, with pictures taken live from the studio. Its checklist is written for people and AI agents.
- `vortex-game-kit/protocol`: `PREVIEWER_PROTOCOL_VERSION` (1), the previewer message types, `readPreviewerMessage`,
  the `asset:<id>` rule (`assetRef`, `assetIdOf`, `isAssetRef`), `isSafePictureUrl`, and the editor's helpers
  (`assetIdsIn`, `previewerUrl`, `previewerLoad`, `previewerCommand`, `readPreviewerReply`).
- `vortex-game-kit/conformance`: `previewerCases`, the rules for a previewer's message handling.
- No change to the story protocol: `PROTOCOL_VERSION` stays 1.

## 0.1.0

- The game integration standard, now kept in one place.
- `vortex-game-kit/protocol`: handover types, the standard outcomes and events, the `game:*` message types, declaration
  and message validators, and `PROTOCOL_VERSION` (1).
- `vortex-game-kit/conformance`: test cases any game can run for the message rules, the handshake and its declaration.
