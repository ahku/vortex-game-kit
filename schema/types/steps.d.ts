import { z } from 'zod';
export declare const NarrationStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"narration">;
    presentation: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodEnum<{
            standard: "standard";
            long: "long";
        }>>;
        position: z.ZodOptional<z.ZodEnum<{
            top: "top";
            bottom: "bottom";
        }>>;
        align: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
        }>>;
        horizontalAlign: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
        }>>;
    }, z.core.$strict>>;
    playback: z.ZodOptional<z.ZodObject<{
        autoplay: z.ZodOptional<z.ZodBoolean>;
        pauseGame: z.ZodOptional<z.ZodBoolean>;
        durationMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
    text: z.ZodString;
    voice: z.ZodOptional<z.ZodString>;
    duckMusic: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * How a line's new expression replaces the old one: both pictures fading over each other (the default), a cut, or the
 * new picture fading in over the old one, which stays opaque (suits the same pose with a different face).
 */
export declare const EXPR_CHANGES: readonly ["crossfade", "cut", "in-out"];
export declare const ExprChangeSchema: z.ZodEnum<{
    cut: "cut";
    crossfade: "crossfade";
    "in-out": "in-out";
}>;
export type ExprChange = z.infer<typeof ExprChangeSchema>;
export declare const LineStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"line">;
    presentation: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodEnum<{
            bubble: "bubble";
            "face-box": "face-box";
            box: "box";
            auto: "auto";
        }>>;
        position: z.ZodOptional<z.ZodEnum<{
            top: "top";
            bottom: "bottom";
        }>>;
        enter: z.ZodOptional<z.ZodEnum<{
            "portrait-short": "portrait-short";
            "portrait-long": "portrait-long";
            together: "together";
            "text-short": "text-short";
            "text-long": "text-long";
        }>>;
    }, z.core.$strict>>;
    playback: z.ZodOptional<z.ZodObject<{
        autoplay: z.ZodOptional<z.ZodBoolean>;
        pauseGame: z.ZodOptional<z.ZodBoolean>;
        durationMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
    speaker: z.ZodString;
    expr: z.ZodOptional<z.ZodString>;
    exprChange: z.ZodOptional<z.ZodEnum<{
        cut: "cut";
        crossfade: "crossfade";
        "in-out": "in-out";
    }>>;
    portrait: z.ZodOptional<z.ZodObject<{
        picture: z.ZodOptional<z.ZodEnum<{
            stage: "stage";
            face: "face";
            temporary: "temporary";
            leave: "leave";
        }>>;
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
        ifTaken: z.ZodOptional<z.ZodEnum<{
            replace: "replace";
            share: "share";
        }>>;
        flip: z.ZodOptional<z.ZodBoolean>;
        layer: z.ZodOptional<z.ZodEnum<{
            back: "back";
            front: "front";
        }>>;
        faceSide: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            follow: "follow";
        }>>;
        show: z.ZodOptional<z.ZodEnum<{
            both: "both";
            stage: "stage";
            dialog: "dialog";
            none: "none";
        }>>;
        toneDown: z.ZodOptional<z.ZodBoolean>;
        animation: z.ZodOptional<z.ZodEnum<{
            cut: "cut";
            fade: "fade";
            slide: "slide";
        }>>;
    }, z.core.$strict>>;
    text: z.ZodString;
    voice: z.ZodOptional<z.ZodString>;
    duckMusic: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** Plays a sequence defined in `story.sequences`. */
export declare const SequenceStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"sequence">;
    ref: z.ZodString;
    blocking: z.ZodDefault<z.ZodBoolean>;
    skippable: z.ZodDefault<z.ZodBoolean>;
    trigger: z.ZodDefault<z.ZodEnum<{
        auto: "auto";
        onClick: "onClick";
    }>>;
    skipPromptKey: z.ZodOptional<z.ZodString>;
    hold: z.ZodDefault<z.ZodBoolean>;
    keepDialog: z.ZodDefault<z.ZodBoolean>;
    layer: z.ZodDefault<z.ZodEnum<{
        front: "front";
        behind: "behind";
    }>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** Ends a held sequence. `start` is the id of the sequence step that holds it. */
