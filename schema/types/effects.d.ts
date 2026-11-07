import { z } from 'zod';
/** Screen effects, taken from the prototype editors (see docs/PROTOTYPES.md). */
export declare const EFFECT_NAMES: readonly ["shake", "flash-white", "flash-red", "zoom", "blur", "glitch", "fade-black", "rain", "snow", "embers", "dream-glow", "old-film", "vignette"];
export declare const EffectName: z.ZodEnum<{
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
export type EffectName = z.infer<typeof EffectName>;
/** Rate multiplier: 1 is the normal pace, 2 twice as fast. */
export declare const Speed: z.ZodNumber;
/** Scale multiplier for the effect's elements (drop length, flake size, glow spread...). 1 is normal. */
export declare const Size: z.ZodNumber;
/**
 * The settings every effect can carry, in a stage `effect` operation and in a sequence `effect` item.
 * Which of them an effect actually honours is listed in EFFECT_SPECS, which is also what the editor
 * builds its controls from. Settings an effect does not use are ignored, never an error.
 */
export declare const effectSettingsShape: {
    /** How long it lasts, in ms. Defaults per effect (see EFFECT_SPECS). */
    durationMs: z.ZodOptional<z.ZodNumber>;
    /** Strength, 0-1: how far the shake moves, how dense the rain is, how dark the vignette. */
    intensity: z.ZodOptional<z.ZodNumber>;
    /** Pace multiplier: shake frequency, fall speed, flicker rate. */
    speed: z.ZodOptional<z.ZodNumber>;
    /** Element size multiplier: streak length, flake size, glow spread. */
    size: z.ZodOptional<z.ZodNumber>;
};
export type EffectParam = 'intensity' | 'speed' | 'size';
/** One adjustable setting, as an editor control would show it. */
export interface ParamSpec {
    label: string;
    min: number;
    max: number;
    step: number;
    default: number;
}
export interface EffectSpec {
    label: string;
    /** Duration used when the story gives none. */
    defaultDurationMs: number;
    /** The settings this effect honours besides its duration. */
    params: Partial<Record<EffectParam, ParamSpec>>;
}
/** What each effect supports. The single source of truth for hosts and for the editor's controls. */
export declare const EFFECT_SPECS: Record<EffectName, EffectSpec>;
/** An effect with every setting filled in. */
export interface ResolvedEffect {
    name: EffectName;
    durationMs: number;
    intensity: number;
    speed: number;
    size: number;
}
/**
 * Fill in an effect's missing settings from its spec. Every host should call this so that "no value"
 * means the same thing everywhere. Settings an effect does not support resolve to 1 (speed, size)
 * or 0.7 (intensity) and are ignored by the host.
 */
export declare function resolveEffect(op: {
    name: EffectName;
    durationMs?: number | undefined;
    intensity?: number | undefined;
    speed?: number | undefined;
    size?: number | undefined;
}): ResolvedEffect;
