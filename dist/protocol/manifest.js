import { LAYER_EDITOR_VERSION, readLayerEditor } from "./layers.js";
/**
 * The manifest: a small JSON file a game serves at `<game address>/vortex-manifest.json` so an editor can learn what the
 * game is and what it can do, instead of being told by hand (docs/PREVIEWER-STANDARD.md, section 9). Plain data: it
 * never contains code. Pure, no dependencies. The editor's side of fetching it is `manifestUrl` in `previewerHost.ts`.
 */
/** Rises only when a manifest changes in a way an older editor cannot ignore. */
export const MANIFEST_CONTRACT = 1;
/** Where the manifest lives, relative to the game's address. */
export const MANIFEST_PATH = "vortex-manifest.json";
export const MANIFEST_MESSAGES = [
    "validate",
    "references",
    "migrate",
];
const SLUG = /^[a-z0-9][a-z0-9-]{0,39}$/;
const isObject = (value) => !!value && typeof value === "object" && !Array.isArray(value);
/**
 * Reads the parsed JSON of a manifest. Unknown fields are ignored. A newer `contract` is not an error: whatever can be
 * understood is returned with `newer: true`, and the editor can say the game is newer than it. An older or missing
 * contract, or a wrong shape, is refused with sentences about what is wrong.
 */
export function readManifest(data) {
    if (!isObject(data))
        return { ok: false, errors: ["The manifest must be a JSON object."] };
    const errors = [];
    const contract = data.contract;
    if (typeof contract !== "number" ||
        !Number.isInteger(contract) ||
        contract < 1)
        errors.push('"contract" must be a whole number, 1 or more.');
    const newer = typeof contract === "number" && contract > MANIFEST_CONTRACT;
    const id = data.id;
    if (typeof id !== "string" || !SLUG.test(id))
        errors.push('"id" must be lowercase letters, digits and dashes, up to 40 characters.');
    const name = typeof data.name === "string" ? data.name.trim() : "";
    if (!name)
        errors.push('"name" must be a text.');
    let previewer;
    if (data.previewer !== undefined) {
        if (!isObject(data.previewer))
            errors.push('"previewer" must be an object.');
        else {
            const messages = Array.isArray(data.previewer.messages)
                ? MANIFEST_MESSAGES.filter((m) => data.previewer.messages.includes(m))
                : [];
            if (data.previewer.messages !== undefined &&
                !Array.isArray(data.previewer.messages))
                errors.push('"previewer.messages" must be a list.');
            const page = data.previewer.page;
            if (page !== undefined &&
                (typeof page !== "string" ||
                    !page ||
                    page.startsWith("/") ||
                    page.includes("://")))
                errors.push('"previewer.page" must be a path inside the game, without a leading slash.');
            previewer = { ...(typeof page === "string" ? { page } : {}), messages };
        }
    }
    const content = [];
    const warnings = [];
    if (data.content !== undefined) {
        if (!Array.isArray(data.content))
            errors.push('"content" must be a list.');
        else
            data.content.forEach((entry, i) => {
                const at = `content[${i}]`;
                if (!isObject(entry))
                    return void errors.push(`${at} must be an object.`);
                const { module, type, title, schemaVersion, editor } = entry;
                if (typeof module !== "string" || !SLUG.test(module))
                    errors.push(`${at}.module must be a slug.`);
                if (typeof type !== "string" || !SLUG.test(type))
                    errors.push(`${at}.type must be a slug.`);
                if (typeof title !== "string" || !title.trim())
                    errors.push(`${at}.title must be a text.`);
                if (typeof schemaVersion !== "number" ||
                    !Number.isInteger(schemaVersion) ||
                    schemaVersion < 0)
                    errors.push(`${at}.schemaVersion must be a whole number.`);
                if (editor !== undefined &&
                    (typeof editor !== "string" || !SLUG.test(editor)))
                    errors.push(`${at}.editor must be a slug.`);
                let layers;
                if (entry.layers !== undefined) {
                    const rawLayers = entry.layers;
                    const futureLayers = isObject(rawLayers) &&
                        typeof rawLayers.version === "number" &&
                        rawLayers.version > LAYER_EDITOR_VERSION;
                    if (futureLayers)
                        warnings.push(`${at}.layers is newer than this editor understands and was left out.`);
                    else {
                        const read = readLayerEditor(rawLayers);
                        if (read.ok)
                            layers = read.descriptor;
                        else
                            warnings.push(`${at}.layers was left out: ${read.errors.join(" ")}`);
                    }
                }
                if (errors.length === 0 || newer)
                    content.push({
                        module: module,
                        type: type,
                        title: String(title ?? "").trim(),
                        schemaVersion: schemaVersion,
                        ...(typeof editor === "string" ? { editor } : {}),
                        ...(layers ? { layers } : {}),
                    });
            });
    }
    // A newer contract may add rules this kit does not know, so only what is plainly wrong is refused.
    if (errors.length > 0)
        return { ok: false, errors };
    return {
        ok: true,
        newer,
        ...(warnings.length ? { warnings } : {}),
        manifest: {
            contract: contract,
            id: id,
            name,
            ...(typeof data.version === "string" ? { version: data.version } : {}),
            ...(previewer ? { previewer } : {}),
            content,
        },
    };
}
