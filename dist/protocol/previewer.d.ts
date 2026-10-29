/**
 * The previewer: a page a game serves (for example `/previewer.html`) so an editor such as Vortex Studio can show a
 * map in the real game, in an iframe, with pictures taken live from the editor. The editor sends data, never code.
 * What the map contains is the game's own business: the kit only knows the envelope (docs/PREVIEWER-STANDARD.md).
 *
 * Pure types and validators, no runtime and no dependencies. The editor side (building messages, finding the pictures a
 * map needs) is in `previewerHost.ts`.
 */
/** Rises only when a message changes in a way an older side cannot ignore. Every message carries it. */
export declare const PREVIEWER_PROTOCOL_VERSION = 1;
/** The most pictures one `load` message may carry. */
export declare const MAX_PREVIEW_ASSETS = 500;
/** A picture that lives in the editor is written `asset:<id>` anywhere a map names a picture. */
export declare const ASSET_REF_PREFIX = "asset:";
/** `asset:<id>` for an id, or `null` when the id is not one an editor hands out. */
export declare const assetRef: (id: string) => string | null;
/** The id inside an `asset:<id>` text, or `null` when the text is anything else (a site path, say). */
export declare function assetIdOf(text: unknown): string | null;
export declare const isAssetRef: (text: unknown) => text is string;
export type PreviewerCommandName = 'restart' | 'pause' | 'resume';
/** Editor to game: play this map. `assets` gives a web address for each `asset:<id>` the map uses. */
export interface PreviewerLoad<Document = unknown> {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'load';
    document: Document;
    assets: Record<string, string>;
}
/** Editor to game: do something with the map that is running. */
export interface PreviewerCommand {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'command';
    name: PreviewerCommandName;
}
/** Optional correlation id: the game copies it into the reply so an editor can match answers to questions. */
export type PreviewerRequestId = string;
/** Editor to game: list what is wrong with this map, without playing it. Needs the manifest to declare `validate`. */
export interface PreviewerValidate<Document = unknown> {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'validate';
    id?: PreviewerRequestId;
    document: Document;
}
/** Editor to game: which pictures and characters does this map use? Needs `references` in the manifest. */
export interface PreviewerReferences<Document = unknown> {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'references';
    id?: PreviewerRequestId;
    document: Document;
}
/** Editor to game: bring a map saved under an older `schemaVersion` up to the current one. Needs `migrate`. */
export interface PreviewerMigrate<Document = unknown> {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'migrate';
    id?: PreviewerRequestId;
    document: Document;
    /** The `schemaVersion` the map was saved with. */
    from: number;
}
export type PreviewerIncoming<Document = unknown> = PreviewerLoad<Document> | PreviewerCommand | PreviewerValidate<Document> | PreviewerReferences<Document> | PreviewerMigrate<Document>;
/** A character a map uses, optionally with the place (slot) where it appears. */
export interface PreviewerCharacterRef {
    id: string;
    slot?: string;
}
/** Editor actions a game may forward when the person presses their shortcut inside the game page. */
export type PreviewerShortcutName = 'toggle-preview';
/** What went wrong. A game uses these three; an editor must cope with a code it does not know. */
export type PreviewerErrorCode = 'bad_message' | 'invalid_map' | 'start_failed' | (string & {});
/** Game to editor. `ready` is sent once the page is listening; the editor waits for it before it sends a map. */
export type PreviewerOutgoing = {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'ready';
} | {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'loaded';
    warnings: string[];
} | {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'validated';
    id?: PreviewerRequestId;
    /** Sentences about what is wrong; empty when the map is fine. */
    problems: string[];
} | {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'referenced';
    id?: PreviewerRequestId;
    /** Editor picture ids (the part after `asset:`), each once. */
    assets: string[];
    characters: PreviewerCharacterRef[];
} | {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'migrated';
    id?: PreviewerRequestId;
    schemaVersion: number;
    document: unknown;
} | {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'shortcut';
    /** The editor action the person asked for while the game had the keyboard, such as closing the preview. */
    name: PreviewerShortcutName;
} | {
    protocol: typeof PREVIEWER_PROTOCOL_VERSION;
    type: 'error';
    code: PreviewerErrorCode;
    message: string;
    details?: string[];
};
export type PreviewerReadResult<Document = unknown> = {
    ok: true;
    message: PreviewerIncoming<Document>;
} | {
    ok: false;
    error: string;
};
/** Only web addresses (or paths on the game's own site): a picture link never needs anything else. */
export declare function isSafePictureUrl(value: unknown, base: string): boolean;
/**
 * Checks a message from the page that embeds the previewer. Anything not recognised is refused with a reason, which
 * the game reports as `bad_message`. `base` is the game's own address (for paths). `checkDocument` is the game's own
 * rule for what a map must contain; it returns a sentence about what is wrong, or `null` when the map is acceptable
 * for loading (whether it can be played is decided later and reported as `invalid_map`).
 */
export declare function readPreviewerMessage<Document = unknown>(data: unknown, base: string, checkDocument?: (document: unknown) => string | null): PreviewerReadResult<Document>;
