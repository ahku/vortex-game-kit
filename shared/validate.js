import { z } from "zod";
const SCHEMA_VERSION = 1;
const Id = z.string().regex(
  /^[A-Za-z][A-Za-z0-9_-]{0,63}$/,
  "must start with a letter and use only letters, digits, _ or -"
);
const StringKey = Id;
const AssetKey = z.string().regex(/^[a-z0-9][a-z0-9_./-]{0,127}$/, "asset keys use lower-case letters, digits, _ . / -");
const AssetRefOrEmpty = z.union([z.literal(""), AssetKey]);
const FlagName = z.string().regex(
  /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/,
  "flag names start with a letter; letters, digits, _ . - allowed"
);
const FlagValue = z.union([z.boolean(), z.number(), z.string()]);
const LangCode = z.string().regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, "use a language tag such as en or zh-Hans");
const SLOTS = ["far-left", "left", "center", "right", "far-right"];
const Slot = z.enum(SLOTS);
const Pos = z.strictObject({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  scale: z.number().positive().max(10).optional()
});
const HexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "use a color written as #rrggbb, such as #000000");
const DurationMs = z.number().int().min(0).max(6e5);
const Unit = z.number().min(0).max(1);
const ConditionSchema = z.lazy(
  () => z.union([
    z.strictObject({ flag: FlagName, is: FlagValue }),
    z.strictObject({ flag: FlagName, isNot: FlagValue }),
    z.strictObject({ flag: FlagName, gt: z.number() }),
    z.strictObject({ flag: FlagName, gte: z.number() }),
    z.strictObject({ flag: FlagName, lt: z.number() }),
    z.strictObject({ flag: FlagName, lte: z.number() }),
    // Only meaningful in collections (unlock rules): "story X has been completed".
    z.strictObject({ completed: Id }),
    z.strictObject({ and: z.array(ConditionSchema).min(1) }),
    z.strictObject({ or: z.array(ConditionSchema).min(1) }),
    z.strictObject({ not: ConditionSchema })
  ])
);
const SetOpSchema = z.union([
  z.strictObject({ flag: FlagName, to: FlagValue }),
  z.strictObject({ flag: FlagName, add: z.number() })
]);
function conditionFlags(cond, out = /* @__PURE__ */ new Set()) {
  if ("flag" in cond) out.add(cond.flag);
  else if ("and" in cond) cond.and.forEach((c) => conditionFlags(c, out));
  else if ("or" in cond) cond.or.forEach((c) => conditionFlags(c, out));
  else if ("not" in cond) conditionFlags(cond.not, out);
  return out;
}
function conditionUsesCompleted(cond) {
  if ("completed" in cond) return true;
  if ("and" in cond) return cond.and.some(conditionUsesCompleted);
  if ("or" in cond) return cond.or.some(conditionUsesCompleted);
  if ("not" in cond) return conditionUsesCompleted(cond.not);
  return false;
}
const EFFECT_NAMES = [
  "shake",
  "flash-white",
  "flash-red",
  "zoom",
  "blur",
  "glitch",
  "fade-black",
  "rain",
  "snow",
  "embers",
  "dream-glow",
  "old-film",
  "vignette"
];
const EffectName = z.enum(EFFECT_NAMES);
const Speed = z.number().min(0.1).max(5);
const Size = z.number().min(0.1).max(5);
const effectSettingsShape = {
  /** How long it lasts, in ms. Defaults per effect (see EFFECT_SPECS). */
  durationMs: DurationMs.optional(),
  /** Strength, 0-1: how far the shake moves, how dense the rain is, how dark the vignette. */
  intensity: Unit.optional(),
  /** Pace multiplier: shake frequency, fall speed, flicker rate. */
  speed: Speed.optional(),
  /** Element size multiplier: streak length, flake size, glow spread. */
  size: Size.optional()
};
const strength = (label, def) => ({
  label,
  min: 0,
  max: 1,
  step: 0.05,
  default: def
});
const speed = (label = "Speed") => ({
  label,
  min: 0.25,
  max: 4,
  step: 0.05,
  default: 1
});
const size = (label) => ({ label, min: 0.25, max: 4, step: 0.05, default: 1 });
const EFFECT_SPECS = {
  shake: {
    label: "Shake",
    defaultDurationMs: 700,
    params: { intensity: strength("Strength", 0.7), speed: speed("Shakes per second") }
  },
  "flash-white": {
    label: "White flash",
    defaultDurationMs: 400,
    params: { intensity: strength("Brightness", 0.9) }
  },
  "flash-red": {
    label: "Red flash",
    defaultDurationMs: 500,
    params: { intensity: strength("Brightness", 0.8) }
  },
  zoom: {
    label: "Zoom pulse",
    defaultDurationMs: 1200,
    params: { intensity: strength("How far", 0.6) }
  },
  blur: { label: "Blur", defaultDurationMs: 1500, params: { intensity: strength("Amount", 0.6) } },
  glitch: {
    label: "Glitch",
    defaultDurationMs: 700,
    params: { intensity: strength("Strength", 0.7), speed: speed("Glitch rate") }
  },
  "fade-black": { label: "Fade to black", defaultDurationMs: 2e3, params: {} },
  rain: {
    label: "Rain",
    defaultDurationMs: 5e3,
    params: {
      intensity: strength("Visibility", 0.7),
      speed: speed("Fall speed"),
      size: size("Drop length")
    }
  },
  snow: {
    label: "Snow",
    defaultDurationMs: 5e3,
    params: {
      intensity: strength("Visibility", 0.8),
      speed: speed("Fall speed"),
      size: size("Flake size")
    }
  },
  embers: {
    label: "Embers",
    defaultDurationMs: 5e3,
    params: {
      intensity: strength("Visibility", 0.8),
      speed: speed("Rise speed"),
      size: size("Ember size")
    }
  },
  "dream-glow": {
    label: "Dream glow",
    defaultDurationMs: 4e3,
    params: { intensity: strength("Glow", 0.7), speed: speed("Pulse rate"), size: size("Spread") }
  },
  "old-film": {
    label: "Old film",
    defaultDurationMs: 6e3,
    params: { intensity: strength("Grain", 0.7), speed: speed("Flicker rate") }
  },
  vignette: {
    label: "Vignette",
    defaultDurationMs: 3e3,
    params: { intensity: strength("Darkness", 0.85), size: size("Reach") }
  }
};
function resolveEffect(op) {
  const spec = EFFECT_SPECS[op.name];
  return {
    name: op.name,
    durationMs: op.durationMs ?? spec.defaultDurationMs,
    intensity: op.intensity ?? spec.params.intensity?.default ?? 0.7,
    speed: op.speed ?? spec.params.speed?.default ?? 1,
    size: op.size ?? spec.params.size?.default ?? 1
  };
}
const PORTRAIT_SHOWS = ["both", "stage", "dialog", "none"];
const PortraitShowSchema = z.enum(PORTRAIT_SHOWS);
const showsStage = (show) => show === "both" || show === "stage";
const showsDialog = (show) => show === "both" || show === "dialog";
const FACE_SIDES = ["left", "right", "follow"];
const FaceSideSchema = z.enum(FACE_SIDES);
const PORTRAIT_TONES = ["off", "subtle", "strong"];
const PortraitToneSchema = z.enum(PORTRAIT_TONES);
const PORTRAIT_ANIMATIONS = ["cut", "fade", "slide"];
const PortraitAnimationSchema = z.enum(PORTRAIT_ANIMATIONS);
const PortraitSettingsSchema = z.strictObject({
  show: PortraitShowSchema.optional(),
  faceSide: FaceSideSchema.optional(),
  tone: PortraitToneSchema.optional(),
  /** Independent non-speaker darkening; absent follows the legacy tone setting. */
  dim: PortraitToneSchema.optional(),
  /** Shrink non-speakers independently of darkening. Off by default. */
  shrink: z.boolean().optional(),
  animation: PortraitAnimationSchema.optional()
});
function resolvePortraitEmphasis(own) {
  return { dim: own?.dim ?? own?.tone ?? "subtle", shrink: own?.shrink ?? false };
}
const DEFAULT_PORTRAIT_SETTINGS = {
  show: "both",
  faceSide: "left",
  tone: "subtle",
  animation: "fade"
};
function resolvePortraitSettings(own) {
  return {
    show: own?.show ?? DEFAULT_PORTRAIT_SETTINGS.show,
    faceSide: own?.faceSide ?? DEFAULT_PORTRAIT_SETTINGS.faceSide,
    tone: own?.tone ?? DEFAULT_PORTRAIT_SETTINGS.tone,
    animation: own?.animation ?? DEFAULT_PORTRAIT_SETTINGS.animation
  };
}
const TONE_LOOK = {
  subtle: { brightness: 0.8, saturate: 1, scale: 1 },
  strong: { brightness: 0.55, saturate: 0.7, scale: 0.96 }
};
const MAX_DIM_EXTRA = 0.5;
const MAX_DIMMING = 0.9;
function toneLookFor(level, extra = 0) {
  if (level === "off") return { brightness: 1, saturate: 1, scale: 1 };
  const look = TONE_LOOK[level];
  return { ...look, brightness: 1 - Math.min(MAX_DIMMING, 1 - look.brightness + extra) };
}
const PORTRAIT_PICTURES = ["face", "temporary", "stage", "leave"];
const PortraitPictureSchema = z.enum(PORTRAIT_PICTURES);
const PORTRAIT_LAYERS = ["back", "front"];
const PortraitLayerSchema = z.enum(PORTRAIT_LAYERS);
const PORTRAIT_IF_TAKEN = ["replace", "share"];
const PortraitIfTakenSchema = z.enum(PORTRAIT_IF_TAKEN);
const LinePortraitSchema = z.strictObject({
  picture: PortraitPictureSchema.optional(),
  /** Where to stand: a named position, else the character's home position. */
  slot: Slot.optional(),
  /** Free placement instead of a named position. */
  pos: Pos.optional(),
  ifTaken: PortraitIfTakenSchema.optional(),
  /** Mirror this placement, on top of the picture's own mirror. */
  flip: z.boolean().optional(),
  /** Keep the speaker's stage portrait behind or in front of the others; absent is automatic. */
  layer: PortraitLayerSchema.optional(),
  /** Which side of the dialog box the dialog portrait sits on for this line. */
  faceSide: FaceSideSchema.optional(),
  /** Which kinds of portrait this line shows by itself; absent follows the story. */
  show: PortraitShowSchema.optional(),
  /** Tone down the others for this line (true) or keep everyone lit (false); absent follows the story. */
  toneDown: z.boolean().optional(),
  /** How the stage portrait arrives or leaves on this line; absent follows the story. */
  animation: PortraitAnimationSchema.optional()
});
const PORTRAIT_POSITIONS = ["left", "center", "right"];
const DEFAULT_PORTRAIT_POSITION = "left";
const TONE_MOODS = ["dawn", "day", "dusk", "night", "storm", "dream"];
const ToneMood = z.enum(TONE_MOODS);
const BG_STYLES = ["fade", "cut", "blur"];
const BgStyleSchema = z.enum(BG_STYLES);
const BRIGHTNESS_MIN = 0.25;
const BRIGHTNESS_MAX = 2;
const Brightness = z.number().min(BRIGHTNESS_MIN).max(BRIGHTNESS_MAX);
const StageOpSchema = z.discriminatedUnion("op", [
  z.strictObject({
    op: z.literal("bg"),
    asset: AssetKey,
    fadeMs: DurationMs.optional(),
    style: BgStyleSchema.optional()
  }),
  // asset: null stops the music.
  z.strictObject({
    op: z.literal("music"),
    asset: AssetKey.nullable(),
    fadeMs: DurationMs.optional(),
    volume: Unit.optional()
  }),
  z.strictObject({ op: z.literal("sfx"), asset: AssetKey, volume: Unit.optional() }),
  z.strictObject({
    op: z.literal("enter"),
    who: Id,
    slot: Slot.optional(),
    pos: Pos.optional(),
    expr: z.string().max(64).optional(),
    /** When the position is taken: leave the one there (`share`) or send them off (default). */
    share: z.boolean().optional(),
    /** Mirror this placement, on top of the picture's own mirror. */
    flip: z.boolean().optional(),
    /** Keep the portrait behind or in front of the others; absent is automatic (the speaker in front). */
    layer: PortraitLayerSchema.optional(),
    /** How the portrait arrives; absent follows the story. */
    animation: PortraitAnimationSchema.optional(),
    fadeMs: DurationMs.optional()
  }),
  z.strictObject({
    op: z.literal("exit"),
    who: Id,
    /** How the portrait leaves; absent follows the story. */
    animation: PortraitAnimationSchema.optional(),
    fadeMs: DurationMs.optional()
  }),
  z.strictObject({ op: z.literal("expr"), who: Id, expr: z.string().max(64) }),
  // Objects and CGs (items, event illustrations). `id` names this instance so `hide` can remove it.
  z.strictObject({
    op: z.literal("show"),
    id: Id,
    asset: AssetKey,
    slot: Slot.optional(),
    pos: Pos.optional(),
    layer: z.enum(["back", "front"]).optional(),
    fadeMs: DurationMs.optional()
  }),
  z.strictObject({ op: z.literal("hide"), id: Id, fadeMs: DurationMs.optional() }),
  z.strictObject({ op: z.literal("effect"), name: EffectName, ...effectSettingsShape }),
  z.strictObject({ op: z.literal("tone"), mood: ToneMood, fadeMs: DurationMs.optional() }),
  // Darkens the background and the objects behind the portraits, so the people on stage stand out. 0 puts it back.
  z.strictObject({ op: z.literal("dim"), amount: Unit }),
  // The look of the background picture itself (not the objects or the people): brightness, 1 as drawn, and a held blur.
  // It lasts until the next `backdrop`; one with neither field puts the picture back as it was.
  z.strictObject({
    op: z.literal("backdrop"),
    brightness: Brightness.optional(),
    blur: Unit.optional()
  }),
  // How bright one person on stage is, 1 as drawn. It lasts while they stay on stage; 1 puts them back. Only
  // brightness: it never changes how see-through they are.
  z.strictObject({ op: z.literal("light"), who: Id, brightness: Brightness }),
  z.strictObject({
    op: z.literal("clear"),
    what: z.enum(["portraits", "objects", "all"]),
    /** How the portraits leave; absent follows the story. */
    animation: PortraitAnimationSchema.optional(),
    /** `before`: the portraits leave first and the step's text shows after. Absent (`with`): both happen together. */
    when: z.enum(["with", "before"]).optional()
  })
]);
const Time = DurationMs;
const Position = z.union([Slot, Pos]);
const IMAGE_FOCUS = [
  "top-left",
  "top",
  "top-right",
  "left",
  "center",
  "right",
  "bottom-left",
  "bottom",
  "bottom-right"
];
const ImageFocusSchema = z.enum(IMAGE_FOCUS);
const ImageFitSchema = z.enum(["cover", "contain"]);
const ImageMotionSchema = z.enum(["fade", "left", "right", "top", "bottom"]);
const EASINGS = ["linear", "in", "out", "inOut"];
const EasingSchema = z.enum(EASINGS);
const keyframes = (min, max) => z.array(
  z.strictObject({
    t: DurationMs,
    value: z.number().min(min).max(max),
    /** Shapes the segment that starts at this keyframe. Omitted means linear. */
    ease: EasingSchema.optional()
  })
).max(200);
const AnimationSchema = z.strictObject({
  x: keyframes(-5, 5).optional(),
  y: keyframes(-5, 5).optional(),
  scale: keyframes(0, 8).optional(),
  /** Only when width and height scale apart; otherwise `scale` applies to both. */
  scaleY: keyframes(0, 8).optional(),
  rotation: keyframes(-3600, 3600).optional(),
  opacity: keyframes(0, 1).optional()
});
const layerFlags = {
  locked: z.literal(true).optional(),
  hidden: z.literal(true).optional()
};
const SequenceItemSchema = z.discriminatedUnion("type", [
  z.strictObject({
    type: z.literal("image"),
    ...layerFlags,
    startTime: Time,
    endTime: Time.optional(),
    label: z.string().max(120).optional(),
    src: AssetRefOrEmpty,
    position: Position.optional(),
    /** The part kept in view when the picture is cropped. Omitted means the center. */
    focus: ImageFocusSchema.optional(),
    /** Origin for scaling and rotation. Omitted means center. */
    pivot: ImageFocusSchema.optional(),
    /** How the picture fills its box: `cover` crops it to fill (the default), `contain` shows all of it. */
    fit: ImageFitSchema.optional(),
    /** A full-screen picture's size, as a share of the fitted size (1 is 100%). Omitted means 1. */
    scale: z.number().min(0.1).max(4).optional(),
    /** A full-screen picture moved from the center, in frame widths and heights. Omitted means centered. */
    offset: z.strictObject({ x: z.number().min(-1).max(1), y: z.number().min(-1).max(1) }).optional(),
    /** Fade in over this long from the start. Falls back to the sequence's `defaults`, then none. */
    fadeInMs: DurationMs.optional(),
    /** Fade out over this long before the end (the image's end, or the sequence's). */
    fadeOutMs: DurationMs.optional(),
    /** How it comes in, over the fade-in time. Falls back to the sequence's default, then a plain fade. */
    enter: ImageMotionSchema.optional(),
    /** How it goes out, over the fade-out time. */
    exit: ImageMotionSchema.optional(),
    /** Keyframes for place, size, turn and opacity, on top of everything above. */
    animation: AnimationSchema.optional(),
    /** Animated: only its keyframes move it. The fixed move, size and fades are ignored. Omitted means fixed. */
    animated: z.literal(true).optional()
  }),
  /**
   * A moving picture behind or among the pictures: a clip, a loop of rain, a close-up. It plays muted (a separate sound
   * item can carry the sound), so it also starts on phones without a tap. It sits in the same stack as pictures.
   */
  z.strictObject({
    type: z.literal("video"),
    ...layerFlags,
    startTime: Time,
    /** Cuts the clip here. Omitted ("auto"): it plays to its own end (or until the sequence ends when it loops). */
    endTime: Time.optional(),
    label: z.string().max(120).optional(),
    src: AssetRefOrEmpty,
    position: Position.optional(),
    focus: ImageFocusSchema.optional(),
    /** Origin for scaling and rotation. Omitted means center. */
    pivot: ImageFocusSchema.optional(),
    fit: ImageFitSchema.optional(),
    /** A full-screen video's size, as a share of the fitted size (1 is 100%). Omitted means 1. */
    scale: z.number().min(0.1).max(4).optional(),
    /** A full-screen video moved from the center, in frame widths and heights. Omitted means centered. */
    offset: z.strictObject({ x: z.number().min(-1).max(1), y: z.number().min(-1).max(1) }).optional(),
    /** Starts again when it reaches its end. */
    loop: z.boolean().optional(),
    fadeInMs: DurationMs.optional(),
    fadeOutMs: DurationMs.optional(),
    enter: ImageMotionSchema.optional(),
    exit: ImageMotionSchema.optional(),
    animation: AnimationSchema.optional(),
    /** Animated: only its keyframes move it. The fixed move, size and fades are ignored. Omitted means fixed. */
    animated: z.literal(true).optional()
  }),
  /**
   * Words on the frame: credits, a title, a caption. The words are not stored here: `textKey` points into the story's
   * string tables (like a line's text), so they can be translated. Markup such as `[b]` and `[i]` works.
   */
  z.strictObject({
    type: z.literal("text"),
    ...layerFlags,
    startTime: Time,
    endTime: Time.optional(),
    /** Editor-only name; not shown to players and not translated. */
    label: z.string().max(120).optional(),
    textKey: StringKey,
    /** A slot, or a free place in frame widths and heights. Omitted means the middle of the frame. */
    position: Position.optional(),
    align: z.enum(["left", "center", "right"]).optional(),
    font: z.enum(["serif", "sans"]).optional(),
    bold: z.boolean().optional(),
    italic: z.boolean().optional(),
    /** The soft shadow behind the letters. Omitted means on; false turns it off. */
    shadow: z.boolean().optional(),
    /** Letter size as a share of the frame width, in percent. Omitted means 4. */
    size: z.number().min(0.5).max(30).optional(),
    color: HexColor.optional(),
    fadeInMs: DurationMs.optional(),
    fadeOutMs: DurationMs.optional(),
    enter: ImageMotionSchema.optional(),
    exit: ImageMotionSchema.optional(),
    animation: AnimationSchema.optional(),
    /** Animated: only its keyframes move it. The fixed move, size and fades are ignored. Omitted means fixed. */
    animated: z.literal(true).optional()
  }),
  /**
   * A flat color over the whole frame, under the words and over the pictures listed before it: dims the background
   * for credits, or flashes a color. `strength` is how solid it gets (0 to 1); it fades in and out like a picture.
   */
  z.strictObject({
    type: z.literal("color"),
    ...layerFlags,
    startTime: Time,
    endTime: Time.optional(),
    label: z.string().max(120).optional(),
    /** Omitted means black. */
    color: HexColor.optional(),
    /** How solid it gets at most. Omitted means 0.6. */
    strength: Unit.optional(),
    fadeInMs: DurationMs.optional(),
    fadeOutMs: DurationMs.optional(),
    animation: AnimationSchema.optional(),
    animated: z.literal(true).optional()
  }),
  z.strictObject({
    type: z.literal("sound"),
    startTime: Time,
    /** Cuts the clip here. Omitted ("auto"): it plays to its own end, even past the end of the sequence. */
    endTime: Time.optional(),
    /** Fades out over this long, finishing at `endTime`. Omitted: a plain cut. */
    fadeOutMs: DurationMs.optional(),
    label: z.string().max(120).optional(),
    src: AssetRefOrEmpty,
    volume: Unit.optional()
  }),
  /** A spoken clip: a voice, a grunt, a laugh. Music ducks while it plays unless `duckMusic` is false. */
  z.strictObject({
    type: z.literal("voice"),
    startTime: Time,
    /** Cuts the clip here. Omitted ("auto"): it plays to its own end, even past the end of the sequence. */
    endTime: Time.optional(),
    /** Fades out over this long, finishing at `endTime`. Omitted: a plain cut. */
    fadeOutMs: DurationMs.optional(),
    label: z.string().max(120).optional(),
    src: AssetRefOrEmpty,
    volume: Unit.optional(),
    duckMusic: z.boolean().optional()
  }),
  /** Fades the music that is playing out to silence: for a dramatic pause. */
  z.strictObject({
    type: z.literal("music_stop"),
    startTime: Time,
    label: z.string().max(120).optional(),
    fadeMs: DurationMs.optional()
  }),
  z.strictObject({
    type: z.literal("music"),
    startTime: Time,
    /** Fades the music out and stops it here. Omitted: it plays on until other music or a stop comes. */
    endTime: Time.optional(),
    /** Fades out over this long, finishing at `endTime`. Omitted: a 1.5 second fade. */
    fadeOutMs: DurationMs.optional(),
    label: z.string().max(120).optional(),
    src: AssetRefOrEmpty,
    /** How long the music takes to come in, or to cross-fade from music that is playing. */
    fadeMs: DurationMs.optional(),
    volume: Unit.optional()
  }),
  z.strictObject({
    type: z.literal("effect"),
    startTime: Time,
    label: z.string().max(120).optional(),
    name: EffectName,
    ...effectSettingsShape
  }),
  z.strictObject({ type: z.literal("end_scene"), startTime: Time })
]);
const SequenceDefaultsSchema = z.strictObject({
  imageFadeInMs: DurationMs.optional(),
  imageFadeOutMs: DurationMs.optional(),
  imageEnter: ImageMotionSchema.optional(),
  imageExit: ImageMotionSchema.optional()
});
const SequenceSchema = z.strictObject({
  label: z.string().max(120).optional(),
  defaults: SequenceDefaultsSchema.optional(),
  items: z.array(SequenceItemSchema)
});
const SequenceIdSchema = Id;
const DialogPlaybackSchema = z.strictObject({
  autoplay: z.boolean().optional(),
  pauseGame: z.boolean().optional(),
  /** Replaces automatic reading time and the story delay; voice recordings still finish. */
  durationMs: z.number().int().min(0).max(6e5).optional()
});
const DEFAULT_AUTOPLAY_DELAY_MS = 600;
function resolveDialogPlayback(settings, scene, step) {
  const autoplay = step?.autoplay ?? scene?.autoplay ?? false;
  const durationMs = step?.durationMs ?? scene?.durationMs;
  return {
    autoplay,
    pauseGame: !autoplay || (step?.pauseGame ?? scene?.pauseGame ?? false),
    allowManualAdvance: !autoplay || (settings?.autoplayAllowManualAdvance ?? true),
    delayMs: settings?.autoplayDelayMs ?? DEFAULT_AUTOPLAY_DELAY_MS,
    ...durationMs === void 0 ? {} : { durationMs }
  };
}
const AutoplaySettingsSchema = z.strictObject({
  delayMs: z.number().int().min(0).max(6e5).optional(),
  allowManualAdvance: z.boolean().optional(),
  pauseGame: z.boolean().optional()
});
function resolveAutoplaySettings(settings = {}) {
  return {
    autoplay: true,
    delayMs: settings.delayMs ?? DEFAULT_AUTOPLAY_DELAY_MS,
    allowManualAdvance: settings.allowManualAdvance ?? true,
    pauseGame: settings.pauseGame ?? false
  };
}
const TEXT_POSITIONS = ["top", "bottom"];
const TextPositionSchema = z.enum(TEXT_POSITIONS);
const LINE_MODES = ["bubble", "face-box", "box"];
const NARRATION_MODES = ["standard", "long"];
const LINE_ENTRANCES = [
  "portrait-short",
  "portrait-long",
  "together",
  "text-short",
  "text-long"
];
const LineEntranceSchema = z.enum(LINE_ENTRANCES);
const TEXT_ALIGNMENTS = ["left", "center", "right"];
const SPEAKER_BADGES = ["filled", "outlined"];
const SpeakerBadgeSchema = z.enum(SPEAKER_BADGES);
const LinePresentationSchema = z.strictObject({
  /** `auto` asks for the automatic style even where the story sets one. */
  mode: z.enum([...LINE_MODES, "auto"]).optional(),
  /** Retained while in bubble mode, but only used by fixed boxes. */
  position: TextPositionSchema.optional(),
  /** Timing between the box and a stage portrait arriving on this line. Absent follows the story. */
  enter: LineEntranceSchema.optional()
});
const NarrationPresentationSchema = z.strictObject({
  mode: z.enum(NARRATION_MODES).optional(),
  position: TextPositionSchema.optional(),
  /** Text alignment within the reading column. */
  align: z.enum(TEXT_ALIGNMENTS).optional(),
  /** Horizontal placement of the long-narration column, independent of its text. */
  horizontalAlign: z.enum(TEXT_ALIGNMENTS).optional()
});
const PresentationDefaultsSchema = z.strictObject({
  line: LinePresentationSchema.optional(),
  narration: NarrationPresentationSchema.optional()
});
const DEFAULT_LINE_PRESENTATION = {
  mode: "face-box",
  position: "bottom",
  enter: "portrait-short"
};
const DEFAULT_NARRATION_PRESENTATION = {
  mode: "standard",
  position: "top",
  align: "left",
  horizontalAlign: "left"
};
const automaticLineMode = (stagePortrait) => stagePortrait ? "box" : "face-box";
const lineModeIsAutomatic = (own, defaults) => {
  const mode = own?.mode ?? defaults?.line?.mode;
  return mode === void 0 || mode === "auto";
};
function resolveLinePresentation(own, defaults, context) {
  return {
    mode: lineModeIsAutomatic(own, defaults) ? automaticLineMode(context?.stagePortrait) : own?.mode ?? defaults?.line?.mode,
    position: own?.position ?? defaults?.line?.position ?? DEFAULT_LINE_PRESENTATION.position,
    enter: own?.enter ?? defaults?.line?.enter ?? DEFAULT_LINE_PRESENTATION.enter
  };
}
function resolveNarrationPresentation(own, defaults) {
  return {
    mode: own?.mode ?? defaults?.narration?.mode ?? DEFAULT_NARRATION_PRESENTATION.mode,
    position: own?.position ?? defaults?.narration?.position ?? DEFAULT_NARRATION_PRESENTATION.position,
    align: own?.align ?? defaults?.narration?.align ?? DEFAULT_NARRATION_PRESENTATION.align,
    // Older presentation data used align for both placement and text. Preserve that look until edited.
    horizontalAlign: own?.horizontalAlign ?? defaults?.narration?.horizontalAlign ?? own?.align ?? defaults?.narration?.align ?? DEFAULT_NARRATION_PRESENTATION.horizontalAlign
  };
}
function patchNarrationPresentation(own, patch, defaults) {
  return {
    ...own,
    ...patch.align !== void 0 && own?.horizontalAlign === void 0 && defaults?.narration?.horizontalAlign === void 0 ? { horizontalAlign: resolveNarrationPresentation(own, defaults).horizontalAlign } : {},
    ...patch
  };
}
function presentationForNewStep(type, source, defaults) {
  if (!source) return void 0;
  if (type === "line") {
    const fixed = (own, { position }) => {
      const mode = own?.mode ?? defaults?.line?.mode;
      return { ...mode ? { mode } : {}, position };
    };
    if (source.type === "line")
      return fixed(source.presentation, resolveLinePresentation(source.presentation, defaults));
    return {
      ...fixed(void 0, resolveLinePresentation(void 0, defaults)),
      position: resolveNarrationPresentation(source.presentation, defaults).position
    };
  }
  if (source.type === "narration")
    return resolveNarrationPresentation(source.presentation, defaults);
  const line = resolveLinePresentation(source.presentation, defaults);
  return {
    ...resolveNarrationPresentation(void 0, defaults),
    ...line.mode === "bubble" ? {} : { position: line.position }
  };
}
const stepBase = {
  id: Id,
  /** The step is skipped unless this holds. */
  when: ConditionSchema.optional(),
  /** Stage changes applied when the step starts. */
  stage: z.array(StageOpSchema).optional(),
  /** Author note, never shown to players. */
  note: z.string().max(500).optional(),
  /**
   * Hidden: the step stays in the story and in the editor's list, but nothing plays it: no text, no sound, no stage
   * changes, no flags set. Unlike `when`, the studio preview skips it too. Absent means shown.
   */
  hidden: z.boolean().optional(),
  /**
   * The route of a fork this step belongs to (the `id` of one of that fork step's routes). The step plays only when
   * the route's condition holds, on top of its own `when`. Steps of a route follow their fork step in the list, and a
   * fork inside a route has this too, which is how forks nest. Absent: the step is on the main path.
   */
  inRoute: Id.optional()
};
const NarrationStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("narration"),
  presentation: NarrationPresentationSchema.optional(),
  playback: DialogPlaybackSchema.optional(),
  text: StringKey,
  /** A spoken recording of the text (a narrator's voice). */
  voice: AssetKey.optional(),
  /** Music ducks while the voice plays unless this is false. */
  duckMusic: z.boolean().optional()
});
const EXPR_CHANGES = ["crossfade", "cut", "in-out"];
const ExprChangeSchema = z.enum(EXPR_CHANGES);
const LineStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("line"),
  presentation: LinePresentationSchema.optional(),
  playback: DialogPlaybackSchema.optional(),
  /** Character id (from the workspace). */
  speaker: Id,
  expr: z.string().max(64).optional(),
  /** How the change to this line's expression shows. Absent: a cross-fade. Only means something with `expr`. */
  exprChange: ExprChangeSchema.optional(),
  /** What this line does with the speaker's large picture, and where and how. Absent: only the face shows. */
  portrait: LinePortraitSchema.optional(),
  text: StringKey,
  voice: AssetKey.optional(),
  /** Music ducks while the voice plays unless this is false. */
  duckMusic: z.boolean().optional()
});
const SequenceStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("sequence"),
  ref: Id,
  /** Wait for the sequence to finish before advancing. */
  blocking: z.boolean().default(true),
  skippable: z.boolean().default(true),
  /** auto: start immediately; onClick: wait for the player first. */
  trigger: z.enum(["auto", "onClick"]).default("auto"),
  skipPromptKey: StringKey.optional(),
  /**
   * Keep the sequence on screen behind the steps that follow (dialog, for instance) until a matching
   * `hold-end` step. A held sequence never waits: the story moves on at once.
   */
  hold: z.boolean().default(false),
  /** While a waiting sequence plays, keep the dialog box of the step before it on screen. */
  keepDialog: z.boolean().default(false),
  /**
   * Whether the sequence is drawn behind or in front of the dialog box when both are on screen (it plays
   * while the story continues, or it stays after playing). In front suits see-through things like rain.
   */
  layer: z.enum(["behind", "front"]).default("behind")
});
const HoldEndStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("hold-end"),
  start: Id,
  /** fade: the sequence fades out; cut: it disappears at once. */
  ending: z.enum(["fade", "cut"]).default("fade"),
  /** How long the fade takes, in milliseconds. */
  fadeMs: z.number().int().min(0).max(1e4).default(500)
});
const DelayStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("delay"),
  /** How long to wait, in milliseconds. */
  ms: DurationMs,
  /** Whether the player can cut the wait short (a click or key). Off unless set. */
  skippable: z.boolean().default(false)
});
const TRANSITION_CHANNELS = ["picture", "music", "dialog"];
const TransitionChannelSchema = z.enum(TRANSITION_CHANNELS);
const TRANSITION_MODES = ["out", "in", "through"];
const TransitionModeSchema = z.enum(TRANSITION_MODES);
const TransitionMs = z.number().int().min(0).max(1e4);
const TransitionStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("transition"),
  mode: TransitionModeSchema.default("through"),
  /** The color the screen fades to: black, white or any #rrggbb. */
  color: HexColor.default("#000000"),
  affects: z.array(TransitionChannelSchema).min(1).refine((list) => new Set(list).size === list.length, "list each part once").default(["picture", "music"]),
  /** Fading out takes this long. Not used by `in`. */
  outMs: TransitionMs.default(1e3),
  /** Staying covered takes this long. Only `through` uses it. */
  holdMs: TransitionMs.default(500),
  /** Fading back in takes this long. Not used by `out`. */
  inMs: TransitionMs.default(1e3),
  /** Whether the player can cut the fade short (a click or key). Off unless asked for. */
  skippable: z.boolean().default(false)
});
const EventStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("event"),
  name: Id,
  params: z.record(z.string(), z.json()).optional(),
  outcomes: z.array(Id).min(1),
  /** Outcome used when no host handles the event (studio preview, mock handlers). */
  default: Id,
  resultFlag: FlagName.optional()
});
const SetStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("set"),
  set: z.array(SetOpSchema).min(1)
});
const ChoiceOptionSchema = z.strictObject({
  id: Id,
  text: StringKey,
  when: ConditionSchema.optional(),
  set: z.array(SetOpSchema).optional()
});
const ChoiceStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("choice"),
  prompt: StringKey.optional(),
  options: z.array(ChoiceOptionSchema).min(2)
});
const EndStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("end"),
  exit: Id
});
const LeaveStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("leave"),
  from: z.enum(["scene", "fork"]).default("scene")
});
const GotoStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("goto"),
  scene: Id.optional(),
  mark: Id.optional()
});
const MarkStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("mark"),
  label: z.string().max(80).default("")
});
const ForkRouteSchema = z.strictObject({
  id: Id,
  /** What the author calls it ("win", "spare the wolf"). Shown in the editor and on the map, never to players. */
  label: z.string().max(80).optional(),
  when: ConditionSchema.optional()
});
const ForkStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("fork"),
  routes: z.array(ForkRouteSchema).min(1)
});
const AutoplayStartStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("autoplay-start"),
  settings: AutoplaySettingsSchema.optional()
});
const AutoplayEndStepSchema = z.strictObject({
  ...stepBase,
  type: z.literal("autoplay-end"),
  start: Id
});
const StepSchema = z.discriminatedUnion("type", [
  AutoplayStartStepSchema,
  AutoplayEndStepSchema,
  NarrationStepSchema,
  LineStepSchema,
  SequenceStepSchema,
  DelayStepSchema,
  TransitionStepSchema,
  HoldEndStepSchema,
  EventStepSchema,
  SetStepSchema,
  ChoiceStepSchema,
  EndStepSchema,
  ForkStepSchema,
  LeaveStepSchema,
  GotoStepSchema,
  MarkStepSchema
]);
function routeIndex(steps) {
  const index = /* @__PURE__ */ new Map();
  for (const step of steps) {
    if (step.type !== "fork") continue;
    for (const route of step.routes)
      if (!index.has(route.id)) index.set(route.id, { fork: step, route });
  }
  return index;
}
function routeChain(step, index) {
  const chain = [];
  const seen = /* @__PURE__ */ new Set();
  let at = step.inRoute;
  while (at && !seen.has(at)) {
    seen.add(at);
    const ref = index.get(at);
    if (!ref) break;
    chain.unshift(ref);
    at = ref.fork.inRoute;
  }
  return chain;
}
function effectiveWhen(step, index) {
  const parts = [];
  for (const { fork, route } of routeChain(step, index)) {
    if (fork.when) parts.push(fork.when);
    if (route.when) parts.push(route.when);
  }
  if (step.when) parts.push(step.when);
  if (parts.length === 0) return void 0;
  return parts.length === 1 ? parts[0] : { and: parts };
}
function applyRoutes(steps) {
  if (!steps.some((s) => s.type === "fork" || s.inRoute)) return [...steps];
  const index = routeIndex(steps);
  return steps.map((step) => {
    const when = effectiveWhen(step, index);
    if (!when && !step.inRoute && step.type !== "fork") return step;
    const copy = { ...step };
    delete copy.inRoute;
    delete copy.when;
    if (step.type === "fork") {
      delete copy.routes;
      copy.type = "set";
      copy.set = [];
    }
    if (when) copy.when = when;
    return copy;
  });
}
function forkBlockEnd(steps, forkIndex) {
  const fork = steps[forkIndex];
  if (fork?.type !== "fork") return forkIndex;
  const index = routeIndex(steps);
  let end = forkIndex;
  steps.forEach((step, i) => {
    if (i > end && routeChain(step, index).some((ref) => ref.fork === fork)) end = i;
  });
  return end;
}
function leaveTarget(steps, at) {
  const step = steps[at];
  if (step?.type !== "leave") return void 0;
  if (step.from === "scene") return "scene";
  const chain = routeChain(step, routeIndex(steps));
  const fork = chain.at(-1)?.fork;
  if (!fork) return void 0;
  const next = steps[forkBlockEnd(steps, steps.indexOf(fork)) + 1];
  return next ? next.id : "scene";
}
const TRANSITION_DEFAULTS = {
  mode: "through",
  color: "#000000",
  affects: ["picture", "music"],
  outMs: 1e3,
  holdMs: 500,
  inMs: 1e3,
  skippable: false
};
function resolveTransition(step) {
  const mode = step.mode ?? TRANSITION_DEFAULTS.mode;
  return {
    mode,
    color: step.color ?? TRANSITION_DEFAULTS.color,
    affects: [...step.affects ?? TRANSITION_DEFAULTS.affects],
    outMs: mode === "in" ? 0 : step.outMs ?? TRANSITION_DEFAULTS.outMs,
    holdMs: mode === "through" ? step.holdMs ?? TRANSITION_DEFAULTS.holdMs : 0,
    inMs: mode === "out" ? 0 : step.inMs ?? TRANSITION_DEFAULTS.inMs,
    skippable: step.skippable ?? TRANSITION_DEFAULTS.skippable
  };
}
const transitionLength = (t) => t.outMs + t.holdMs + t.inMs;
const PortraitCropSchema = z.strictObject({
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  zoom: z.number().min(0.05).max(8)
});
const CharacterHeadSchema = z.strictObject({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  size: z.number().min(0.02).max(1)
});
const DEFAULT_HEAD = { x: 0.49, y: 0.22, size: 0.37 };
const CharacterFitSchema = z.strictObject({
  /** 1 is the host’s default stage portrait height; other values scale relative to it. */
  scale: z.number().min(0.3).max(2).optional(),
  /** Moves the illustration up (positive) or down (negative), as a share of the stage height. */
  lift: z.number().min(-0.5).max(0.5).optional(),
  /** Follow another expression’s size and height. Mirroring remains independent. */
  sameAs: z.string().min(1).max(64).optional(),
  /** Mirror the illustration left to right. */
  flip: z.boolean().optional(),
  /** Where the head is in this picture. Without it the default expression's head is used. */
  head: CharacterHeadSchema.optional()
});
const CharacterSchema = z.strictObject({
  id: Id,
  /** Experimental name badge variant; absent follows the story's name-tag styling. */
  speakerBadge: SpeakerBadgeSchema.optional(),
  /** Display name per language. */
  names: z.record(LangCode, z.string().min(1).max(80)).refine((n) => Object.keys(n).length > 0, "at least one name"),
  /** Optional full name per language, separate from the speaker name plate. */
  fullNames: z.record(LangCode, z.string().min(1).max(160)).optional(),
  /** Expression -> dialog portrait framing, also used in character avatars. */
  faceCrops: z.record(z.string().max(64), PortraitCropSchema).optional(),
  /** Speaker color, shown on the name plate and in the editor. */
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  /**
   * Internal label, shown only next to the name in the editor's character picker (to tell two "Anna"s apart).
   * Never shown to players and left out of what gets published.
   */
  label: z.string().max(80).optional(),
  /** Internal note for authors: who the character is, reminders for a big project. Never published. */
  note: z.string().max(2e3).optional(),
  /** Expression name -> the large illustration shown on the stage. */
  expressions: z.record(z.string().max(64), AssetKey).default({}),
  /**
   * Expression name -> the small face shown in the dialog box next to the text. Optional and independent of
   * `expressions`: a character can have either, both, or (with none) just a name. A face missing for an
   * expression falls back to the default expression's face.
   */
  faces: z.record(z.string().max(64), AssetKey).optional(),
  /**
   * The order expressions are listed in (a face-only expression and a stage-only one share no map to keep it).
   * The first one is the character's default picture unless `defaultExpression` names another.
   */
  expressionOrder: z.array(z.string().max(64)).max(200).optional(),
  defaultExpression: z.string().max(64).optional(),
  /** Where this character stands when put on stage without a position. No value means the left. */
  home: Slot.optional(),
  /** Which side of the dialog box this character's face sits on, when it should differ from the story's choice. */
  faceSide: FaceSideSchema.optional(),
  /**
   * Extra darkening for this character when it is toned down while someone else speaks, added to the story's level
   * (0 to 0.5, so 0.25 on top of a 0.2 story level is 0.45). A light-colored character needs more than a dark one.
   */
  dimExtra: z.number().min(0).max(MAX_DIM_EXTRA).optional(),
  /** Expression name -> how its stage picture sits, for art whose proportions differ from the usual. */
  fits: z.record(z.string().max(64), CharacterFitSchema).optional()
});
function characterFullName(character, language = "en") {
  for (const map of [character.fullNames, character.names]) {
    if (!map || typeof map !== "object") continue;
    const values = map;
    for (const value of [values[language], ...Object.values(values)]) {
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  }
  return typeof character.id === "string" ? character.id : "";
}
function publicCharacter(character) {
  const copy = { ...character };
  delete copy.label;
  delete copy.note;
  return copy;
}
function nameForLanguage(names, lang, source) {
  const base = (code) => code.split("-")[0].toLowerCase();
  const pick2 = (code) => names[code] ?? Object.entries(names).find(([key]) => base(key) === base(code))?.[1];
  return pick2(lang) ?? pick2(source) ?? Object.values(names)[0];
}
function mergeCharacters(library, local) {
  const byId = /* @__PURE__ */ new Map();
  for (const c of library) byId.set(c.id, c);
  for (const c of local) byId.set(c.id, c);
  return [...byId.values()];
}
function characterIdFromName(name, taken) {
  let base = name.normalize("NFKD").replace(/\p{M}/gu, "").split(/[^A-Za-z0-9]+/).filter(Boolean).join("_").toLowerCase().slice(0, 40).replace(/_+$/, "");
  if (base === "") base = "char";
  else if (/^[0-9]/.test(base)) base = `c${base}`;
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}_${n}`;
  return id;
}
function expressionNames(character) {
  const all = /* @__PURE__ */ new Set([
    ...Object.keys(character.expressions),
    ...Object.keys(character.faces ?? {})
  ]);
  const ordered = (character.expressionOrder ?? []).filter((n) => all.has(n));
  return [.../* @__PURE__ */ new Set([...ordered, ...all])];
}
function baseExpression(character) {
  const names = expressionNames(character);
  return character.defaultExpression && names.includes(character.defaultExpression) ? character.defaultExpression : names[0];
}
function resolveExpression(character, expr) {
  return expr !== void 0 && expressionNames(character).includes(expr) ? expr : baseExpression(character);
}
function portraitOf(character, expr) {
  if (!character) return void 0;
  const name = resolveExpression(character, expr);
  if (name === void 0) return void 0;
  const face = character.faces?.[name];
  if (face) return { asset: face, art: false, expression: name };
  const art = character.expressions[name];
  return art ? { asset: art, art: true, expression: name } : void 0;
}
function stagePictureOf(character, expr) {
  if (!character) return void 0;
  const own = expr !== void 0 ? character.expressions[expr] : void 0;
  if (own && expr !== void 0) return { asset: own, expression: expr };
  const base = baseExpression(character);
  const fromBase = base !== void 0 ? character.expressions[base] : void 0;
  if (fromBase && base !== void 0) return { asset: fromBase, expression: base };
  for (const name of expressionNames(character)) {
    const asset = character.expressions[name];
    if (asset) return { asset, expression: name };
  }
  return void 0;
}
function stageArtOf(character, expr) {
  return stagePictureOf(character, expr)?.asset;
}
function fitOf(character, expr) {
  const shown = stagePictureOf(character, expr);
  if (!shown || !character) return void 0;
  const own = character.fits?.[shown.expression];
  if (!own?.sameAs) return own;
  const visited = /* @__PURE__ */ new Set([shown.expression]);
  let source = own;
  while (source.sameAs) {
    if (visited.has(source.sameAs) || !character.expressions[source.sameAs])
      return { scale: own.scale, lift: own.lift, flip: own.flip };
    visited.add(source.sameAs);
    source = character.fits?.[source.sameAs] ?? {};
  }
  return { scale: source.scale, lift: source.lift, flip: own.flip };
}
function headOf(character, expr) {
  const shown = stagePictureOf(character, expr);
  if (!shown || !character) return void 0;
  const base = baseExpression(character);
  return character.fits?.[shown.expression]?.head ?? (base !== void 0 ? character.fits?.[base]?.head : void 0) ?? DEFAULT_HEAD;
}
function faceOf(character, expr) {
  return portraitOf(character, expr)?.asset;
}
const TEXT_SPEEDS = ["slow", "normal", "fast", "instant"];
const TextSpeedSchema = z.enum(TEXT_SPEEDS);
const TEXT_SPEED_CPS = {
  slow: 12,
  normal: 24,
  fast: 48,
  instant: 0
};
const DEFAULT_TEXT_SPEED = "normal";
const cpsOf = (speed2) => TEXT_SPEED_CPS[speed2 ?? DEFAULT_TEXT_SPEED];
const DEFAULT_SCENE_FADE_MS = 500;
const DEFAULT_SCENE_GAP_MS = 1e3;
const DEFAULT_SCENE_TITLE_MS = 4e3;
const SCENE_CARD_MIN_MS = 1500;
const DEFAULT_SCENE_TITLE_GAP_MS = 1500;
const SCENE_STARTS = ["title", "corner", "quiet"];
const SceneStartSchema = z.enum(SCENE_STARTS);
const DEFAULT_SCENE_START = "title";
const TEXT_STYLES = ["serif", "default"];
const TextStyleSchema = z.enum(TEXT_STYLES);
const DEFAULT_TEXT_STYLE = "serif";
const BACKGROUND_PRESETS = {
  stage: "rgb(18 21 26 / 0.85)",
  night: "rgb(0 0 0 / 0.7)",
  deep: "rgb(0 0 0 / 0.9)",
  dusk: "rgb(30 27 75 / 0.8)",
  paper: "rgb(255 255 255 / 0.85)",
  clear: "rgb(0 0 0 / 0)"
};
const BORDER_PRESETS = {
  warm: "#eec68b",
  soft: "rgb(255 255 255 / 0.15)",
  bright: "rgb(255 255 255 / 0.55)",
  dark: "rgb(0 0 0 / 0.45)",
  none: "rgb(0 0 0 / 0)"
};
const TEXT_PRESETS = {
  story: "#fff3e2",
  white: "#ffffff",
  cream: "#fdf6e3",
  ink: "#111111"
};
const TAG_BACKGROUND_PRESETS = {
  ink: "rgb(0 0 0 / 0.85)",
  dusk: "rgb(30 27 75 / 0.9)",
  paper: "rgb(255 255 255 / 0.9)",
  clear: "rgb(0 0 0 / 0)"
};
const TAG_BORDER_PRESETS = {
  speaker: "",
  bright: "rgb(255 255 255 / 0.55)",
  dark: "rgb(0 0 0 / 0.45)",
  none: "rgb(0 0 0 / 0)"
};
const colorChoice = (presets) => z.union([z.enum(Object.keys(presets)), HexColor]);
const CORNERS = ["square", "rounded", "round"];
const CornersSchema = z.enum(CORNERS);
const BoxStyleSchema = z.strictObject({
  /** Off: the text sits on the stage with a shadow, with no background, border or blur. */
  box: z.boolean().optional(),
  background: colorChoice(BACKGROUND_PRESETS).optional(),
  border: colorChoice(BORDER_PRESETS).optional(),
  text: colorChoice(TEXT_PRESETS).optional(),
  corners: CornersSchema.optional()
});
const NameTagStyleSchema = z.strictObject({
  /** Off: just the name, with a shadow. */
  box: z.boolean().optional(),
  background: colorChoice(TAG_BACKGROUND_PRESETS).optional(),
  border: colorChoice(TAG_BORDER_PRESETS).optional(),
  corners: CornersSchema.optional()
});
const StorySettingsSchema = z.strictObject({
  /** Starting layout for text steps that have not chosen their own presentation. */
  presentation: PresentationDefaultsSchema.optional(),
  /** Show the branching and logic steps (Set, Choice, Event, End), conditions and flags in the editor. Editor only. */
  advancedSteps: z.boolean().optional(),
  textSpeed: TextSpeedSchema.optional(),
  autoplayDelayMs: z.number().int().min(0).max(6e5).optional(),
  autoplayAllowManualAdvance: z.boolean().optional(),
  /** The typeface of the dialog text. */
  textStyle: TextStyleSchema.optional(),
  /** How long the picture fades to black at the end of each scene, in ms. Absent: `DEFAULT_SCENE_FADE_MS`; 0: no fade. */
  sceneFadeOutMs: z.number().int().min(0).max(1e4).optional(),
  /** How long the picture fades in from black at the start of each scene, in ms. Absent: the default; 0: no fade. */
  sceneFadeInMs: z.number().int().min(0).max(1e4).optional(),
  /** How long the screen stays dark between two scenes, in ms. Absent: `DEFAULT_SCENE_GAP_MS`; 0: none. */
  sceneGapMs: z.number().int().min(0).max(1e4).optional(),
  /** How long a scene's title shows on its own before its first step, in ms. Absent: the default; 0: over the step. */
  sceneTitleMs: z.number().int().min(0).max(1e4).optional(),
  /** Pause after the scene title exits, in ms. Absent: DEFAULT_SCENE_TITLE_GAP_MS; 0: none. */
  sceneTitleGapMs: z.number().int().min(0).max(1e4).optional(),
  /** How scenes begin unless a scene says otherwise. Absent: a title card. */
  sceneStart: SceneStartSchema.optional(),
  /** Which portraits show (faces, stage pictures or both), the face's side, and how much non-speakers are toned down. */
  portraits: PortraitSettingsSchema.optional(),
  styles: z.strictObject({
    narration: BoxStyleSchema.optional(),
    line: BoxStyleSchema.optional(),
    nameTag: NameTagStyleSchema.optional()
  }).optional()
});
const DEFAULT_STYLES = {
  narration: {
    box: false,
    background: BACKGROUND_PRESETS.stage,
    border: BORDER_PRESETS.warm,
    text: TEXT_PRESETS.white,
    corners: "rounded"
  },
  line: {
    box: true,
    background: BACKGROUND_PRESETS.stage,
    border: BORDER_PRESETS.warm,
    text: TEXT_PRESETS.story,
    corners: "rounded"
  }
};
const pick = (choice, presets, fallback) => choice === void 0 ? fallback : presets[choice] ?? choice;
function resolveBoxStyle(kind, settings) {
  const base = DEFAULT_STYLES[kind];
  const own = settings?.styles?.[kind];
  return {
    box: own?.box ?? base.box,
    background: pick(own?.background, BACKGROUND_PRESETS, base.background),
    border: pick(own?.border, BORDER_PRESETS, base.border),
    text: pick(own?.text, TEXT_PRESETS, base.text),
    corners: own?.corners ?? base.corners
  };
}
const DEFAULT_NAME_TAG = {
  box: true,
  background: TAG_BACKGROUND_PRESETS.ink,
  border: "",
  corners: "rounded"
};
function resolveNameTag(settings) {
  const own = settings?.styles?.nameTag;
  return {
    box: own?.box ?? DEFAULT_NAME_TAG.box,
    background: pick(own?.background, TAG_BACKGROUND_PRESETS, DEFAULT_NAME_TAG.background),
    border: pick(own?.border, TAG_BORDER_PRESETS, DEFAULT_NAME_TAG.border),
    corners: own?.corners ?? DEFAULT_NAME_TAG.corners
  };
}
const FlagDeclSchema = z.strictObject({
  type: z.enum(["boolean", "number", "string"]),
  default: FlagValue,
  description: z.string().max(300).optional()
});
const ContractSchema = z.strictObject({
  /** Named endings the host can react to. "done" is always implicitly available. */
  exits: z.array(Id).default([]),
  /** Shared flags the story reads. */
  reads: z.array(FlagName).default([]),
  /** Shared flags the story sets. */
  sets: z.array(FlagName).default([]),
  hostEvents: z.array(Id).default([]),
  characters: z.array(Id).default([]),
  assets: z.array(AssetKey).default([])
});
const TRIGGER_PRESENTATIONS = ["overlay", "full"];
const TriggerPresentationSchema = z.enum(TRIGGER_PRESENTATIONS);
const DEFAULT_TRIGGER_PRESENTATION = "overlay";
const TriggerSchema = z.strictObject({
  /** One line for the game's developer: when to start it. Shown in the contract. */
  description: z.string().max(200).optional(),
  /** Over the game with no background of its own, or the full stage. Absent: over the game. */
  presentation: TriggerPresentationSchema.optional()
});
const SceneSchema = z.strictObject({
  id: Id,
  meta: z.strictObject({
    /** Author-facing label shown in the editor (not translated). */
    title: z.string().min(1).max(120),
    subtitle: z.string().max(200).optional(),
    location: z.string().max(120).optional(),
    time: z.string().max(60).optional(),
    /** Player-facing scene title and subtitle, translated through the string table. */
    displayTitle: StringKey.optional(),
    displaySubtitle: StringKey.optional(),
    /** How the scene begins. Absent: the story's setting (a title card unless it says otherwise). */
    start: SceneStartSchema.optional(),
    /**
     * The background the scene opens on, in place before its title card shows. It stays until a step changes it, and
     * changes the way a step's background does (the default fade). Absent: the background carries on from before.
     * A scene the game starts over the game (`overlay`) ignores it.
     */
    backgroundAsset: AssetKey.optional()
  }),
  /** Present: the game starts this scene by name; it is outside the story's order (and has no `after`). */
  trigger: TriggerSchema.optional(),
  /** The scene plays only when this holds; otherwise the story moves on to the next scene. */
  when: ConditionSchema.optional(),
  /**
   * Where the story goes when the scene runs out of steps: absent, to the next scene in the list; `{ scene }`, to the
   * start of that scene; `{ end: true }`, to the end of the story (its exit is `done`).
   */
  after: z.union([z.strictObject({ scene: Id }), z.strictObject({ end: z.literal(true) })]).optional(),
  playback: DialogPlaybackSchema.optional(),
  steps: z.array(StepSchema)
});
const storyScenes = (scenes) => scenes.filter((s) => !s.trigger);
const triggeredScenes = (scenes) => scenes.filter((s) => s.trigger);
const triggerPresentation = (scene) => scene.trigger?.presentation ?? DEFAULT_TRIGGER_PRESENTATION;
const StorySchema = z.strictObject({
  schemaVersion: z.literal(SCHEMA_VERSION),
  id: Id,
  meta: z.strictObject({
    title: z.string().min(1).max(160),
    episode: z.number().int().min(0).optional(),
    summary: z.string().max(1e3).optional(),
    /** String keys for the title and summary, so they can be translated. Optional; `title` stays the source text. */
    titleKey: StringKey.optional(),
    summaryKey: StringKey.optional(),
    authors: z.array(z.string().max(80)).optional()
  }),
  languages: z.strictObject({
    /** The language the string keys were written in; translations hash against it. */
    source: LangCode,
    available: z.array(LangCode).default([])
  }),
  /** Story-level settings (text speed, dialog looks, editor switches). Absent means all defaults. */
  settings: StorySettingsSchema.optional(),
  contract: ContractSchema.prefault({}),
  /** Flags private to this story. Shared flags live in the workspace registry. */
  flags: z.record(FlagName, FlagDeclSchema).default({}),
  scenes: z.array(SceneSchema).min(1),
  sequences: z.record(Id, SequenceSchema).default({}),
  /** Characters that belong to this story alone. They override workspace characters with the same id. */
  characters: z.array(CharacterSchema).default([]).refine(
    (list) => new Set(list.map((c) => c.id)).size === list.length,
    "duplicate character id"
  )
});
function hashText(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}
const StringEntrySchema = z.union([
  z.string(),
  z.strictObject({
    text: z.string(),
    sourceHash: z.string().regex(/^[0-9a-f]{8}$/).optional()
  })
]);
const StringTableSchema = z.strictObject({
  schemaVersion: z.literal(SCHEMA_VERSION),
  lang: LangCode,
  entries: z.record(StringKey, StringEntrySchema)
});
function textOf(entry) {
  if (entry === void 0) return void 0;
  return typeof entry === "string" ? entry : entry.text;
}
function translationEntry(sourceText, translated) {
  return { text: translated, sourceHash: hashText(sourceText) };
}
function findMissingTranslations(source, translation) {
  return Object.keys(source.entries).filter((k) => !(k in translation.entries));
}
function findStaleTranslations(source, translation) {
  const stale = [];
  for (const [key, entry] of Object.entries(translation.entries)) {
    const src = textOf(source.entries[key]);
    if (src === void 0) continue;
    if (typeof entry === "string" || entry.sourceHash === void 0) {
      stale.push(key);
    } else if (entry.sourceHash !== hashText(src)) {
      stale.push(key);
    }
  }
  return stale;
}
const TAG = /\[(\/?)([a-z][a-z0-9-]*)(?::[^\]]*)?\]/gi;
function extractMarkupTags(text) {
  const tags = [];
  for (const m of text.matchAll(TAG)) tags.push(`${m[1] ?? ""}${(m[2] ?? "").toLowerCase()}`);
  return tags.sort();
}
function markupMatches(sourceText, translatedText) {
  const a = extractMarkupTags(sourceText);
  const b = extractMarkupTags(translatedText);
  return a.length === b.length && a.every((t, i) => t === b[i]);
}
const ASSET_KINDS = [
  "background",
  "portrait",
  "object",
  "scene",
  "effect",
  "music",
  "sfx",
  "voice",
  "video"
];
const AssetKind = z.enum(ASSET_KINDS);
const ASSET_ROLES = [
  "portrait",
  "background",
  "scene",
  "object",
  "music",
  "sfx",
  "voice",
  "video"
];
const isAssetRole = (value) => typeof value === "string" && ASSET_ROLES.includes(value);
const ROLE_MEDIA = {
  portrait: "image",
  background: "image",
  scene: "image",
  object: "image",
  music: "audio",
  sfx: "audio",
  voice: "audio",
  video: "video"
};
const ROLE_PREFIX = {
  portrait: "char/",
  background: "bg/",
  scene: "scene/",
  object: "obj/",
  music: "music/",
  sfx: "sfx/",
  voice: "voice/",
  video: "video/"
};
const ASSET_ORIGIN_KINDS = ["story", "module", "assets", "import", "ai"];
const ORIGIN_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,99}$/;
function parseAssetOriginRequest(value) {
  if (typeof value !== "string") return null;
  const [kind, id, ...rest] = value.split(":");
  if (rest.length || !ASSET_ORIGIN_KINDS.includes(kind ?? "")) return null;
  if (id === void 0) return { kind };
  return ORIGIN_ID.test(id) ? { kind, id } : null;
}
const formatAssetOriginRequest = (origin) => origin.id ? `${origin.kind}:${origin.id}` : origin.kind;
const ASSET_PREFIX = /^[a-z0-9][a-z0-9_.-]*(\/[a-z0-9][a-z0-9_.-]*)*[/-]$/;
const isAssetPrefix = (value) => value.length <= 60 && ASSET_PREFIX.test(value);
const AssetEntrySchema = z.strictObject({
  kind: AssetKind,
  /** Where the file is. Hosts may ignore this and resolve the key themselves. */
  url: z.string().max(2048).optional(),
  hash: z.string().max(128).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  durationMs: DurationMs.optional(),
  bytes: z.number().int().nonnegative().optional(),
  credit: z.string().max(500).optional()
});
const AssetManifestSchema = z.strictObject({
  schemaVersion: z.literal(SCHEMA_VERSION),
  assets: z.record(AssetKey, AssetEntrySchema),
  /**
   * The widths the studio asks for each kind of picture (its `IMAGE_SIZE`), so a game that downloads the files can ask
   * for the same sizes (`?w=` on a file URL). A host that does not download files can ignore it.
   */
  imageSizes: z.record(z.string().max(40), z.number().int().positive()).optional()
});
const UPLOAD_TYPES = {
  "image/png": { media: "image", ext: "png" },
  "image/jpeg": { media: "image", ext: "jpg" },
  "image/webp": { media: "image", ext: "webp" },
  "audio/mpeg": { media: "audio", ext: "mp3" },
  "audio/ogg": { media: "audio", ext: "ogg" },
  "video/mp4": { media: "video", ext: "mp4" },
  "video/webm": { media: "video", ext: "webm" }
};
const UPLOAD_ACCEPT = {
  image: ".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp",
  audio: ".mp3,.ogg,audio/mpeg,audio/ogg",
  video: ".mp4,.webm,video/mp4,video/webm"
};
const UPLOAD_ACCEPT_ALL = Object.values(UPLOAD_ACCEPT).join(",");
const UPLOAD_MAX_BYTES = {
  image: 10 * 1024 * 1024,
  audio: 25 * 1024 * 1024,
  video: 100 * 1024 * 1024
};
const VIDEO_WARN_BYTES = 8 * 1024 * 1024;
const IMAGE_WIDTHS = [320, 560, 960, 1300, 1920, 2560];
const IMAGE_SIZE = {
  /** Small previews: asset grid, expression chips, dialog log, map. */
  thumbnail: 320,
  /** A speaker's face in the dialog box. */
  dialogPortrait: 560,
  /** Character avatars. Only shown in editor. */
  avatar: 320,
  /** Portraits on the stage. */
  stagePortrait: 1300,
  /** Pictures in a sequence. */
  sequencePicture: 1300,
  /** Backgrounds, stage objects and anything else shown full screen. */
  background: 1920
};
function snapImageWidth(requested) {
  const n = Number(Array.isArray(requested) ? requested[0] : requested);
  if (!Number.isFinite(n) || n <= 0) return null;
  return IMAGE_WIDTHS.find((w) => w >= n) ?? null;
}
function sniffUploadType(bytes) {
  const at = (i) => bytes[i] ?? -1;
  const ascii = (i, text) => [...text].every((c, k) => at(i + k) === c.charCodeAt(0));
  if (at(0) === 137 && ascii(1, "PNG") && at(4) === 13 && at(5) === 10) return "image/png";
  if (at(0) === 255 && at(1) === 216 && at(2) === 255) return "image/jpeg";
  if (ascii(0, "RIFF") && ascii(8, "WEBP")) return "image/webp";
  if (ascii(4, "ftyp")) return "video/mp4";
  if (at(0) === 26 && at(1) === 69 && at(2) === 223 && at(3) === 163) return "video/webm";
  if (ascii(0, "OggS")) return "audio/ogg";
  if (ascii(0, "ID3") || at(0) === 255 && (at(1) & 224) === 224) return "audio/mpeg";
  return null;
}
function assetSlugFromName(name, taken, prefix = "") {
  let base = name.replace(/\.[A-Za-z0-9]{1,5}$/, "").normalize("NFKD").replace(/[^A-Za-z0-9_.-]+/g, "-").replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "").toLowerCase().slice(0, 120 - prefix.length);
  if (base === "") base = "asset";
  base = prefix + base;
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}
const ASSET_FIELDS = /* @__PURE__ */ new Set(["asset", "voice", "src", "backgroundAsset"]);
const PORTRAIT_MAPS = /* @__PURE__ */ new Set(["expressions", "faces"]);
function renameAssetRefs(node, renames) {
  if (node === null || typeof node !== "object") return 0;
  let changed = 0;
  const swap = (value) => typeof value === "string" ? renames.get(value) : void 0;
  if (Array.isArray(node)) {
    for (const item of node) changed += renameAssetRefs(item, renames);
    return changed;
  }
  const record = node;
  for (const [key, value] of Object.entries(record)) {
    if (ASSET_FIELDS.has(key)) {
      const next = swap(value);
      if (next !== void 0) {
        record[key] = next;
        changed++;
        continue;
      }
    }
    if (key === "assets" && Array.isArray(value)) {
      value.forEach((item, i) => {
        const next = swap(item);
        if (next !== void 0) {
          value[i] = next;
          changed++;
        }
      });
      continue;
    }
    if (PORTRAIT_MAPS.has(key) && value !== null && typeof value === "object") {
      const expressions = value;
      for (const [name, ref] of Object.entries(expressions)) {
        const next = swap(ref);
        if (next !== void 0) {
          expressions[name] = next;
          changed++;
        }
      }
      continue;
    }
    changed += renameAssetRefs(value, renames);
  }
  return changed;
}
const OP_ROLE = /* @__PURE__ */ new Map([
  ["bg", "background"],
  ["music", "music"],
  ["sfx", "sfx"],
  ["show", "object"]
]);
const ITEM_ROLE = /* @__PURE__ */ new Map([
  ["image", "scene"],
  ["video", "video"],
  ["sound", "sfx"],
  ["voice", "voice"],
  ["music", "music"]
]);
function collectAssetRoles(node, found) {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) collectAssetRoles(item, found);
    return;
  }
  const record = node;
  const role = typeof record.op === "string" ? OP_ROLE.get(record.op) : void 0;
  if (role && typeof record.asset === "string" && !found.has(record.asset)) {
    found.set(record.asset, role);
  }
  if (typeof record.voice === "string" && !found.has(record.voice))
    found.set(record.voice, "voice");
  if (typeof record.backgroundAsset === "string" && !found.has(record.backgroundAsset))
    found.set(record.backgroundAsset, "background");
  const itemRole = typeof record.type === "string" ? ITEM_ROLE.get(record.type) : void 0;
  if (itemRole && typeof record.src === "string" && record.src !== "" && !found.has(record.src))
    found.set(record.src, itemRole);
  for (const [key, value] of Object.entries(record)) {
    if (PORTRAIT_MAPS.has(key) && value !== null && typeof value === "object") {
      for (const ref of Object.values(value)) {
        if (typeof ref === "string" && !found.has(ref)) found.set(ref, "portrait");
      }
    } else collectAssetRoles(value, found);
  }
}
function forEachAssetRef(node, found) {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) forEachAssetRef(item, found);
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (ASSET_FIELDS.has(key) && typeof value === "string") {
      if (value !== "") found(value);
    } else if (key === "assets" && Array.isArray(value)) {
      for (const item of value) if (typeof item === "string") found(item);
    } else if (PORTRAIT_MAPS.has(key) && value !== null && typeof value === "object") {
      for (const ref of Object.values(value)) if (typeof ref === "string") found(ref);
    } else forEachAssetRef(value, found);
  }
}
function parseByteRange(header) {
  const m = /^bytes=(\d+)-(\d*)$/.exec(header ?? "");
  if (!m) return null;
  const start = Number(m[1]);
  const end = m[2] === "" ? void 0 : Number(m[2]);
  if (end !== void 0 && end < start) return null;
  return end === void 0 ? { start } : { start, end };
}
const SpriteSheetSchema = z.strictObject({
  columns: z.number().int().min(1).max(256),
  rows: z.number().int().min(1).max(256),
  margin: z.number().int().min(0).max(4096),
  spacing: z.number().int().min(0).max(4096),
  firstFrame: z.number().int().min(0),
  frameCount: z.number().int().min(1).max(4096),
  fps: z.number().min(0.1).max(120),
  playback: z.enum(["loop", "once", "ping-pong"]),
  randomStart: z.boolean().optional(),
  animated: z.boolean().optional()
}).superRefine((sheet, ctx) => {
  if (sheet.columns * sheet.rows > 4096 || sheet.firstFrame + sheet.frameCount > sheet.columns * sheet.rows)
    ctx.addIssue({ code: "custom", message: "Frames must fit inside the sheet." });
});
function spriteCell(sheet, width, height) {
  const w = (width - 2 * sheet.margin - (sheet.columns - 1) * sheet.spacing) / sheet.columns;
  const h = (height - 2 * sheet.margin - (sheet.rows - 1) * sheet.spacing) / sheet.rows;
  return Number.isFinite(w) && Number.isFinite(h) && w >= 1 && h >= 1 ? { width: w, height: h } : null;
}
function spriteFrameRect(sheet, width, height, frame) {
  const cell = spriteCell(sheet, width, height);
  if (!cell) return null;
  const left = sheet.margin + frame % sheet.columns * (cell.width + sheet.spacing);
  const top = sheet.margin + Math.floor(frame / sheet.columns) * (cell.height + sheet.spacing);
  const x = Math.round(left);
  const y = Math.round(top);
  return {
    x,
    y,
    width: Math.round(left + cell.width) - x,
    height: Math.round(top + cell.height) - y
  };
}
function spriteStartOffset(sheet, instanceId) {
  if (!sheet.randomStart || instanceId === void 0) return 0;
  let hash = 2166136261;
  for (let i = 0; i < instanceId.length; i++)
    hash = Math.imul(hash ^ instanceId.charCodeAt(i), 16777619);
  return (hash >>> 0) % sheet.frameCount;
}
function spriteFrame(sheet, elapsedMs, instanceId) {
  if (sheet.animated === false) return sheet.firstFrame;
  const step = Math.floor(Math.max(0, elapsedMs) * sheet.fps / 1e3) + spriteStartOffset(sheet, instanceId);
  const n = sheet.frameCount;
  if (sheet.playback === "once") return sheet.firstFrame + Math.min(step, n - 1);
  if (sheet.playback === "ping-pong" && n > 1) {
    const at = step % (2 * n - 2);
    return sheet.firstFrame + (at < n ? at : 2 * n - 2 - at);
  }
  return sheet.firstFrame + step % n;
}
const GraphicSizeSchema = z.strictObject({
  width: z.number().positive().max(1e5),
  height: z.number().positive().max(1e5).optional()
});
const GRAPHIC_BLEND_MODES = [
  "source-over",
  "multiply",
  "screen",
  "overlay",
  "lighter",
  "darken",
  "lighten",
  "soft-light",
  "hard-light",
  "difference"
];
const GraphicAppearanceSchema = z.strictObject({
  opacity: z.number().min(0).max(1),
  blendMode: z.enum(GRAPHIC_BLEND_MODES)
});
const FlagRegistrySchema = z.strictObject({
  schemaVersion: z.literal(SCHEMA_VERSION),
  flags: z.record(FlagName, FlagDeclSchema)
});
const ThemeSchema = z.strictObject({
  id: Id,
  name: z.string().min(1).max(80),
  fonts: z.strictObject({ body: z.string().max(200), name: z.string().max(200).optional() }),
  textSpeedCps: z.number().positive().max(500).default(40),
  fadeMs: z.number().int().min(0).max(5e3).default(400),
  /** What sequence images fade by unless the sequence or the image says otherwise. */
  imageFadeInMs: z.number().int().min(0).max(5e3).optional(),
  imageFadeOutMs: z.number().int().min(0).max(5e3).optional(),
  imageEnter: ImageMotionSchema.optional(),
  imageExit: ImageMotionSchema.optional(),
  dialogBox: z.strictObject({
    anchor: z.enum(["bottom", "top"]).default("bottom"),
    opacity: z.number().min(0).max(1).default(0.85),
    nameplate: z.boolean().default(true)
  })
});
const CollectionNodeSchema = z.strictObject({
  id: Id,
  /** Story id this node opens. */
  story: Id,
  kind: z.enum(["main", "side"]),
  title: z.string().max(120).optional(),
  /** Unlocked when this holds, e.g. { and: [{ completed: "ch03" }, { flag: "trusted_monk", is: true }] }. */
  unlock: ConditionSchema.optional(),
  /** Editor canvas position (not used by the engine). */
  position: z.strictObject({ x: z.number(), y: z.number() }).optional()
});
const CollectionSchema = z.strictObject({
  schemaVersion: z.literal(SCHEMA_VERSION),
  id: Id,
  meta: z.strictObject({ title: z.string().min(1).max(160) }),
  nodes: z.array(CollectionNodeSchema),
  /** Visual connections only; unlock rules decide what is available. */
  edges: z.array(z.strictObject({ from: Id, to: Id })).default([])
});
const ExportBundleSchema = z.strictObject({
  schemaVersion: z.literal(SCHEMA_VERSION),
  story: StorySchema,
  strings: z.record(LangCode, StringTableSchema),
  assets: AssetManifestSchema,
  characters: z.array(CharacterSchema).default([]),
  registry: FlagRegistrySchema.optional()
});
const StoryDocumentSchema = z.strictObject({
  story: StorySchema,
  strings: z.record(LangCode, StringTableSchema)
});
function newStoryDocument(id, title, lang = "en") {
  const strings = {
    schemaVersion: SCHEMA_VERSION,
    lang,
    entries: { t_scene1: title, t_s1: "" }
  };
  const story = StorySchema.parse({
    schemaVersion: SCHEMA_VERSION,
    id,
    meta: { title },
    languages: { source: lang, available: [lang] },
    scenes: [
      {
        id: "scene1",
        meta: { title, displayTitle: "t_scene1" },
        steps: [{ id: "s1", type: "narration", text: "t_s1" }]
      }
    ]
  });
  return { story, strings: { [lang]: strings } };
}
function eventResultFlag(step) {
  return step.resultFlag ?? `${step.id}_result`;
}
function* visitSteps(story) {
  for (let si = 0; si < story.scenes.length; si++) {
    const scene = story.scenes[si];
    for (let ti = 0; ti < scene.steps.length; ti++) {
      yield { step: scene.steps[ti], path: `scenes[${si}].steps[${ti}]`, sceneIndex: si };
    }
  }
}
function stepTextKeys(step) {
  switch (step.type) {
    case "narration":
    case "line":
      return [step.text];
    case "choice":
      return [...step.prompt ? [step.prompt] : [], ...step.options.map((o) => o.text)];
    case "sequence":
      return step.skipPromptKey ? [step.skipPromptKey] : [];
    default:
      return [];
  }
}
function stepStageRefs(step) {
  const who = [];
  const assets = [];
  if (step.type === "line") who.push(step.speaker);
  if ((step.type === "line" || step.type === "narration") && step.voice) assets.push(step.voice);
  for (const op of step.stage ?? []) {
    if (op.op === "enter" || op.op === "exit" || op.op === "expr") who.push(op.who);
    if (op.op === "bg" || op.op === "sfx" || op.op === "show") assets.push(op.asset);
    if (op.op === "music" && op.asset) assets.push(op.asset);
  }
  return { who, assets };
}
function stepConditions(step) {
  const out = [];
  if (step.when) out.push(step.when);
  if (step.type === "fork") {
    for (const r of step.routes) if (r.when) out.push(r.when);
  }
  if (step.type === "choice") {
    for (const o of step.options) if (o.when) out.push(o.when);
  }
  return out;
}
function stepSetFlags(step) {
  const out = [];
  if (step.type === "set") for (const op of step.set) out.push(op.flag);
  if (step.type === "choice")
    for (const o of step.options) for (const op of o.set ?? []) out.push(op.flag);
  if (step.type === "event") out.push(eventResultFlag(step));
  return out;
}
const uniqueSorted = (items) => [...new Set(items)].sort();
function deriveContract(story) {
  const local = new Set(Object.keys(story.flags));
  const implicit = /* @__PURE__ */ new Set();
  const reads = /* @__PURE__ */ new Set();
  const sets = /* @__PURE__ */ new Set();
  const exits = /* @__PURE__ */ new Set();
  const hostEvents = /* @__PURE__ */ new Set();
  const characters = /* @__PURE__ */ new Set();
  const assets = /* @__PURE__ */ new Set();
  for (const { step } of visitSteps(story)) {
    if (step.type === "event") {
      hostEvents.add(step.name);
      if (!step.resultFlag) implicit.add(eventResultFlag(step));
    }
  }
  const isShared = (flag) => !local.has(flag) && !implicit.has(flag);
  for (const scene of story.scenes)
    if (scene.when) {
      for (const f of conditionFlags(scene.when)) if (isShared(f)) reads.add(f);
    }
  for (const { step } of visitSteps(story)) {
    for (const c of stepConditions(step))
      for (const f of conditionFlags(c)) if (isShared(f)) reads.add(f);
    for (const f of stepSetFlags(step)) if (isShared(f)) sets.add(f);
    if (step.type === "end" && step.exit !== "done") exits.add(step.exit);
    const refs = stepStageRefs(step);
    refs.who.forEach((w) => characters.add(w));
    refs.assets.forEach((a) => assets.add(a));
  }
  for (const seq of Object.values(story.sequences)) {
    for (const item of seq.items) if ("src" in item && item.src) assets.add(item.src);
  }
  for (const scene of story.scenes)
    if (scene.meta.backgroundAsset) assets.add(scene.meta.backgroundAsset);
  return {
    exits: uniqueSorted(exits),
    reads: uniqueSorted(reads),
    sets: uniqueSorted(sets),
    hostEvents: uniqueSorted(hostEvents),
    characters: uniqueSorted(characters),
    assets: uniqueSorted(assets)
  };
}
const PERSISTENT_OPS = /* @__PURE__ */ new Set([
  "bg",
  "music",
  "enter",
  "exit",
  "expr",
  "show",
  "hide",
  "tone",
  "dim",
  "backdrop",
  "light",
  "clear"
]);
function validateStory(story, ctx = {}) {
  const issues = [];
  const add = (level, code, message, path) => issues.push({ level, code, message, path });
  const error = (code, message, path) => add("error", code, message, path);
  const warn = (code, message, path) => add("warning", code, message, path);
  const sceneIds = /* @__PURE__ */ new Set();
  story.scenes.forEach((scene, si) => {
    if (sceneIds.has(scene.id))
      error("duplicate-id", `Scene id "${scene.id}" is used more than once.`, `scenes[${si}]`);
    sceneIds.add(scene.id);
  });
  const stepIds = /* @__PURE__ */ new Set();
  const markIds = /* @__PURE__ */ new Set();
  for (const { step, path } of visitSteps(story)) {
    if (stepIds.has(step.id))
      error("duplicate-id", `Step id "${step.id}" is used more than once.`, path);
    stepIds.add(step.id);
    if (step.type === "mark") markIds.add(step.id);
  }
  story.scenes.forEach((scene, si) => {
    const labels = /* @__PURE__ */ new Set();
    scene.steps.forEach((step, ti) => {
      if (step.type !== "mark") return;
      const label = step.label.trim().toLowerCase();
      if (label && labels.has(label))
        warn(
          "duplicate-mark-label",
          `Two loop points in this scene are called "${step.label}".`,
          `scenes[${si}].steps[${ti}]`
        );
      labels.add(label);
    });
  });
  story.scenes.forEach((scene, si) => {
    const owner = /* @__PURE__ */ new Map();
    scene.steps.forEach((step, ti) => {
      if (step.type !== "fork") return;
      for (const route of step.routes) {
        if (owner.has(route.id))
          error(
            "duplicate-id",
            `Route id "${route.id}" is used more than once in the scene.`,
            `scenes[${si}].steps[${ti}]`
          );
        else owner.set(route.id, ti);
      }
    });
    scene.steps.forEach((step, ti) => {
      if (!step.inRoute) return;
      const at = owner.get(step.inRoute);
      const path = `scenes[${si}].steps[${ti}]`;
      if (at === void 0)
        error(
          "unknown-route",
          `Step "${step.id}" is in route "${step.inRoute}", which no fork has.`,
          path
        );
      else if (at >= ti)
        error("route-before-fork", `Step "${step.id}" comes before the fork of its route.`, path);
    });
  });
  const local = new Set(Object.keys(story.flags));
  const implicit = /* @__PURE__ */ new Set();
  for (const { step } of visitSteps(story))
    if (step.type === "event" && !step.resultFlag) implicit.add(eventResultFlag(step));
  const registry = new Set(Object.keys(ctx.registry?.flags ?? {}));
  const declaredShared = /* @__PURE__ */ new Set([...story.contract.reads, ...story.contract.sets]);
  const known = (flag) => local.has(flag) || implicit.has(flag) || registry.has(flag) || declaredShared.has(flag);
  for (const name of local) {
    if (registry.has(name)) {
      error(
        "flag-shadows-shared",
        `Local flag "${name}" has the same name as a shared flag in the workspace.`,
        `flags.${name}`
      );
    }
  }
  const characters = ctx.characters || story.characters.length > 0 ? new Map(mergeCharacters(ctx.characters ?? [], story.characters).map((c) => [c.id, c])) : void 0;
  const usedSequences = /* @__PURE__ */ new Set();
  const usedKeys = /* @__PURE__ */ new Set();
  const checkFlag = (flag, role, path) => {
    if (!known(flag)) {
      error(
        "unknown-flag",
        `Flag "${flag}" is not declared in the story, the workspace registry or the contract.`,
        path
      );
      return;
    }
    if (registry.has(flag) && !local.has(flag) && !implicit.has(flag)) {
      const list = role === "read" ? story.contract.reads : story.contract.sets;
      if (!list.includes(flag)) {
        warn(
          role === "read" ? "contract-reads-missing" : "contract-sets-missing",
          `Shared flag "${flag}" is ${role === "read" ? "read" : "set"} but not listed in the contract.`,
          path
        );
      }
    }
  };
  for (const key of [story.meta.titleKey, story.meta.summaryKey]) {
    if (key) usedKeys.add(key);
  }
  for (const scene of story.scenes) {
    for (const key of [scene.meta.displayTitle, scene.meta.displaySubtitle]) {
      if (key) usedKeys.add(key);
    }
  }
  const exitsOk = /* @__PURE__ */ new Set(["done", ...story.contract.exits]);
  const heldStarts = /* @__PURE__ */ new Map();
  const endedStarts = /* @__PURE__ */ new Set();
  for (const { step, path } of visitSteps(story)) {
    if (step.type === "sequence" && step.hold) heldStarts.set(step.id, path);
    if (step.type === "hold-end") {
      if (heldStarts.has(step.start)) endedStarts.add(step.start);
      else
        warn(
          "hold-end-without-start",
          `This end step has no held sequence before it (step "${step.start}").`,
          `${path}.start`
        );
    }
  }
  for (const [id, path] of heldStarts) {
    if (!endedStarts.has(id))
      warn("hold-never-ends", "This held sequence is never ended, so it stays to the end.", path);
  }
  const hiddenOf = /* @__PURE__ */ new Map();
  for (const { step } of visitSteps(story)) hiddenOf.set(step.id, step.hidden === true);
  for (const { step, path } of visitSteps(story)) {
    if (step.type !== "hold-end" || !heldStarts.has(step.start)) continue;
    if (hiddenOf.get(step.start) !== (step.hidden === true))
      warn(
        "hold-half-hidden",
        "A held sequence and its end step must both be hidden or both shown.",
        path
      );
  }
  for (const [si, scene] of story.scenes.entries()) {
    const open = [];
    for (const [ti, step] of scene.steps.entries()) {
      const path = `scenes[${si}].steps[${ti}]`;
      if (step.type === "autoplay-start") open.push(step);
      if (step.type === "autoplay-end") {
        const start = open.at(-1);
        if (!start || start.id !== step.start)
          warn(
            "autoplay-unpaired",
            "Autoplay end must follow its matching start in the same scene, without crossing another block.",
            path
          );
        else {
          open.pop();
          if (!!start.hidden !== !!step.hidden)
            warn(
              "autoplay-half-hidden",
              "Autoplay start and end must be hidden or shown together.",
              path
            );
          if (start.inRoute !== step.inRoute)
            warn("autoplay-route", "Autoplay start and end must belong to the same route.", path);
        }
      }
    }
    for (const start of open)
      warn(
        "autoplay-never-ends",
        "Autoplay start needs a matching end in this scene.",
        `scenes[${si}].steps[${scene.steps.indexOf(start)}]`
      );
  }
  const stageSetters = [...visitSteps(story)].filter(
    ({ step }) => step.hidden === true && (step.stage ?? []).some((op) => PERSISTENT_OPS.has(op.op))
  );
  if (stageSetters.length > 0)
    warn(
      "hidden-sets-stage",
      stageSetters.length === 1 ? "A hidden step sets up the stage, so the steps after it see a different stage." : `${stageSetters.length} hidden steps set up the stage, so the steps after them see a different stage.`,
      stageSetters[0].path
    );
  let faded = null;
  let lastPath = "";
  for (const { step, path } of visitSteps(story)) {
    lastPath = path;
    if (step.type === "transition" && !step.when) {
      const mode = step.mode ?? "through";
      if (mode === "out") faded = path;
      else {
        if (mode === "in" && faded === null)
          warn(
            "fade-in-without-out",
            "This fade in has no fade out before it, so it does nothing.",
            path
          );
        faded = null;
      }
    }
    if (step.type === "end" && faded !== null) {
      warn("ends-faded-out", "The story ends while the screen is still faded out.", path);
      faded = null;
    }
  }
  if (faded !== null)
    warn("ends-faded-out", "The story ends while the screen is still faded out.", lastPath);
  const triggeredIds = new Set(story.scenes.filter((sc) => sc.trigger).map((sc) => sc.id));
  story.scenes.forEach((scene, si) => {
    if (!scene.trigger) return;
    const own = new Set(scene.steps.filter((st) => st.type === "mark").map((st) => st.id));
    scene.steps.forEach((step, ti) => {
      const path = `scenes[${si}].steps[${ti}]`;
      if (step.type === "end")
        error(
          "end-in-triggered",
          "A scene the game starts has no Ending: it ends when it runs out of steps, or at a Leave scene step.",
          path
        );
      if (step.type === "event")
        error(
          "event-in-triggered",
          "A scene the game starts cannot hand over to the game: it has no game events.",
          path
        );
      if (step.type === "goto" && (step.scene !== void 0 || step.mark !== void 0 && !own.has(step.mark)))
        error(
          "goto-out-of-triggered",
          "A Go to step in a scene the game starts can only go to a loop point of the same scene.",
          path
        );
    });
  });
  story.scenes.forEach((scene, si) => {
    if (scene.trigger && scene.after)
      error(
        "triggered-after",
        'A scene the game starts has no "after": it ends when it runs out of steps.',
        `scenes[${si}].after`
      );
    if (scene.after && "scene" in scene.after && triggeredIds.has(scene.after.scene))
      error(
        "into-triggered",
        `The scene "${scene.after.scene}" is started by the game, so no scene can continue with it.`,
        `scenes[${si}].after`
      );
    if (scene.after && "scene" in scene.after && !sceneIds.has(scene.after.scene))
      warn(
        "unknown-scene",
        `The scene "${scene.after.scene}" that this scene continues with does not exist.`,
        `scenes[${si}].after`
      );
    if (!scene.when) return;
    for (const f of conditionFlags(scene.when)) checkFlag(f, "read", `scenes[${si}].when`);
    if (conditionUsesCompleted(scene.when))
      warn(
        "completed-in-story",
        '"completed" conditions only work in collections, not inside a story.',
        `scenes[${si}].when`
      );
  });
  const eventOutcomes = /* @__PURE__ */ new Map();
  for (const { step, path } of visitSteps(story))
    if (step.type === "event")
      eventOutcomes.set(eventResultFlag(step), { outcomes: step.outcomes, path });
  const readResults = /* @__PURE__ */ new Set();
  const checkOutcomes = (cond, path) => {
    if ("flag" in cond) {
      const event = eventOutcomes.get(cond.flag);
      if (!event) return;
      readResults.add(cond.flag);
      const asked = "is" in cond ? cond.is : "isNot" in cond ? cond.isNot : void 0;
      if (typeof asked === "string" && !event.outcomes.includes(asked))
        warn(
          "unknown-outcome",
          `"${cond.flag}" is never "${asked}": the event reports ${event.outcomes.map((o) => `"${o}"`).join(", ")}.`,
          path
        );
    } else if ("and" in cond) cond.and.forEach((c) => checkOutcomes(c, path));
    else if ("or" in cond) cond.or.forEach((c) => checkOutcomes(c, path));
    else if ("not" in cond) checkOutcomes(cond.not, path);
  };
  story.scenes.forEach((scene, si) => {
    if (scene.when) checkOutcomes(scene.when, `scenes[${si}].when`);
  });
  for (const { step, path } of visitSteps(story))
    for (const cond of stepConditions(step)) checkOutcomes(cond, `${path}.when`);
  for (const [flag, { outcomes, path }] of eventOutcomes)
    if (outcomes.length > 1 && !readResults.has(flag))
      warn(
        "event-result-unused",
        "Nothing in the story reads the result of this event, so every outcome plays the same.",
        path
      );
  for (const { step, path } of visitSteps(story)) {
    if (step.type === "goto") {
      if (step.scene !== void 0 && step.mark !== void 0)
        error("goto-target", "A Go to step has a scene or a loop point, not both.", path);
      else if (step.scene === void 0 && step.mark === void 0)
        warn("goto-target", "This Go to step has nowhere to go.", path);
      else if (step.scene !== void 0 && !sceneIds.has(step.scene))
        warn("unknown-scene", `The scene "${step.scene}" this step goes to does not exist.`, path);
      else if (step.scene !== void 0 && triggeredIds.has(step.scene))
        error(
          "into-triggered",
          `The scene "${step.scene}" is started by the game, so a Go to step cannot go to it.`,
          path
        );
      else if (step.mark !== void 0 && !markIds.has(step.mark))
        warn("unknown-mark", "The loop point this step goes back to does not exist.", path);
    }
    if (step.type === "leave" && step.from === "fork" && !step.inRoute)
      warn("leave-fork-outside", "Leave fork does nothing outside a fork route.", path);
    for (const cond of stepConditions(step)) {
      for (const f of conditionFlags(cond)) checkFlag(f, "read", `${path}.when`);
      if (conditionUsesCompleted(cond)) {
        warn(
          "completed-in-story",
          '"completed" conditions only work in collections, not inside a story.',
          `${path}.when`
        );
      }
    }
    for (const f of stepSetFlags(step)) checkFlag(f, "set", path);
    if (step.type === "sequence") {
      usedSequences.add(step.ref);
      if (!(step.ref in story.sequences))
        error("unknown-sequence", `Sequence "${step.ref}" is not defined.`, `${path}.ref`);
    }
    if (step.type === "event") {
      if (!step.outcomes.includes(step.default)) {
        error(
          "bad-default-outcome",
          `Default outcome "${step.default}" is not one of the outcomes.`,
          `${path}.default`
        );
      }
      if (new Set(step.outcomes).size !== step.outcomes.length) {
        error("duplicate-outcome", "Outcomes must be unique.", `${path}.outcomes`);
      }
    }
    if (step.type === "choice") {
      const optionIds = /* @__PURE__ */ new Set();
      step.options.forEach((o, i) => {
        if (optionIds.has(o.id))
          error(
            "duplicate-id",
            `Option id "${o.id}" is used more than once.`,
            `${path}.options[${i}]`
          );
        optionIds.add(o.id);
      });
    }
    if (step.type === "end" && !exitsOk.has(step.exit)) {
      error(
        "unknown-exit",
        `Exit "${step.exit}" is not "done" or listed in the contract.`,
        `${path}.exit`
      );
    }
    for (const key of stepTextKeys(step)) {
      usedKeys.add(key);
      if (ctx.strings && !(key in ctx.strings.entries)) {
        error(
          "missing-string",
          `String "${key}" is missing from the ${ctx.strings.lang} table.`,
          path
        );
      }
    }
    const refs = stepStageRefs(step);
    if (characters && !step.hidden) {
      for (const who of refs.who) {
        if (!characters.has(who))
          error(
            "unknown-character",
            `Character "${who}" is neither in the workspace nor in the story.`,
            path
          );
      }
      const exprChecks = [];
      if (step.type === "line") exprChecks.push([step.speaker, step.expr]);
      for (const op of step.stage ?? []) {
        if (op.op === "enter" || op.op === "expr") exprChecks.push([op.who, op.expr]);
      }
      const bigPictures = [];
      if (step.type === "line" && (step.portrait?.picture === "temporary" || step.portrait?.picture === "stage"))
        bigPictures.push([step.speaker, step.expr]);
      for (const op of step.stage ?? []) if (op.op === "enter") bigPictures.push([op.who, op.expr]);
      for (const [who, expr] of bigPictures) {
        const ch = characters.get(who);
        if (ch && !stageArtOf(ch, expr))
          warn(
            "no-stage-picture",
            `Character "${who}" has no stage picture${expr ? ` for "${expr}"` : ""}, so a placeholder is drawn.`,
            path
          );
      }
      for (const [who, expr] of exprChecks) {
        const ch = characters.get(who);
        const known2 = ch ? expressionNames(ch) : [];
        if (ch && expr && known2.length > 0 && !known2.includes(expr)) {
          warn("unknown-expression", `Character "${who}" has no expression "${expr}".`, path);
        }
      }
    }
    if (ctx.assets && !step.hidden) {
      for (const a of refs.assets) {
        if (!(a in ctx.assets.assets))
          warn(
            "unresolved-asset",
            `Asset "${a}" is not in the asset manifest (placeholder).`,
            path
          );
      }
    }
  }
  if (ctx.assets) {
    story.scenes.forEach((scene, si) => {
      const a = scene.meta.backgroundAsset;
      if (a && !(a in ctx.assets.assets))
        warn(
          "unresolved-asset",
          `Asset "${a}" is not in the asset manifest (placeholder).`,
          `scenes[${si}].meta.backgroundAsset`
        );
    });
  }
  for (const [id, seq] of Object.entries(story.sequences)) {
    if (!usedSequences.has(id))
      warn("unused-sequence", `Sequence "${id}" is never played.`, `sequences.${id}`);
    seq.items.forEach((item, i) => {
      const p = `sequences.${id}.items[${i}]`;
      if (item.type === "text") {
        usedKeys.add(item.textKey);
        if (ctx.strings && !(item.textKey in ctx.strings.entries))
          error(
            "missing-string",
            `String "${item.textKey}" is missing from the ${ctx.strings.lang} table.`,
            p
          );
      }
      if ((item.type === "image" || item.type === "text" || item.type === "video" || item.type === "color") && item.endTime !== void 0 && item.endTime <= item.startTime) {
        error("bad-timing", "endTime must be after startTime.", p);
      }
      if ("animation" in item && item.animation) {
        const length = "endTime" in item && item.endTime !== void 0 ? item.endTime - item.startTime : void 0;
        for (const [track, frames] of Object.entries(item.animation)) {
          const times = frames.map((k) => k.t);
          const sorted = times.every((t, n) => n === 0 || t > times[n - 1]);
          if (!sorted)
            error(
              "bad-keyframes",
              `Keyframes of "${track}" must be in time order, one per time.`,
              `${p}.animation.${track}`
            );
          if (length !== void 0 && times.some((t) => t > length))
            warn(
              "keyframe-after-end",
              `A keyframe of "${track}" is after the item ends and is never reached.`,
              `${p}.animation.${track}`
            );
        }
      }
      if ("src" in item && item.src === "")
        warn("placeholder-asset", "Item has no asset linked yet.", p);
      if ("src" in item && item.src && ctx.assets && !(item.src in ctx.assets.assets)) {
        warn(
          "unresolved-asset",
          `Asset "${item.src}" is not in the asset manifest (placeholder).`,
          p
        );
      }
    });
  }
  if (ctx.strings) {
    for (const key of Object.keys(ctx.strings.entries)) {
      if (!usedKeys.has(key))
        warn("unused-string", `String "${key}" is not used by any step.`, `strings.${key}`);
    }
  }
  const derived = deriveContract(story);
  const missing = (declared, needed) => needed.filter((n) => !declared.includes(n));
  for (const [field, code] of [
    ["hostEvents", "contract-host-events-missing"],
    ["characters", "contract-characters-missing"]
  ]) {
    const gap = missing(story.contract[field], derived[field]);
    if (gap.length)
      warn(code, `Contract.${field} is missing: ${gap.join(", ")}.`, `contract.${field}`);
  }
  return issues;
}
const hasErrors = (issues) => issues.some((i) => i.level === "error");
export {
  CharacterSchema as $,
  StepSchema as A,
  StageOpSchema as B,
  ASSET_KINDS as C,
  DEFAULT_SCENE_TITLE_GAP_MS as D,
  ASSET_ORIGIN_KINDS as E,
  ASSET_PREFIX as F,
  ASSET_ROLES as G,
  AnimationSchema as H,
  AssetEntrySchema as I,
  AssetKey as J,
  AssetKind as K,
  AssetManifestSchema as L,
  AssetRefOrEmpty as M,
  AutoplayEndStepSchema as N,
  AutoplaySettingsSchema as O,
  AutoplayStartStepSchema as P,
  BACKGROUND_PRESETS as Q,
  BG_STYLES as R,
  SCHEMA_VERSION as S,
  BORDER_PRESETS as T,
  BRIGHTNESS_MAX as U,
  BRIGHTNESS_MIN as V,
  BgStyleSchema as W,
  BoxStyleSchema as X,
  CORNERS as Y,
  CharacterFitSchema as Z,
  CharacterHeadSchema as _,
  DEFAULT_SCENE_FADE_MS as a,
  NarrationPresentationSchema as a$,
  ChoiceOptionSchema as a0,
  ChoiceStepSchema as a1,
  CollectionNodeSchema as a2,
  CollectionSchema as a3,
  ConditionSchema as a4,
  ContractSchema as a5,
  CornersSchema as a6,
  DEFAULT_AUTOPLAY_DELAY_MS as a7,
  DEFAULT_HEAD as a8,
  DEFAULT_LINE_PRESENTATION as a9,
  ForkRouteSchema as aA,
  ForkStepSchema as aB,
  GRAPHIC_BLEND_MODES as aC,
  GotoStepSchema as aD,
  GraphicAppearanceSchema as aE,
  GraphicSizeSchema as aF,
  HexColor as aG,
  HoldEndStepSchema as aH,
  IMAGE_FOCUS as aI,
  IMAGE_SIZE as aJ,
  IMAGE_WIDTHS as aK,
  Id as aL,
  ImageFitSchema as aM,
  ImageFocusSchema as aN,
  ImageMotionSchema as aO,
  LINE_ENTRANCES as aP,
  LINE_MODES as aQ,
  LangCode as aR,
  LeaveStepSchema as aS,
  LineEntranceSchema as aT,
  LinePortraitSchema as aU,
  LinePresentationSchema as aV,
  LineStepSchema as aW,
  MAX_DIM_EXTRA as aX,
  MarkStepSchema as aY,
  NARRATION_MODES as aZ,
  NameTagStyleSchema as a_,
  DEFAULT_NAME_TAG as aa,
  DEFAULT_NARRATION_PRESENTATION as ab,
  DEFAULT_PORTRAIT_SETTINGS as ac,
  DEFAULT_STYLES as ad,
  DEFAULT_TEXT_SPEED as ae,
  DEFAULT_TEXT_STYLE as af,
  DEFAULT_TRIGGER_PRESENTATION as ag,
  DelayStepSchema as ah,
  DialogPlaybackSchema as ai,
  DurationMs as aj,
  EASINGS as ak,
  EFFECT_NAMES as al,
  EFFECT_SPECS as am,
  EXPR_CHANGES as an,
  EasingSchema as ao,
  EffectName as ap,
  EndStepSchema as aq,
  EventStepSchema as ar,
  ExportBundleSchema as as,
  ExprChangeSchema as at,
  FACE_SIDES as au,
  FaceSideSchema as av,
  FlagDeclSchema as aw,
  FlagName as ax,
  FlagRegistrySchema as ay,
  FlagValue as az,
  DEFAULT_SCENE_GAP_MS as b,
  TransitionStepSchema as b$,
  NarrationStepSchema as b0,
  PORTRAIT_ANIMATIONS as b1,
  PORTRAIT_IF_TAKEN as b2,
  PORTRAIT_LAYERS as b3,
  PORTRAIT_PICTURES as b4,
  PORTRAIT_POSITIONS as b5,
  PORTRAIT_SHOWS as b6,
  PORTRAIT_TONES as b7,
  PortraitAnimationSchema as b8,
  PortraitCropSchema as b9,
  SpriteSheetSchema as bA,
  StoryDocumentSchema as bB,
  StorySettingsSchema as bC,
  StringEntrySchema as bD,
  StringKey as bE,
  StringTableSchema as bF,
  TAG_BACKGROUND_PRESETS as bG,
  TAG_BORDER_PRESETS as bH,
  TEXT_ALIGNMENTS as bI,
  TEXT_POSITIONS as bJ,
  TEXT_PRESETS as bK,
  TEXT_SPEEDS as bL,
  TEXT_SPEED_CPS as bM,
  TEXT_STYLES as bN,
  TONE_LOOK as bO,
  TONE_MOODS as bP,
  TRANSITION_CHANNELS as bQ,
  TRANSITION_DEFAULTS as bR,
  TRANSITION_MODES as bS,
  TRIGGER_PRESENTATIONS as bT,
  TextPositionSchema as bU,
  TextSpeedSchema as bV,
  TextStyleSchema as bW,
  ThemeSchema as bX,
  ToneMood as bY,
  TransitionChannelSchema as bZ,
  TransitionModeSchema as b_,
  PortraitIfTakenSchema as ba,
  PortraitLayerSchema as bb,
  PortraitPictureSchema as bc,
  PortraitSettingsSchema as bd,
  PortraitShowSchema as be,
  PortraitToneSchema as bf,
  Pos as bg,
  PresentationDefaultsSchema as bh,
  ROLE_MEDIA as bi,
  ROLE_PREFIX as bj,
  SCENE_CARD_MIN_MS as bk,
  SCENE_STARTS as bl,
  SLOTS as bm,
  SPEAKER_BADGES as bn,
  SceneSchema as bo,
  SceneStartSchema as bp,
  SequenceDefaultsSchema as bq,
  SequenceIdSchema as br,
  SequenceSchema as bs,
  SequenceStepSchema as bt,
  SetOpSchema as bu,
  SetStepSchema as bv,
  Size as bw,
  Slot as bx,
  SpeakerBadgeSchema as by,
  Speed as bz,
  DEFAULT_SCENE_TITLE_MS as c,
  TriggerPresentationSchema as c0,
  TriggerSchema as c1,
  UPLOAD_ACCEPT as c2,
  UPLOAD_ACCEPT_ALL as c3,
  UPLOAD_MAX_BYTES as c4,
  UPLOAD_TYPES as c5,
  Unit as c6,
  VIDEO_WARN_BYTES as c7,
  assetSlugFromName as c8,
  automaticLineMode as c9,
  parseByteRange as cA,
  patchNarrationPresentation as cB,
  portraitOf as cC,
  presentationForNewStep as cD,
  publicCharacter as cE,
  renameAssetRefs as cF,
  resolveBoxStyle as cG,
  resolveEffect as cH,
  resolveNameTag as cI,
  resolvePortraitEmphasis as cJ,
  snapImageWidth as cK,
  sniffUploadType as cL,
  spriteCell as cM,
  spriteFrame as cN,
  spriteFrameRect as cO,
  spriteStartOffset as cP,
  stageArtOf as cQ,
  stagePictureOf as cR,
  storyScenes as cS,
  toneLookFor as cT,
  transitionLength as cU,
  translationEntry as cV,
  triggeredScenes as cW,
  characterFullName as ca,
  characterIdFromName as cb,
  collectAssetRoles as cc,
  conditionFlags as cd,
  conditionUsesCompleted as ce,
  cpsOf as cf,
  effectSettingsShape as cg,
  effectiveWhen as ch,
  expressionNames as ci,
  extractMarkupTags as cj,
  faceOf as ck,
  findMissingTranslations as cl,
  findStaleTranslations as cm,
  fitOf as cn,
  forEachAssetRef as co,
  forkBlockEnd as cp,
  formatAssetOriginRequest as cq,
  hashText as cr,
  headOf as cs,
  isAssetPrefix as ct,
  isAssetRole as cu,
  lineModeIsAutomatic as cv,
  markupMatches as cw,
  mergeCharacters as cx,
  newStoryDocument as cy,
  parseAssetOriginRequest as cz,
  DEFAULT_SCENE_START as d,
  applyRoutes as e,
  routeChain as f,
  resolveTransition as g,
  resolveAutoplaySettings as h,
  DEFAULT_PORTRAIT_POSITION as i,
  eventResultFlag as j,
  hasErrors as k,
  leaveTarget as l,
  resolvePortraitSettings as m,
  showsDialog as n,
  resolveDialogPlayback as o,
  resolveLinePresentation as p,
  resolveNarrationPresentation as q,
  routeIndex as r,
  showsStage as s,
  triggerPresentation as t,
  textOf as u,
  validateStory as v,
  nameForLanguage as w,
  StorySchema as x,
  deriveContract as y,
  SequenceItemSchema as z
};
