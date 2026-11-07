/** Automatic text advancement shared by browser and game hosts. No timers or DOM ownership. */
export declare function autoplayReadingMs(chars: number): number;
export declare function createAutoplayClock(readingMs: number, delayMs: number, durationMs?: number): {
    /** Call only with active elapsed time. Custom duration replaces reading and tail, never truncating voice. */
    tick(ms: number, typed: boolean, speaking: boolean): boolean;
};
