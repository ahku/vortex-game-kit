import { z } from 'zod';
/** Scene mood presets, taken from the prototype editors. */
export declare const TONE_MOODS: readonly ["dawn", "day", "dusk", "night", "storm", "dream"];
export declare const ToneMood: z.ZodEnum<{
    dawn: "dawn";
    day: "day";
    dusk: "dusk";
    night: "night";
    storm: "storm";
    dream: "dream";
}>;
export type ToneMood = z.infer<typeof ToneMood>;
/**
 * How a new background replaces the old one. `fade` is the cross-fade (the default, so older stories do not change),
 * `cut` swaps at once and `blur` dissolves through a soft focus. Only the background follows the style.
 */
export declare const BG_STYLES: readonly ["fade", "cut", "blur"];
export declare const BgStyleSchema: z.ZodEnum<{
    blur: "blur";
    cut: "cut";
    fade: "fade";
}>;
export type BgStyle = z.infer<typeof BgStyleSchema>;
/**
 * A stage operation changes what is on screen. The engine folds these over the steps to compute the
 * stage at any step, so save/load, skip and "preview from here" all work from one mechanism.
 * Things stay on stage until changed or removed.
 */
/** A brightness multiplier. 1 is the picture as drawn; the bounds keep a picture from going black or burning out. */
export declare const BRIGHTNESS_MIN = 0.25;
export declare const BRIGHTNESS_MAX = 2;
export declare const StageOpSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    op: z.ZodLiteral<"bg">;
    asset: z.ZodString;
    fadeMs: z.ZodOptional<z.ZodNumber>;
    style: z.ZodOptional<z.ZodEnum<{
        blur: "blur";
        cut: "cut";
        fade: "fade";
    }>>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"music">;
    asset: z.ZodNullable<z.ZodString>;
    fadeMs: z.ZodOptional<z.ZodNumber>;
    volume: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"sfx">;
    asset: z.ZodString;
    volume: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"enter">;
    who: z.ZodString;
    slot: z.ZodOptional<z.ZodEnum<{
        "far-left": "far-left";
        left: "left";
        center: "center";
        right: "right";
        "far-right": "far-right";
    }>>;
    pos: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        scale: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
    expr: z.ZodOptional<z.ZodString>;
    share: z.ZodOptional<z.ZodBoolean>;
    flip: z.ZodOptional<z.ZodBoolean>;
    layer: z.ZodOptional<z.ZodEnum<{
        back: "back";
        front: "front";
    }>>;
    animation: z.ZodOptional<z.ZodEnum<{
        cut: "cut";
        fade: "fade";
        slide: "slide";
    }>>;
    fadeMs: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"exit">;
    who: z.ZodString;
    animation: z.ZodOptional<z.ZodEnum<{
        cut: "cut";
        fade: "fade";
        slide: "slide";
    }>>;
    fadeMs: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"expr">;
    who: z.ZodString;
    expr: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"show">;
    id: z.ZodString;
    asset: z.ZodString;
    slot: z.ZodOptional<z.ZodEnum<{
        "far-left": "far-left";
        left: "left";
        center: "center";
        right: "right";
        "far-right": "far-right";
    }>>;
    pos: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        scale: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
    layer: z.ZodOptional<z.ZodEnum<{
        back: "back";
        front: "front";
    }>>;
    fadeMs: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"hide">;
    id: z.ZodString;
    fadeMs: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    durationMs: z.ZodOptional<z.ZodNumber>;
    intensity: z.ZodOptional<z.ZodNumber>;
    speed: z.ZodOptional<z.ZodNumber>;
    size: z.ZodOptional<z.ZodNumber>;
    op: z.ZodLiteral<"effect">;
    name: z.ZodEnum<{
        shake: "shake";
        "flash-white": "flash-white";
        "flash-red": "flash-red";
        zoom: "zoom";
        blur: "blur";
        glitch: "glitch";
        "fade-black": "fade-black";
        rain: "rain";
        snow: "snow";
        embers: "embers";
        "dream-glow": "dream-glow";
        "old-film": "old-film";
        vignette: "vignette";
    }>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"tone">;
    mood: z.ZodEnum<{
        dawn: "dawn";
        day: "day";
        dusk: "dusk";
        night: "night";
        storm: "storm";
        dream: "dream";
    }>;
    fadeMs: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"dim">;
    amount: z.ZodNumber;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"backdrop">;
    brightness: z.ZodOptional<z.ZodNumber>;
    blur: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"light">;
    who: z.ZodString;
    brightness: z.ZodNumber;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"clear">;
    what: z.ZodEnum<{
        portraits: "portraits";
        objects: "objects";
        all: "all";
    }>;
    animation: z.ZodOptional<z.ZodEnum<{
        cut: "cut";
        fade: "fade";
        slide: "slide";
    }>>;
    when: z.ZodOptional<z.ZodEnum<{
        with: "with";
        before: "before";
    }>>;
}, z.core.$strict>], "op">;
export type StageOp = z.infer<typeof StageOpSchema>;
