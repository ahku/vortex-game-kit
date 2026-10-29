const object = (v) => !!v && typeof v === "object" && !Array.isArray(v);
export const safeMapKey = (v) => typeof v === "string" &&
    /^[A-Za-z_][A-Za-z0-9_]*$/.test(v) &&
    !["__proto__", "prototype", "constructor"].includes(v);
export const safeMapPath = (v) => Array.isArray(v) && v.length > 0 && v.length <= 12 && v.every(safeMapKey);
const text = (v, max = 240) => typeof v === "string" && !!v.trim() && v.length <= max;
const scalar = (v) => typeof v === "boolean" ||
    (typeof v === "number" && Number.isFinite(v)) ||
    (typeof v === "string" && v.length <= 1000);
export function readMapProperties(value) {
    if (!object(value) ||
        !Array.isArray(value.fields) ||
        !value.fields.length ||
        value.fields.length > 50 ||
        (value.help !== undefined && !text(value.help, 1000)))
        return null;
    const groups = [];
    if (value.groups !== undefined) {
        if (!Array.isArray(value.groups) || value.groups.length > 12)
            return null;
        for (const raw of value.groups) {
            if (!object(raw) ||
                !safeMapKey(raw.id) ||
                !text(raw.label, 80) ||
                groups.some((g) => g.id === raw.id))
                return null;
            groups.push({ id: raw.id, label: raw.label });
        }
    }
    const fields = [];
    for (const raw of value.fields) {
        if (!object(raw) ||
            !safeMapPath(raw.path) ||
            !text(raw.label, 80) ||
            ![
                "text",
                "number",
                "boolean",
                "choice",
                "choices",
                "reference",
                "references",
            ].includes(raw.type))
            return null;
        if (fields.some((f) => {
            const path = raw.path;
            const n = Math.min(f.path.length, path.length);
            return f.path.slice(0, n).every((k, i) => k === path[i]);
        }))
            return null;
        const field = {
            path: [...raw.path],
            label: raw.label,
            type: raw.type,
        };
        for (const key of ["help", "unsetLabel", "emptyLabel"])
            if (raw[key] !== undefined) {
                if (!text(raw[key], 1000))
                    return null;
                field[key] = raw[key];
            }
        if (raw.group !== undefined) {
            if (typeof raw.group !== "string" ||
                !groups.some((g) => g.id === raw.group))
                return null;
            field.group = raw.group;
        }
        if ((field.unsetLabel &&
            (field.type !== "choice" ||
                raw.required === true ||
                raw.default !== undefined)) ||
            (field.emptyLabel && !["reference", "references"].includes(field.type)))
            return null;
        for (const key of ["min", "max", "maxLength"])
            if (raw[key] !== undefined) {
                if (typeof raw[key] !== "number" || !Number.isFinite(raw[key]))
                    return null;
                field[key] = raw[key];
            }
        if ((field.min !== undefined &&
            field.max !== undefined &&
            field.min > field.max) ||
            (field.maxLength !== undefined &&
                (!Number.isSafeInteger(field.maxLength) ||
                    field.maxLength < 1 ||
                    field.maxLength > 10000)))
            return null;
        if (raw.unit !== undefined) {
            if (field.type !== "number" || !text(raw.unit, 8))
                return null;
            field.unit = raw.unit;
        }
        for (const key of ["integer", "required", "emptyIsDefault"])
            if (raw[key] !== undefined) {
                if (typeof raw[key] !== "boolean")
                    return null;
                field[key] = raw[key];
            }
        if (field.emptyIsDefault &&
            (!["choices", "references"].includes(field.type) || field.required))
            return null;
        if (field.type === "choice" || field.type === "choices") {
            if (!Array.isArray(raw.choices) ||
                !raw.choices.length ||
                raw.choices.length > 100 ||
                !raw.choices.every((c) => object(c) && text(c.value, 64) && text(c.label, 80)) ||
                new Set(raw.choices.map((c) => c.value)).size !== raw.choices.length)
                return null;
            field.choices = raw.choices.map((c) => ({
                value: c.value,
                label: c.label,
            }));
        }
        if (field.type === "reference" || field.type === "references") {
            const r = raw.reference;
            if (!object(r) ||
                !safeMapPath(r.path) ||
                !safeMapKey(r.id) ||
                (r.label !== undefined && !safeMapKey(r.label)))
                return null;
            if (r.excludeSelf !== undefined && typeof r.excludeSelf !== "boolean")
                return null;
            field.reference = {
                path: [...r.path],
                id: r.id,
                ...(r.label ? { label: r.label } : {}),
                ...(r.excludeSelf ? { excludeSelf: true } : {}),
            };
        }
        if (raw.when !== undefined) {
            const w = raw.when;
            if (!object(w) ||
                !safeMapPath(w.path) ||
                !Array.isArray(w.values) ||
                !w.values.length ||
                w.values.length > 100 ||
                !w.values.every((v) => typeof v === "string" && v.length <= 64))
                return null;
            field.when = { path: [...w.path], values: [...w.values] };
        }
        if (raw.default !== undefined) {
            const d = raw.default;
            const ok = field.type === "boolean"
                ? typeof d === "boolean"
                : field.type === "number"
                    ? typeof d === "number" &&
                        Number.isFinite(d) &&
                        (field.min === undefined || d >= field.min) &&
                        (field.max === undefined || d <= field.max) &&
                        (!field.integer || Number.isInteger(d))
                    : ["choices", "references"].includes(field.type)
                        ? Array.isArray(d) &&
                            d.every((v) => typeof v === "string" &&
                                (field.type !== "choices" ||
                                    field.choices.some((c) => c.value === v)))
                        : typeof d === "string" &&
                            (field.type !== "choice" ||
                                field.choices.some((c) => c.value === d));
            if (!ok)
                return null;
            field.default = Array.isArray(d)
                ? [...d]
                : d;
        }
        fields.push(field);
    }
    return {
        fields,
        ...(groups.length ? { groups } : {}),
        ...(value.help ? { help: value.help } : {}),
    };
}
export function readMapListEditor(value) {
    const form = readMapProperties(value);
    if (!form ||
        !object(value) ||
        !safeMapPath(value.path) ||
        !Number.isSafeInteger(value.maxItems) ||
        value.maxItems < 1 ||
        value.maxItems > 1000 ||
        !object(value.defaults) ||
        Object.keys(value.defaults).length > 50 ||
        !Object.entries(value.defaults).every(([k, v]) => safeMapKey(k) && k !== "id" && scalar(v)))
        return null;
    if (form.fields.some((f) => f.path[0] === "id"))
        return null;
    return {
        ...form,
        path: [...value.path],
        maxItems: value.maxItems,
        defaults: { ...value.defaults },
    };
}
export function readMapUnits(value) {
    const list = readMapListEditor(value);
    if (!list || !object(value))
        return null;
    const kit = value.kit;
    const position = value.position;
    const character = value.character;
    const definitions = value.definitions;
    if (!safeMapPath(kit) || !safeMapPath(position))
        return null;
    if (character !== undefined && !safeMapPath(character))
        return null;
    if (definitions !== undefined && !safeMapPath(definitions))
        return null;
    const own = [
        list.path,
        kit,
        position,
        ...(character ? [character] : []),
        ...(definitions ? [definitions] : []),
    ];
    const inside = (a, b) => {
        const n = Math.min(a.length, b.length);
        return a.slice(0, n).every((k, i) => k === b[i]);
    };
    // The kit, position and character locations must not overlap each other, the id or any form field.
    // Definitions live at the map's root, so they must not sit inside the list or any other location either.
    if (definitions && inside(list.path, definitions))
        return null;
    const row = [kit, position, ...(character ? [character] : []), ["id"]];
    for (let i = 0; i < row.length; i += 1) {
        for (let j = i + 1; j < row.length; j += 1)
            if (inside(row[i], row[j]))
                return null;
        if (list.fields.some((f) => inside(f.path, row[i])))
            return null;
    }
    let libraryGroups;
    if (value.libraryGroups !== undefined) {
        const groups = value.libraryGroups;
        if (!Array.isArray(groups) || !groups.length || groups.length > 12)
            return null;
        const seenKits = new Set();
        libraryGroups = [];
        for (const raw of groups) {
            if (!object(raw) ||
                !safeMapKey(raw.id) ||
                !text(raw.label, 80) ||
                !Array.isArray(raw.kits) ||
                !raw.kits.length ||
                raw.kits.length > 100 ||
                libraryGroups.some((g) => g.id === raw.id))
                return null;
            for (const k of raw.kits) {
                if (typeof k !== "string" || !k || k.length > 64 || seenKits.has(k))
                    return null;
                seenKits.add(k);
            }
            libraryGroups.push({
                id: raw.id,
                label: raw.label,
                kits: [...raw.kits],
            });
        }
    }
    const sameAs = (a, b) => a.length === b.length && a.every((k, i) => k === b[i]);
    const isField = (path) => safeMapPath(path) &&
        list.fields.some((f) => sameAs(f.path, path));
    const tag = value.tag;
    if (tag !== undefined && !isField(tag))
        return null;
    let ranges;
    if (value.ranges !== undefined) {
        const raws = value.ranges;
        if (!Array.isArray(raws) || !raws.length || raws.length > 8)
            return null;
        ranges = [];
        for (const raw of raws) {
            if (!object(raw) ||
                !safeMapKey(raw.id) ||
                !text(raw.label, 80) ||
                ranges.some((r) => r.id === raw.id) ||
                (raw.stat === undefined &&
                    raw.field === undefined &&
                    raw.fallback === undefined) ||
                (raw.stat !== undefined && !safeMapPath(raw.stat)) ||
                (raw.field !== undefined && !isField(raw.field)) ||
                (raw.plus !== undefined && !safeMapKey(raw.plus)))
                return null;
            let fallback;
            if (raw.fallback !== undefined) {
                const f = raw.fallback;
                if (!object(f) ||
                    !safeMapKey(f.of) ||
                    typeof f.share !== "number" ||
                    !(f.share > 0) ||
                    f.share > 10)
                    return null;
                if (f.shareField !== undefined && !isField(f.shareField))
                    return null;
                fallback = {
                    of: f.of,
                    share: f.share,
                    ...(f.shareField ? { shareField: [...f.shareField] } : {}),
                };
            }
            ranges.push({
                id: raw.id,
                label: raw.label,
                ...(raw.stat ? { stat: [...raw.stat] } : {}),
                ...(raw.field ? { field: [...raw.field] } : {}),
                ...(fallback ? { fallback } : {}),
                ...(raw.plus ? { plus: raw.plus } : {}),
            });
        }
        const ids = new Set(ranges.map((r) => r.id));
        if (ranges.some((r) => (r.fallback && (!ids.has(r.fallback.of) || r.fallback.of === r.id)) ||
            (r.plus !== undefined && (!ids.has(r.plus) || r.plus === r.id))))
            return null;
    }
    return {
        ...list,
        kit: [...kit],
        position: [...position],
        ...(character ? { character: [...character] } : {}),
        ...(definitions ? { definitions: [...definitions] } : {}),
        ...(libraryGroups ? { libraryGroups } : {}),
        ...(tag ? { tag: [...tag] } : {}),
        ...(ranges ? { ranges } : {}),
    };
}
