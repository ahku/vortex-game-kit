/**
 * The layer editor descriptor: what a game tells an editor so it can move the game's pictures around on a stage
 * (docs/PREVIEWER-STANDARD.md, section 10). The editor owns the names of a picture's fields (`x`, `y`, `width`...); the
 * game only says where in its map the stage size and the list of pictures live, which depth bands exist, which optional
 * fields it understands, and any extra properties of its own. Everything else in the map is left alone on every edit.
 *
 * Pure, no dependencies. It is for 2D games whose pictures sit on a stage; a game of another kind (3D, say) gets its own
 * editor and does not use this.
 */
/** Rises only when the descriptor changes in a way an older editor cannot ignore. */
export const LAYER_EDITOR_VERSION = 1;
/** The fields every picture has, under these exact names. */
export const LAYER_REQUIRED_FIELDS = ['id', 'src', 'x', 'y', 'width'];
/** The fields a game may or may not have. The descriptor says which ones it understands. */
export const LAYER_OPTIONAL_FIELDS = [
    'layer',
    'rotation',
    'flipX',
    'flipY',
    'anchor',
    'sortY',
    'parallax',
    'animation',
];
const KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;
const FORBIDDEN = new Set(['__proto__', 'prototype', 'constructor']);
const isObject = (value) => !!value && typeof value === 'object' && !Array.isArray(value);
const isKey = (value) => typeof value === 'string' && KEY.test(value) && !FORBIDDEN.has(value);
const isPath = (value) => Array.isArray(value) && value.length > 0 && value.length <= 12 && value.every(isKey);
const startsWith = (a, b) => a.length <= b.length && a.every((k, i) => k === b[i]);
/** Reads the parsed JSON of a descriptor. Unknown fields are ignored; anything wrong is listed. */
export function readLayerEditor(data) {
    if (!isObject(data))
        return {
            ok: false,
            errors: ['The layer editor description must be an object.'],
        };
    const errors = [];
    if (data.version !== LAYER_EDITOR_VERSION)
        errors.push(`"version" must be ${LAYER_EDITOR_VERSION}.`);
    const stage = data.stage;
    let width = [];
    let height = [];
    let backdrop;
    if (!isObject(stage))
        errors.push('"stage" must be an object.');
    else {
        if (isPath(stage.width))
            width = stage.width;
        else
            errors.push('"stage.width" must be a path: a list of keys.');
        if (isPath(stage.height))
            height = stage.height;
        else
            errors.push('"stage.height" must be a path: a list of keys.');
        if (stage.backdrop !== undefined) {
            if (isPath(stage.backdrop))
                backdrop = stage.backdrop;
            else
                errors.push('"stage.backdrop" must be a path: a list of keys.');
        }
    }
    let pictures = [];
    if (isPath(data.pictures))
        pictures = data.pictures;
    else
        errors.push('"pictures" must be a path: a list of keys.');
    let terrain;
    if (data.terrain !== undefined) {
        const raw = data.terrain;
        if (!isObject(raw) || !isPath(raw.path))
            errors.push('"terrain.path" must be a path.');
        else {
            const kinds = raw.kinds;
            const c = raw.constraints;
            if (!Array.isArray(kinds) ||
                kinds.length < 1 ||
                kinds.length > 100 ||
                !kinds.every((k) => isObject(k) &&
                    typeof k.value === 'string' &&
                    k.value.length > 0 &&
                    k.value.length <= 64 &&
                    typeof k.label === 'string' &&
                    k.label.trim().length > 0 &&
                    k.label.length <= 80) ||
                new Set(kinds.map((k) => k.value)).size !== kinds.length)
                errors.push('"terrain.kinds" must be 1 to 100 different { value, label } pairs.');
            const positive = (v) => typeof v === 'number' && Number.isFinite(v) && v > 0;
            const integer = (v) => positive(v) && Number.isSafeInteger(v);
            if (!isObject(c) ||
                !integer(c.minPoints) ||
                c.minPoints < 3 ||
                !integer(c.maxPoints) ||
                c.maxPoints < c.minPoints ||
                c.maxPoints > 100 ||
                c.convex !== true ||
                typeof c.withinStage !== 'boolean' ||
                !positive(c.grid) ||
                !integer(c.maxShapes) ||
                (c.minEdge !== undefined && !positive(c.minEdge)))
                errors.push('"terrain.constraints" needs convex geometry limits, a positive grid and a shape count.');
            // Keep only declared fields, as with the picture descriptor.
            if (!errors.length && isObject(c))
                terrain = {
                    path: [...raw.path],
                    kinds: kinds.map((k) => ({
                        value: k.value,
                        label: k.label.trim(),
                    })),
                    constraints: {
                        minPoints: c.minPoints,
                        maxPoints: c.maxPoints,
                        convex: true,
                        withinStage: c.withinStage,
                        grid: c.grid,
                        maxShapes: c.maxShapes,
                        ...(c.minEdge !== undefined ? { minEdge: c.minEdge } : {}),
                    },
                };
        }
    }
    // A path inside another path would make an edit overwrite the other thing.
    const named = [
        ['stage.width', width],
        ['stage.height', height],
        ['stage.backdrop', backdrop],
        ['pictures', pictures],
        ['terrain.path', terrain?.path],
    ];
    const present = named.filter((n) => !!n[1] && n[1].length > 0);
    for (const [nameA, a] of present)
        for (const [nameB, b] of present)
            if (nameA < nameB && (startsWith(a, b) || startsWith(b, a)))
                errors.push(`"${nameA}" and "${nameB}" must not be the same place or inside each other.`);
    const bands = [];
    if (!Array.isArray(data.bands) || data.bands.length < 1 || data.bands.length > 12)
        errors.push('"bands" must be a list of 1 to 12 depth bands.');
    else
        data.bands.forEach((band, i) => {
            if (!isObject(band) ||
                typeof band.value !== 'string' ||
                !band.value ||
                band.value.length > 64 ||
                typeof band.label !== 'string' ||
                !band.label.trim() ||
                band.label.length > 80 ||
                (band.sorted !== undefined && typeof band.sorted !== 'boolean'))
                return void errors.push(`bands[${i}] needs a "value" and a "label" (and "sorted" must be true or false).`);
            if (bands.some((b) => b.value === band.value))
                errors.push(`bands[${i}] repeats the value "${band.value}".`);
            bands.push({
                value: band.value,
                label: band.label.trim(),
                ...(band.sorted ? { sorted: true } : {}),
            });
        });
    let defaultBand;
    if (data.defaultBand !== undefined) {
        if (typeof data.defaultBand === 'string' && bands.some((b) => b.value === data.defaultBand))
            defaultBand = data.defaultBand;
        else
            errors.push('"defaultBand" must be the value of one of the bands.');
    }
    let pictureFields;
    if (data.pictureFields !== undefined) {
        const list = data.pictureFields;
        if (!Array.isArray(list))
            errors.push('"pictureFields" must be a list.');
        else {
            const unknown = list.filter((f) => !LAYER_OPTIONAL_FIELDS.includes(f));
            if (unknown.length)
                errors.push(`"pictureFields" has unknown fields: ${unknown.map(String).join(', ')}.`);
            pictureFields = LAYER_OPTIONAL_FIELDS.filter((f) => list.includes(f));
        }
    }
    const fields = [];
    if (data.fields !== undefined) {
        if (!Array.isArray(data.fields) || data.fields.length > 20)
            errors.push('"fields" must be a list of at most 20.');
        else
            data.fields.forEach((raw, i) => {
                const at = `fields[${i}]`;
                if (!isObject(raw))
                    return void errors.push(`${at} must be an object.`);
                const { key, label, type, choices } = raw;
                if (!isKey(key))
                    return void errors.push(`${at}.key must be a plain name.`);
                if (LAYER_REQUIRED_FIELDS.includes(key) ||
                    LAYER_OPTIONAL_FIELDS.includes(key))
                    return void errors.push(`${at}.key "${key}" is a standard picture field; pick another name.`);
                if (fields.some((f) => f.key === key))
                    return void errors.push(`${at} repeats the key "${key}".`);
                if (typeof label !== 'string' || !label.trim())
                    return void errors.push(`${at}.label must be a text.`);
                if (type !== 'number' && type !== 'text' && type !== 'boolean' && type !== 'choice')
                    return void errors.push(`${at}.type must be number, text, boolean or choice.`);
                const field = { key, label: label.trim(), type };
                if (type === 'choice') {
                    if (!Array.isArray(choices) ||
                        choices.length < 2 ||
                        choices.length > 20 ||
                        !choices.every((c) => isObject(c) && typeof c.value === 'string' && typeof c.label === 'string' && c.value && c.label) ||
                        new Set(choices.map((c) => c.value)).size !== choices.length)
                        return void errors.push(`${at}.choices must be 2 to 20 different { value, label } pairs.`);
                    field.choices = choices.map((c) => ({
                        value: c.value,
                        label: c.label,
                    }));
                }
                if (raw.default !== undefined) {
                    const d = raw.default;
                    const ok = (type === 'number' && typeof d === 'number' && Number.isFinite(d)) ||
                        (type === 'text' && typeof d === 'string') ||
                        (type === 'boolean' && typeof d === 'boolean') ||
                        (type === 'choice' && typeof d === 'string' && !!field.choices?.some((c) => c.value === d));
                    if (!ok)
                        return void errors.push(`${at}.default does not fit its type.`);
                    field.default = d;
                }
                fields.push(field);
            });
    }
    if (errors.length > 0)
        return { ok: false, errors };
    return {
        ok: true,
        descriptor: {
            version: LAYER_EDITOR_VERSION,
            stage: { width, height, ...(backdrop ? { backdrop } : {}) },
            pictures,
            ...(terrain ? { terrain } : {}),
            bands,
            ...(defaultBand ? { defaultBand } : {}),
            ...(pictureFields ? { pictureFields } : {}),
            ...(fields.length ? { fields } : {}),
        },
    };
}
/** What is at a path in a map, or `undefined` when any step is missing. Never follows `__proto__` and the like. */
export function valueAt(data, path) {
    let value = data;
    for (const key of path) {
        if (!isKey(key) || !isObject(value) || !Object.hasOwn(value, key))
            return undefined;
        value = value[key];
    }
    return value;
}
/**
 * For a game's own tests: does this descriptor fit a real map of the game? Returns sentences about what does not, or
 * nothing when the editor could open the map. Run it over every shipped map.
 */
