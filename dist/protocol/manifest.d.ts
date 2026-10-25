import type { LayerEditorDescriptor } from "./layers.js";
/**
 * The manifest: a small JSON file a game serves at `<game address>/vortex-manifest.json` so an editor can learn what the
 * game is and what it can do, instead of being told by hand (docs/PREVIEWER-STANDARD.md, section 9). Plain data: it
 * never contains code. Pure, no dependencies. The editor's side of fetching it is `manifestUrl` in `previewerHost.ts`.
 */
/** Rises only when a manifest changes in a way an older editor cannot ignore. */
export declare const MANIFEST_CONTRACT = 1;
/** Where the manifest lives, relative to the game's address. */
export declare const MANIFEST_PATH = "vortex-manifest.json";
/** The messages beyond `load` and `command` a previewer may answer. Absent means the game does not answer it. */
export type ManifestMessage = "validate" | "references" | "migrate";
export declare const MANIFEST_MESSAGES: readonly ManifestMessage[];
/** One kind of content the game owns, for example its maps. */
export interface ManifestContent {
    /** The editor module it belongs to, for example `map`. */
    module: string;
    /** The kind inside the module, for example `map`. */
    type: string;
    /** What a person calls it. */
    title: string;
    /** The version the game writes today; older maps are brought up with `migrate`. */
    schemaVersion: number;
    /** The editor the game suggests for it, as a name the editor knows (for example `json`). */
    editor?: string;
    /** For a 2D map made of pictures on a stage: where things are, so a layer editor can open it (section 10). */
    layers?: LayerEditorDescriptor;
}
export interface GameManifest {
    contract: number;
    /** The id an editor files the game's content under. */
    id: string;
    name: string;
    version?: string;
    previewer?: {
        /** The previewer page, relative to the game's address. Defaults to `previewer.html`. */
        page?: string;
        messages: ManifestMessage[];
    };
    content: ManifestContent[];
}
export type ManifestReadResult = {
    ok: true;
    manifest: GameManifest;
    /** The game is newer than this kit: the parts understood are given, the rest is ignored. */
    newer: boolean;
    /** Parts of the manifest that were left out because they are wrong (a broken `layers`, say). */
    warnings?: string[];
} | {
    ok: false;
    errors: string[];
};
/**
 * Reads the parsed JSON of a manifest. Unknown fields are ignored. A newer `contract` is not an error: whatever can be
 * understood is returned with `newer: true`, and the editor can say the game is newer than it. An older or missing
 * contract, or a wrong shape, is refused with sentences about what is wrong.
 */
export declare function readManifest(data: unknown): ManifestReadResult;
