/**
 * Inline text markup: `[pause:2000]` waits, `[shake]...[/shake]` styles the enclosed text.
 * The engine hands text over raw; hosts call parseMarkup to animate it. Unknown tags are kept as
 * style tags so a host can ignore or support them. Unbalanced closers are ignored.
 */
export type MarkupSegment = {
    kind: 'text';
    text: string;
    tags: string[];
} | {
    kind: 'pause';
    ms: number;
};
export declare function parseMarkup(text: string): MarkupSegment[];
/** The text with all markup removed (for backlogs, search, accessibility). */
export declare function stripMarkup(text: string): string;
