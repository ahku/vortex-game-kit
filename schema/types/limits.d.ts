/**
 * The most a saved story may weigh, as JSON. D1 stores at most 2 MB per row; this stays clear of it so a save never
 * fails halfway. The server refuses a bigger story, and the studio checks against it before it makes one (Import text).
 */
export declare const MAX_DOCUMENT_BYTES = 1500000;
