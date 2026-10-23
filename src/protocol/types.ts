/**
 * A game's handovers: what a story can start in the game and what comes back. Plain data with no imports, shared by
 * the studio (which reads it to build its editor) and every game (which declares it). The studio never needs to know a
 * game by name.
 */

/** One piece of data the story passes into the game when the event starts. */
export interface HandoverParam {
  /** The key in the step's params. */
  key: string;
  /** What the author sees. */
  label: string;
  /**
   * `music` picks a song from the story's files and stores it as `{ asset: slug }`, so the published story ships the
   * file and renaming it elsewhere keeps the step working.
   */
  type: 'string' | 'number' | 'select' | 'music';
  required?: boolean;
  help?: string;
  /** For `select`: what can be picked. A value of another kind is still kept, so a story can be read. */
  options?: Array<{
    value: string;
    label: string;
    /** The results this choice can report, from the action's list. Absent: all of them. */
    outcomes?: string[];
  }>;
  /** For `select`: the author may also type a value the game did not list (a stage can have objectives of its own). */
  custom?: boolean;
  /** The value is an identifier for the game, written as a slug (`move-near-enemy`): typed text is turned into one. */
  slug?: boolean;
}

export interface HandoverOutcome {
  id: string;
  /** What the author sees, when it reads better than the id. */
  label?: string;
}

/** One thing the story asks of the game: start a battle, wait for an objective. */
export interface HandoverAction {
  id: string;
  label: string;
  help?: string;
  params: HandoverParam[];
  /** Params that are always sent as they are and are not shown (a presentation mode). */
  fixed?: Record<string, string | number | boolean>;
  outcomes: HandoverOutcome[];
  /** The outcome for a preview or a host with no game, and when the game fails to run. Never a timeout. */
  default: string;
  /** A readable name for the result flag, instead of `<step id>_result`. Made unique per story. */
  resultFlag?: string;
  /** The id of an action that must have been used earlier in the story (a battle has to start before it finishes). */
  after?: string;
  /**
   * What the stage card says for a step of this action, in a sentence about what happens ("Waits for the player:
   * {objectiveId}"). `{key}` is a param as the author sees it (a picked option shows its label); `[ ... ]` is left out
   * when a param inside it is empty. Absent: the card says "Sends the game an event" and its name.
   */
  card?: string;
  /**
   * A message to the game, not a handover: the story does not wait for the player and no result comes back (a signal).
   * It is left out of "the next action" a new step picks up, and the editor does not ask about its result.
   */
  oneWay?: boolean;
  /** Whether the dialog goes over the game from here ("enter") or back to the full view ("leave"). */
  overlay?: 'enter' | 'leave';
}

export interface HandoverGame {
  /** The event name stored in the step: `downbeat`. */
  id: string;
  name: string;
  /** An icon name for menus (`i-lucide-swords`). The studio picks a plain one when it is absent. */
  icon?: string;
  help?: string;
  /**
   * The param that holds the action id (`action`). Absent for a game with one action, which stores nothing for it.
   */
  actionKey?: string;
  /** The action of a step that stores none: the one such steps were written for, before the game had several. */
  actionWhenUnset?: string;
  actions: HandoverAction[];
}
