import { z } from 'zod';
/** Uniform cells, read left-to-right then top-to-bottom. Frame numbers are zero-based in storage. */
export declare const SpriteSheetSchema: z.ZodObject<{
    columns: z.ZodNumber;
    rows: z.ZodNumber;
    margin: z.ZodNumber;
    spacing: z.ZodNumber;
    firstFrame: z.ZodNumber;
    frameCount: z.ZodNumber;
    fps: z.ZodNumber;
    playback: z.ZodEnum<{
        loop: "loop";
        once: "once";
        "ping-pong": "ping-pong";
    }>;
    randomStart: z.ZodOptional<z.ZodBoolean>;
    animated: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export type SpriteSheet = z.infer<typeof SpriteSheetSchema>;
export declare function spriteCell(sheet: SpriteSheet, width: number, height: number): {
    width: number;
    height: number;
} | null;
/** Rounded shared boundaries cover resized sheets without gaps; display size still uses the nominal cell. */
export declare function spriteFrameRect(sheet: SpriteSheet, width: number, height: number, frame: number): {
    x: number;
    y: number;
    width: number;
    height: number;
} | null;
/** Stable per-instance phase: the same id gives the same starting frame in every renderer. */
export declare function spriteStartOffset(sheet: SpriteSheet, instanceId?: string): number;
/** Once holds its final frame; ping-pong does not repeat either endpoint. */
export declare function spriteFrame(sheet: SpriteSheet, elapsedMs: number, instanceId?: string): number;
/** Placement defaults in the map's world units; absent height follows the source frame's aspect ratio. */
export declare const GraphicSizeSchema: z.ZodObject<{
    width: z.ZodNumber;
    height: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>;
export type GraphicSize = z.infer<typeof GraphicSizeSchema>;
/** Shared image presentation defaults; each game declares which of these fields it supports. */
export declare const GRAPHIC_BLEND_MODES: readonly ["source-over", "multiply", "screen", "overlay", "lighter", "darken", "lighten", "soft-light", "hard-light", "difference"];
export declare const GraphicAppearanceSchema: z.ZodObject<{
    opacity: z.ZodNumber;
    blendMode: z.ZodEnum<{
        overlay: "overlay";
        "source-over": "source-over";
        multiply: "multiply";
        screen: "screen";
        lighter: "lighter";
        darken: "darken";
        lighten: "lighten";
        "soft-light": "soft-light";
        "hard-light": "hard-light";
        difference: "difference";
    }>;
}, z.core.$strict>;
export type GraphicAppearance = z.infer<typeof GraphicAppearanceSchema>;
