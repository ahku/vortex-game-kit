import { z } from 'zod';
import { LangCode } from './common';
/**
 * Asset kinds. Prototype roles map as: avatar/full body -> portrait, item -> object, event illustration -> scene
 * (a full-screen picture that shows something happening instead of a video), animation -> video.
 */
export declare const ASSET_KINDS: readonly ["background", "portrait", "object", "scene", "effect", "music", "sfx", "voice", "video"];
export declare const AssetKind: z.ZodEnum<{
    object: "object";
    music: "music";
    sfx: "sfx";
    effect: "effect";
    video: "video";
    voice: "voice";
    portrait: "portrait";
    scene: "scene";
    background: "background";
}>;
export type AssetKind = z.infer<typeof AssetKind>;
/**
 * What an uploaded file is for. One role per asset; it decides which pickers offer it first and what name is
 * suggested, but it never locks the file: any image can still be used wherever an image fits.
 */
export declare const ASSET_ROLES: readonly ["portrait", "background", "scene", "object", "music", "sfx", "voice", "video", "normal"];
export type AssetRole = (typeof ASSET_ROLES)[number];
export declare const isAssetRole: (value: unknown) => value is AssetRole;
/** Whether a role belongs to images, audio or video. */
export declare const ROLE_MEDIA: Record<AssetRole, 'image' | 'audio' | 'video'>;
/**
 * Roles that pictures are not picked from: a normal map is made for a color picture in the relief editor and found
 * through it (plan 027), not chosen as a picture of its own. Pickers list it only when asked for by role.
 */
export declare const HIDDEN_ROLES: readonly AssetRole[];
/** The name prefix a role suggests (`char/<id>/` is used for portraits when the character is known). */
export declare const ROLE_PREFIX: Record<AssetRole, string>;
/**
 * Where an asset came from, recorded once when the file is uploaded and never changed by tagging or sorting (plan 024).
 * `story` and `module` carry the id of that story or game; the name is saved with it so the list can still say where a
 * file came from after the story or game is renamed or removed. `guess` marks an origin worked out later, not seen.
 */
