import { z } from 'zod';
/**
 * How character portraits are shown. A speaker's small **dialog portrait** shows in the dialog box; a large **stage portrait**
 * is something the author asks for, per line (see `LinePortraitSchema`).
 */
/** Which kinds of portrait a story shows. `both` is the default. */
export declare const PORTRAIT_SHOWS: readonly ["both", "stage", "dialog", "none"];
export declare const PortraitShowSchema: z.ZodEnum<{
    both: "both";
    stage: "stage";
    dialog: "dialog";
    none: "none";
}>;
export type PortraitShow = z.infer<typeof PortraitShowSchema>;
/**
 * What a story shows by default when someone speaks. A stage portrait that the author asks for (a line's own choice, or
 * a stage change that puts someone on stage) shows whatever the story says.
 */
export declare const showsStage: (show: PortraitShow) => boolean;
export declare const showsDialog: (show: PortraitShow) => boolean;
/** Which side of the dialog box the face sits on. `follow` puts it on the side the speaker stands on. */
export declare const FACE_SIDES: readonly ["left", "right", "follow"];
export declare const FaceSideSchema: z.ZodEnum<{
    left: "left";
    right: "right";
    follow: "follow";
}>;
export type FaceSide = z.infer<typeof FaceSideSchema>;
/** How much the non-speakers on stage are toned down while someone speaks. */
export declare const PORTRAIT_TONES: readonly ["off", "subtle", "strong"];
export declare const PortraitToneSchema: z.ZodEnum<{
    off: "off";
    subtle: "subtle";
    strong: "strong";
}>;
export type PortraitTone = z.infer<typeof PortraitToneSchema>;
/** How a portrait arrives and leaves: appears at once, fades, or slides in from the side while fading. */
export declare const PORTRAIT_ANIMATIONS: readonly ["cut", "fade", "slide"];
export declare const PortraitAnimationSchema: z.ZodEnum<{
    cut: "cut";
    fade: "fade";
    slide: "slide";
}>;
export type PortraitAnimation = z.infer<typeof PortraitAnimationSchema>;
/** The story-level choices. Every field is optional; no value means the default. */
export declare const PortraitSettingsSchema: z.ZodObject<{
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
}, z.core.$strict>;
export type PortraitSettings = z.infer<typeof PortraitSettingsSchema>;
/** New emphasis controls are resolved separately while older renderers still consume `tone`. */
export declare function resolvePortraitEmphasis(own: PortraitSettings | undefined): {
    dim: PortraitTone;
    shrink: boolean;
};
export interface ResolvedPortraitSettings {
    show: PortraitShow;
    faceSide: FaceSide;
    tone: PortraitTone;
    animation: PortraitAnimation;
}
export declare const DEFAULT_PORTRAIT_SETTINGS: ResolvedPortraitSettings;
export declare function resolvePortraitSettings(own: PortraitSettings | undefined): ResolvedPortraitSettings;
/** What toning down does to a portrait that is not speaking: brightness, color and how far it steps back. */
export declare const TONE_LOOK: Record<Exclude<PortraitTone, 'off'>, {
    brightness: number;
    saturate: number;
    scale: number;
}>;
/** The most a character can add to the story's dimming of non-speakers. */
export declare const MAX_DIM_EXTRA = 0.5;
/**
 * How one non-speaking portrait is toned down: the story's level, plus the character's own extra darkening on top.
 * `off` tones nothing down whatever the extra; the extra is relative to the story's level, not a replacement.
 */
export declare function toneLookFor(level: PortraitTone, extra?: number): {
    brightness: number;
    saturate: number;
    scale: number;
};
/**
 * What a line does with the speaker's large picture.
 * - `face`: nothing; only the face in the dialog box (a voice from off-stage). Hidden.
 * - `temporary`: a large picture for this line only. The default, when the speaker has a picture to show.
 * - `stage`: put the speaker on stage, where they stay until taken off or replaced.
 * - `leave`: the speaker, if on stage, speaks this line and then leaves.
 */
export declare const PORTRAIT_PICTURES: readonly ["face", "temporary", "stage", "leave"];
export declare const PortraitPictureSchema: z.ZodEnum<{
    stage: "stage";
    face: "face";
    temporary: "temporary";
    leave: "leave";
}>;
export type PortraitPicture = z.infer<typeof PortraitPictureSchema>;
/**
 * Where a portrait is drawn among the others on stage. Without a choice the speaker is in front and the rest stand
 * in the order they arrived; `back` and `front` keep a portrait behind or in front of everyone else.
 */
export declare const PORTRAIT_LAYERS: readonly ["back", "front"];
export declare const PortraitLayerSchema: z.ZodEnum<{
    back: "back";
    front: "front";
}>;
export type PortraitLayer = z.infer<typeof PortraitLayerSchema>;
/** What to do when the position a portrait wants already holds someone. */
export declare const PORTRAIT_IF_TAKEN: readonly ["replace", "share"];
export declare const PortraitIfTakenSchema: z.ZodEnum<{
    replace: "replace";
    share: "share";
}>;
export type PortraitIfTaken = z.infer<typeof PortraitIfTakenSchema>;
/** A line's portrait choices. Every field is optional; an absent one means "automatic". */
export declare const LinePortraitSchema: z.ZodObject<{
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
}, z.core.$strict>;
export type LinePortrait = z.infer<typeof LinePortraitSchema>;
/** The three positions the editor offers. The schema keeps the older far-left and far-right for existing stories. */
export declare const PORTRAIT_POSITIONS: readonly ["left", "center", "right"];
export declare const DEFAULT_PORTRAIT_POSITION: "left";
