import { z } from 'zod';
/** Scene defaults and individual text-step overrides. Unset values inherit. */
export declare const DialogPlaybackSchema: z.ZodObject<{
    autoplay: z.ZodOptional<z.ZodBoolean>;
    pauseGame: z.ZodOptional<z.ZodBoolean>;
    durationMs: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>;
export type DialogPlayback = z.infer<typeof DialogPlaybackSchema>;
export interface ResolvedDialogPlayback {
    autoplay: boolean;
    pauseGame: boolean;
    allowManualAdvance: boolean;
    delayMs: number;
    durationMs?: number;
}
export declare const DEFAULT_AUTOPLAY_DELAY_MS = 600;
export declare function resolveDialogPlayback(settings?: {
    autoplayDelayMs?: number;
    autoplayAllowManualAdvance?: boolean;
}, scene?: DialogPlayback, step?: DialogPlayback): ResolvedDialogPlayback;
/** Settings owned by an Autoplay start step. Optional values keep the stored document compact. */
export declare const AutoplaySettingsSchema: z.ZodObject<{
    delayMs: z.ZodOptional<z.ZodNumber>;
    allowManualAdvance: z.ZodOptional<z.ZodBoolean>;
    pauseGame: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export type AutoplaySettings = z.infer<typeof AutoplaySettingsSchema>;
export declare function resolveAutoplaySettings(settings?: AutoplaySettings): ResolvedDialogPlayback;
