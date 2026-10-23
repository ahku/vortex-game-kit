/**
 * The version of the story-to-game protocol: the handover declarations and the `game:*` messages in this package.
 * A game reports it in `game:started` (`protocolVersion`) so a host can tell when the two sides were built against
 * different versions. It rises only when a message or a declaration changes in a way an older side cannot ignore.
 */
export declare const PROTOCOL_VERSION = 1;