export function checkLayerEditorAgainst(descriptor, map) {
    const problems = [];
    const number = (path, name) => {
        const v = valueAt(map, path);
        if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0)
            problems.push(`${name} (${path.join('.')}) is not a positive number.`);
    };
    number(descriptor.stage.width, 'The stage width');
    number(descriptor.stage.height, 'The stage height');
    if (descriptor.stage.backdrop) {
        const b = valueAt(map, descriptor.stage.backdrop);
        if (b !== undefined && typeof b !== 'string')
            problems.push('The backdrop is not a text.');
    }
    const list = valueAt(map, descriptor.pictures) ?? [];
    if (!Array.isArray(list))
        return [...problems, `The pictures (${descriptor.pictures.join('.')}) are not a list.`];
    const bands = new Set(descriptor.bands.map((b) => b.value));
    const ids = new Set();
    list.forEach((item, i) => {
        const at = `Picture ${i + 1}`;
        if (!isObject(item))
            return void problems.push(`${at} is not an object.`);
        for (const f of ['id', 'src'])
            if (typeof item[f] !== 'string' || !item[f])
                problems.push(`${at} has no text "${f}".`);
        for (const f of ['x', 'y', 'width'])
            if (typeof item[f] !== 'number' || !Number.isFinite(item[f]))
                problems.push(`${at} has no number "${f}".`);
        if (typeof item.id === 'string') {
            if (ids.has(item.id))
                problems.push(`${at} repeats the id "${item.id}".`);
            ids.add(item.id);
        }
        if (item.layer === undefined) {
            if (!descriptor.defaultBand)
                problems.push(`${at} has no "layer" and the descriptor has no defaultBand.`);
        }
        else if (typeof item.layer !== 'string')
            problems.push(`${at} has a "layer" that is not a text.`);
        else if (!bands.has(item.layer))
            problems.push(`${at} is in the band "${item.layer}", which the descriptor does not list.`);
    });
    return problems;
}
