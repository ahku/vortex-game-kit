/**
 * The story player as a game sees it. The player is a web component, `<vns-player>` (`vortex-game-kit/player`), that draws
 * a story the game's own engine is running. This file is its contract: the version both sides check, the properties a host
 * sets and the events the element emits. Pure types and constants; the element itself is in the `player` entry.
 *
 * The host owns the engine, the audio, the mute setting, the battle and the saves. The player owns drawing and the
 * reader's input on the story, and it never talks to the game: the game learns about the story only through the engine's
 * host events, and answers through `engine.resume(outcome)` (see GAME-INTEGRATION-STANDARD, section 8).
 */

/**
 * The version of what a player and a host agree on: the engine views the player draws, the properties below and the
 * events it emits. A host checks it when it starts and refuses to run the story on a mismatch rather than misbehave.
 * It is raised whenever one of those changes in a way an older host would not understand.
 */
export const PLAYER_CONTRACT = 1;

/** `full`: the story has the screen. `overlay`: the game is on screen under the story, so no background is drawn. */
export type PlayerMode = 'full' | 'overlay';

/**
 * `active`: an authored autoplay line talks over a game that keeps running (the line does not ask the game to pause), so
 * the game's input and buttons stay live. `paused`: the story holds the game while it talks. The element emits it as the
 * `gameplay` event; a host locks and unlocks the game by it.
 */
export type PlayerGameplay = 'active' | 'paused';

/** The mute setting a host shares between its game and the story. The player follows it and changes it through `set`. */
export interface PlayerMute {
  current(): boolean;
  set(muted: boolean): void;
  /** Called with the current value at once and on every change; returns the way to stop listening. */
  subscribe(listener: (muted: boolean) => void): () => void;
}

/** The part of an audio manager the player calls. A host passes its own, so story and game share one channel of music and voices. */
export interface PlayerAudio {
  readonly currentMusic: string | null;
  readonly speaking: boolean;
  setMusic(key: string | null, options?: { volume?: number; fadeMs?: number; offsetMs?: number }): void;
  fadeMusicTo(level: number, ms: number): void;
  playSfx(key: string, volume?: number, end?: unknown): void;
  playVoice(
    key: string,
    options?: { volume?: number; duck?: boolean; layer?: boolean; end?: unknown },
  ): void;
  stopVoice(options?: { keepLayered?: boolean }): void;
  stopSounds(): void;
  stopAll(): void;
  setMuted(muted: boolean): void;
  suspend(): void;
  resume(): void;
}

/**
 * The properties a host sets on `<vns-player>`, before it starts the story. `engine` is the host's own loaded engine and
 * `bundle` the story it runs; both are typed loosely here because the protocol has no dependencies.
 */
export interface PlayerProperties {
  engine: unknown;
  bundle: unknown;
  /** The host's audio manager. Without it the player makes its own. */
  audio?: PlayerAudio;
  /** The host's mute setting. Without it the player keeps its own. */
  mute?: PlayerMute;
  mode?: PlayerMode;
  /** The host holds the story while something else has the screen: sequences wait and the voice is cut. */
  paused?: boolean;
  /** False while the host shows something else in full (a full-screen battle): the player takes no keys then. */
  active?: boolean;
  /** Show the language and sound buttons in the corner. A game with its own controls leaves them out. */
  controls?: boolean;
  /** The language the story is shown in (a code the bundle has). The player follows it when the host changes it. */
  language?: string;
}

/**
 * Parts of the dialog a host can style from outside with CSS `::part()` (the element's shadow root hides everything else):
 * `dialog`, `dialog-name`, `dialog-face`, `dialog-text`, and for a line that plays by itself over a running game the same
 * four with the prefix `dialog-automatic` (`dialog-automatic`, `dialog-automatic-name`, `dialog-automatic-face`,
 * `dialog-automatic-text`). Declarations in the host's stylesheet win over the player's own.
 */
export type PlayerPart =
  | 'dialog'
  | 'dialog-name'
  | 'dialog-face'
  | 'dialog-text'
  | 'dialog-automatic'
  | 'dialog-automatic-name'
  | 'dialog-automatic-face'
  | 'dialog-automatic-text';

/** The events `<vns-player>` emits (DOM `CustomEvent`s; the values are in `detail`, an array). */
export interface PlayerEvents {
  /** The reader chose to leave from the end screen. */
  exit: [];
  /** The reader chose to play again from the end screen. */
  restart: [];
  gameplay: [state: PlayerGameplay];
}
