import type { MapPropertiesDescriptor } from './mapProperties.js';
/** Data-only authoring contract. Document formats, defaults and preview behavior belong to the game. */
export interface CharacterGraphicSlot {
    path: string[];
    label: string;
    help?: string;
    group?: string;
    role?: 'head-down' | 'head-up' | 'idle-body' | 'portrait' | 'animation';
    setupStep?: number;
    /** State grouping and part identity; the game owns the actual state ids. */
    state?: {
        id: string;
        label: string;
        part: 'body' | 'head-down' | 'head-up';
        idle?: boolean;
    };
    /** Source slot used while this part has no artwork override. */
    fallback?: string[];
    kits?: string[];
    /** Initial part metadata when assigning artwork to an empty slot. */
    defaults?: Record<string, unknown>;
    properties?: MapPropertiesDescriptor;
    sheet?: {
        columns: string[];
        rows: string[];
        frame: string[];
        margin?: string[];
        spacing?: string[];
    };
    animationPath?: string[];
    /** Optional ordered image-frame sequence, independent of the base still/spritesheet. */
    sequencePath?: string[];
    /** Optional random one-shot sheet frames on this idle part: {frames,fps,minInterval,maxInterval}. */
    blinkPath?: string[];
    /** Opaque, game-owned inspection hints; never persisted into the character. */
    preview?: Record<string, string | number | boolean>;
}
export interface CharacterEditorDescriptor {
    version: 1;
    previewPage: string;
    /** Where the document identifies its game preset/kit. */
    presetPath: string[];
    previewPath?: string[];
    layeredDefaults?: Record<string, unknown>;
    /** Optional layered section; controls below this path stay hidden when absent. */
    layeredPath?: string[];
    /** Fields whose reset removes an override and reconnects to the game default. */
    inherit: string[][];
    properties: MapPropertiesDescriptor;
    presets: {
        id: string;
        label: string;
        data: Record<string, unknown>;
    }[];
    /** Image assignments stored as asset:<id>; paths refer to the game document. */
    images: CharacterGraphicSlot[];
}
export declare function readCharacterEditor(value: unknown): CharacterEditorDescriptor | null;