export declare const HoldEndStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"hold-end">;
    start: z.ZodString;
    ending: z.ZodDefault<z.ZodEnum<{
        cut: "cut";
        fade: "fade";
    }>>;
    fadeMs: z.ZodDefault<z.ZodNumber>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** A pause: nothing is shown on top of the stage for `ms`, then the story moves on. */
export declare const DelayStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"delay">;
    ms: z.ZodNumber;
    skippable: z.ZodDefault<z.ZodBoolean>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** What a fade can take with it. The dialog box fades only when asked; narration on a black screen is the usual use. */
export declare const TRANSITION_CHANNELS: readonly ["picture", "music", "dialog"];
export declare const TransitionChannelSchema: z.ZodEnum<{
    dialog: "dialog";
    picture: "picture";
    music: "music";
}>;
export type TransitionChannel = z.infer<typeof TransitionChannelSchema>;
/** out: go dark (or light) and stay there. in: come back from it. through: out, hold, in. */
export declare const TRANSITION_MODES: readonly ["out", "in", "through"];
export declare const TransitionModeSchema: z.ZodEnum<{
    out: "out";
    in: "in";
    through: "through";
}>;
export type TransitionMode = z.infer<typeof TransitionModeSchema>;
/**
 * Fades the picture, the music and optionally the dialog box to a color and back. While the screen is covered
 * (after `out`, or in the hold of `through`) the color is part of the stage, so save/load, skip and "play from
 * here" keep it. In `through` the step's own `stage` operations happen in the middle, while the screen is covered.
 * Use `resolveTransition` to read a step with its defaults filled in.
 */
export declare const TransitionStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"transition">;
    mode: z.ZodDefault<z.ZodEnum<{
        out: "out";
        in: "in";
        through: "through";
    }>>;
    color: z.ZodDefault<z.ZodString>;
    affects: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        dialog: "dialog";
        picture: "picture";
        music: "music";
    }>>>;
    outMs: z.ZodDefault<z.ZodNumber>;
    holdMs: z.ZodDefault<z.ZodNumber>;
    inMs: z.ZodDefault<z.ZodNumber>;
    skippable: z.ZodDefault<z.ZodBoolean>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Hands control to the host (a battle, a shop, a puzzle). The engine pauses, emits
 * event(name, params), and continues when the host calls resume(outcome).
 * The outcome is stored in `resultFlag` (default: "<step id>_result").
 */
export declare const EventStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"event">;
    name: z.ZodString;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodJSONSchema>>;
    outcomes: z.ZodArray<z.ZodString>;
    default: z.ZodString;
    resultFlag: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const SetStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"set">;
    set: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        flag: z.ZodString;
        to: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
    }, z.core.$strict>, z.ZodObject<{
        flag: z.ZodString;
        add: z.ZodNumber;
    }, z.core.$strict>]>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const ChoiceOptionSchema: z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    set: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        flag: z.ZodString;
        to: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
    }, z.core.$strict>, z.ZodObject<{
        flag: z.ZodString;
        add: z.ZodNumber;
    }, z.core.$strict>]>>>;
}, z.core.$strict>;
/**
 * Reserved for later. In v1 a choice only sets flags and the story continues on the same path;
 * it has no editor UI yet and no branching.
 */
export declare const ChoiceStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"choice">;
    prompt: z.ZodOptional<z.ZodString>;
    options: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
        when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
        set: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            flag: z.ZodString;
            to: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
        }, z.core.$strict>, z.ZodObject<{
            flag: z.ZodString;
            add: z.ZodNumber;
        }, z.core.$strict>]>>>;
    }, z.core.$strict>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** Ends the story with a named exit the host can react to ("done" is always valid). */
export declare const EndStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"end">;
    exit: z.ZodString;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Skips ahead: out of the fork the step is in (`fork`), or out of the scene (`scene`, the default). The story carries
 * on after the fork, or with the fade at the end of the scene and then the next scene. Usually under a condition.
 */