export declare const ASSET_ORIGIN_KINDS: readonly ["story", "module", "assets", "import", "ai"];
export type AssetOriginKind = (typeof ASSET_ORIGIN_KINDS)[number];
export interface AssetOrigin {
    kind: AssetOriginKind;
    id?: string;
    name?: string;
    guess?: boolean;
}
/** What an upload says about where it comes from: `story:<id>`, `module:<game id>`, or just `assets`, `import`, `ai`. */
export interface AssetOriginRequest {
    kind: AssetOriginKind;
    id?: string;
}
export declare function parseAssetOriginRequest(value: unknown): AssetOriginRequest | null;
/** The text form of a request, for a query string. */
export declare const formatAssetOriginRequest: (origin: AssetOriginRequest) => string;
/** A name prefix: lower-case path parts ending in `/`, such as `bg/` or `char/ana/`, or in `-`, such as `char/ana/face-`. */
export declare const ASSET_PREFIX: RegExp;
export declare const isAssetPrefix: (value: string) => boolean;
export declare const AssetEntrySchema: z.ZodObject<{
    kind: z.ZodEnum<{
        object: "object";
        music: "music";
        sfx: "sfx";
        effect: "effect";
        video: "video";
        voice: "voice";
        portrait: "portrait";
        scene: "scene";
        background: "background";
    }>;
    url: z.ZodOptional<z.ZodString>;
    hash: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    durationMs: z.ZodOptional<z.ZodNumber>;
    bytes: z.ZodOptional<z.ZodNumber>;
    credit: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type AssetEntry = z.infer<typeof AssetEntrySchema>;
export declare const AssetManifestSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    assets: z.ZodRecord<z.ZodString, z.ZodObject<{
        kind: z.ZodEnum<{
            object: "object";
            music: "music";
            sfx: "sfx";
            effect: "effect";
            video: "video";
            voice: "voice";
            portrait: "portrait";
            scene: "scene";
            background: "background";
        }>;
        url: z.ZodOptional<z.ZodString>;
        hash: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        durationMs: z.ZodOptional<z.ZodNumber>;
        bytes: z.ZodOptional<z.ZodNumber>;
        credit: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    imageSizes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
}, z.core.$strict>;
export type AssetManifest = z.infer<typeof AssetManifestSchema>;
export { LangCode };
/** What the studio accepts as uploads. The server checks the file's real bytes, not just its name or declared type. */
export declare const UPLOAD_TYPES: {
    readonly 'image/png': {
        readonly media: "image";
        readonly ext: "png";
    };
    readonly 'image/jpeg': {
        readonly media: "image";
        readonly ext: "jpg";
    };
    readonly 'image/webp': {
        readonly media: "image";
        readonly ext: "webp";
    };
    readonly 'audio/mpeg': {
        readonly media: "audio";
        readonly ext: "mp3";
    };
    readonly 'audio/ogg': {
        readonly media: "audio";
        readonly ext: "ogg";
    };
    readonly 'video/mp4': {
        readonly media: "video";
        readonly ext: "mp4";
    };
    readonly 'video/webm': {
        readonly media: "video";
        readonly ext: "webm";
    };
};
export type UploadMime = keyof typeof UPLOAD_TYPES;
/** What a file picker's `accept` should list for each kind of media. */
export declare const UPLOAD_ACCEPT: Record<MediaKind, string>;
export declare const UPLOAD_ACCEPT_ALL: string;
export type MediaKind = (typeof UPLOAD_TYPES)[UploadMime]['media'];
export declare const UPLOAD_MAX_BYTES: Record<MediaKind, number>;
/** A video above this size is slow to load on a phone; the picker warns about it. */
export declare const VIDEO_WARN_BYTES: number;
/** The widths, in pixels, a picture can be served at (`?w=` on a file URL snaps up to one of these). */
export declare const IMAGE_WIDTHS: readonly [320, 560, 960, 1300, 1920, 2560];
/** The width each kind of picture is asked for at (a size from `IMAGE_WIDTHS`). Change a size here, not at the call site. */
export declare const IMAGE_SIZE: {
    /** Small previews: asset grid, expression chips, dialog log, map. */
    readonly thumbnail: 320;
    /** A speaker's face in the dialog box. */
    readonly dialogPortrait: 560;
    /** Character avatars. Only shown in editor. */
    readonly avatar: 320;
    /** Portraits on the stage. */
    readonly stagePortrait: 1300;
    /** Pictures in a sequence. */
    readonly sequencePicture: 1300;
    /** Backgrounds, stage objects and anything else shown full screen. */
    readonly background: 1920;
};
/** The served width for a requested one: the next size up, or null (the original) when it is missing, invalid or larger. */
export declare function snapImageWidth(requested: unknown): number | null;
/** The upload type a file really is, judged from its first bytes; null when it is none of the accepted types. */
export declare function sniffUploadType(bytes: Uint8Array): UploadMime | null;
/**
 * A workspace asset key made from a file name: letters, digits and _ . - only, no extension, never empty,
 * after an optional `prefix` such as `bg/`. A taken name gets -2, -3 and so on.
 */
export declare function assetSlugFromName(name: string, taken: ReadonlySet<string>, prefix?: string): string;
/**
 * Rewrites asset names inside a story document or character in place, using `renames` (old name to new name).
 * Only fields that hold an asset name change (`asset`, `voice`, a sequence item's `src`, the story's `assets` list and a character's
 * `expressions` and `faces`), so dialogue that happens to read the same is left alone. Returns how many names changed.
 */
export declare function renameAssetRefs(node: unknown, renames: ReadonlyMap<string, string>): number;
/**
 * Notes, in `found`, the role each asset name is used for in a story document or character: a background
 * change, music, a sound effect, a shown object, a voice line or a portrait expression. The first use wins.
 */
export declare function collectAssetRoles(node: unknown, found: Map<string, AssetRole>): void;
/**
 * Calls `found` with every asset name a story document or character uses: `asset` and `voice` fields, the
 * story's `assets` list and a character's `expressions`. Dialogue that reads the same as a name is not counted.
 */
export declare function forEachAssetRef(node: unknown, found: (name: string) => void): void;
/** `bytes=500-` or `bytes=0-999` as numbers; null when absent or not a single plain range. */
export declare function parseByteRange(header: string | undefined): {
    start: number;
    end?: number;
} | null;
