import { z } from 'zod';
/**
 * Story-level settings. Every field is optional and no value means the built-in default, so older stories stay valid
 * as they are. The shape leaves room for a workspace layer underneath later (story, then workspace, then built-in).
 */
/** Typing speed of the dialog text. `instant` shows the whole text at once. */
export declare const TEXT_SPEEDS: readonly ["slow", "normal", "fast", "instant"];
export declare const TextSpeedSchema: z.ZodEnum<{
    slow: "slow";
    normal: "normal";
    fast: "fast";
    instant: "instant";
}>;
export type TextSpeed = z.infer<typeof TextSpeedSchema>;
/** Characters per second for each speed; 0 means no typing. `normal` is how the player always worked. */
export declare const TEXT_SPEED_CPS: Record<TextSpeed, number>;
export declare const DEFAULT_TEXT_SPEED: TextSpeed;
export declare const cpsOf: (speed: TextSpeed | undefined) => number;
/** What a story gets for its scene fades and the pause between scenes when its settings say nothing. */
export declare const DEFAULT_SCENE_FADE_MS = 500;
export declare const DEFAULT_SCENE_GAP_MS = 1500;
/** How long a scene's title shows on its own, before its first step. 0 shows it over the first step instead. */
export declare const DEFAULT_SCENE_TITLE_MS = 3500;
/** How long a scene's title card stays up before a click or key can dismiss it (never longer than the card itself). */
export declare const SCENE_CARD_MIN_MS = 1500;
/** Reading beat after the large title leaves, before the scene's first authored step. */
export declare const DEFAULT_SCENE_TITLE_GAP_MS = 1000;
/**
 * How a scene begins: with its title card (`title`), with the title kept small in the top-left corner for as long as
 * the scene lasts (`corner`), or `quiet`, with no title, for a scene that carries on from the one before (after a fork,
 * say).
 */
