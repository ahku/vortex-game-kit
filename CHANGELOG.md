# Changelog

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
