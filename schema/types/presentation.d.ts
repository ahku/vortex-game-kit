import { z } from 'zod';
/** Presentation is independent of portrait entry/exit, text and playback. */
export declare const TEXT_POSITIONS: readonly ["top", "bottom"];
export declare const TextPositionSchema: z.ZodEnum<{
    top: "top";
    bottom: "bottom";
}>;
export declare const LINE_MODES: readonly ["bubble", "face-box", "box"];
export declare const NARRATION_MODES: readonly ["standard", "long"];
/**
 * How a line's box and a stage portrait that is arriving on it are timed: the portrait comes first and the box
 * waits a short or long beat, both at once, or the box comes first and the portrait follows after a beat.
 */
export declare const LINE_ENTRANCES: readonly ["portrait-short", "portrait-long", "together", "text-short", "text-long"];
export declare const LineEntranceSchema: z.ZodEnum<{
    "portrait-short": "portrait-short";
    "portrait-long": "portrait-long";
    together: "together";
    "text-short": "text-short";
    "text-long": "text-long";
}>;
export type LineEntrance = z.infer<typeof LineEntranceSchema>;
export declare const TEXT_ALIGNMENTS: readonly ["left", "center", "right"];
export declare const SPEAKER_BADGES: readonly ["filled", "outlined"];
export declare const SpeakerBadgeSchema: z.ZodEnum<{
    filled: "filled";
    outlined: "outlined";
}>;
export type SpeakerBadge = z.infer<typeof SpeakerBadgeSchema>;
export declare const LinePresentationSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const NarrationPresentationSchema: z.ZodObject<{
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
}, z.core.$strict>;
export declare const PresentationDefaultsSchema: z.ZodObject<{
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
}, z.core.$strict>;
export type LinePresentation = z.infer<typeof LinePresentationSchema>;
export type NarrationPresentation = z.infer<typeof NarrationPresentationSchema>;
export type PresentationDefaults = z.infer<typeof PresentationDefaultsSchema>;
export type ResolvedLinePresentation = Required<LinePresentation>;
export type ResolvedNarrationPresentation = Required<NarrationPresentation>;
export declare const DEFAULT_LINE_PRESENTATION: Readonly<ResolvedLinePresentation>;
export declare const DEFAULT_NARRATION_PRESENTATION: Readonly<ResolvedNarrationPresentation>;
/** What a line knows about its own moment that the style can depend on. */
export interface LinePresentationContext {
    /** The speaker's large picture shows on the stage during this line. */
    stagePortrait?: boolean | undefined;
}
/**
 * The style a line has when neither it nor the story chose one: a plain box when the speaker's stage portrait shows
 * (a face in the box would only repeat it), otherwise the face box.
 */
export declare const automaticLineMode: (stagePortrait?: boolean) => (typeof LINE_MODES)[number];
/** Whether the line's style is automatic: the line asks for it, or it sets none and the story sets none (or asks for it). */
export declare const lineModeIsAutomatic: (own?: LinePresentation, defaults?: PresentationDefaults) => boolean;
/** Resolve field by field: an absent field follows the story, then the built-in default. */
export declare function resolveLinePresentation(own?: LinePresentation, defaults?: PresentationDefaults, context?: LinePresentationContext): ResolvedLinePresentation;
export declare function resolveNarrationPresentation(own?: NarrationPresentation, defaults?: PresentationDefaults): ResolvedNarrationPresentation;
/** Editing text alignment must not move a legacy column that derived its position from align. */
export declare function patchNarrationPresentation(own: NarrationPresentation | undefined, patch: NarrationPresentation, defaults?: PresentationDefaults): NarrationPresentation;
export type PresentedTextStep = {
    type: 'line';
    presentation?: LinePresentation;
} | {
    type: 'narration';
    presentation?: NarrationPresentation;
};
/** Entrance timing belongs to the line it is set on, so a new step does not copy it. */
export type NewLinePresentation = {
    mode?: ResolvedLinePresentation['mode'] | 'auto';
    position: ResolvedLinePresentation['position'];
};
/** A new step snapshots applicable selected-step settings; other creation keeps following story defaults. */
export declare function presentationForNewStep(type: 'line', source?: PresentedTextStep, defaults?: PresentationDefaults): NewLinePresentation | undefined;
export declare function presentationForNewStep(type: 'narration', source?: PresentedTextStep, defaults?: PresentationDefaults): ResolvedNarrationPresentation | undefined;
