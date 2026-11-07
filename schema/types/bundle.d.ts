import { z } from 'zod';
/**
 * Everything a host needs to run a story: the story, its string tables, the asset manifest, and the
 * workspace context (characters, shared flags) the story refers to. This is the export format.
 */
export declare const ExportBundleSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    story: z.ZodObject<{
        schemaVersion: z.ZodLiteral<1>;
        id: z.ZodString;
        meta: z.ZodObject<{
            title: z.ZodString;
            episode: z.ZodOptional<z.ZodNumber>;
            summary: z.ZodOptional<z.ZodString>;
            titleKey: z.ZodOptional<z.ZodString>;
            summaryKey: z.ZodOptional<z.ZodString>;
            authors: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
        languages: z.ZodObject<{
            source: z.ZodString;
            available: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
        settings: z.ZodOptional<z.ZodObject<{
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
        }, z.core.$strict>>;
        contract: z.ZodPrefault<z.ZodObject<{
            exits: z.ZodDefault<z.ZodArray<z.ZodString>>;
            reads: z.ZodDefault<z.ZodArray<z.ZodString>>;
            sets: z.ZodDefault<z.ZodArray<z.ZodString>>;
            hostEvents: z.ZodDefault<z.ZodArray<z.ZodString>>;
            characters: z.ZodDefault<z.ZodArray<z.ZodString>>;
            assets: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>>;
        flags: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
            type: z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
            }>;
            default: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
            description: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>>;
        scenes: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            meta: z.ZodObject<{
                title: z.ZodString;
                subtitle: z.ZodOptional<z.ZodString>;
                location: z.ZodOptional<z.ZodString>;
                time: z.ZodOptional<z.ZodString>;
                displayTitle: z.ZodOptional<z.ZodString>;
                displaySubtitle: z.ZodOptional<z.ZodString>;
                start: z.ZodOptional<z.ZodEnum<{
                    title: "title";
                    corner: "corner";
                    quiet: "quiet";
                }>>;
                backgroundAsset: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
            trigger: z.ZodOptional<z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
                presentation: z.ZodOptional<z.ZodEnum<{
                    overlay: "overlay";
                    full: "full";
                }>>;
            }, z.core.$strict>>;
            when: z.ZodOptional<z.ZodType<import("./conditions").Condition, unknown, z.core.$ZodTypeInternals<import("./conditions").Condition, unknown>>>;
            after: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
                scene: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                end: z.ZodLiteral<true>;
            }, z.core.$strict>]>>;
            playback: z.ZodOptional<z.ZodObject<{
                autoplay: z.ZodOptional<z.ZodBoolean>;
                pauseGame: z.ZodOptional<z.ZodBoolean>;
                durationMs: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strict>>;
            steps: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
            }, z.core.$strict>], "type">>;
        }, z.core.$strict>>;
        sequences: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
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
        }, z.core.$strict>>>;
        characters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            speakerBadge: z.ZodOptional<z.ZodEnum<{
                filled: "filled";
                outlined: "outlined";
            }>>;
            names: z.ZodRecord<z.ZodString, z.ZodString>;
            fullNames: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            faceCrops: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
                zoom: z.ZodNumber;
            }, z.core.$strict>>>;
            color: z.ZodOptional<z.ZodString>;
            label: z.ZodOptional<z.ZodString>;
            note: z.ZodOptional<z.ZodString>;
            expressions: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
            faces: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            expressionOrder: z.ZodOptional<z.ZodArray<z.ZodString>>;
            defaultExpression: z.ZodOptional<z.ZodString>;
            home: z.ZodOptional<z.ZodEnum<{
                "far-left": "far-left";
                left: "left";
                center: "center";
                right: "right";
                "far-right": "far-right";
            }>>;
            faceSide: z.ZodOptional<z.ZodEnum<{
                left: "left";
                right: "right";
                follow: "follow";
            }>>;
            dimExtra: z.ZodOptional<z.ZodNumber>;
            fits: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                scale: z.ZodOptional<z.ZodNumber>;
                lift: z.ZodOptional<z.ZodNumber>;
                sameAs: z.ZodOptional<z.ZodString>;
                flip: z.ZodOptional<z.ZodBoolean>;
                head: z.ZodOptional<z.ZodObject<{
                    x: z.ZodNumber;
                    y: z.ZodNumber;
                    size: z.ZodNumber;
                }, z.core.$strict>>;
            }, z.core.$strict>>>;
        }, z.core.$strict>>>;
    }, z.core.$strict>;
    strings: z.ZodRecord<z.ZodString, z.ZodObject<{
        schemaVersion: z.ZodLiteral<1>;
        lang: z.ZodString;
        entries: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
            text: z.ZodString;
            sourceHash: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>]>>;
    }, z.core.$strict>>;
    assets: z.ZodObject<{
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
    characters: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        speakerBadge: z.ZodOptional<z.ZodEnum<{
            filled: "filled";
            outlined: "outlined";
        }>>;
        names: z.ZodRecord<z.ZodString, z.ZodString>;
        fullNames: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        faceCrops: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            zoom: z.ZodNumber;
        }, z.core.$strict>>>;
        color: z.ZodOptional<z.ZodString>;
        label: z.ZodOptional<z.ZodString>;
        note: z.ZodOptional<z.ZodString>;
        expressions: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
        faces: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        expressionOrder: z.ZodOptional<z.ZodArray<z.ZodString>>;
        defaultExpression: z.ZodOptional<z.ZodString>;
        home: z.ZodOptional<z.ZodEnum<{
            "far-left": "far-left";
            left: "left";
            center: "center";
            right: "right";
            "far-right": "far-right";
        }>>;
        faceSide: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            follow: "follow";
        }>>;
        dimExtra: z.ZodOptional<z.ZodNumber>;
        fits: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            scale: z.ZodOptional<z.ZodNumber>;
            lift: z.ZodOptional<z.ZodNumber>;
            sameAs: z.ZodOptional<z.ZodString>;
            flip: z.ZodOptional<z.ZodBoolean>;
            head: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
                size: z.ZodNumber;
            }, z.core.$strict>>;
        }, z.core.$strict>>>;
    }, z.core.$strict>>>;
    registry: z.ZodOptional<z.ZodObject<{
        schemaVersion: z.ZodLiteral<1>;
        flags: z.ZodRecord<z.ZodString, z.ZodObject<{
            type: z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
            }>;
            default: z.ZodUnion<readonly [z.ZodBoolean, z.ZodNumber, z.ZodString]>;
            description: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type ExportBundle = z.output<typeof ExportBundleSchema>;
