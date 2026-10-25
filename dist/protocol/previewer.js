/**
 * The previewer: a page a game serves (for example `/previewer.html`) so an editor such as Vortex Studio can show a
 * map in the real game, in an iframe, with pictures taken live from the editor. The editor sends data, never code.
 * What the map contains is the game's own business: the kit only knows the envelope (docs/PREVIEWER-STANDARD.md).
 *
 * Pure types and validators, no runtime and no dependencies. The editor side (building messages, finding the pictures a
 * map needs) is in `previewerHost.ts`.
 */
/** Rises only when a message changes in a way an older side cannot ignore. Every message carries it. */
export const PREVIEWER_PROTOCOL_VERSION = 1;
/** The most pictures one `load` message may carry. */
export const MAX_PREVIEW_ASSETS = 500;
/** A picture that lives in the editor is written `asset:<id>` anywhere a map names a picture. */
export const ASSET_REF_PREFIX = 'asset:';
const ASSET_ID = /^[A-Za-z0-9_-]{1,64}$/;
/** `asset:<id>` for an id, or `null` when the id is not one an editor hands out. */
export const assetRef = (id) => ASSET_ID.test(id) ? `${ASSET_REF_PREFIX}${id}` : null;
/** The id inside an `asset:<id>` text, or `null` when the text is anything else (a site path, say). */
export function assetIdOf(text) {
    if (typeof text !== 'string' || !text.startsWith(ASSET_REF_PREFIX))
        return null;
    const id = text.slice(ASSET_REF_PREFIX.length);
    return ASSET_ID.test(id) ? id : null;
}
export const isAssetRef = (text) => assetIdOf(text) !== null;
const REQUEST_ID = /^[A-Za-z0-9_.:-]{1,64}$/;
const isObject = (value) => !!value && typeof value === 'object' && !Array.isArray(value);
/** Only web addresses (or paths on the game's own site): a picture link never needs anything else. */
export function isSafePictureUrl(value, base) {
    if (typeof value !== 'string' || !value)
        return false;
    try {
        const url = new URL(value, base);
        return url.protocol === 'https:' || url.protocol === 'http:';
    }
    catch {
        return false;
    }
}
/**
 * Checks a message from the page that embeds the previewer. Anything not recognised is refused with a reason, which
 * the game reports as `bad_message`. `base` is the game's own address (for paths). `checkDocument` is the game's own
 * rule for what a map must contain; it returns a sentence about what is wrong, or `null` when the map is acceptable
 * for loading (whether it can be played is decided later and reported as `invalid_map`).
 */
export function readPreviewerMessage(data, base, checkDocument = defaultDocumentCheck) {
    if (!isObject(data))
        return { ok: false, error: 'A message is an object.' };
    if (data.protocol !== PREVIEWER_PROTOCOL_VERSION)
        return {
            ok: false,
            error: `Unsupported protocol ${String(data.protocol)}; this is ${PREVIEWER_PROTOCOL_VERSION}.`,
        };
    if (data.type === 'command') {
        if (data.name === 'restart' || data.name === 'pause' || data.name === 'resume')
            return {
                ok: true,
                message: { protocol: PREVIEWER_PROTOCOL_VERSION, type: 'command', name: data.name },
            };
        return { ok: false, error: `Unknown command "${String(data.name)}".` };
    }
    if (data.type === 'validate' || data.type === 'references' || data.type === 'migrate') {
        // These ask the game to look at a map, so a map the game would refuse to play must still get through: no checkDocument.
        if (!isObject(data.document))
            return { ok: false, error: '"document" must be an object.' };
        const id = data.id;
        if (id !== undefined && !(typeof id === 'string' && REQUEST_ID.test(id)))
            return { ok: false, error: '"id" must be a short text of letters, digits and _ . : -.' };
        const base = {
            protocol: PREVIEWER_PROTOCOL_VERSION,
            ...(id !== undefined ? { id } : {}),
            document: data.document,
        };
        if (data.type === 'migrate') {
            if (typeof data.from !== 'number' || !Number.isInteger(data.from) || data.from < 0)
                return { ok: false, error: '"from" must be a whole number, the schemaVersion of the map.' };
            return { ok: true, message: { ...base, type: 'migrate', from: data.from } };
        }
        return { ok: true, message: { ...base, type: data.type } };
    }
    if (data.type === 'load') {
        const problem = checkDocument(data.document);
        if (problem)
            return { ok: false, error: problem };
        const assets = {};
        if (data.assets !== undefined) {
            if (!isObject(data.assets))
                return { ok: false, error: '"assets" must be an object of urls.' };
            const entries = Object.entries(data.assets);
            if (entries.length > MAX_PREVIEW_ASSETS)
                return { ok: false, error: `At most ${MAX_PREVIEW_ASSETS} assets are allowed.` };
            for (const [id, url] of entries) {
                if (!isSafePictureUrl(url, base))
                    return { ok: false, error: `Asset "${id}" needs an http or https url.` };
                assets[id] = url;
            }
        }
        return {
            ok: true,
            message: {
                protocol: PREVIEWER_PROTOCOL_VERSION,
                type: 'load',
                document: data.document,
                assets,
            },
        };
    }
    return { ok: false, error: `Unknown message type "${String(data.type)}".` };
}
function defaultDocumentCheck(document) {
    return isObject(document) ? null : '"document" must be an object.';
}
