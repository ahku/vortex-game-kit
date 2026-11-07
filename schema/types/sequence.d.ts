import { z } from 'zod';
/**
 * A sequence is a short, self-contained animated beat: a flat list of timed items with absolute
 * times in milliseconds. `src: ""` is an unlinked placeholder (what AI-generated data starts as).
 * Visuals are a pure function of time so the editor can scrub; audio is scheduled separately.
 */
/** Which part of an image stays in view when it is cropped to fit: a 3 by 3 grid of points, centered by default. */
export declare const IMAGE_FOCUS: readonly ["top-left", "top", "top-right", "left", "center", "right", "bottom-left", "bottom", "bottom-right"];
export declare const ImageFocusSchema: z.ZodEnum<{
    left: "left";
    center: "center";
    right: "right";
    "top-left": "top-left";
    top: "top";
    "top-right": "top-right";
    "bottom-left": "bottom-left";
    bottom: "bottom";
    "bottom-right": "bottom-right";
}>;
export type ImageFocus = z.infer<typeof ImageFocusSchema>;
export declare const ImageFitSchema: z.ZodEnum<{
    cover: "cover";
    contain: "contain";
}>;
export type ImageFit = z.infer<typeof ImageFitSchema>;
/** How an image arrives or leaves: it fades (the default), or slides in from / out to an edge of the picture. */
export declare const ImageMotionSchema: z.ZodEnum<{
    left: "left";
    right: "right";
    fade: "fade";
    top: "top";
    bottom: "bottom";
}>;
export type ImageMotion = z.infer<typeof ImageMotionSchema>;
/** How a value changes over the segment that starts at a keyframe. More names can be added without a schema change. */
export declare const EASINGS: readonly ["linear", "in", "out", "inOut"];
export declare const EasingSchema: z.ZodEnum<{
    out: "out";
    in: "in";
    linear: "linear";
    inOut: "inOut";
}>;
export type Easing = z.infer<typeof EasingSchema>;
/**
 * Keyframe animation of a visual item. Every track adds to the item's own place, size and fade: x and y in frame
 * widths and heights, scale as a multiplier (1 is as is), rotation in degrees, opacity as a multiplier (0 to 1).
 * Before the first keyframe and after the last the value holds; a track with no keyframes does nothing.
 */
export declare const AnimationSchema: z.ZodObject<{
    x: z.ZodOptional<z.ZodArray<z.ZodObject<{
        t: z.ZodNumber;
        value: z.ZodNumber;
        ease: z.ZodOptional<z.ZodEnum<{
            out: "out";
            in: "in";
            linear: "linear";
            inOut: "inOut";
        }>>;
    }, z.core.$strict>>>;
    y: z.ZodOptional<z.ZodArray<z.ZodObject<{
        t: z.ZodNumber;
        value: z.ZodNumber;
        ease: z.ZodOptional<z.ZodEnum<{
            out: "out";
            in: "in";
            linear: "linear";
            inOut: "inOut";
        }>>;
    }, z.core.$strict>>>;
    scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
        t: z.ZodNumber;
        value: z.ZodNumber;
        ease: z.ZodOptional<z.ZodEnum<{
            out: "out";
            in: "in";
            linear: "linear";
            inOut: "inOut";
        }>>;
    }, z.core.$strict>>>;
    scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
        t: z.ZodNumber;
        value: z.ZodNumber;
        ease: z.ZodOptional<z.ZodEnum<{
            out: "out";
            in: "in";
            linear: "linear";
            inOut: "inOut";
        }>>;
    }, z.core.$strict>>>;
    rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
        t: z.ZodNumber;
        value: z.ZodNumber;
        ease: z.ZodOptional<z.ZodEnum<{
            out: "out";
            in: "in";
            linear: "linear";
            inOut: "inOut";
        }>>;
    }, z.core.$strict>>>;
    opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
        t: z.ZodNumber;
        value: z.ZodNumber;
        ease: z.ZodOptional<z.ZodEnum<{
            out: "out";
            in: "in";
            linear: "linear";
            inOut: "inOut";
        }>>;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export type Animation = z.infer<typeof AnimationSchema>;
