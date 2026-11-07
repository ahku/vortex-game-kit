import type { ImageMotion, Sequence, SequenceItem, VisualItem } from '../../schema/types/index';
/** Total length of a sequence in ms: when its last item ends or starts, or an `end_scene` marker. */
export declare function sequenceDuration(seq: Sequence): number;
/** Images visible at time t (ms). An image without an end time stays until the sequence ends. */
export declare function visibleImages(seq: Sequence, t: number): Array<Extract<SequenceItem, {
    type: 'image';
}>>;
/** Everything drawn on the frame at time t: pictures, text and video, in the order of the list (later is in front). */
export declare function visibleVisuals(seq: Sequence, t: number): VisualItem[];
/** How long music fades out when a music item has an end time but no fade of its own. */
export declare const MUSIC_END_FADE_MS = 1500;
/**
 * The music of the sequence that is sounding at time `t`, and how far into the track it is, for starting a
 * preview in the middle. Null when none is (not started, stopped, or its end has come).
 */
export declare function musicAt(seq: Sequence, t: number): {
    item: Extract<SequenceItem, {
        type: 'music';
    }>;
    offsetMs: number;
} | null;
/**
 * Items (sound, voice, music, effect) whose start time falls in the half-open window [from, to). A music item
 * with an end time also gives a fade-out that starts early enough to finish at the end, unless other music has
 * taken over by then.
 */
export declare function itemsStartingIn(seq: Sequence, from: number, to: number): SequenceItem[];
/** Where a sequence ends: its `end_scene` marker if it has one, else after its last item. */
export declare const sequenceEnd: (seq: Sequence) => number;
/** What an image fades by when nothing else says. A theme, a sequence or the image itself can override it. */
export declare const DEFAULT_IMAGE_FADE_MS = 300;
/** Defaults that can come from a theme or the sequence; the same two numbers at either level. */
export interface ImageFadeDefaults {
    imageFadeInMs?: number | undefined;
    imageFadeOutMs?: number | undefined;
    imageEnter?: ImageMotion | undefined;
    imageExit?: ImageMotion | undefined;
}
/**
 * The fade an image really has: its own setting, else the sequence's default, else the theme's, else the built-in
 * 300 ms. The editor shows these same values, so the number on screen is what plays.
 */
export declare function imageFades(seq: Sequence, img: VisualItem, theme?: ImageFadeDefaults): {
    inMs: number;
    outMs: number;
};
/**
 * How visible an image is at time t, 0 to 1. Fades happen inside the image's own span: it comes in over its
 * fade-in and is gone by its end (or the sequence's end) after its fade-out. Shared by the player and the editor
 * so they look the same.
 */
export declare function imageOpacity(seq: Sequence, img: VisualItem, t: number, theme?: ImageFadeDefaults): number;
/** How an image arrives and leaves: its own setting, else the sequence's, else the theme's, else a fade. */
export declare function imageMotions(seq: Sequence, img: VisualItem, theme?: ImageFadeDefaults): {
    enter: ImageMotion;
    exit: ImageMotion;
};
/**
 * How far an image is from its place at time t, in picture widths (x) and heights (y): 0 when it is there.
 * A slide takes the image's fade time and eases in or out; a fade never moves.
 */
export declare function imageSlide(seq: Sequence, img: VisualItem, t: number, theme?: ImageFadeDefaults): {
    x: number;
    y: number;
};
/**
 * In a held sequence, whether a picture stays on screen after the sequence has played, until the hold ends:
 * it reaches the end of the sequence and has no "goes out" of its own (its exit is on Auto). A picture that
 * ends earlier, or that has an exit of its own, leaves as authored.
 */
export declare function staysWhenHeld(seq: Sequence, img: VisualItem): boolean;
/** Time at which an `end_scene` item ends the sequence early, if the sequence has one. */
export declare function endSceneTime(seq: Sequence): number | undefined;
/** Where and how a picture is drawn at one moment, everything folded together. */
export interface ItemFrame {
    /** 0 to 1: the fade times times the animated opacity. */
    opacity: number;
    /** From its own place, in frame widths and heights: the slide in or out plus the animated offset. */
    x: number;
    y: number;
    /** A multiplier of its own size. `scaleY` follows `scale` unless it is animated on its own. */
    scale: number;
    scaleY: number;
    /** Degrees. */
    rotation: number;
}
/**
 * Everything the player, the editor preview and the timeline need to draw a picture at time `t` (ms from the start
 * of the sequence). The fades and slides that exist today are inputs; keyframes add to them. A pure function of time,
 * so scrubbing and pausing just work. An item without `animation` gives exactly `imageOpacity` and `imageSlide`.
 */
export declare function itemFrame(seq: Sequence, img: VisualItem, t: number, theme?: ImageFadeDefaults): ItemFrame;
/** Whether an item is in Animated mode: it says so, or it already has keyframes (from before the mode existed). */
export declare const itemAnimated: (item: VisualItem) => boolean;
/** How far, in ms, a playing video may drift from the sequence clock before it is moved back. */
export declare const VIDEO_DRIFT_MS = 150;
/**
 * Where a video should be, in seconds into its own file, when the sequence clock reads `t` ms. Before it starts this
 * is 0. A looping video wraps around its length (`durationSec`, once known); one that is not looping stops on its
 * last frame, which the element does by itself once the target passes its end.
 */
export declare function videoTime(item: Extract<SequenceItem, {
    type: 'video';
}>, t: number, durationSec?: number): number;
/**
 * Whether a playing video is far enough from where it should be that it needs to be moved. A looping video that has
 * just wrapped is near its target even though the numbers are far apart, so pass its length as `loopSec`.
 */
export declare function videoNeedsSeek(currentSec: number, targetSec: number, loopSec?: number): boolean;