export declare const LeaveStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"leave">;
    from: z.ZodDefault<z.ZodEnum<{
        scene: "scene";
        fork: "fork";
    }>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Jumps to the start of another scene (`scene`, or this one: a loop), or back to a loop point (`mark`, the id of a
 * `mark` step). Forward jumps skip ahead; backward ones repeat, so a loop needs a condition (or a choice) that can
 * end it. A target that does not exist makes the step do nothing. Exactly one of the two is set; `validateStory`
 * reports a step with neither or both.
 */
export declare const GotoStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"goto">;
    scene: z.ZodOptional<z.ZodString>;
    mark: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * A loop point: a named place a Go to step can jump back to, so a loop needs no scene of its own. It shows nothing
 * and does nothing when the story reaches it. The label is for authors (the editor and the map), never for players.
 */
export declare const MarkStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"mark">;
    label: z.ZodDefault<z.ZodString>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** One way a fork can go. A route with no condition always plays. */
export declare const ForkRouteSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
}, z.core.$strict>;
export type ForkRoute = z.infer<typeof ForkRouteSchema>;
/**
 * Opens a fork: the steps after it that are `inRoute` of one of its routes play only when that route's condition holds,
 * and the story carries on with the steps that are not in any route. The engine never sees it: at load the routes
 * become each step's `when` (see `applyRoutes`).
 */
