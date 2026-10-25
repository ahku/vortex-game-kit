# Changelog

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
