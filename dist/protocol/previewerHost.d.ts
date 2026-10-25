import type { PreviewerCommand, PreviewerCommandName, PreviewerLoad, PreviewerOutgoing } from './previewer.js';
/** Every `asset:<id>` text anywhere inside a map, each id once, in the order found. */
export declare function assetIdsIn(value: unknown): string[];
/** Where a game's previewer page lives, from the address of the game; `null` unless it is a web address. */
export declare function previewerUrl(gameUrl: string, page?: string): {
    url: string;
    origin: string;
} | null;
export declare const previewerLoad: (document: unknown, assets: Record<string, string>) => PreviewerLoad;
export declare const previewerCommand: (name: PreviewerCommandName) => PreviewerCommand;
/**
 * What the previewer said, or `null` for anything else: other pages' messages are none of the editor's business. The
 * editor should also check `event.origin` and `event.source` before it calls this.
 */
export declare function readPreviewerReply(data: unknown): PreviewerOutgoing | null;