export declare const SCENE_STARTS: readonly ["title", "corner", "quiet"];
export declare const SceneStartSchema: z.ZodEnum<{
    title: "title";
    corner: "corner";
    quiet: "quiet";
}>;
export type SceneStart = z.infer<typeof SceneStartSchema>;
export declare const DEFAULT_SCENE_START: SceneStart;
/** The story text typeface. Legacy `default` means Sans-serif; omitted settings use Serif. */
export declare const TEXT_STYLES: readonly ["serif", "default"];
export declare const TextStyleSchema: z.ZodEnum<{
    default: "default";
    serif: "serif";
}>;
export type TextStyle = z.infer<typeof TextStyleSchema>;
export declare const DEFAULT_TEXT_STYLE: TextStyle;
/** Color presets per role, as CSS colors. The first of each is the default look. */
export declare const BACKGROUND_PRESETS: {
    readonly stage: "rgb(18 21 26 / 0.85)";
    readonly night: "rgb(0 0 0 / 0.7)";
    readonly deep: "rgb(0 0 0 / 0.9)";
    readonly dusk: "rgb(30 27 75 / 0.8)";
    readonly paper: "rgb(255 255 255 / 0.85)";
    readonly clear: "rgb(0 0 0 / 0)";
};
export declare const BORDER_PRESETS: {
    readonly warm: "#eec68b";
    readonly soft: "rgb(255 255 255 / 0.15)";
    readonly bright: "rgb(255 255 255 / 0.55)";
    readonly dark: "rgb(0 0 0 / 0.45)";
    readonly none: "rgb(0 0 0 / 0)";
};
export declare const TEXT_PRESETS: {
    readonly story: "#fff3e2";
    readonly white: "#ffffff";
    readonly cream: "#fdf6e3";
    readonly ink: "#111111";
};
/** The speaker's name tag on a line box. Its text color is the character's own color. */
export declare const TAG_BACKGROUND_PRESETS: {
    readonly ink: "rgb(0 0 0 / 0.85)";
    readonly dusk: "rgb(30 27 75 / 0.9)";
    readonly paper: "rgb(255 255 255 / 0.9)";
    readonly clear: "rgb(0 0 0 / 0)";
};
/** `speaker` (the default) borders the tag in the character's color; it has no fixed value. */
export declare const TAG_BORDER_PRESETS: {
    readonly speaker: "";
    readonly bright: "rgb(255 255 255 / 0.55)";
    readonly dark: "rgb(0 0 0 / 0.45)";
    readonly none: "rgb(0 0 0 / 0)";
};
export type BackgroundPreset = keyof typeof BACKGROUND_PRESETS;
export type BorderPreset = keyof typeof BORDER_PRESETS;
export type TextPreset = keyof typeof TEXT_PRESETS;
export declare const CORNERS: readonly ["square", "rounded", "round"];
export declare const CornersSchema: z.ZodEnum<{
    square: "square";
    rounded: "rounded";
    round: "round";
}>;
export type Corners = z.infer<typeof CornersSchema>;
/** How one kind of dialog box looks. */
export declare const BoxStyleSchema: z.ZodObject<{
    box: z.ZodOptional<z.ZodBoolean>;
    background: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        stage: "stage";
        dusk: "dusk";
        night: "night";
        clear: "clear";
        deep: "deep";
        paper: "paper";
    }>, z.ZodString]>>;
    border: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        none: "none";
        warm: "warm";
        soft: "soft";
        bright: "bright";
        dark: "dark";
    }>, z.ZodString]>>;
    text: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        story: "story";
        white: "white";
        cream: "cream";
        ink: "ink";
    }>, z.ZodString]>>;
    corners: z.ZodOptional<z.ZodEnum<{
        square: "square";
        rounded: "rounded";
        round: "round";
    }>>;
}, z.core.$strict>;
export type BoxStyle = z.infer<typeof BoxStyleSchema>;
export declare const NameTagStyleSchema: z.ZodObject<{
    box: z.ZodOptional<z.ZodBoolean>;
    background: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        dusk: "dusk";
        clear: "clear";
        paper: "paper";
        ink: "ink";
    }>, z.ZodString]>>;
    border: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        none: "none";
        speaker: "speaker";
        bright: "bright";
        dark: "dark";
    }>, z.ZodString]>>;
    corners: z.ZodOptional<z.ZodEnum<{
        square: "square";
        rounded: "rounded";
        round: "round";
    }>>;
}, z.core.$strict>;
export type NameTagStyle = z.infer<typeof NameTagStyleSchema>;
export declare const StorySettingsSchema: z.ZodObject<{
    presentation: z.ZodOptional<z.ZodObject<{
        line: z.ZodOptional<z.ZodObject<{
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
        narration: z.ZodOptional<z.ZodObject<{
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
    }, z.core.$strict>>;
    advancedSteps: z.ZodOptional<z.ZodBoolean>;
    textSpeed: z.ZodOptional<z.ZodEnum<{
        slow: "slow";
        normal: "normal";
        fast: "fast";
        instant: "instant";
    }>>;
    autoplayDelayMs: z.ZodOptional<z.ZodNumber>;
    autoplayAllowManualAdvance: z.ZodOptional<z.ZodBoolean>;
    textStyle: z.ZodOptional<z.ZodEnum<{
        default: "default";
        serif: "serif";
    }>>;
    sceneFadeOutMs: z.ZodOptional<z.ZodNumber>;
    sceneFadeInMs: z.ZodOptional<z.ZodNumber>;
    sceneGapMs: z.ZodOptional<z.ZodNumber>;
    sceneTitleMs: z.ZodOptional<z.ZodNumber>;
    sceneTitleGapMs: z.ZodOptional<z.ZodNumber>;
    sceneStart: z.ZodOptional<z.ZodEnum<{
        title: "title";
        corner: "corner";
        quiet: "quiet";
    }>>;
    portraits: z.ZodOptional<z.ZodObject<{
        show: z.ZodOptional<z.ZodEnum<{
            both: "both";
            stage: "stage";
            dialog: "dialog";
            none: "none";
        }>>;
        faceSide: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            follow: "follow";
        }>>;
        tone: z.ZodOptional<z.ZodEnum<{
            off: "off";
            subtle: "subtle";
            strong: "strong";
        }>>;
        dim: z.ZodOptional<z.ZodEnum<{
            off: "off";
            subtle: "subtle";
            strong: "strong";
        }>>;
        shrink: z.ZodOptional<z.ZodBoolean>;
        animation: z.ZodOptional<z.ZodEnum<{
            cut: "cut";
            fade: "fade";
            slide: "slide";
        }>>;
    }, z.core.$strict>>;
    styles: z.ZodOptional<z.ZodObject<{
        narration: z.ZodOptional<z.ZodObject<{
            box: z.ZodOptional<z.ZodBoolean>;
            background: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                stage: "stage";
                dusk: "dusk";
                night: "night";
                clear: "clear";
                deep: "deep";
                paper: "paper";
            }>, z.ZodString]>>;
            border: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                none: "none";
                warm: "warm";
                soft: "soft";
                bright: "bright";
                dark: "dark";
            }>, z.ZodString]>>;
            text: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                story: "story";
                white: "white";
                cream: "cream";
                ink: "ink";
            }>, z.ZodString]>>;
            corners: z.ZodOptional<z.ZodEnum<{
                square: "square";
                rounded: "rounded";
                round: "round";
            }>>;
        }, z.core.$strict>>;
        line: z.ZodOptional<z.ZodObject<{
            box: z.ZodOptional<z.ZodBoolean>;
            background: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                stage: "stage";
                dusk: "dusk";
                night: "night";
                clear: "clear";
                deep: "deep";
                paper: "paper";
            }>, z.ZodString]>>;
            border: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                none: "none";
                warm: "warm";
                soft: "soft";
                bright: "bright";
                dark: "dark";
            }>, z.ZodString]>>;
            text: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                story: "story";
                white: "white";
                cream: "cream";
                ink: "ink";
            }>, z.ZodString]>>;
            corners: z.ZodOptional<z.ZodEnum<{
                square: "square";
                rounded: "rounded";
                round: "round";
            }>>;
        }, z.core.$strict>>;
        nameTag: z.ZodOptional<z.ZodObject<{
            box: z.ZodOptional<z.ZodBoolean>;
            background: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                dusk: "dusk";
                clear: "clear";
                paper: "paper";
                ink: "ink";
            }>, z.ZodString]>>;
            border: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                none: "none";
                speaker: "speaker";
                bright: "bright";
                dark: "dark";
            }>, z.ZodString]>>;
            corners: z.ZodOptional<z.ZodEnum<{
                square: "square";
                rounded: "rounded";
                round: "round";
            }>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type StorySettings = z.infer<typeof StorySettingsSchema>;
/** A box style with every choice made, as CSS values. */
export interface ResolvedBoxStyle {
    box: boolean;
    background: string;
    border: string;
    text: string;
    corners: Corners;
}
/** Today's look: what a story gets with no settings at all. */
export declare const DEFAULT_STYLES: Record<'narration' | 'line', ResolvedBoxStyle>;
/** Fills in the defaults for one kind of box and turns preset names into CSS colors. */
export declare function resolveBoxStyle(kind: 'narration' | 'line', settings: StorySettings | undefined): ResolvedBoxStyle;
/** The name tag with every choice made. An empty `border` means the speaker's own color. */
export interface ResolvedNameTag {
    box: boolean;
    background: string;
    border: string;
    corners: Corners;
}
export declare const DEFAULT_NAME_TAG: ResolvedNameTag;
export declare function resolveNameTag(settings: StorySettings | undefined): ResolvedNameTag;
