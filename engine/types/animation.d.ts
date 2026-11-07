import type { Animation, AnimationTrack, Easing, Keyframe } from '../../schema/types/index';
/** Easing curves: they take 0 to 1 and give 0 to 1. `in` starts slow, `out` ends slow, `inOut` does both. */
export declare const EASE: Record<Easing, (k: number) => number>;
/**
 * The value of one track `t` ms after the item's start. Before the first keyframe and after the last the value
 * holds; in between it eases from one keyframe to the next, using the easing of the keyframe the segment starts at.
 * The frames may be unsorted. No keyframes gives `undefined`: the track does nothing.
 */
export declare function sampleTrack(frames: readonly Keyframe[] | undefined, t: number): number | undefined;
/** What each track adds when it has no keyframes: nothing moves, nothing scales, nothing turns, nothing fades. */
export declare const ANIMATION_REST: Record<AnimationTrack, number>;
/** Every track of an animation at `t` ms after the item's start, with the rest value where a track has no keyframes. */
export declare function sampleAnimation(animation: Animation | undefined, t: number): Record<AnimationTrack, number>;