export type AnimationTrack = keyof Animation;
export type Keyframe = NonNullable<Animation[AnimationTrack]>[number];
export declare const SequenceItemSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    startTime: z.ZodNumber;
    endTime: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
    src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
    position: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        "far-left": "far-left";
        left: "left";
        center: "center";
        right: "right";
        "far-right": "far-right";
    }>, z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        scale: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>]>>;
    focus: z.ZodOptional<z.ZodEnum<{
        left: "left";
        center: "center";
        right: "right";
        "top-left": "top-left";
        top: "top";
        "top-right": "top-right";
        "bottom-left": "bottom-left";
        bottom: "bottom";
        "bottom-right": "bottom-right";
    }>>;
    pivot: z.ZodOptional<z.ZodEnum<{
        left: "left";
        center: "center";
        right: "right";
        "top-left": "top-left";
        top: "top";
        "top-right": "top-right";
        "bottom-left": "bottom-left";
        bottom: "bottom";
        "bottom-right": "bottom-right";
    }>>;
    fit: z.ZodOptional<z.ZodEnum<{
        cover: "cover";
        contain: "contain";
    }>>;
    scale: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, z.core.$strict>>;
    fadeInMs: z.ZodOptional<z.ZodNumber>;
    fadeOutMs: z.ZodOptional<z.ZodNumber>;
    enter: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    exit: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    animation: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        y: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
    }, z.core.$strict>>;
    animated: z.ZodOptional<z.ZodLiteral<true>>;
    locked: z.ZodOptional<z.ZodLiteral<true>>;
    hidden: z.ZodOptional<z.ZodLiteral<true>>;
    type: z.ZodLiteral<"image">;
}, z.core.$strict>, z.ZodObject<{
    startTime: z.ZodNumber;
    endTime: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
    src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
    position: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        "far-left": "far-left";
        left: "left";
        center: "center";
        right: "right";
        "far-right": "far-right";
    }>, z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        scale: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>]>>;
    focus: z.ZodOptional<z.ZodEnum<{
        left: "left";
        center: "center";
        right: "right";
        "top-left": "top-left";
        top: "top";
        "top-right": "top-right";
        "bottom-left": "bottom-left";
        bottom: "bottom";
        "bottom-right": "bottom-right";
    }>>;
    pivot: z.ZodOptional<z.ZodEnum<{
        left: "left";
        center: "center";
        right: "right";
        "top-left": "top-left";
        top: "top";
        "top-right": "top-right";
        "bottom-left": "bottom-left";
        bottom: "bottom";
        "bottom-right": "bottom-right";
    }>>;
    fit: z.ZodOptional<z.ZodEnum<{
        cover: "cover";
        contain: "contain";
    }>>;
    scale: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, z.core.$strict>>;
    loop: z.ZodOptional<z.ZodBoolean>;
    fadeInMs: z.ZodOptional<z.ZodNumber>;
    fadeOutMs: z.ZodOptional<z.ZodNumber>;
    enter: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    exit: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    animation: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        y: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
    }, z.core.$strict>>;
    animated: z.ZodOptional<z.ZodLiteral<true>>;
    locked: z.ZodOptional<z.ZodLiteral<true>>;
    hidden: z.ZodOptional<z.ZodLiteral<true>>;
    type: z.ZodLiteral<"video">;
}, z.core.$strict>, z.ZodObject<{
    startTime: z.ZodNumber;
    endTime: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
    textKey: z.ZodString;
    position: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        "far-left": "far-left";
        left: "left";
        center: "center";
        right: "right";
        "far-right": "far-right";
    }>, z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        scale: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>]>>;
    align: z.ZodOptional<z.ZodEnum<{
        left: "left";
        center: "center";
        right: "right";
    }>>;
    font: z.ZodOptional<z.ZodEnum<{
        serif: "serif";
        sans: "sans";
    }>>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    shadow: z.ZodOptional<z.ZodBoolean>;
    size: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    fadeInMs: z.ZodOptional<z.ZodNumber>;
    fadeOutMs: z.ZodOptional<z.ZodNumber>;
    enter: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    exit: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    animation: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        y: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
    }, z.core.$strict>>;
    animated: z.ZodOptional<z.ZodLiteral<true>>;
    locked: z.ZodOptional<z.ZodLiteral<true>>;
    hidden: z.ZodOptional<z.ZodLiteral<true>>;
    type: z.ZodLiteral<"text">;
}, z.core.$strict>, z.ZodObject<{
    startTime: z.ZodNumber;
    endTime: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    strength: z.ZodOptional<z.ZodNumber>;
    fadeInMs: z.ZodOptional<z.ZodNumber>;
    fadeOutMs: z.ZodOptional<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        y: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
        opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
            t: z.ZodNumber;
            value: z.ZodNumber;
            ease: z.ZodOptional<z.ZodEnum<{
                out: "out";
                in: "in";
                linear: "linear";
                inOut: "inOut";
            }>>;
        }, z.core.$strict>>>;
    }, z.core.$strict>>;
    animated: z.ZodOptional<z.ZodLiteral<true>>;
    locked: z.ZodOptional<z.ZodLiteral<true>>;
    hidden: z.ZodOptional<z.ZodLiteral<true>>;
    type: z.ZodLiteral<"color">;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"sound">;
    startTime: z.ZodNumber;
    endTime: z.ZodOptional<z.ZodNumber>;
    fadeOutMs: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
    src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
    volume: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"voice">;
    startTime: z.ZodNumber;
    endTime: z.ZodOptional<z.ZodNumber>;
    fadeOutMs: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
    src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
    volume: z.ZodOptional<z.ZodNumber>;
    duckMusic: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"music_stop">;
    startTime: z.ZodNumber;
    label: z.ZodOptional<z.ZodString>;
    fadeMs: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"music">;
    startTime: z.ZodNumber;
    endTime: z.ZodOptional<z.ZodNumber>;
    fadeOutMs: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
    src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
    fadeMs: z.ZodOptional<z.ZodNumber>;
    volume: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>, z.ZodObject<{
    durationMs: z.ZodOptional<z.ZodNumber>;
    intensity: z.ZodOptional<z.ZodNumber>;
    speed: z.ZodOptional<z.ZodNumber>;
    size: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"effect">;
    startTime: z.ZodNumber;
    label: z.ZodOptional<z.ZodString>;
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
    type: z.ZodLiteral<"end_scene">;
    startTime: z.ZodNumber;
}, z.core.$strict>], "type">;
export type SequenceItem = z.infer<typeof SequenceItemSchema>;
/** An item that is drawn on the frame and can fade, slide and be animated. */
export type VisualItem = Extract<SequenceItem, {
    type: 'image' | 'text' | 'video' | 'color';
}>;
/** Values items use when they do not set their own. */
export declare const SequenceDefaultsSchema: z.ZodObject<{
    imageFadeInMs: z.ZodOptional<z.ZodNumber>;
    imageFadeOutMs: z.ZodOptional<z.ZodNumber>;
    imageEnter: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
    imageExit: z.ZodOptional<z.ZodEnum<{
        left: "left";
        right: "right";
        fade: "fade";
        top: "top";
        bottom: "bottom";
    }>>;
}, z.core.$strict>;
export type SequenceDefaults = z.infer<typeof SequenceDefaultsSchema>;
export declare const SequenceSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    defaults: z.ZodOptional<z.ZodObject<{
        imageFadeInMs: z.ZodOptional<z.ZodNumber>;
        imageFadeOutMs: z.ZodOptional<z.ZodNumber>;
        imageEnter: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            fade: "fade";
            top: "top";
            bottom: "bottom";
        }>>;
        imageExit: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            fade: "fade";
            top: "top";
            bottom: "bottom";
        }>>;
    }, z.core.$strict>>;
    items: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        startTime: z.ZodNumber;
        endTime: z.ZodOptional<z.ZodNumber>;
        label: z.ZodOptional<z.ZodString>;
        src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
        position: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
            "far-left": "far-left";
            left: "left";
            center: "center";
            right: "right";
            "far-right": "far-right";
        }>, z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            scale: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>]>>;
        focus: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
            "top-left": "top-left";
            top: "top";
            "top-right": "top-right";
            "bottom-left": "bottom-left";
            bottom: "bottom";
            "bottom-right": "bottom-right";
        }>>;
        pivot: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
            "top-left": "top-left";
            top: "top";
            "top-right": "top-right";
            "bottom-left": "bottom-left";
            bottom: "bottom";
            "bottom-right": "bottom-right";
        }>>;
        fit: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
        scale: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, z.core.$strict>>;
        fadeInMs: z.ZodOptional<z.ZodNumber>;
        fadeOutMs: z.ZodOptional<z.ZodNumber>;
        enter: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            fade: "fade";
            top: "top";
            bottom: "bottom";
        }>>;
        exit: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            fade: "fade";
            top: "top";
            bottom: "bottom";
        }>>;
        animation: z.ZodOptional<z.ZodObject<{
            x: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            y: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
        animated: z.ZodOptional<z.ZodLiteral<true>>;
        locked: z.ZodOptional<z.ZodLiteral<true>>;
        hidden: z.ZodOptional<z.ZodLiteral<true>>;
        type: z.ZodLiteral<"image">;
    }, z.core.$strict>, z.ZodObject<{
        startTime: z.ZodNumber;
        endTime: z.ZodOptional<z.ZodNumber>;
        label: z.ZodOptional<z.ZodString>;
        src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
        position: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
            "far-left": "far-left";
            left: "left";
            center: "center";
            right: "right";
            "far-right": "far-right";
        }>, z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            scale: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>]>>;
        focus: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
            "top-left": "top-left";
            top: "top";
            "top-right": "top-right";
            "bottom-left": "bottom-left";
            bottom: "bottom";
            "bottom-right": "bottom-right";
        }>>;
        pivot: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
            "top-left": "top-left";
            top: "top";
            "top-right": "top-right";
            "bottom-left": "bottom-left";
            bottom: "bottom";
            "bottom-right": "bottom-right";
        }>>;
        fit: z.ZodOptional<z.ZodEnum<{
            cover: "cover";
            contain: "contain";
        }>>;
        scale: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, z.core.$strict>>;
        loop: z.ZodOptional<z.ZodBoolean>;
        fadeInMs: z.ZodOptional<z.ZodNumber>;
        fadeOutMs: z.ZodOptional<z.ZodNumber>;
        enter: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            fade: "fade";
            top: "top";
            bottom: "bottom";
        }>>;
        exit: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            fade: "fade";
            top: "top";
            bottom: "bottom";
        }>>;
        animation: z.ZodOptional<z.ZodObject<{
            x: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            y: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
        animated: z.ZodOptional<z.ZodLiteral<true>>;
        locked: z.ZodOptional<z.ZodLiteral<true>>;
        hidden: z.ZodOptional<z.ZodLiteral<true>>;
        type: z.ZodLiteral<"video">;
    }, z.core.$strict>, z.ZodObject<{
        startTime: z.ZodNumber;
        endTime: z.ZodOptional<z.ZodNumber>;
        label: z.ZodOptional<z.ZodString>;
        textKey: z.ZodString;
        position: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
            "far-left": "far-left";
            left: "left";
            center: "center";
            right: "right";
            "far-right": "far-right";
        }>, z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            scale: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>]>>;
        align: z.ZodOptional<z.ZodEnum<{
            left: "left";
            center: "center";
            right: "right";
        }>>;
        font: z.ZodOptional<z.ZodEnum<{
            serif: "serif";
            sans: "sans";
        }>>;
        bold: z.ZodOptional<z.ZodBoolean>;
        italic: z.ZodOptional<z.ZodBoolean>;
        shadow: z.ZodOptional<z.ZodBoolean>;
        size: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fadeInMs: z.ZodOptional<z.ZodNumber>;
        fadeOutMs: z.ZodOptional<z.ZodNumber>;
        enter: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            fade: "fade";
            top: "top";
            bottom: "bottom";
        }>>;
        exit: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            fade: "fade";
            top: "top";
            bottom: "bottom";
        }>>;
        animation: z.ZodOptional<z.ZodObject<{
            x: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            y: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
        animated: z.ZodOptional<z.ZodLiteral<true>>;
        locked: z.ZodOptional<z.ZodLiteral<true>>;
        hidden: z.ZodOptional<z.ZodLiteral<true>>;
        type: z.ZodLiteral<"text">;
    }, z.core.$strict>, z.ZodObject<{
        startTime: z.ZodNumber;
        endTime: z.ZodOptional<z.ZodNumber>;
        label: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        strength: z.ZodOptional<z.ZodNumber>;
        fadeInMs: z.ZodOptional<z.ZodNumber>;
        fadeOutMs: z.ZodOptional<z.ZodNumber>;
        animation: z.ZodOptional<z.ZodObject<{
            x: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            y: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            scale: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            scaleY: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            rotation: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
            opacity: z.ZodOptional<z.ZodArray<z.ZodObject<{
                t: z.ZodNumber;
                value: z.ZodNumber;
                ease: z.ZodOptional<z.ZodEnum<{
                    out: "out";
                    in: "in";
                    linear: "linear";
                    inOut: "inOut";
                }>>;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
        animated: z.ZodOptional<z.ZodLiteral<true>>;
        locked: z.ZodOptional<z.ZodLiteral<true>>;
        hidden: z.ZodOptional<z.ZodLiteral<true>>;
        type: z.ZodLiteral<"color">;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"sound">;
        startTime: z.ZodNumber;
        endTime: z.ZodOptional<z.ZodNumber>;
        fadeOutMs: z.ZodOptional<z.ZodNumber>;
        label: z.ZodOptional<z.ZodString>;
        src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
        volume: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"voice">;
        startTime: z.ZodNumber;
        endTime: z.ZodOptional<z.ZodNumber>;
        fadeOutMs: z.ZodOptional<z.ZodNumber>;
        label: z.ZodOptional<z.ZodString>;
        src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
        volume: z.ZodOptional<z.ZodNumber>;
        duckMusic: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"music_stop">;
        startTime: z.ZodNumber;
        label: z.ZodOptional<z.ZodString>;
        fadeMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>, z.ZodObject<{
        type: z.ZodLiteral<"music">;
        startTime: z.ZodNumber;
        endTime: z.ZodOptional<z.ZodNumber>;
        fadeOutMs: z.ZodOptional<z.ZodNumber>;
        label: z.ZodOptional<z.ZodString>;
        src: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>;
        fadeMs: z.ZodOptional<z.ZodNumber>;
        volume: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>, z.ZodObject<{
        durationMs: z.ZodOptional<z.ZodNumber>;
        intensity: z.ZodOptional<z.ZodNumber>;
        speed: z.ZodOptional<z.ZodNumber>;
        size: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"effect">;
        startTime: z.ZodNumber;
        label: z.ZodOptional<z.ZodString>;
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
        type: z.ZodLiteral<"end_scene">;
        startTime: z.ZodNumber;
    }, z.core.$strict>], "type">>;
}, z.core.$strict>;
export type Sequence = z.infer<typeof SequenceSchema>;
export declare const SequenceIdSchema: z.ZodString;
