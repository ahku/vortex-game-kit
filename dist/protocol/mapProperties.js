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
            field.reference = {
                path: [...r.path],
                id: r.id,
                ...(r.label ? { label: r.label } : {}),
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