export declare const ForkStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"fork">;
    routes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
        when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    }, z.core.$strict>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const AutoplayStartStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"autoplay-start">;
    settings: z.ZodOptional<z.ZodObject<{
        delayMs: z.ZodOptional<z.ZodNumber>;
        allowManualAdvance: z.ZodOptional<z.ZodBoolean>;
        pauseGame: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const AutoplayEndStepSchema: z.ZodObject<{
    type: z.ZodLiteral<"autoplay-end">;
    start: z.ZodString;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const StepSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"autoplay-start">;
    settings: z.ZodOptional<z.ZodObject<{
        delayMs: z.ZodOptional<z.ZodNumber>;
        allowManualAdvance: z.ZodOptional<z.ZodBoolean>;
        pauseGame: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"autoplay-end">;
    start: z.ZodString;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"narration">;
    presentation: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodEnum<{
            standard: "standard";
            long: "long";
        }>>;
        position: z.ZodOptional<z.ZodEnum<{
            top: "top";
            bottom: "bottom";
        }>>;
        align: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
        }>>;
        horizontalAlign: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
        }>>;
    }, z.core.$strict>>;
    playback: z.ZodOptional<z.ZodObject<{
        autoplay: z.ZodOptional<z.ZodBoolean>;
        pauseGame: z.ZodOptional<z.ZodBoolean>;
        durationMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
    text: z.ZodString;
    voice: z.ZodOptional<z.ZodString>;
    duckMusic: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"line">;
    presentation: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodEnum<{
            bubble: "bubble";
            "face-box": "face-box";
            box: "box";
            auto: "auto";
        }>>;
        position: z.ZodOptional<z.ZodEnum<{
            top: "top";
            bottom: "bottom";
        }>>;
        enter: z.ZodOptional<z.ZodEnum<{
            "portrait-short": "portrait-short";
            "portrait-long": "portrait-long";
            together: "together";
            "text-short": "text-short";
            "text-long": "text-long";
        }>>;
    }, z.core.$strict>>;
    playback: z.ZodOptional<z.ZodObject<{
        autoplay: z.ZodOptional<z.ZodBoolean>;
        pauseGame: z.ZodOptional<z.ZodBoolean>;
        durationMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
    speaker: z.ZodString;
    expr: z.ZodOptional<z.ZodString>;
    exprChange: z.ZodOptional<z.ZodEnum<{
        cut: "cut";
        crossfade: "crossfade";
        "in-out": "in-out";
    }>>;
    portrait: z.ZodOptional<z.ZodObject<{
        picture: z.ZodOptional<z.ZodEnum<{
            stage: "stage";
            face: "face";
            temporary: "temporary";
            leave: "leave";
        }>>;
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
        ifTaken: z.ZodOptional<z.ZodEnum<{
            replace: "replace";
            share: "share";
        }>>;
        flip: z.ZodOptional<z.ZodBoolean>;
        layer: z.ZodOptional<z.ZodEnum<{
            back: "back";
            front: "front";
        }>>;
        faceSide: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            follow: "follow";
        }>>;
        show: z.ZodOptional<z.ZodEnum<{
            both: "both";
            stage: "stage";
            dialog: "dialog";
            none: "none";
        }>>;
        toneDown: z.ZodOptional<z.ZodBoolean>;
        animation: z.ZodOptional<z.ZodEnum<{
            cut: "cut";
            fade: "fade";
            slide: "slide";
        }>>;
    }, z.core.$strict>>;
    text: z.ZodString;
    voice: z.ZodOptional<z.ZodString>;
    duckMusic: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"sequence">;
    ref: z.ZodString;
    blocking: z.ZodDefault<z.ZodBoolean>;
    skippable: z.ZodDefault<z.ZodBoolean>;
    trigger: z.ZodDefault<z.ZodEnum<{
        auto: "auto";
        onClick: "onClick";
    }>>;
    skipPromptKey: z.ZodOptional<z.ZodString>;
    hold: z.ZodDefault<z.ZodBoolean>;
    keepDialog: z.ZodDefault<z.ZodBoolean>;
    layer: z.ZodDefault<z.ZodEnum<{
        front: "front";
        behind: "behind";
    }>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"delay">;
    ms: z.ZodNumber;
    skippable: z.ZodDefault<z.ZodBoolean>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"transition">;
    mode: z.ZodDefault<z.ZodEnum<{
        out: "out";
        in: "in";
        through: "through";
    }>>;
    color: z.ZodDefault<z.ZodString>;
    affects: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        dialog: "dialog";
        picture: "picture";
        music: "music";
    }>>>;
    outMs: z.ZodDefault<z.ZodNumber>;
    holdMs: z.ZodDefault<z.ZodNumber>;
    inMs: z.ZodDefault<z.ZodNumber>;
    skippable: z.ZodDefault<z.ZodBoolean>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"hold-end">;
    start: z.ZodString;
    ending: z.ZodDefault<z.ZodEnum<{
        cut: "cut";
        fade: "fade";
    }>>;
    fadeMs: z.ZodDefault<z.ZodNumber>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"event">;
    name: z.ZodString;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodJSONSchema>>;
    outcomes: z.ZodArray<z.ZodString>;
    default: z.ZodString;
    resultFlag: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"set">;
    set: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        flag: z.ZodString;
        to: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
    }, z.core.$strict>, z.ZodObject<{
        flag: z.ZodString;
        add: z.ZodNumber;
    }, z.core.$strict>]>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"choice">;
    prompt: z.ZodOptional<z.ZodString>;
    options: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
        when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
        set: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            flag: z.ZodString;
            to: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
        }, z.core.$strict>, z.ZodObject<{
            flag: z.ZodString;
            add: z.ZodNumber;
        }, z.core.$strict>]>>>;
    }, z.core.$strict>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"end">;
    exit: z.ZodString;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"fork">;
    routes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
        when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    }, z.core.$strict>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"leave">;
    from: z.ZodDefault<z.ZodEnum<{
        scene: "scene";
        fork: "fork";
    }>>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"goto">;
    scene: z.ZodOptional<z.ZodString>;
    mark: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"mark">;
    label: z.ZodDefault<z.ZodString>;
    id: z.ZodString;
    when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
    stage: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strict>], "op">>>;
    note: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    inRoute: z.ZodOptional<z.ZodString>;
}, z.core.$strict>], "type">;
export type Step = z.infer<typeof StepSchema>;
export type GotoStep = z.infer<typeof GotoStepSchema>;
export type MarkStep = z.infer<typeof MarkStepSchema>;
export type LeaveStep = z.infer<typeof LeaveStepSchema>;
export type ForkStep = z.infer<typeof ForkStepSchema>;
export type LineStep = z.infer<typeof LineStepSchema>;
export type StepType = Step['type'];
