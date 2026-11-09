import type { ExportBundle, ExprChange, ResolvedDialogPlayback, ResolvedLinePresentation, ResolvedNarrationPresentation, SpeakerBadge, FlagValue, LinePortrait, Pos, Sequence, Slot, StageOp, ToneMood, TransitionChannel, TransitionMode, TriggerPresentation } from '../../schema/types/index';
import type { FlagStore } from './conditions';
/**
 * The host contract: how a game, the studio preview or the shared-URL player drives a story.
 * This is a public, versioned interface. Changing it is a breaking change for every host.
 * `createEngine()` in engine.ts implements it.
 */
export declare const ENGINE_API_VERSION: 1;
/** Everything on screen at a given step, computed by folding stage operations. */
export interface StageState {
    /** Active authored wrappers. Saved with the stage so restore and triggered scenes retain their scope. */
    autoplay?: Array<{
        start: string;
        settings: ResolvedDialogPlayback;
    }>;
    background: string | null;
    music: {
        asset: string;
        volume: number;
    } | null;
    tone: ToneMood | null;
    /** How much the background and objects behind the portraits are darkened, 0 to 1. Absent means not at all. */
    dim?: number;
    /** The background picture's own look. Absent: as drawn. Neutral values are left out. */
    backdrop?: {
        brightness?: number;
        blur?: number;
    };
    /** Portraits on stage, keyed by character id. */
    portraits: Record<string, {
        slot?: Slot;
        pos?: Pos;
        expr?: string;
        /** How the last change of `expr` shows, when the line that made it asked for something other than a cross-fade. */
        exprChange?: ExprChange;
        /** Mirror this placement, on top of the picture's own mirror. */
        flip?: boolean;
        /** Kept behind or in front of the other portraits. Absent: the speaker in front, the rest in order of arrival. */
        layer?: 'back' | 'front';
        /** How bright this person is drawn, 1 as drawn. Absent: as drawn. Lasts while they stay on stage. */
        brightness?: number;
        /** Gone as the next step starts: a picture shown for one line, or a speaker who leaves after theirs. */
        temporary?: boolean;
    }>;
    /** Objects and CGs on stage, keyed by their instance id. */
    objects: Record<string, {
        asset: string;
        slot?: Slot;
        pos?: Pos;
        layer: 'back' | 'front';
    }>;
    /**
     * Set while a `transition` step has faded the screen out and not yet back in: the color it faded to and which
     * parts of the show are covered. Null when nothing is faded.
     */
    veil: {
        color: string;
        affects: TransitionChannel[];
    } | null;
}
/** What the host should render for the current step. Text is already resolved for the active language. */
export type View = ({
    kind: 'narration';
    /** Resolved layout, optional so existing host-created views remain valid. */
    presentation?: ResolvedNarrationPresentation;
    stepId: string;
    text: string;
    voice?: string;
    duckMusic?: boolean;
    playback?: ResolvedDialogPlayback;
} | {
    kind: 'line';
    presentation?: ResolvedLinePresentation;
    speakerBadge?: SpeakerBadge;
    playback?: ResolvedDialogPlayback;
    stepId: string;
    /** Character id. */
    speaker: string;
    /** Display name in the active language (falls back to the source language, then the id). */
    speakerName: string;
    speakerColor?: string;
    expr?: string;
    /** The line's portrait choices (picture, position, face side, tone), for the host's drawing. */
    portrait?: LinePortrait;
    text: string;
    voice?: string;
    /** False when the author turned ducking off; otherwise music ducks while the voice plays. */
    duckMusic?: boolean;
} | {
    kind: 'choice';
    stepId: string;
    prompt?: string;
    options: Array<{
        id: string;
        text: string;
    }>;
} | {
    kind: 'sequence';
    stepId: string;
    sequenceId: string;
    sequence: Sequence;
    blocking: boolean;
    /** Stays on screen behind the following steps until a `hold-end` step names this step. */
    hold: boolean;
    /** A held sequence put back at the start of "play from here": it is already on its last frame. */
    played?: boolean;
    /** While it plays and waits, the dialog box of the step before it stays on screen. */
    keepDialog: boolean;
    /** Drawn behind or in front of the dialog box. */
    layer: 'behind' | 'front';
    skippable: boolean;
    trigger: 'auto' | 'onClick';
    skipPrompt?: string;
}
/** Nothing to show for `ms`; the host waits, then calls `delayDone()` (at once when `skippable` and the player skips). */
 | {
    kind: 'delay';
    stepId: string;
    ms: number;
    skippable: boolean;
}
/**
 * A fade of the picture, the music and maybe the dialog box to `color` and back. The host plays it out (`outMs`,
 * then `holdMs` covered, then `inMs`; the times its `mode` does not use are 0) and calls `transitionDone()`. The
 * stage in this step's `view` event is the state after the fade; for `through` the host shows the stage it had
 * until the screen is covered, then switches to the new one. `covered` says the screen was already faded out
 * before this step began.
 */
 | {
    kind: 'transition';
    stepId: string;
    mode: TransitionMode;
    color: string;
    affects: TransitionChannel[];
    outMs: number;
    holdMs: number;
    inMs: number;
    skippable: boolean;
    covered: boolean;
} | {
    kind: 'hold-end';
    stepId: string;
    start: string;
    ending: 'fade' | 'cut';
    fadeMs: number;
    /** A scene ended it: it goes at once, even if it has not finished playing. */
    force?: boolean;
} | {
    kind: 'waiting-for-host';
    stepId: string;
    event: string;
    params: Record<string, unknown>;
} | {
    kind: 'ended';
    exit: string;
}) & {
    playback?: ResolvedDialogPlayback;
};
/** One-shot things that are not part of the persistent stage: screen effects and sound effects. */
export type Transient = Extract<StageOp, {
    op: 'effect' | 'sfx';
}>;
export interface EngineListener {
    /**
     * The step changed. `stage` is the full stage after the step's operations; `ops` are the stage
     * operations that just ran (for transitions such as fades). `ops` is empty after `restore()`.
     */
    view?(view: View, stage: StageState, ops: StageOp[]): void;
    /** A new scene began (title card material). Called before the scene's first view. */
    scene?(scene: {
        sceneId: string;
        title: string;
        subtitle?: string;
        location?: string;
        time?: string;
        /** Set when the card has the screen to itself: how long it shows before the first step (ms). */
        durationMs?: number;
        /** Set when the title stays small in the top-left corner until the next scene begins. */
        corner?: boolean;
    }): void;
    /** A screen effect or sound effect should play now. */
    transient?(op: Transient): void;
    /** The story reached an `event` step. Run the gameplay, then call `resume(outcome)`. */
    hostEvent?(event: {
        stepId: string;
        /** 1 the first time the story reaches this step, 2 the second (a loop comes back to it), and so on. */
        visit: number;
        name: string;
        params: Record<string, unknown>;
        outcomes: string[];
    }): void;
    flagChanged?(flag: string, value: FlagValue, previous: FlagValue | undefined): void;
    /** The story ended with a named exit ("done" or one listed in the contract). */
    exit?(exit: string): void;
    /** A scene the game started with `play()` began. `presentation` says whether it has a background of its own. */
    playStart?(run: {
        sceneId: string;
        presentation: TriggerPresentation;
    }): void;
    /**
     * That scene ran out of steps (`exit` is "done") or the game cancelled it ("cancelled"). The story it paused is
     * back as it was: `getView()` returns what it showed.
     */
    playEnd?(run: {
        sceneId: string;
        exit: string;
    }): void;
}
/** What `play()` did. */
export interface PlayResult {
    /**
     * `started`; `skipped` (the scene's condition does not hold, or it has no steps); `busy` (another scene is
     * playing, or the story has a line, choice or fade on screen: ask again later); `unknown` (no such triggered scene).
     */
    status: 'started' | 'skipped' | 'busy' | 'unknown';
    /** Set when started. */
    presentation?: TriggerPresentation;
}
export interface LoadOptions {
    /** Language to show. Falls back to the story's source language. */
    lang?: string;
    /** Shared flags the host provides at load time (the story's contract.reads should be covered). */
    hostFlags?: FlagStore;
    /** Event names the host can handle. Others use the step's `default` outcome. */
    hostEvents?: string[];
    /** Event steps (by id) the host handles even when their event name is not in `hostEvents`. The editor preview uses it to stop at the events a story branches on. */
    hostEventSteps?: string[];
    /** Used by `completed` conditions; collections rely on it. */
    isCompleted?(storyId: string): boolean;
}
export interface LoadReport {
    /** Problems that do not stop the story: a shared flag the host did not provide, an unhandled event. */
    warnings: string[];
}
/** Everything needed to resume. The stage is recomputed from the steps, so it is not stored. */
export interface Snapshot {
    apiVersion: typeof ENGINE_API_VERSION;
    storyId: string;
    schemaVersion: number;
    lang: string;
    /** The step being shown. Null before `start()` and after the story ended. */
    cursor: {
        sceneId: string;
        stepId: string;
    } | null;
    /** The exit name once the story has ended. */
    ended?: string;
    flags: FlagStore;
    /** Step ids already seen, in order. Feeds the backlog and "skip seen". */
    history: string[];
    /** How many times each host event step was reached, so a looping story keeps counting after a restore. */
    visits?: Record<string, number>;
}
export interface Engine {
    readonly apiVersion: typeof ENGINE_API_VERSION;
    /** Validate and load a story bundle. Throws if the bundle is invalid. */
    load(bundle: ExportBundle, options?: LoadOptions): LoadReport;
    /** Begin at the first step, or at a given step with chosen starting flags (studio "play from here"). */
    start(options?: {
        from?: {
            sceneId: string;
            stepId: string;
        };
        flags?: FlagStore;
        /** Play every step whatever its `when` says (the studio preview). */
        ignoreConditions?: boolean;
        /** With `from` the first step of a scene: begin at the scene's opening (fade-in, background, title card). */
        withOpening?: boolean;
    }): void;
    /**
     * Run a scene the game starts by name (a scene with a `trigger`) as its own short run, over whatever is on
     * screen. It ends with `playEnd` when it runs out of steps and does not flow into another scene. The story may
     * be waiting for the game (a battle) or not started; the scene runs in between and the story is unchanged.
     * Flags are shared: the scene reads and writes the same flags as the story.
     */
    play(sceneId: string): PlayResult;
    /** Stop the scene the game started (the game ends it early). */
    cancelPlay(): void;
    /** The scene the game started, while it runs. */
    getPlaying(): {
        sceneId: string;
        presentation: TriggerPresentation;
    } | null;
    /** The player pressed "next". */
    advance(): void;
    /** The player picked a choice option. */
    choose(optionId: string): void;
    /** The host finished the gameplay for the current `hostEvent`. */
    resume(outcome: string): void;
    /** The host's sequence player finished (or was skipped); the engine moves on. */
    sequenceDone(): void;
    /** The host waited out a `delay` view (or the player skipped it); the engine moves on. */
    delayDone(): void;
    /** The host played out a `transition` view (or the player skipped it); the engine moves on. */
    transitionDone(): void;
    getFlag(name: string): FlagValue | undefined;
    /** Switch language; re-emits the current view in the new language. Unknown languages fall back to the source. */
    setLanguage(lang: string): void;
    readonly lang: string;
    /** The current view and stage, or null before `start()`. */
    getView(): {
        view: View;
        stage: StageState;
    } | null;
    /** Flags as they are now (a copy). */
    getFlags(): FlagStore;
    /** The host sets a shared flag (player level, a quest finished elsewhere). */
    setFlag(name: string, value: FlagValue): void;
    snapshot(): Snapshot;
    restore(snapshot: Snapshot): void;
    subscribe(listener: EngineListener): () => void;
}
