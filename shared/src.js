import { z } from "zod";
//#region ../schema/src/common.ts
/** Current story/strings/collection format version. Bump with a migration in migrate.ts. */
var SCHEMA_VERSION = 1;
/** Stable identifier for scenes, steps, characters, sequences, string keys, event names, exits. */
var Id = z.string().regex(/^[A-Za-z][A-Za-z0-9_-]{0,63}$/, "must start with a letter and use only letters, digits, _ or -");
/** Key into a language string table. */
var StringKey = Id;
/** Workspace asset key (a slug, resolved to a file by the host). Lower case only, so "Cathedral" and "cathedral" can never be two assets. */
var AssetKey = z.string().regex(/^[a-z0-9][a-z0-9_./-]{0,127}$/, "asset keys use lower-case letters, digits, _ . / -");
/** Asset reference that may be empty: an empty string is an unlinked placeholder. */
var AssetRefOrEmpty = z.union([z.literal(""), AssetKey]);
/** Flag name. Dots allow namespacing, e.g. "monk.trusted". */
var FlagName = z.string().regex(/^[A-Za-z][A-Za-z0-9_.-]{0,63}$/, "flag names start with a letter; letters, digits, _ . - allowed");
var FlagValue = z.union([
	z.boolean(),
	z.number(),
	z.string()
]);
/** BCP-47-ish language tag: "en", "zh", "zh-Hans", "pt-BR". */
var LangCode = z.string().regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, "use a language tag such as en or zh-Hans");
/** Named stage positions for portraits and objects. */
var SLOTS = [
	"far-left",
	"left",
	"center",
	"right",
	"far-right"
];
var Slot = z.enum(SLOTS);
/** Free position on the 16:9 stage, normalized 0-1 (origin top-left). */
var Pos = z.strictObject({
	x: z.number().min(0).max(1),
	y: z.number().min(0).max(1),
	scale: z.number().positive().max(10).optional()
});
/** A color as #rrggbb. */
var HexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "use a color written as #rrggbb, such as #000000");
var DurationMs = z.number().int().min(0).max(6e5);
var Unit = z.number().min(0).max(1);
//#endregion
//#region ../schema/src/conditions.ts
var ConditionSchema = z.lazy(() => z.union([
	z.strictObject({
		flag: FlagName,
		is: FlagValue
	}),
	z.strictObject({
		flag: FlagName,
		isNot: FlagValue
	}),
	z.strictObject({
		flag: FlagName,
		gt: z.number()
	}),
	z.strictObject({
		flag: FlagName,
		gte: z.number()
	}),
	z.strictObject({
		flag: FlagName,
		lt: z.number()
	}),
	z.strictObject({
		flag: FlagName,
		lte: z.number()
	}),
	z.strictObject({ completed: Id }),
	z.strictObject({ and: z.array(ConditionSchema).min(1) }),
	z.strictObject({ or: z.array(ConditionSchema).min(1) }),
	z.strictObject({ not: ConditionSchema })
]));
/** Operation that changes a flag. */
var SetOpSchema = z.union([z.strictObject({
	flag: FlagName,
	to: FlagValue
}), z.strictObject({
	flag: FlagName,
	add: z.number()
})]);
/** Every flag name a condition reads. */
function conditionFlags(cond, out = /* @__PURE__ */ new Set()) {
	if ("flag" in cond) out.add(cond.flag);
	else if ("and" in cond) cond.and.forEach((c) => conditionFlags(c, out));
	else if ("or" in cond) cond.or.forEach((c) => conditionFlags(c, out));
	else if ("not" in cond) conditionFlags(cond.not, out);
	return out;
}
/** True if the condition (or any nested one) uses `completed`. */
function conditionUsesCompleted(cond) {
	if ("completed" in cond) return true;
	if ("and" in cond) return cond.and.some(conditionUsesCompleted);
	if ("or" in cond) return cond.or.some(conditionUsesCompleted);
	if ("not" in cond) return conditionUsesCompleted(cond.not);
	return false;
}
//#endregion
//#region ../schema/src/effects.ts
/** Screen effects, taken from the prototype editors (see docs/PROTOTYPES.md). */
var EFFECT_NAMES = [
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
var EffectName = z.enum(EFFECT_NAMES);
/** Rate multiplier: 1 is the normal pace, 2 twice as fast. */
var Speed = z.number().min(.1).max(5);
/** Scale multiplier for the effect's elements (drop length, flake size, glow spread...). 1 is normal. */
var Size = z.number().min(.1).max(5);
/**
* The settings every effect can carry, in a stage `effect` operation and in a sequence `effect` item.
* Which of them an effect actually honours is listed in EFFECT_SPECS, which is also what the editor
* builds its controls from. Settings an effect does not use are ignored, never an error.
*/
var effectSettingsShape = {
	/** How long it lasts, in ms. Defaults per effect (see EFFECT_SPECS). */
	durationMs: DurationMs.optional(),
	/** Strength, 0-1: how far the shake moves, how dense the rain is, how dark the vignette. */
	intensity: Unit.optional(),
	/** Pace multiplier: shake frequency, fall speed, flicker rate. */
	speed: Speed.optional(),
	/** Element size multiplier: streak length, flake size, glow spread. */
	size: Size.optional()
};
var strength = (label, def) => ({
	label,
	min: 0,
	max: 1,
	step: .05,
	default: def
});
var speed = (label = "Speed") => ({
	label,
	min: .25,
	max: 4,
	step: .05,
	default: 1
});
var size = (label) => ({
	label,
	min: .25,
	max: 4,
	step: .05,
	default: 1
});
/** What each effect supports. The single source of truth for hosts and for the editor's controls. */
var EFFECT_SPECS = {
	shake: {
		label: "Shake",
		defaultDurationMs: 700,
		params: {
			intensity: strength("Strength", .7),
			speed: speed("Shakes per second")
		}
	},
	"flash-white": {
		label: "White flash",
		defaultDurationMs: 400,
		params: { intensity: strength("Brightness", .9) }
	},
	"flash-red": {
		label: "Red flash",
		defaultDurationMs: 500,
		params: { intensity: strength("Brightness", .8) }
	},
	zoom: {
		label: "Zoom pulse",
		defaultDurationMs: 1200,
		params: { intensity: strength("How far", .6) }
	},
	blur: {
		label: "Blur",
		defaultDurationMs: 1500,
		params: { intensity: strength("Amount", .6) }
	},
	glitch: {
		label: "Glitch",
		defaultDurationMs: 700,
		params: {
			intensity: strength("Strength", .7),
			speed: speed("Glitch rate")
		}
	},
	"fade-black": {
		label: "Fade to black",
		defaultDurationMs: 2e3,
		params: {}
	},
	rain: {
		label: "Rain",
		defaultDurationMs: 5e3,
		params: {
			intensity: strength("Visibility", .7),
			speed: speed("Fall speed"),
			size: size("Drop length")
		}
	},
	snow: {
		label: "Snow",
		defaultDurationMs: 5e3,
		params: {
			intensity: strength("Visibility", .8),
			speed: speed("Fall speed"),
			size: size("Flake size")
		}
	},
	embers: {
		label: "Embers",
		defaultDurationMs: 5e3,
		params: {
			intensity: strength("Visibility", .8),
			speed: speed("Rise speed"),
			size: size("Ember size")
		}
	},
	"dream-glow": {
		label: "Dream glow",
		defaultDurationMs: 4e3,
		params: {
			intensity: strength("Glow", .7),
			speed: speed("Pulse rate"),
			size: size("Spread")
		}
	},
	"old-film": {
		label: "Old film",
		defaultDurationMs: 6e3,
		params: {
			intensity: strength("Grain", .7),
			speed: speed("Flicker rate")
		}
	},
	vignette: {
		label: "Vignette",
		defaultDurationMs: 3e3,
		params: {
			intensity: strength("Darkness", .85),
			size: size("Reach")
		}
	}
};
/**
* Fill in an effect's missing settings from its spec. Every host should call this so that "no value"
* means the same thing everywhere. Settings an effect does not support resolve to 1 (speed, size)
* or 0.7 (intensity) and are ignored by the host.
*/
function resolveEffect(op) {
	const spec = EFFECT_SPECS[op.name];
	return {
		name: op.name,
		durationMs: op.durationMs ?? spec.defaultDurationMs,
		intensity: op.intensity ?? spec.params.intensity?.default ?? .7,
		speed: op.speed ?? spec.params.speed?.default ?? 1,
		size: op.size ?? spec.params.size?.default ?? 1
	};
}
//#endregion
//#region ../schema/src/portrait.ts
/**
* How character portraits are shown. A speaker's small **dialog portrait** shows in the dialog box; a large **stage portrait**
* is something the author asks for, per line (see `LinePortraitSchema`).
*/
/** Which kinds of portrait a story shows. `both` is the default. */
var PORTRAIT_SHOWS = [
	"both",
	"stage",
	"dialog",
	"none"
];
var PortraitShowSchema = z.enum(PORTRAIT_SHOWS);
/**
* What a story shows by default when someone speaks. A stage portrait that the author asks for (a line's own choice, or
* a stage change that puts someone on stage) shows whatever the story says.
*/
var showsStage = (show) => show === "both" || show === "stage";
var showsDialog = (show) => show === "both" || show === "dialog";
/** Which side of the dialog box the face sits on. `follow` puts it on the side the speaker stands on. */
var FACE_SIDES = [
	"left",
	"right",
	"follow"
];
var FaceSideSchema = z.enum(FACE_SIDES);
/** How much the non-speakers on stage are toned down while someone speaks. */
var PORTRAIT_TONES = [
	"off",
	"subtle",
	"strong"
];
var PortraitToneSchema = z.enum(PORTRAIT_TONES);
/** How a portrait arrives and leaves: appears at once, fades, or slides in from the side while fading. */
var PORTRAIT_ANIMATIONS = [
	"cut",
	"fade",
	"slide"
];
var PortraitAnimationSchema = z.enum(PORTRAIT_ANIMATIONS);
/** The story-level choices. Every field is optional; no value means the default. */
var PortraitSettingsSchema = z.strictObject({
	show: PortraitShowSchema.optional(),
	faceSide: FaceSideSchema.optional(),
	tone: PortraitToneSchema.optional(),
	/** Independent non-speaker darkening; absent follows the legacy tone setting. */
	dim: PortraitToneSchema.optional(),
	/** Shrink non-speakers independently of darkening. Off by default. */
	shrink: z.boolean().optional(),
	animation: PortraitAnimationSchema.optional()
});
/** New emphasis controls are resolved separately while older renderers still consume `tone`. */
function resolvePortraitEmphasis(own) {
	return {
		dim: own?.dim ?? own?.tone ?? "subtle",
		shrink: own?.shrink ?? false
	};
}
var DEFAULT_PORTRAIT_SETTINGS = {
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
/** What toning down does to a portrait that is not speaking: brightness, color and how far it steps back. */
var TONE_LOOK = {
	subtle: {
		brightness: .8,
		saturate: 1,
		scale: 1
	},
	strong: {
		brightness: .55,
		saturate: .7,
		scale: .96
	}
};
/** The most a character can add to the story's dimming of non-speakers. */
var MAX_DIM_EXTRA = .5;
/** However dim the story and a character together ask for, a picture never goes darker than this. */
var MAX_DIMMING = .9;
/**
* How one non-speaking portrait is toned down: the story's level, plus the character's own extra darkening on top.
* `off` tones nothing down whatever the extra; the extra is relative to the story's level, not a replacement.
*/
function toneLookFor(level, extra = 0) {
	if (level === "off") return {
		brightness: 1,
		saturate: 1,
		scale: 1
	};
	const look = TONE_LOOK[level];
	return {
		...look,
		brightness: 1 - Math.min(MAX_DIMMING, 1 - look.brightness + extra)
	};
}
/**
* What a line does with the speaker's large picture.
* - `face`: nothing; only the face in the dialog box (a voice from off-stage). Hidden.
* - `temporary`: a large picture for this line only. The default, when the speaker has a picture to show.
* - `stage`: put the speaker on stage, where they stay until taken off or replaced.
* - `leave`: the speaker, if on stage, speaks this line and then leaves.
*/
var PORTRAIT_PICTURES = [
	"face",
	"temporary",
	"stage",
	"leave"
];
var PortraitPictureSchema = z.enum(PORTRAIT_PICTURES);
/**
* Where a portrait is drawn among the others on stage. Without a choice the speaker is in front and the rest stand
* in the order they arrived; `back` and `front` keep a portrait behind or in front of everyone else.
*/
var PORTRAIT_LAYERS = ["back", "front"];
var PortraitLayerSchema = z.enum(PORTRAIT_LAYERS);
/** What to do when the position a portrait wants already holds someone. */
var PORTRAIT_IF_TAKEN = ["replace", "share"];
var PortraitIfTakenSchema = z.enum(PORTRAIT_IF_TAKEN);
/** A line's portrait choices. Every field is optional; an absent one means "automatic". */
var LinePortraitSchema = z.strictObject({
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
/** The three positions the editor offers. The schema keeps the older far-left and far-right for existing stories. */
var PORTRAIT_POSITIONS = [
	"left",
	"center",
	"right"
];
var DEFAULT_PORTRAIT_POSITION = "left";
//#endregion
//#region ../schema/src/stage.ts
/** Scene mood presets, taken from the prototype editors. */
var TONE_MOODS = [
	"dawn",
	"day",
	"dusk",
	"night",
	"storm",
	"dream"
];
var ToneMood = z.enum(TONE_MOODS);
/**
* How a new background replaces the old one. `fade` is the cross-fade (the default, so older stories do not change),
* `cut` swaps at once and `blur` dissolves through a soft focus. Only the background follows the style.
*/
var BG_STYLES = [
	"fade",
	"cut",
	"blur"
];
var BgStyleSchema = z.enum(BG_STYLES);
/**
* A stage operation changes what is on screen. The engine folds these over the steps to compute the
* stage at any step, so save/load, skip and "preview from here" all work from one mechanism.
* Things stay on stage until changed or removed.
*/
/** A brightness multiplier. 1 is the picture as drawn; the bounds keep a picture from going black or burning out. */
var BRIGHTNESS_MIN = .25;
var BRIGHTNESS_MAX = 2;
var Brightness = z.number().min(BRIGHTNESS_MIN).max(2);
var StageOpSchema = z.discriminatedUnion("op", [
	z.strictObject({
		op: z.literal("bg"),
		asset: AssetKey,
		fadeMs: DurationMs.optional(),
		style: BgStyleSchema.optional()
	}),
	z.strictObject({
		op: z.literal("music"),
		asset: AssetKey.nullable(),
		fadeMs: DurationMs.optional(),
		volume: Unit.optional()
	}),
	z.strictObject({
		op: z.literal("sfx"),
		asset: AssetKey,
		volume: Unit.optional()
	}),
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
	z.strictObject({
		op: z.literal("expr"),
		who: Id,
		expr: z.string().max(64)
	}),
	z.strictObject({
		op: z.literal("show"),
		id: Id,
		asset: AssetKey,
		slot: Slot.optional(),
		pos: Pos.optional(),
		layer: z.enum(["back", "front"]).optional(),
		fadeMs: DurationMs.optional()
	}),
	z.strictObject({
		op: z.literal("hide"),
		id: Id,
		fadeMs: DurationMs.optional()
	}),
	z.strictObject({
		op: z.literal("effect"),
		name: EffectName,
		...effectSettingsShape
	}),
	z.strictObject({
		op: z.literal("tone"),
		mood: ToneMood,
		fadeMs: DurationMs.optional()
	}),
	z.strictObject({
		op: z.literal("dim"),
		amount: Unit
	}),
	z.strictObject({
		op: z.literal("backdrop"),
		brightness: Brightness.optional(),
		blur: Unit.optional()
	}),
	z.strictObject({
		op: z.literal("light"),
		who: Id,
		brightness: Brightness
	}),
	z.strictObject({
		op: z.literal("clear"),
		what: z.enum([
			"portraits",
			"objects",
			"all"
		]),
		/** How the portraits leave; absent follows the story. */
		animation: PortraitAnimationSchema.optional(),
		/** `before`: the portraits leave first and the step's text shows after. Absent (`with`): both happen together. */
		when: z.enum(["with", "before"]).optional()
	})
]);
//#endregion
//#region ../schema/src/sequence.ts
var Time = DurationMs;
var Position = z.union([Slot, Pos]);
/**
* A sequence is a short, self-contained animated beat: a flat list of timed items with absolute
* times in milliseconds. `src: ""` is an unlinked placeholder (what AI-generated data starts as).
* Visuals are a pure function of time so the editor can scrub; audio is scheduled separately.
*/
/** Which part of an image stays in view when it is cropped to fit: a 3 by 3 grid of points, centered by default. */
var IMAGE_FOCUS = [
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
var ImageFocusSchema = z.enum(IMAGE_FOCUS);
var ImageFitSchema = z.enum(["cover", "contain"]);
/** How an image arrives or leaves: it fades (the default), or slides in from / out to an edge of the picture. */
var ImageMotionSchema = z.enum([
	"fade",
	"left",
	"right",
	"top",
	"bottom"
]);
/** How a value changes over the segment that starts at a keyframe. More names can be added without a schema change. */
var EASINGS = [
	"linear",
	"in",
	"out",
	"inOut"
];
var EasingSchema = z.enum(EASINGS);
/** A keyframe: `t` is ms after the item's own start, so moving the item moves its animation with it. */
var keyframes = (min, max) => z.array(z.strictObject({
	t: DurationMs,
	value: z.number().min(min).max(max),
	/** Shapes the segment that starts at this keyframe. Omitted means linear. */
	ease: EasingSchema.optional()
})).max(200);
/**
* Keyframe animation of a visual item. Every track adds to the item's own place, size and fade: x and y in frame
* widths and heights, scale as a multiplier (1 is as is), rotation in degrees, opacity as a multiplier (0 to 1).
* Before the first keyframe and after the last the value holds; a track with no keyframes does nothing.
*/
var AnimationSchema = z.strictObject({
	x: keyframes(-5, 5).optional(),
	y: keyframes(-5, 5).optional(),
	scale: keyframes(0, 8).optional(),
	/** Only when width and height scale apart; otherwise `scale` applies to both. */
	scaleY: keyframes(0, 8).optional(),
	rotation: keyframes(-3600, 3600).optional(),
	opacity: keyframes(0, 1).optional()
});
/**
* Layer switches on pictures, text, video and color. `locked` keeps the editor from picking or moving the layer, so
* clicks reach the ones behind it; `hidden` leaves it out of the frame, in the editor and the player, without
* deleting it. Both are absent when off.
*/
var layerFlags = {
	locked: z.literal(true).optional(),
	hidden: z.literal(true).optional()
};
var SequenceItemSchema = z.discriminatedUnion("type", [
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
		scale: z.number().min(.1).max(4).optional(),
		/** A full-screen picture moved from the center, in frame widths and heights. Omitted means centered. */
		offset: z.strictObject({
			x: z.number().min(-1).max(1),
			y: z.number().min(-1).max(1)
		}).optional(),
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
		scale: z.number().min(.1).max(4).optional(),
		/** A full-screen video moved from the center, in frame widths and heights. Omitted means centered. */
		offset: z.strictObject({
			x: z.number().min(-1).max(1),
			y: z.number().min(-1).max(1)
		}).optional(),
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
		align: z.enum([
			"left",
			"center",
			"right"
		]).optional(),
		font: z.enum(["serif", "sans"]).optional(),
		bold: z.boolean().optional(),
		italic: z.boolean().optional(),
		/** The soft shadow behind the letters. Omitted means on; false turns it off. */
		shadow: z.boolean().optional(),
		/** Letter size as a share of the frame width, in percent. Omitted means 4. */
		size: z.number().min(.5).max(30).optional(),
		color: HexColor.optional(),
		fadeInMs: DurationMs.optional(),
		fadeOutMs: DurationMs.optional(),
		enter: ImageMotionSchema.optional(),
		exit: ImageMotionSchema.optional(),
		animation: AnimationSchema.optional(),
		/** Animated: only its keyframes move it. The fixed move, size and fades are ignored. Omitted means fixed. */
		animated: z.literal(true).optional()
	}),
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
	z.strictObject({
		type: z.literal("end_scene"),
		startTime: Time
	})
]);
/** Values items use when they do not set their own. */
var SequenceDefaultsSchema = z.strictObject({
	imageFadeInMs: DurationMs.optional(),
	imageFadeOutMs: DurationMs.optional(),
	imageEnter: ImageMotionSchema.optional(),
	imageExit: ImageMotionSchema.optional()
});
var SequenceSchema = z.strictObject({
	label: z.string().max(120).optional(),
	defaults: SequenceDefaultsSchema.optional(),
	items: z.array(SequenceItemSchema)
});
var SequenceIdSchema = Id;
//#endregion
//#region ../schema/src/playback.ts
/** Scene defaults and individual text-step overrides. Unset values inherit. */
var DialogPlaybackSchema = z.strictObject({
	autoplay: z.boolean().optional(),
	pauseGame: z.boolean().optional(),
	/** Replaces automatic reading time and the story delay; voice recordings still finish. */
	durationMs: z.number().int().min(0).max(6e5).optional()
});
var DEFAULT_AUTOPLAY_DELAY_MS = 600;
function resolveDialogPlayback(settings, scene, step) {
	const autoplay = step?.autoplay ?? scene?.autoplay ?? false;
	const durationMs = step?.durationMs ?? scene?.durationMs;
	return {
		autoplay,
		pauseGame: !autoplay || (step?.pauseGame ?? scene?.pauseGame ?? false),
		allowManualAdvance: !autoplay || (settings?.autoplayAllowManualAdvance ?? true),
		delayMs: settings?.autoplayDelayMs ?? 600,
		...durationMs === void 0 ? {} : { durationMs }
	};
}
/** Settings owned by an Autoplay start step. Optional values keep the stored document compact. */
var AutoplaySettingsSchema = z.strictObject({
	delayMs: z.number().int().min(0).max(6e5).optional(),
	allowManualAdvance: z.boolean().optional(),
	pauseGame: z.boolean().optional()
});
function resolveAutoplaySettings(settings = {}) {
	return {
		autoplay: true,
		delayMs: settings.delayMs ?? 600,
		allowManualAdvance: settings.allowManualAdvance ?? true,
		pauseGame: settings.pauseGame ?? false
	};
}
//#endregion
//#region ../schema/src/presentation.ts
/** Presentation is independent of portrait entry/exit, text and playback. */
var TEXT_POSITIONS = ["top", "bottom"];
var TextPositionSchema = z.enum(TEXT_POSITIONS);
var LINE_MODES = [
	"bubble",
	"face-box",
	"box"
];
var NARRATION_MODES = ["standard", "long"];
/**
* How a line's box and a stage portrait that is arriving on it are timed: the portrait comes first and the box
* waits a short or long beat, both at once, or the box comes first and the portrait follows after a beat.
*/
var LINE_ENTRANCES = [
	"portrait-short",
	"portrait-long",
	"together",
	"text-short",
	"text-long"
];
var LineEntranceSchema = z.enum(LINE_ENTRANCES);
var TEXT_ALIGNMENTS = [
	"left",
	"center",
	"right"
];
var SPEAKER_BADGES = ["filled", "outlined"];
var SpeakerBadgeSchema = z.enum(SPEAKER_BADGES);
var LinePresentationSchema = z.strictObject({
	/** `auto` asks for the automatic style even where the story sets one. */
	mode: z.enum([...LINE_MODES, "auto"]).optional(),
	/** Retained while in bubble mode, but only used by fixed boxes. */
	position: TextPositionSchema.optional(),
	/** Timing between the box and a stage portrait arriving on this line. Absent follows the story. */
	enter: LineEntranceSchema.optional()
});
var NarrationPresentationSchema = z.strictObject({
	mode: z.enum(NARRATION_MODES).optional(),
	position: TextPositionSchema.optional(),
	/** Text alignment within the reading column. */
	align: z.enum(TEXT_ALIGNMENTS).optional(),
	/** Horizontal placement of the long-narration column, independent of its text. */
	horizontalAlign: z.enum(TEXT_ALIGNMENTS).optional()
});
var PresentationDefaultsSchema = z.strictObject({
	line: LinePresentationSchema.optional(),
	narration: NarrationPresentationSchema.optional()
});
var DEFAULT_LINE_PRESENTATION = {
	mode: "face-box",
	position: "bottom",
	enter: "portrait-short"
};
var DEFAULT_NARRATION_PRESENTATION = {
	mode: "standard",
	position: "top",
	align: "left",
	horizontalAlign: "left"
};
/**
* The style a line has when neither it nor the story chose one: a plain box when the speaker's stage portrait shows
* (a face in the box would only repeat it), otherwise the face box.
*/
var automaticLineMode = (stagePortrait) => stagePortrait ? "box" : "face-box";
/** Whether the line's style is automatic: the line asks for it, or it sets none and the story sets none (or asks for it). */
var lineModeIsAutomatic = (own, defaults) => {
	const mode = own?.mode ?? defaults?.line?.mode;
	return mode === void 0 || mode === "auto";
};
/** Resolve field by field: an absent field follows the story, then the built-in default. */
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
		horizontalAlign: own?.horizontalAlign ?? defaults?.narration?.horizontalAlign ?? own?.align ?? defaults?.narration?.align ?? DEFAULT_NARRATION_PRESENTATION.horizontalAlign
	};
}
/** Editing text alignment must not move a legacy column that derived its position from align. */
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
			return {
				...mode ? { mode } : {},
				position
			};
		};
		if (source.type === "line") return fixed(source.presentation, resolveLinePresentation(source.presentation, defaults));
		return {
			...fixed(void 0, resolveLinePresentation(void 0, defaults)),
			position: resolveNarrationPresentation(source.presentation, defaults).position
		};
	}
	if (source.type === "narration") return resolveNarrationPresentation(source.presentation, defaults);
	const line = resolveLinePresentation(source.presentation, defaults);
	return {
		...resolveNarrationPresentation(void 0, defaults),
		...line.mode === "bubble" ? {} : { position: line.position }
	};
}
//#endregion
//#region ../schema/src/steps.ts
/** Fields every step has. */
var stepBase = {
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
var NarrationStepSchema = z.strictObject({
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
/**
* How a line's new expression replaces the old one: both pictures fading over each other (the default), a cut, or the
* new picture fading in over the old one, which stays opaque (suits the same pose with a different face).
*/
var EXPR_CHANGES = [
	"crossfade",
	"cut",
	"in-out"
];
var ExprChangeSchema = z.enum(EXPR_CHANGES);
var LineStepSchema = z.strictObject({
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
/** Plays a sequence defined in `story.sequences`. */
var SequenceStepSchema = z.strictObject({
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
/** Ends a held sequence. `start` is the id of the sequence step that holds it. */
var HoldEndStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("hold-end"),
	start: Id,
	/** fade: the sequence fades out; cut: it disappears at once. */
	ending: z.enum(["fade", "cut"]).default("fade"),
	/** How long the fade takes, in milliseconds. */
	fadeMs: z.number().int().min(0).max(1e4).default(500)
});
/** A pause: nothing is shown on top of the stage for `ms`, then the story moves on. */
var DelayStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("delay"),
	/** How long to wait, in milliseconds. */
	ms: DurationMs,
	/** Whether the player can cut the wait short (a click or key). Off unless set. */
	skippable: z.boolean().default(false)
});
/** What a fade can take with it. The dialog box fades only when asked; narration on a black screen is the usual use. */
var TRANSITION_CHANNELS = [
	"picture",
	"music",
	"dialog"
];
var TransitionChannelSchema = z.enum(TRANSITION_CHANNELS);
/** out: go dark (or light) and stay there. in: come back from it. through: out, hold, in. */
var TRANSITION_MODES = [
	"out",
	"in",
	"through"
];
var TransitionModeSchema = z.enum(TRANSITION_MODES);
var TransitionMs = z.number().int().min(0).max(1e4);
/**
* Fades the picture, the music and optionally the dialog box to a color and back. While the screen is covered
* (after `out`, or in the hold of `through`) the color is part of the stage, so save/load, skip and "play from
* here" keep it. In `through` the step's own `stage` operations happen in the middle, while the screen is covered.
* Use `resolveTransition` to read a step with its defaults filled in.
*/
var TransitionStepSchema = z.strictObject({
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
/**
* Hands control to the host (a battle, a shop, a puzzle). The engine pauses, emits
* event(name, params), and continues when the host calls resume(outcome).
* The outcome is stored in `resultFlag` (default: "<step id>_result").
*/
var EventStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("event"),
	name: Id,
	params: z.record(z.string(), z.json()).optional(),
	outcomes: z.array(Id).min(1),
	/** Outcome used when no host handles the event (studio preview, mock handlers). */
	default: Id,
	resultFlag: FlagName.optional()
});
var SetStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("set"),
	set: z.array(SetOpSchema).min(1)
});
var ChoiceOptionSchema = z.strictObject({
	id: Id,
	text: StringKey,
	when: ConditionSchema.optional(),
	set: z.array(SetOpSchema).optional()
});
/**
* Reserved for later. In v1 a choice only sets flags and the story continues on the same path;
* it has no editor UI yet and no branching.
*/
var ChoiceStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("choice"),
	prompt: StringKey.optional(),
	options: z.array(ChoiceOptionSchema).min(2)
});
/** Ends the story with a named exit the host can react to ("done" is always valid). */
var EndStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("end"),
	exit: Id
});
/**
* Skips ahead: out of the fork the step is in (`fork`), or out of the scene (`scene`, the default). The story carries
* on after the fork, or with the fade at the end of the scene and then the next scene. Usually under a condition.
*/
var LeaveStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("leave"),
	from: z.enum(["scene", "fork"]).default("scene")
});
/**
* Jumps to the start of another scene (`scene`, or this one: a loop), or back to a loop point (`mark`, the id of a
* `mark` step). Forward jumps skip ahead; backward ones repeat, so a loop needs a condition (or a choice) that can
* end it. A target that does not exist makes the step do nothing. Exactly one of the two is set; `validateStory`
* reports a step with neither or both.
*/
var GotoStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("goto"),
	scene: Id.optional(),
	mark: Id.optional()
});
/**
* A loop point: a named place a Go to step can jump back to, so a loop needs no scene of its own. It shows nothing
* and does nothing when the story reaches it. The label is for authors (the editor and the map), never for players.
*/
var MarkStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("mark"),
	label: z.string().max(80).default("")
});
/** One way a fork can go. A route with no condition always plays. */
var ForkRouteSchema = z.strictObject({
	id: Id,
	/** What the author calls it ("win", "spare the wolf"). Shown in the editor and on the map, never to players. */
	label: z.string().max(80).optional(),
	when: ConditionSchema.optional()
});
/**
* Opens a fork: the steps after it that are `inRoute` of one of its routes play only when that route's condition holds,
* and the story carries on with the steps that are not in any route. The engine never sees it: at load the routes
* become each step's `when` (see `applyRoutes`).
*/
var ForkStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("fork"),
	routes: z.array(ForkRouteSchema).min(1)
});
var AutoplayStartStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("autoplay-start"),
	settings: AutoplaySettingsSchema.optional()
});
var AutoplayEndStepSchema = z.strictObject({
	...stepBase,
	type: z.literal("autoplay-end"),
	start: Id
});
var StepSchema = z.discriminatedUnion("type", [
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
//#endregion
//#region ../schema/src/routes.ts
/** Every route of the steps' forks by route id. A route id used twice keeps its first fork. */
function routeIndex(steps) {
	const index = /* @__PURE__ */ new Map();
	for (const step of steps) {
		if (step.type !== "fork") continue;
		for (const route of step.routes) if (!index.has(route.id)) index.set(route.id, {
			fork: step,
			route
		});
	}
	return index;
}
/**
* The routes a step is inside, outermost first: its own route, then the route of that route's fork, and so on up.
* A route that does not exist, or one that loops back on itself, ends the chain.
*/
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
/** All of a step's conditions, together: the routes it is in (outermost first), the forks' own, and its own. */
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
/**
* The steps as the engine plays them: a step in a route gets the routes' conditions as its `when`, and a fork step
* becomes a step that does nothing (it keeps its id, so "play from here" on it still works). Steps with no route
* and no fork come back as they are.
*/
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
/** The index of the last step inside a fork (nested ones included), or the fork's own index when it has none. */
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
/**
* Where a Leave step goes: the id of the step that follows the fork it leaves, `scene` for the end of the scene (also
* when nothing follows the fork), or undefined when it has nowhere to go (leaving a fork it is not in).
*/
function leaveTarget(steps, at) {
	const step = steps[at];
	if (step?.type !== "leave") return void 0;
	if (step.from === "scene") return "scene";
	const fork = routeChain(step, routeIndex(steps)).at(-1)?.fork;
	if (!fork) return void 0;
	const next = steps[forkBlockEnd(steps, steps.indexOf(fork)) + 1];
	return next ? next.id : "scene";
}
//#endregion
//#region ../schema/src/transition.ts
var TRANSITION_DEFAULTS = {
	mode: "through",
	color: "#000000",
	affects: ["picture", "music"],
	outMs: 1e3,
	holdMs: 500,
	inMs: 1e3,
	skippable: false
};
/** Fills in what a transition step leaves out, and drops the times its mode does not use. */
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
/** How long the whole fade takes. */
var transitionLength = (t) => t.outMs + t.holdMs + t.inMs;
//#endregion
//#region ../schema/src/character.ts
/** Framing of a dialog portrait; the original asset stays intact. Percent positions and cover zoom. */
var PortraitCropSchema = z.strictObject({
	x: z.number().min(0).max(100),
	y: z.number().min(0).max(100),
	zoom: z.number().min(.05).max(8)
});
/**
* Where a character's head is in its stage picture, as a circle in the picture's own coordinates, so it follows the
* picture when its size, height or mirroring change. `x` and `y` are the centre as a share of the picture's width
* (from the left) and height (from the top); `size` is the diameter as a share of the picture's height. Left to
* right is as drawn: mirroring is applied by whoever draws it.
*/
var CharacterHeadSchema = z.strictObject({
	x: z.number().min(0).max(1),
	y: z.number().min(0).max(1),
	size: z.number().min(.02).max(1)
});
/** The head of a picture that has none set. */
var DEFAULT_HEAD = {
	x: .49,
	y: .22,
	size: .37
};
/** Adjusts one stage picture. All fields are optional; no value means no change. */
var CharacterFitSchema = z.strictObject({
	/** 1 is the host’s default stage portrait height; other values scale relative to it. */
	scale: z.number().min(.3).max(2).optional(),
	/** Moves the illustration up (positive) or down (negative), as a share of the stage height. */
	lift: z.number().min(-.5).max(.5).optional(),
	/** Follow another expression’s size and height. Mirroring remains independent. */
	sameAs: z.string().min(1).max(64).optional(),
	/** Mirror the illustration left to right. */
	flip: z.boolean().optional(),
	/** Where the head is in this picture. Without it the default expression's head is used. */
	head: CharacterHeadSchema.optional()
});
/**
* A character: a speaker with names, a color and portraits. It lives in the workspace library (shared by
* every story) or inside one story (`Story.characters`); inside a story, a local character overrides a library
* character with the same id.
*/
var CharacterSchema = z.strictObject({
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
/** Author-facing identity. Legacy characters fall back to their speaker name. */
function characterFullName(character, language = "en") {
	for (const map of [character.fullNames, character.names]) {
		if (!map || typeof map !== "object") continue;
		const values = map;
		for (const value of [values[language], ...Object.values(values)]) if (typeof value === "string" && value.trim()) return value.trim();
	}
	return typeof character.id === "string" ? character.id : "";
}
/** The character as players may see it: without the author-only label and note. */
function publicCharacter(character) {
	const copy = { ...character };
	delete copy.label;
	delete copy.note;
	return copy;
}
/**
* A character's name in a language. A story in "zh-Hans" or "zh-CN" finds the name written for "zh" (the
* character form offers plain "en" and "zh"), then the source language's name, then any name at all.
*/
function nameForLanguage(names, lang, source) {
	const base = (code) => code.split("-")[0].toLowerCase();
	const pick = (code) => names[code] ?? Object.entries(names).find(([key]) => base(key) === base(code))?.[1];
	return pick(lang) ?? pick(source) ?? Object.values(names)[0];
}
/** Library characters with a story's own characters laid over them: a local one wins on the same id. */
function mergeCharacters(library, local) {
	const byId = /* @__PURE__ */ new Map();
	for (const c of library) byId.set(c.id, c);
	for (const c of local) byId.set(c.id, c);
	return [...byId.values()];
}
/**
* A fresh character id from a display name, in snake_case: lowercase Latin letters and digits, words joined by `_`,
* never starting with a digit, and not in `taken` (a number is added then: `brother_tom_2`). Names with no Latin
* letters (a Chinese name, say) become "char", "char_2", ...
*/
function characterIdFromName(name, taken) {
	let base = name.normalize("NFKD").replace(/\p{M}/gu, "").split(/[^A-Za-z0-9]+/).filter(Boolean).join("_").toLowerCase().slice(0, 40).replace(/_+$/, "");
	if (base === "") base = "char";
	else if (/^[0-9]/.test(base)) base = `c${base}`;
	let id = base;
	for (let n = 2; taken.has(id); n++) id = `${base}_${n}`;
	return id;
}
/** The names an expression can have: any with a stage illustration or a dialog face, in the author's order. */
function expressionNames(character) {
	const all = /* @__PURE__ */ new Set([...Object.keys(character.expressions), ...Object.keys(character.faces ?? {})]);
	const ordered = (character.expressionOrder ?? []).filter((n) => all.has(n));
	return [.../* @__PURE__ */ new Set([...ordered, ...all])];
}
/** The expression a character shows when none is asked for: the default one, else the first. */
function baseExpression(character) {
	const names = expressionNames(character);
	return character.defaultExpression && names.includes(character.defaultExpression) ? character.defaultExpression : names[0];
}
/** The expression to draw for `expr`: that one when the character has it, else the base expression. */
function resolveExpression(character, expr) {
	return expr !== void 0 && expressionNames(character).includes(expr) ? expr : baseExpression(character);
}
/**
* The picture for a character showing `expr`, small enough for a dialog box or a list: the expression's own face,
* else its own stage picture (cropped to the top by whoever draws it), so a character with only stage pictures
* still has a face. An expression is never filled in from another one's pictures. `art` says it is the stage picture.
*/
function portraitOf(character, expr) {
	if (!character) return void 0;
	const name = resolveExpression(character, expr);
	if (name === void 0) return void 0;
	const face = character.faces?.[name];
	if (face) return {
		asset: face,
		art: false,
		expression: name
	};
	const art = character.expressions[name];
	return art ? {
		asset: art,
		art: true,
		expression: name
	} : void 0;
}
/**
* The stage illustration for a character showing `expr`, and the expression it belongs to: its own, else the base
* expression's, else the first there is.
*/
function stagePictureOf(character, expr) {
	if (!character) return void 0;
	const own = expr !== void 0 ? character.expressions[expr] : void 0;
	if (own && expr !== void 0) return {
		asset: own,
		expression: expr
	};
	const base = baseExpression(character);
	const fromBase = base !== void 0 ? character.expressions[base] : void 0;
	if (fromBase && base !== void 0) return {
		asset: fromBase,
		expression: base
	};
	for (const name of expressionNames(character)) {
		const asset = character.expressions[name];
		if (asset) return {
			asset,
			expression: name
		};
	}
}
/** The stage illustration (asset name) for a character showing `expr`. */
function stageArtOf(character, expr) {
	return stagePictureOf(character, expr)?.asset;
}
/** How the stage picture shown for `expr` sits: the adjustments saved for that picture's expression, if any. */
function fitOf(character, expr) {
	const shown = stagePictureOf(character, expr);
	if (!shown || !character) return void 0;
	const own = character.fits?.[shown.expression];
	if (!own?.sameAs) return own;
	const visited = /* @__PURE__ */ new Set([shown.expression]);
	let source = own;
	while (source.sameAs) {
		if (visited.has(source.sameAs) || !character.expressions[source.sameAs]) return {
			scale: own.scale,
			lift: own.lift,
			flip: own.flip
		};
		visited.add(source.sameAs);
		source = character.fits?.[source.sameAs] ?? {};
	}
	return {
		scale: source.scale,
		lift: source.lift,
		flip: own.flip
	};
}
/**
* Where the head is in the stage picture shown for `expr`, in the picture's own coordinates (see
* `CharacterHeadSchema`): the picture's own, else the default expression's, else `DEFAULT_HEAD`.
*/
function headOf(character, expr) {
	const shown = stagePictureOf(character, expr);
	if (!shown || !character) return void 0;
	const base = baseExpression(character);
	return character.fits?.[shown.expression]?.head ?? (base !== void 0 ? character.fits?.[base]?.head : void 0) ?? DEFAULT_HEAD;
}
/** The dialog-box picture (asset name) for a character speaking with `expr`. */
function faceOf(character, expr) {
	return portraitOf(character, expr)?.asset;
}
//#endregion
//#region ../schema/src/settings.ts
/**
* Story-level settings. Every field is optional and no value means the built-in default, so older stories stay valid
* as they are. The shape leaves room for a workspace layer underneath later (story, then workspace, then built-in).
*/
/** Typing speed of the dialog text. `instant` shows the whole text at once. */
var TEXT_SPEEDS = [
	"slow",
	"normal",
	"fast",
	"instant"
];
var TextSpeedSchema = z.enum(TEXT_SPEEDS);
/** Characters per second for each speed; 0 means no typing. `normal` is how the player always worked. */
var TEXT_SPEED_CPS = {
	slow: 12,
	normal: 24,
	fast: 48,
	instant: 0
};
var DEFAULT_TEXT_SPEED = "normal";
var cpsOf = (speed) => TEXT_SPEED_CPS[speed ?? "normal"];
/** What a story gets for its scene fades and the pause between scenes when its settings say nothing. */
var DEFAULT_SCENE_FADE_MS = 500;
var DEFAULT_SCENE_GAP_MS = 1e3;
/** How long a scene's title shows on its own, before its first step. 0 shows it over the first step instead. */
var DEFAULT_SCENE_TITLE_MS = 4e3;
/** How long a scene's title card stays up before a click or key can dismiss it (never longer than the card itself). */
var SCENE_CARD_MIN_MS = 1500;
/** Reading beat after the large title leaves, before the scene's first authored step. */
var DEFAULT_SCENE_TITLE_GAP_MS = 1500;
/**
* How a scene begins: with its title card (`title`), with the title kept small in the top-left corner for as long as
* the scene lasts (`corner`), or `quiet`, with no title, for a scene that carries on from the one before (after a fork,
* say).
*/
var SCENE_STARTS = [
	"title",
	"corner",
	"quiet"
];
var SceneStartSchema = z.enum(SCENE_STARTS);
var DEFAULT_SCENE_START = "title";
/** The story text typeface. Legacy `default` means Sans-serif; omitted settings use Serif. */
var TEXT_STYLES = ["serif", "default"];
var TextStyleSchema = z.enum(TEXT_STYLES);
var DEFAULT_TEXT_STYLE = "serif";
/** Color presets per role, as CSS colors. The first of each is the default look. */
var BACKGROUND_PRESETS = {
	stage: "rgb(18 21 26 / 0.85)",
	night: "rgb(0 0 0 / 0.7)",
	deep: "rgb(0 0 0 / 0.9)",
	dusk: "rgb(30 27 75 / 0.8)",
	paper: "rgb(255 255 255 / 0.85)",
	clear: "rgb(0 0 0 / 0)"
};
var BORDER_PRESETS = {
	warm: "#eec68b",
	soft: "rgb(255 255 255 / 0.15)",
	bright: "rgb(255 255 255 / 0.55)",
	dark: "rgb(0 0 0 / 0.45)",
	none: "rgb(0 0 0 / 0)"
};
var TEXT_PRESETS = {
	story: "#fff3e2",
	white: "#ffffff",
	cream: "#fdf6e3",
	ink: "#111111"
};
/** The speaker's name tag on a line box. Its text color is the character's own color. */
var TAG_BACKGROUND_PRESETS = {
	ink: "rgb(0 0 0 / 0.85)",
	dusk: "rgb(30 27 75 / 0.9)",
	paper: "rgb(255 255 255 / 0.9)",
	clear: "rgb(0 0 0 / 0)"
};
/** `speaker` (the default) borders the tag in the character's color; it has no fixed value. */
var TAG_BORDER_PRESETS = {
	speaker: "",
	bright: "rgb(255 255 255 / 0.55)",
	dark: "rgb(0 0 0 / 0.45)",
	none: "rgb(0 0 0 / 0)"
};
/** A preset name from `presets`, or any #rrggbb color. */
var colorChoice = (presets) => z.union([z.enum(Object.keys(presets)), HexColor]);
var CORNERS = [
	"square",
	"rounded",
	"round"
];
var CornersSchema = z.enum(CORNERS);
/** How one kind of dialog box looks. */
var BoxStyleSchema = z.strictObject({
	/** Off: the text sits on the stage with a shadow, with no background, border or blur. */
	box: z.boolean().optional(),
	background: colorChoice(BACKGROUND_PRESETS).optional(),
	border: colorChoice(BORDER_PRESETS).optional(),
	text: colorChoice(TEXT_PRESETS).optional(),
	corners: CornersSchema.optional()
});
var NameTagStyleSchema = z.strictObject({
	/** Off: just the name, with a shadow. */
	box: z.boolean().optional(),
	background: colorChoice(TAG_BACKGROUND_PRESETS).optional(),
	border: colorChoice(TAG_BORDER_PRESETS).optional(),
	corners: CornersSchema.optional()
});
var StorySettingsSchema = z.strictObject({
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
/** Today's look: what a story gets with no settings at all. */
var DEFAULT_STYLES = {
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
var pick = (choice, presets, fallback) => choice === void 0 ? fallback : presets[choice] ?? choice;
/** Fills in the defaults for one kind of box and turns preset names into CSS colors. */
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
var DEFAULT_NAME_TAG = {
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
//#endregion
//#region ../schema/src/story.ts
var FlagDeclSchema = z.strictObject({
	type: z.enum([
		"boolean",
		"number",
		"string"
	]),
	default: FlagValue,
	description: z.string().max(300).optional()
});
/**
* What a story needs from, and gives to, its host. A game or collection can read this without
* understanding the story's contents. `deriveContract` computes it from the steps.
*/
var ContractSchema = z.strictObject({
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
/** How a triggered scene sits on screen: over the game (no background of its own) or with its own background. */
var TRIGGER_PRESENTATIONS = ["overlay", "full"];
var TriggerPresentationSchema = z.enum(TRIGGER_PRESENTATIONS);
/** Triggered scenes are made for in-game dialog, which sits over the game. */
var DEFAULT_TRIGGER_PRESENTATION = "overlay";
/**
* Marks a scene the game starts by name (its id) instead of the story reaching it. It is not part of the story's
* order: it runs on its own, by `play(sceneId)`, and ends with the exit `done` when it runs out of steps.
*/
var TriggerSchema = z.strictObject({
	/** One line for the game's developer: when to start it. Shown in the contract. */
	description: z.string().max(200).optional(),
	/** Over the game with no background of its own, or the full stage. Absent: over the game. */
	presentation: TriggerPresentationSchema.optional()
});
var SceneSchema = z.strictObject({
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
/** The scenes the story reaches in order, as opposed to the ones the game starts by name. */
var storyScenes = (scenes) => scenes.filter((s) => !s.trigger);
var triggeredScenes = (scenes) => scenes.filter((s) => s.trigger);
/** How a triggered scene is shown, with the default filled in. */
var triggerPresentation = (scene) => scene.trigger?.presentation ?? "overlay";
var StorySchema = z.strictObject({
	schemaVersion: z.literal(1),
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
	characters: z.array(CharacterSchema).default([]).refine((list) => new Set(list.map((c) => c.id)).size === list.length, "duplicate character id")
});
//#endregion
//#region ../schema/src/hash.ts
/** 32-bit FNV-1a hash as 8 hex chars. Portable (no crypto), used to detect stale translations. */
function hashText(text) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619) >>> 0;
	}
	return h.toString(16).padStart(8, "0");
}
//#endregion
//#region ../schema/src/strings.ts
/**
* A string entry is plain text, or text plus the hash of the source-language text it was
* translated from. When the source changes, the stored hash no longer matches and the
* translation is reported as stale.
*/
var StringEntrySchema = z.union([z.string(), z.strictObject({
	text: z.string(),
	sourceHash: z.string().regex(/^[0-9a-f]{8}$/).optional()
})]);
var StringTableSchema = z.strictObject({
	schemaVersion: z.literal(1),
	lang: LangCode,
	entries: z.record(StringKey, StringEntrySchema)
});
function textOf(entry) {
	if (entry === void 0) return void 0;
	return typeof entry === "string" ? entry : entry.text;
}
/** Build a translation entry that remembers which source text it answers. */
function translationEntry(sourceText, translated) {
	return {
		text: translated,
		sourceHash: hashText(sourceText)
	};
}
/** Keys present in the source table but absent from the translation. */
function findMissingTranslations(source, translation) {
	return Object.keys(source.entries).filter((k) => !(k in translation.entries));
}
/**
* Keys whose translation was made from different source text (or has no recorded hash).
* Keys missing from the translation are reported by findMissingTranslations instead.
*/
function findStaleTranslations(source, translation) {
	const stale = [];
	for (const [key, entry] of Object.entries(translation.entries)) {
		const src = textOf(source.entries[key]);
		if (src === void 0) continue;
		if (typeof entry === "string" || entry.sourceHash === void 0) stale.push(key);
		else if (entry.sourceHash !== hashText(src)) stale.push(key);
	}
	return stale;
}
/** Inline markup tags like [pause:2000], [shake] and [/shake]. */
var TAG = /\[(\/?)([a-z][a-z0-9-]*)(?::[^\]]*)?\]/gi;
/** Tag names (with a leading "/" for closers) found in a string, sorted. */
function extractMarkupTags(text) {
	const tags = [];
	for (const m of text.matchAll(TAG)) tags.push(`${m[1] ?? ""}${(m[2] ?? "").toLowerCase()}`);
	return tags.sort();
}
/** Translations must keep the same markup tags as the source (arguments may differ). */
function markupMatches(sourceText, translatedText) {
	const a = extractMarkupTags(sourceText);
	const b = extractMarkupTags(translatedText);
	return a.length === b.length && a.every((t, i) => t === b[i]);
}
//#endregion
//#region ../schema/src/assets.ts
/**
* Asset kinds. Prototype roles map as: avatar/full body -> portrait, item -> object, event illustration -> scene
* (a full-screen picture that shows something happening instead of a video), animation -> video.
*/
var ASSET_KINDS = [
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
var AssetKind = z.enum(ASSET_KINDS);
/**
* What an uploaded file is for. One role per asset; it decides which pickers offer it first and what name is
* suggested, but it never locks the file: any image can still be used wherever an image fits.
*/
var ASSET_ROLES = [
	"portrait",
	"background",
	"scene",
	"object",
	"music",
	"sfx",
	"voice",
	"video"
];
var isAssetRole = (value) => typeof value === "string" && ASSET_ROLES.includes(value);
/** Whether a role belongs to images, audio or video. */
var ROLE_MEDIA = {
	portrait: "image",
	background: "image",
	scene: "image",
	object: "image",
	music: "audio",
	sfx: "audio",
	voice: "audio",
	video: "video"
};
/** The name prefix a role suggests (`char/<id>/` is used for portraits when the character is known). */
var ROLE_PREFIX = {
	portrait: "char/",
	background: "bg/",
	scene: "scene/",
	object: "obj/",
	music: "music/",
	sfx: "sfx/",
	voice: "voice/",
	video: "video/"
};
/**
* Where an asset came from, recorded once when the file is uploaded and never changed by tagging or sorting (plan 024).
* `story` and `module` carry the id of that story or game; the name is saved with it so the list can still say where a
* file came from after the story or game is renamed or removed. `guess` marks an origin worked out later, not seen.
*/
var ASSET_ORIGIN_KINDS = [
	"story",
	"module",
	"assets",
	"import",
	"ai"
];
var ORIGIN_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,99}$/;
function parseAssetOriginRequest(value) {
	if (typeof value !== "string") return null;
	const [kind, id, ...rest] = value.split(":");
	if (rest.length || !ASSET_ORIGIN_KINDS.includes(kind ?? "")) return null;
	if (id === void 0) return { kind };
	return ORIGIN_ID.test(id) ? {
		kind,
		id
	} : null;
}
/** The text form of a request, for a query string. */
var formatAssetOriginRequest = (origin) => origin.id ? `${origin.kind}:${origin.id}` : origin.kind;
/** A name prefix: lower-case path parts ending in `/`, such as `bg/` or `char/ana/`, or in `-`, such as `char/ana/face-`. */
var ASSET_PREFIX = /^[a-z0-9][a-z0-9_.-]*(\/[a-z0-9][a-z0-9_.-]*)*[/-]$/;
var isAssetPrefix = (value) => value.length <= 60 && ASSET_PREFIX.test(value);
var AssetEntrySchema = z.strictObject({
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
var AssetManifestSchema = z.strictObject({
	schemaVersion: z.literal(1),
	assets: z.record(AssetKey, AssetEntrySchema),
	/**
	* The widths the studio asks for each kind of picture (its `IMAGE_SIZE`), so a game that downloads the files can ask
	* for the same sizes (`?w=` on a file URL). A host that does not download files can ignore it.
	*/
	imageSizes: z.record(z.string().max(40), z.number().int().positive()).optional()
});
/** What the studio accepts as uploads. The server checks the file's real bytes, not just its name or declared type. */
var UPLOAD_TYPES = {
	"image/png": {
		media: "image",
		ext: "png"
	},
	"image/jpeg": {
		media: "image",
		ext: "jpg"
	},
	"image/webp": {
		media: "image",
		ext: "webp"
	},
	"audio/mpeg": {
		media: "audio",
		ext: "mp3"
	},
	"audio/ogg": {
		media: "audio",
		ext: "ogg"
	},
	"video/mp4": {
		media: "video",
		ext: "mp4"
	},
	"video/webm": {
		media: "video",
		ext: "webm"
	}
};
/** What a file picker's `accept` should list for each kind of media. */
var UPLOAD_ACCEPT = {
	image: ".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp",
	audio: ".mp3,.ogg,audio/mpeg,audio/ogg",
	video: ".mp4,.webm,video/mp4,video/webm"
};
var UPLOAD_ACCEPT_ALL = Object.values(UPLOAD_ACCEPT).join(",");
var UPLOAD_MAX_BYTES = {
	image: 10485760,
	audio: 26214400,
	video: 104857600
};
/** A video above this size is slow to load on a phone; the picker warns about it. */
var VIDEO_WARN_BYTES = 8388608;
/** The widths, in pixels, a picture can be served at (`?w=` on a file URL snaps up to one of these). */
var IMAGE_WIDTHS = [
	320,
	560,
	960,
	1300,
	1920,
	2560
];
/** The width each kind of picture is asked for at (a size from `IMAGE_WIDTHS`). Change a size here, not at the call site. */
var IMAGE_SIZE = {
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
/** The served width for a requested one: the next size up, or null (the original) when it is missing, invalid or larger. */
function snapImageWidth(requested) {
	const n = Number(Array.isArray(requested) ? requested[0] : requested);
	if (!Number.isFinite(n) || n <= 0) return null;
	return IMAGE_WIDTHS.find((w) => w >= n) ?? null;
}
/** The upload type a file really is, judged from its first bytes; null when it is none of the accepted types. */
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
/**
* A workspace asset key made from a file name: letters, digits and _ . - only, no extension, never empty,
* after an optional `prefix` such as `bg/`. A taken name gets -2, -3 and so on.
*/
function assetSlugFromName(name, taken, prefix = "") {
	let base = name.replace(/\.[A-Za-z0-9]{1,5}$/, "").normalize("NFKD").replace(/[^A-Za-z0-9_.-]+/g, "-").replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "").toLowerCase().slice(0, 120 - prefix.length);
	if (base === "") base = "asset";
	base = prefix + base;
	let slug = base;
	for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
	return slug;
}
/** The places in a story or character where a value is an asset name. */
var ASSET_FIELDS = /* @__PURE__ */ new Set([
	"asset",
	"voice",
	"src",
	"backgroundAsset"
]);
/** Character fields that map a name to an asset: stage illustrations and dialog faces. */
var PORTRAIT_MAPS = /* @__PURE__ */ new Set(["expressions", "faces"]);
/**
* Rewrites asset names inside a story document or character in place, using `renames` (old name to new name).
* Only fields that hold an asset name change (`asset`, `voice`, a sequence item's `src`, the story's `assets` list and a character's
* `expressions` and `faces`), so dialogue that happens to read the same is left alone. Returns how many names changed.
*/
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
var OP_ROLE = /* @__PURE__ */ new Map([
	["bg", "background"],
	["music", "music"],
	["sfx", "sfx"],
	["show", "object"]
]);
/** The role a sequence item's `src` is used for. */
var ITEM_ROLE = /* @__PURE__ */ new Map([
	["image", "scene"],
	["video", "video"],
	["sound", "sfx"],
	["voice", "voice"],
	["music", "music"]
]);
/**
* Notes, in `found`, the role each asset name is used for in a story document or character: a background
* change, music, a sound effect, a shown object, a voice line or a portrait expression. The first use wins.
*/
function collectAssetRoles(node, found) {
	if (node === null || typeof node !== "object") return;
	if (Array.isArray(node)) {
		for (const item of node) collectAssetRoles(item, found);
		return;
	}
	const record = node;
	const role = typeof record.op === "string" ? OP_ROLE.get(record.op) : void 0;
	if (role && typeof record.asset === "string" && !found.has(record.asset)) found.set(record.asset, role);
	if (typeof record.voice === "string" && !found.has(record.voice)) found.set(record.voice, "voice");
	if (typeof record.backgroundAsset === "string" && !found.has(record.backgroundAsset)) found.set(record.backgroundAsset, "background");
	const itemRole = typeof record.type === "string" ? ITEM_ROLE.get(record.type) : void 0;
	if (itemRole && typeof record.src === "string" && record.src !== "" && !found.has(record.src)) found.set(record.src, itemRole);
	for (const [key, value] of Object.entries(record)) if (PORTRAIT_MAPS.has(key) && value !== null && typeof value === "object") {
		for (const ref of Object.values(value)) if (typeof ref === "string" && !found.has(ref)) found.set(ref, "portrait");
	} else collectAssetRoles(value, found);
}
/**
* Calls `found` with every asset name a story document or character uses: `asset` and `voice` fields, the
* story's `assets` list and a character's `expressions`. Dialogue that reads the same as a name is not counted.
*/
function forEachAssetRef(node, found) {
	if (node === null || typeof node !== "object") return;
	if (Array.isArray(node)) {
		for (const item of node) forEachAssetRef(item, found);
		return;
	}
	for (const [key, value] of Object.entries(node)) if (ASSET_FIELDS.has(key) && typeof value === "string") {
		if (value !== "") found(value);
	} else if (key === "assets" && Array.isArray(value)) {
		for (const item of value) if (typeof item === "string") found(item);
	} else if (PORTRAIT_MAPS.has(key) && value !== null && typeof value === "object") {
		for (const ref of Object.values(value)) if (typeof ref === "string") found(ref);
	} else forEachAssetRef(value, found);
}
/** `bytes=500-` or `bytes=0-999` as numbers; null when absent or not a single plain range. */
function parseByteRange(header) {
	const m = /^bytes=(\d+)-(\d*)$/.exec(header ?? "");
	if (!m) return null;
	const start = Number(m[1]);
	const end = m[2] === "" ? void 0 : Number(m[2]);
	if (end !== void 0 && end < start) return null;
	return end === void 0 ? { start } : {
		start,
		end
	};
}
//#endregion
//#region ../schema/src/spriteSheet.ts
/** Uniform cells, read left-to-right then top-to-bottom. Frame numbers are zero-based in storage. */
var SpriteSheetSchema = z.strictObject({
	columns: z.number().int().min(1).max(256),
	rows: z.number().int().min(1).max(256),
	margin: z.number().int().min(0).max(4096),
	spacing: z.number().int().min(0).max(4096),
	firstFrame: z.number().int().min(0),
	frameCount: z.number().int().min(1).max(4096),
	fps: z.number().min(.1).max(120),
	playback: z.enum([
		"loop",
		"once",
		"ping-pong"
	]),
	randomStart: z.boolean().optional(),
	animated: z.boolean().optional()
}).superRefine((sheet, ctx) => {
	if (sheet.columns * sheet.rows > 4096 || sheet.firstFrame + sheet.frameCount > sheet.columns * sheet.rows) ctx.addIssue({
		code: "custom",
		message: "Frames must fit inside the sheet."
	});
});
function spriteCell(sheet, width, height) {
	const w = (width - 2 * sheet.margin - (sheet.columns - 1) * sheet.spacing) / sheet.columns;
	const h = (height - 2 * sheet.margin - (sheet.rows - 1) * sheet.spacing) / sheet.rows;
	return Number.isFinite(w) && Number.isFinite(h) && w >= 1 && h >= 1 ? {
		width: w,
		height: h
	} : null;
}
/** Rounded shared boundaries cover resized sheets without gaps; display size still uses the nominal cell. */
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
/** Stable per-instance phase: the same id gives the same starting frame in every renderer. */
function spriteStartOffset(sheet, instanceId) {
	if (!sheet.randomStart || instanceId === void 0) return 0;
	let hash = 2166136261;
	for (let i = 0; i < instanceId.length; i++) hash = Math.imul(hash ^ instanceId.charCodeAt(i), 16777619);
	return (hash >>> 0) % sheet.frameCount;
}
/** Once holds its final frame; ping-pong does not repeat either endpoint. */
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
/** Placement defaults in the map's world units; absent height follows the source frame's aspect ratio. */
var GraphicSizeSchema = z.strictObject({
	width: z.number().positive().max(1e5),
	height: z.number().positive().max(1e5).optional()
});
/** Shared image presentation defaults; each game declares which of these fields it supports. */
var GRAPHIC_BLEND_MODES = [
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
var GraphicAppearanceSchema = z.strictObject({
	opacity: z.number().min(0).max(1),
	blendMode: z.enum(GRAPHIC_BLEND_MODES)
});
//#endregion
//#region ../schema/src/workspace.ts
/** The workspace's shared flags: the interface between stories and between a story and a game. */
var FlagRegistrySchema = z.strictObject({
	schemaVersion: z.literal(1),
	flags: z.record(FlagName, FlagDeclSchema)
});
/** Theme data: dialog box, fonts and timing defaults. Editing UI comes later. */
var ThemeSchema = z.strictObject({
	id: Id,
	name: z.string().min(1).max(80),
	fonts: z.strictObject({
		body: z.string().max(200),
		name: z.string().max(200).optional()
	}),
	textSpeedCps: z.number().positive().max(500).default(40),
	fadeMs: z.number().int().min(0).max(5e3).default(400),
	/** What sequence images fade by unless the sequence or the image says otherwise. */
	imageFadeInMs: z.number().int().min(0).max(5e3).optional(),
	imageFadeOutMs: z.number().int().min(0).max(5e3).optional(),
	imageEnter: ImageMotionSchema.optional(),
	imageExit: ImageMotionSchema.optional(),
	dialogBox: z.strictObject({
		anchor: z.enum(["bottom", "top"]).default("bottom"),
		opacity: z.number().min(0).max(1).default(.85),
		nameplate: z.boolean().default(true)
	})
});
//#endregion
//#region ../schema/src/collection.ts
/**
* A collection is the chapter map: stories plus the rules for unlocking them. It is a separate,
* optional document. Stories never depend on it; games can ignore it and do their own progression.
*/
var CollectionNodeSchema = z.strictObject({
	id: Id,
	/** Story id this node opens. */
	story: Id,
	kind: z.enum(["main", "side"]),
	title: z.string().max(120).optional(),
	/** Unlocked when this holds, e.g. { and: [{ completed: "ch03" }, { flag: "trusted_monk", is: true }] }. */
	unlock: ConditionSchema.optional(),
	/** Editor canvas position (not used by the engine). */
	position: z.strictObject({
		x: z.number(),
		y: z.number()
	}).optional()
});
var CollectionSchema = z.strictObject({
	schemaVersion: z.literal(1),
	id: Id,
	meta: z.strictObject({ title: z.string().min(1).max(160) }),
	nodes: z.array(CollectionNodeSchema),
	/** Visual connections only; unlock rules decide what is available. */
	edges: z.array(z.strictObject({
		from: Id,
		to: Id
	})).default([])
});
//#endregion
//#region ../schema/src/bundle.ts
/**
* Everything a host needs to run a story: the story, its string tables, the asset manifest, and the
* workspace context (characters, shared flags) the story refers to. This is the export format.
*/
var ExportBundleSchema = z.strictObject({
	schemaVersion: z.literal(1),
	story: StorySchema,
	strings: z.record(LangCode, StringTableSchema),
	assets: AssetManifestSchema,
	characters: z.array(CharacterSchema).default([]),
	registry: FlagRegistrySchema.optional()
});
//#endregion
//#region ../schema/src/document.ts
/**
* What the studio stores for one story: the story itself plus its string tables, one per language.
* Workspace context (characters, shared flags, assets) is not part of it; it is joined in at export time.
*/
var StoryDocumentSchema = z.strictObject({
	story: StorySchema,
	strings: z.record(LangCode, StringTableSchema)
});
/** A minimal valid story for the "new story" button: one scene, one narration line. */
function newStoryDocument(id, title, lang = "en") {
	const strings = {
		schemaVersion: 1,
		lang,
		entries: {
			t_scene1: title,
			t_s1: ""
		}
	};
	return {
		story: StorySchema.parse({
			schemaVersion: 1,
			id,
			meta: { title },
			languages: {
				source: lang,
				available: [lang]
			},
			scenes: [{
				id: "scene1",
				meta: {
					title,
					displayTitle: "t_scene1"
				},
				steps: [{
					id: "s1",
					type: "narration",
					text: "t_s1"
				}]
			}]
		}),
		strings: { [lang]: strings }
	};
}
//#endregion
//#region ../schema/src/limits.ts
/**
* The most a saved story may weigh, as JSON. D1 stores at most 2 MB per row; this stays clear of it so a save never
* fails halfway. The server refuses a bigger story, and the studio checks against it before it makes one (Import text).
*/
var MAX_DOCUMENT_BYTES = 15e5;
//#endregion
//#region ../schema/src/migrate.ts
/**
* Migrations from version N to N+1, keyed by N. Add one whenever SCHEMA_VERSION is bumped:
* a story saved by an older studio must still load.
*/
var STORY_MIGRATIONS = {};
var SchemaVersionError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "SchemaVersionError";
	}
};
/** Bring any supported story document up to the current version, without validating it. */
function migrateStoryDocument(raw) {
	if (typeof raw !== "object" || raw === null || Array.isArray(raw)) throw new SchemaVersionError("A story must be a JSON object.");
	let doc = raw;
	const declared = doc.schemaVersion;
	if (typeof declared !== "number" || !Number.isInteger(declared) || declared < 1) throw new SchemaVersionError("Missing or invalid schemaVersion.");
	let version = declared;
	if (version > 1) throw new SchemaVersionError(`This story uses schema version ${version}, but this software only understands up to 1. Update the studio or engine.`);
	while (version < 1) {
		const step = STORY_MIGRATIONS[version];
		if (!step) throw new SchemaVersionError(`No migration from schema version ${version}.`);
		doc = step(doc);
		version = doc.schemaVersion;
	}
	return doc;
}
/** Migrate, then validate. Throws SchemaVersionError or a Zod error. */
function parseStory(raw) {
	return StorySchema.parse(migrateStoryDocument(raw));
}
//#endregion
//#region ../schema/src/validate.ts
/** The flag an event step's outcome is stored in. */
function eventResultFlag(step) {
	return step.resultFlag ?? `${step.id}_result`;
}
function* visitSteps(story) {
	for (let si = 0; si < story.scenes.length; si++) {
		const scene = story.scenes[si];
		for (let ti = 0; ti < scene.steps.length; ti++) yield {
			step: scene.steps[ti],
			path: `scenes[${si}].steps[${ti}]`,
			sceneIndex: si
		};
	}
}
/** Text keys a step uses. */
function stepTextKeys(step) {
	switch (step.type) {
		case "narration":
		case "line": return [step.text];
		case "choice": return [...step.prompt ? [step.prompt] : [], ...step.options.map((o) => o.text)];
		case "sequence": return step.skipPromptKey ? [step.skipPromptKey] : [];
		default: return [];
	}
}
/** Characters and assets a step's stage operations touch. */
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
	return {
		who,
		assets
	};
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
	if (step.type === "choice") for (const o of step.options) for (const op of o.set ?? []) out.push(op.flag);
	if (step.type === "event") out.push(eventResultFlag(step));
	return out;
}
var uniqueSorted = (items) => [...new Set(items)].sort();
/** Compute a story's contract from its steps, so it never has to be filled in by hand. */
function deriveContract(story) {
	const local = new Set(Object.keys(story.flags));
	const implicit = /* @__PURE__ */ new Set();
	const reads = /* @__PURE__ */ new Set();
	const sets = /* @__PURE__ */ new Set();
	const exits = /* @__PURE__ */ new Set();
	const hostEvents = /* @__PURE__ */ new Set();
	const characters = /* @__PURE__ */ new Set();
	const assets = /* @__PURE__ */ new Set();
	for (const { step } of visitSteps(story)) if (step.type === "event") {
		hostEvents.add(step.name);
		if (!step.resultFlag) implicit.add(eventResultFlag(step));
	}
	const isShared = (flag) => !local.has(flag) && !implicit.has(flag);
	for (const scene of story.scenes) if (scene.when) {
		for (const f of conditionFlags(scene.when)) if (isShared(f)) reads.add(f);
	}
	for (const { step } of visitSteps(story)) {
		for (const c of stepConditions(step)) for (const f of conditionFlags(c)) if (isShared(f)) reads.add(f);
		for (const f of stepSetFlags(step)) if (isShared(f)) sets.add(f);
		if (step.type === "end" && step.exit !== "done") exits.add(step.exit);
		const refs = stepStageRefs(step);
		refs.who.forEach((w) => characters.add(w));
		refs.assets.forEach((a) => assets.add(a));
	}
	for (const seq of Object.values(story.sequences)) for (const item of seq.items) if ("src" in item && item.src) assets.add(item.src);
	for (const scene of story.scenes) if (scene.meta.backgroundAsset) assets.add(scene.meta.backgroundAsset);
	return {
		exits: uniqueSorted(exits),
		reads: uniqueSorted(reads),
		sets: uniqueSorted(sets),
		hostEvents: uniqueSorted(hostEvents),
		characters: uniqueSorted(characters),
		assets: uniqueSorted(assets)
	};
}
/**
* Checks that a schema cannot express: unique ids, references that must resolve, flags that must be
* declared, timings that must make sense. Errors make a story unplayable; warnings are advice.
*/
/** Stage operations that leave something behind: the others (a sound, an effect) happen once and are gone. */
var PERSISTENT_OPS = /* @__PURE__ */ new Set([
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
	const add = (level, code, message, path) => issues.push({
		level,
		code,
		message,
		path
	});
	const error = (code, message, path) => add("error", code, message, path);
	const warn = (code, message, path) => add("warning", code, message, path);
	const sceneIds = /* @__PURE__ */ new Set();
	story.scenes.forEach((scene, si) => {
		if (sceneIds.has(scene.id)) error("duplicate-id", `Scene id "${scene.id}" is used more than once.`, `scenes[${si}]`);
		sceneIds.add(scene.id);
	});
	const stepIds = /* @__PURE__ */ new Set();
	/** Loop points, by step id: a Go to step names one of these. */
	const markIds = /* @__PURE__ */ new Set();
	for (const { step, path } of visitSteps(story)) {
		if (stepIds.has(step.id)) error("duplicate-id", `Step id "${step.id}" is used more than once.`, path);
		stepIds.add(step.id);
		if (step.type === "mark") markIds.add(step.id);
	}
	story.scenes.forEach((scene, si) => {
		const labels = /* @__PURE__ */ new Set();
		scene.steps.forEach((step, ti) => {
			if (step.type !== "mark") return;
			const label = step.label.trim().toLowerCase();
			if (label && labels.has(label)) warn("duplicate-mark-label", `Two loop points in this scene are called "${step.label}".`, `scenes[${si}].steps[${ti}]`);
			labels.add(label);
		});
	});
	story.scenes.forEach((scene, si) => {
		const owner = /* @__PURE__ */ new Map();
		scene.steps.forEach((step, ti) => {
			if (step.type !== "fork") return;
			for (const route of step.routes) if (owner.has(route.id)) error("duplicate-id", `Route id "${route.id}" is used more than once in the scene.`, `scenes[${si}].steps[${ti}]`);
			else owner.set(route.id, ti);
		});
		scene.steps.forEach((step, ti) => {
			if (!step.inRoute) return;
			const at = owner.get(step.inRoute);
			const path = `scenes[${si}].steps[${ti}]`;
			if (at === void 0) error("unknown-route", `Step "${step.id}" is in route "${step.inRoute}", which no fork has.`, path);
			else if (at >= ti) error("route-before-fork", `Step "${step.id}" comes before the fork of its route.`, path);
		});
	});
	const local = new Set(Object.keys(story.flags));
	const implicit = /* @__PURE__ */ new Set();
	for (const { step } of visitSteps(story)) if (step.type === "event" && !step.resultFlag) implicit.add(eventResultFlag(step));
	const registry = new Set(Object.keys(ctx.registry?.flags ?? {}));
	const declaredShared = /* @__PURE__ */ new Set([...story.contract.reads, ...story.contract.sets]);
	const known = (flag) => local.has(flag) || implicit.has(flag) || registry.has(flag) || declaredShared.has(flag);
	for (const name of local) if (registry.has(name)) error("flag-shadows-shared", `Local flag "${name}" has the same name as a shared flag in the workspace.`, `flags.${name}`);
	const characters = ctx.characters || story.characters.length > 0 ? new Map(mergeCharacters(ctx.characters ?? [], story.characters).map((c) => [c.id, c])) : void 0;
	const usedSequences = /* @__PURE__ */ new Set();
	const usedKeys = /* @__PURE__ */ new Set();
	const checkFlag = (flag, role, path) => {
		if (!known(flag)) {
			error("unknown-flag", `Flag "${flag}" is not declared in the story, the workspace registry or the contract.`, path);
			return;
		}
		if (registry.has(flag) && !local.has(flag) && !implicit.has(flag)) {
			if (!(role === "read" ? story.contract.reads : story.contract.sets).includes(flag)) warn(role === "read" ? "contract-reads-missing" : "contract-sets-missing", `Shared flag "${flag}" is ${role === "read" ? "read" : "set"} but not listed in the contract.`, path);
		}
	};
	for (const key of [story.meta.titleKey, story.meta.summaryKey]) if (key) usedKeys.add(key);
	for (const scene of story.scenes) for (const key of [scene.meta.displayTitle, scene.meta.displaySubtitle]) if (key) usedKeys.add(key);
	const exitsOk = /* @__PURE__ */ new Set(["done", ...story.contract.exits]);
	const heldStarts = /* @__PURE__ */ new Map();
	const endedStarts = /* @__PURE__ */ new Set();
	for (const { step, path } of visitSteps(story)) {
		if (step.type === "sequence" && step.hold) heldStarts.set(step.id, path);
		if (step.type === "hold-end") {
			if (heldStarts.has(step.start)) endedStarts.add(step.start);
			else warn("hold-end-without-start", `This end step has no held sequence before it (step "${step.start}").`, `${path}.start`);
		}
	}
	for (const [id, path] of heldStarts) if (!endedStarts.has(id)) warn("hold-never-ends", "This held sequence is never ended, so it stays to the end.", path);
	const hiddenOf = /* @__PURE__ */ new Map();
	for (const { step } of visitSteps(story)) hiddenOf.set(step.id, step.hidden === true);
	for (const { step, path } of visitSteps(story)) {
		if (step.type !== "hold-end" || !heldStarts.has(step.start)) continue;
		if (hiddenOf.get(step.start) !== (step.hidden === true)) warn("hold-half-hidden", "A held sequence and its end step must both be hidden or both shown.", path);
	}
	for (const [si, scene] of story.scenes.entries()) {
		const open = [];
		for (const [ti, step] of scene.steps.entries()) {
			const path = `scenes[${si}].steps[${ti}]`;
			if (step.type === "autoplay-start") open.push(step);
			if (step.type === "autoplay-end") {
				const start = open.at(-1);
				if (!start || start.id !== step.start) warn("autoplay-unpaired", "Autoplay end must follow its matching start in the same scene, without crossing another block.", path);
				else {
					open.pop();
					if (!!start.hidden !== !!step.hidden) warn("autoplay-half-hidden", "Autoplay start and end must be hidden or shown together.", path);
					if (start.inRoute !== step.inRoute) warn("autoplay-route", "Autoplay start and end must belong to the same route.", path);
				}
			}
		}
		for (const start of open) warn("autoplay-never-ends", "Autoplay start needs a matching end in this scene.", `scenes[${si}].steps[${scene.steps.indexOf(start)}]`);
	}
	const stageSetters = [...visitSteps(story)].filter(({ step }) => step.hidden === true && (step.stage ?? []).some((op) => PERSISTENT_OPS.has(op.op)));
	if (stageSetters.length > 0) warn("hidden-sets-stage", stageSetters.length === 1 ? "A hidden step sets up the stage, so the steps after it see a different stage." : `${stageSetters.length} hidden steps set up the stage, so the steps after them see a different stage.`, stageSetters[0].path);
	let faded = null;
	let lastPath = "";
	for (const { step, path } of visitSteps(story)) {
		lastPath = path;
		if (step.type === "transition" && !step.when) {
			const mode = step.mode ?? "through";
			if (mode === "out") faded = path;
			else {
				if (mode === "in" && faded === null) warn("fade-in-without-out", "This fade in has no fade out before it, so it does nothing.", path);
				faded = null;
			}
		}
		if (step.type === "end" && faded !== null) {
			warn("ends-faded-out", "The story ends while the screen is still faded out.", path);
			faded = null;
		}
	}
	if (faded !== null) warn("ends-faded-out", "The story ends while the screen is still faded out.", lastPath);
	const triggeredIds = new Set(story.scenes.filter((sc) => sc.trigger).map((sc) => sc.id));
	story.scenes.forEach((scene, si) => {
		if (!scene.trigger) return;
		const own = new Set(scene.steps.filter((st) => st.type === "mark").map((st) => st.id));
		scene.steps.forEach((step, ti) => {
			const path = `scenes[${si}].steps[${ti}]`;
			if (step.type === "end") error("end-in-triggered", "A scene the game starts has no Ending: it ends when it runs out of steps, or at a Leave scene step.", path);
			if (step.type === "event") error("event-in-triggered", "A scene the game starts cannot hand over to the game: it has no game events.", path);
			if (step.type === "goto" && (step.scene !== void 0 || step.mark !== void 0 && !own.has(step.mark))) error("goto-out-of-triggered", "A Go to step in a scene the game starts can only go to a loop point of the same scene.", path);
		});
	});
	story.scenes.forEach((scene, si) => {
		if (scene.trigger && scene.after) error("triggered-after", "A scene the game starts has no \"after\": it ends when it runs out of steps.", `scenes[${si}].after`);
		if (scene.after && "scene" in scene.after && triggeredIds.has(scene.after.scene)) error("into-triggered", `The scene "${scene.after.scene}" is started by the game, so no scene can continue with it.`, `scenes[${si}].after`);
		if (scene.after && "scene" in scene.after && !sceneIds.has(scene.after.scene)) warn("unknown-scene", `The scene "${scene.after.scene}" that this scene continues with does not exist.`, `scenes[${si}].after`);
		if (!scene.when) return;
		for (const f of conditionFlags(scene.when)) checkFlag(f, "read", `scenes[${si}].when`);
		if (conditionUsesCompleted(scene.when)) warn("completed-in-story", "\"completed\" conditions only work in collections, not inside a story.", `scenes[${si}].when`);
	});
	const eventOutcomes = /* @__PURE__ */ new Map();
	for (const { step, path } of visitSteps(story)) if (step.type === "event") eventOutcomes.set(eventResultFlag(step), {
		outcomes: step.outcomes,
		path
	});
	const readResults = /* @__PURE__ */ new Set();
	const checkOutcomes = (cond, path) => {
		if ("flag" in cond) {
			const event = eventOutcomes.get(cond.flag);
			if (!event) return;
			readResults.add(cond.flag);
			const asked = "is" in cond ? cond.is : "isNot" in cond ? cond.isNot : void 0;
			if (typeof asked === "string" && !event.outcomes.includes(asked)) warn("unknown-outcome", `"${cond.flag}" is never "${asked}": the event reports ${event.outcomes.map((o) => `"${o}"`).join(", ")}.`, path);
		} else if ("and" in cond) cond.and.forEach((c) => checkOutcomes(c, path));
		else if ("or" in cond) cond.or.forEach((c) => checkOutcomes(c, path));
		else if ("not" in cond) checkOutcomes(cond.not, path);
	};
	story.scenes.forEach((scene, si) => {
		if (scene.when) checkOutcomes(scene.when, `scenes[${si}].when`);
	});
	for (const { step, path } of visitSteps(story)) for (const cond of stepConditions(step)) checkOutcomes(cond, `${path}.when`);
	for (const [flag, { outcomes, path }] of eventOutcomes) if (outcomes.length > 1 && !readResults.has(flag)) warn("event-result-unused", "Nothing in the story reads the result of this event, so every outcome plays the same.", path);
	for (const { step, path } of visitSteps(story)) {
		if (step.type === "goto") {
			if (step.scene !== void 0 && step.mark !== void 0) error("goto-target", "A Go to step has a scene or a loop point, not both.", path);
			else if (step.scene === void 0 && step.mark === void 0) warn("goto-target", "This Go to step has nowhere to go.", path);
			else if (step.scene !== void 0 && !sceneIds.has(step.scene)) warn("unknown-scene", `The scene "${step.scene}" this step goes to does not exist.`, path);
			else if (step.scene !== void 0 && triggeredIds.has(step.scene)) error("into-triggered", `The scene "${step.scene}" is started by the game, so a Go to step cannot go to it.`, path);
			else if (step.mark !== void 0 && !markIds.has(step.mark)) warn("unknown-mark", "The loop point this step goes back to does not exist.", path);
		}
		if (step.type === "leave" && step.from === "fork" && !step.inRoute) warn("leave-fork-outside", "Leave fork does nothing outside a fork route.", path);
		for (const cond of stepConditions(step)) {
			for (const f of conditionFlags(cond)) checkFlag(f, "read", `${path}.when`);
			if (conditionUsesCompleted(cond)) warn("completed-in-story", "\"completed\" conditions only work in collections, not inside a story.", `${path}.when`);
		}
		for (const f of stepSetFlags(step)) checkFlag(f, "set", path);
		if (step.type === "sequence") {
			usedSequences.add(step.ref);
			if (!(step.ref in story.sequences)) error("unknown-sequence", `Sequence "${step.ref}" is not defined.`, `${path}.ref`);
		}
		if (step.type === "event") {
			if (!step.outcomes.includes(step.default)) error("bad-default-outcome", `Default outcome "${step.default}" is not one of the outcomes.`, `${path}.default`);
			if (new Set(step.outcomes).size !== step.outcomes.length) error("duplicate-outcome", "Outcomes must be unique.", `${path}.outcomes`);
		}
		if (step.type === "choice") {
			const optionIds = /* @__PURE__ */ new Set();
			step.options.forEach((o, i) => {
				if (optionIds.has(o.id)) error("duplicate-id", `Option id "${o.id}" is used more than once.`, `${path}.options[${i}]`);
				optionIds.add(o.id);
			});
		}
		if (step.type === "end" && !exitsOk.has(step.exit)) error("unknown-exit", `Exit "${step.exit}" is not "done" or listed in the contract.`, `${path}.exit`);
		for (const key of stepTextKeys(step)) {
			usedKeys.add(key);
			if (ctx.strings && !(key in ctx.strings.entries)) error("missing-string", `String "${key}" is missing from the ${ctx.strings.lang} table.`, path);
		}
		const refs = stepStageRefs(step);
		if (characters && !step.hidden) {
			for (const who of refs.who) if (!characters.has(who)) error("unknown-character", `Character "${who}" is neither in the workspace nor in the story.`, path);
			const exprChecks = [];
			if (step.type === "line") exprChecks.push([step.speaker, step.expr]);
			for (const op of step.stage ?? []) if (op.op === "enter" || op.op === "expr") exprChecks.push([op.who, op.expr]);
			const bigPictures = [];
			if (step.type === "line" && (step.portrait?.picture === "temporary" || step.portrait?.picture === "stage")) bigPictures.push([step.speaker, step.expr]);
			for (const op of step.stage ?? []) if (op.op === "enter") bigPictures.push([op.who, op.expr]);
			for (const [who, expr] of bigPictures) {
				const ch = characters.get(who);
				if (ch && !stageArtOf(ch, expr)) warn("no-stage-picture", `Character "${who}" has no stage picture${expr ? ` for "${expr}"` : ""}, so a placeholder is drawn.`, path);
			}
			for (const [who, expr] of exprChecks) {
				const ch = characters.get(who);
				const known = ch ? expressionNames(ch) : [];
				if (ch && expr && known.length > 0 && !known.includes(expr)) warn("unknown-expression", `Character "${who}" has no expression "${expr}".`, path);
			}
		}
		if (ctx.assets && !step.hidden) {
			for (const a of refs.assets) if (!(a in ctx.assets.assets)) warn("unresolved-asset", `Asset "${a}" is not in the asset manifest (placeholder).`, path);
		}
	}
	if (ctx.assets) story.scenes.forEach((scene, si) => {
		const a = scene.meta.backgroundAsset;
		if (a && !(a in ctx.assets.assets)) warn("unresolved-asset", `Asset "${a}" is not in the asset manifest (placeholder).`, `scenes[${si}].meta.backgroundAsset`);
	});
	for (const [id, seq] of Object.entries(story.sequences)) {
		if (!usedSequences.has(id)) warn("unused-sequence", `Sequence "${id}" is never played.`, `sequences.${id}`);
		seq.items.forEach((item, i) => {
			const p = `sequences.${id}.items[${i}]`;
			if (item.type === "text") {
				usedKeys.add(item.textKey);
				if (ctx.strings && !(item.textKey in ctx.strings.entries)) error("missing-string", `String "${item.textKey}" is missing from the ${ctx.strings.lang} table.`, p);
			}
			if ((item.type === "image" || item.type === "text" || item.type === "video" || item.type === "color") && item.endTime !== void 0 && item.endTime <= item.startTime) error("bad-timing", "endTime must be after startTime.", p);
			if ("animation" in item && item.animation) {
				const length = "endTime" in item && item.endTime !== void 0 ? item.endTime - item.startTime : void 0;
				for (const [track, frames] of Object.entries(item.animation)) {
					const times = frames.map((k) => k.t);
					if (!times.every((t, n) => n === 0 || t > times[n - 1])) error("bad-keyframes", `Keyframes of "${track}" must be in time order, one per time.`, `${p}.animation.${track}`);
					if (length !== void 0 && times.some((t) => t > length)) warn("keyframe-after-end", `A keyframe of "${track}" is after the item ends and is never reached.`, `${p}.animation.${track}`);
				}
			}
			if ("src" in item && item.src === "") warn("placeholder-asset", "Item has no asset linked yet.", p);
			if ("src" in item && item.src && ctx.assets && !(item.src in ctx.assets.assets)) warn("unresolved-asset", `Asset "${item.src}" is not in the asset manifest (placeholder).`, p);
		});
	}
	if (ctx.strings) {
		for (const key of Object.keys(ctx.strings.entries)) if (!usedKeys.has(key)) warn("unused-string", `String "${key}" is not used by any step.`, `strings.${key}`);
	}
	const derived = deriveContract(story);
	const missing = (declared, needed) => needed.filter((n) => !declared.includes(n));
	for (const [field, code] of [["hostEvents", "contract-host-events-missing"], ["characters", "contract-characters-missing"]]) {
		const gap = missing(story.contract[field], derived[field]);
		if (gap.length) warn(code, `Contract.${field} is missing: ${gap.join(", ")}.`, `contract.${field}`);
	}
	return issues;
}
var hasErrors = (issues) => issues.some((i) => i.level === "error");
//#endregion
//#region ../schema/src/cast.ts
/** Every character id a story mentions: line speakers and anyone placed on stage. */
function referencedCharacters(story) {
	const seen = /* @__PURE__ */ new Set();
	for (const scene of story.scenes) for (const step of scene.steps) if (step.type === "line") seen.add(step.speaker);
	for (const id of deriveContract(story).characters) seen.add(id);
	return [...seen];
}
/**
* Plain characters for ids the story uses but nobody defined (in the workspace or the story), named after
* the id. The editor's preview and a published story both use them, so a draft with a speaker who has no
* profile yet still plays, showing the id as the name.
*/
function standInCharacters(story, known) {
	const defined = new Set(known.map((c) => c.id));
	const lang = story.languages.source;
	return referencedCharacters(story).filter((id) => !defined.has(id)).map((id) => ({
		id,
		names: { [lang]: id.charAt(0).toUpperCase() + id.slice(1) },
		expressions: {}
	}));
}
/**
* Rewrites character ids inside a story in place (a line's `speaker`, the `who` of stage operations), using
* `renames` (old id to new id). Returns how many ids changed. The story's own character list is not touched:
* those characters keep their ids.
*/
function renameCharacterRefs(node, renames) {
	if (node === null || typeof node !== "object") return 0;
	let changed = 0;
	if (Array.isArray(node)) {
		for (const item of node) changed += renameCharacterRefs(item, renames);
		return changed;
	}
	const record = node;
	for (const [key, value] of Object.entries(record)) if ((key === "speaker" || key === "who") && typeof value === "string") {
		const next = renames.get(value);
		if (next !== void 0) {
			record[key] = next;
			changed++;
		}
	} else if (key === "contract" && value !== null && typeof value === "object") {
		const ids = value.characters;
		if (Array.isArray(ids)) ids.forEach((id, i) => {
			const next = typeof id === "string" ? renames.get(id) : void 0;
			if (next !== void 0) {
				ids[i] = next;
				changed++;
			}
		});
	} else if (key !== "characters") changed += renameCharacterRefs(value, renames);
	return changed;
}
//#endregion
//#region ../schema/src/autoplay.ts
/** Innermost authored wrapper surrounding a step. End boundaries are included. */
function autoplayBlockAt(steps, at) {
	const open = [];
	for (let i = 0; i <= at; i++) {
		const step = steps[i];
		if (!step || step.hidden) continue;
		if (step.type === "autoplay-start") open.push(step);
		if (i === at) return open.at(-1);
		if (step.type === "autoplay-end") {
			const index = open.findIndex((start) => start.id === step.start);
			if (index >= 0) open.splice(index);
		}
	}
}
//#endregion
//#region ../schema/src/aiDraftSchema.ts
var toJson = (schema) => z.toJSONSchema(schema, {
	io: "input",
	target: "draft-2020-12",
	reused: "ref"
});
var isObject = (v) => typeof v === "object" && v !== null;
var list = (v) => Array.isArray(v) ? v.filter(isObject) : [];
var PATTERN_NAMES = [
	["^[a-z0-9][a-z0-9_./-]", "asset name"],
	["^[A-Za-z][A-Za-z0-9_.-]", "flag name"],
	["^[A-Za-z][A-Za-z0-9_-]", "id"],
	["^#[0-9a-fA-F]{6}", "color #rrggbb"]
];
/** A schema in a few words. `defs` resolves the references a schema with shared parts has. */
function describeType(schema, defs = {}) {
	if (typeof schema.$ref === "string") {
		const def = defs[schema.$ref.split("/").pop() ?? ""];
		if (!isObject(def)) return "object";
		const variants = list(def.anyOf ?? def.oneOf);
		const props = (v) => isObject(v.properties) ? v.properties : {};
		if (variants.some((v) => "flag" in props(v) || "completed" in props(v))) return "a condition";
		if (variants.length > 0 && variants.every((v) => "op" in props(v))) return "a stage change";
		return describeType(def, defs);
	}
	if ("const" in schema) return JSON.stringify(schema.const);
	if (Array.isArray(schema.enum)) return schema.enum.map((v) => JSON.stringify(v)).join(" | ");
	const either = list(schema.anyOf ?? schema.oneOf);
	if (either.length > 0) {
		if (either.every((v) => isObject(v.properties) && "op" in v.properties)) return "a stage change";
		return [...new Set(either.map((v) => describeType(v, defs)))].join(" or ");
	}
	switch (schema.type) {
		case "array": {
			const inner = isObject(schema.items) ? describeType(schema.items, defs) : "values";
			return `list of ${inner.startsWith("a ") ? `${inner.slice(2)}s` : inner}`;
		}
		case "integer":
		case "number": {
			const range = schema.minimum !== void 0 || schema.maximum !== void 0 ? ` ${String(schema.minimum ?? "")}-${String(schema.maximum ?? "")}` : "";
			return `${String(schema.type)}${range}`;
		}
		case "string": {
			const pattern = typeof schema.pattern === "string" ? schema.pattern : "";
			return PATTERN_NAMES.find(([prefix]) => pattern.startsWith(prefix))?.[1] ?? "text";
		}
		case "boolean": return "true or false";
		case "object": {
			const keys = isObject(schema.properties) ? Object.keys(schema.properties) : [];
			return keys.length > 0 ? `object with ${keys.join(", ")}` : "object";
		}
		case "null": return "null";
		default: return "any";
	}
}
function describeShape(name, schema, defs) {
	const props = isObject(schema.properties) ? schema.properties : {};
	const required = new Set(Array.isArray(schema.required) ? schema.required : []);
	return {
		name,
		fields: Object.entries(props).filter(([key]) => key !== "type" && key !== "op").map(([key, value]) => {
			const info = {
				name: key,
				type: describeType(isObject(value) ? value : {}, defs),
				required: required.has(key)
			};
			if (isObject(value) && "default" in value) info.default = JSON.stringify(value.default);
			return info;
		})
	};
}
function shapes(schema, key) {
	const json = toJson(schema);
	const defs = isObject(json.$defs) ? json.$defs : {};
	return list(json.oneOf).map((variant) => {
		const props = isObject(variant.properties) ? variant.properties : {};
		const tag = isObject(props[key]) ? props[key].const : void 0;
		return describeShape(String(tag), variant, defs);
	});
}
/** How a draft writes a field that the story format fills in itself. */
var DRAFT_TYPES = {
	text: "words",
	prompt: "words",
	speaker: "character name",
	skipPromptKey: "words"
};
/** Every step type with its fields, as a draft writes them: ids optional, text in place, speakers by name. */
var stepReference = () => shapes(StepSchema, "type").filter((shape) => ![
	"fork",
	"leave",
	"goto",
	"mark"
].includes(shape.name)).map((shape) => ({
	...shape,
	fields: shape.fields.filter((f) => f.name !== "inRoute").map((f) => ({
		...f,
		...f.name === "id" ? { required: false } : {},
		...f.name in DRAFT_TYPES ? { type: DRAFT_TYPES[f.name] } : {}
	}))
}));
/** Every sequence item type with its fields, as a draft writes them: a text item has `text`, not a key. */
var sequenceItemReference = () => shapes(SequenceItemSchema, "type").map((shape) => shape.name === "text" ? {
	...shape,
	fields: shape.fields.map((f) => f.name === "textKey" ? {
		...f,
		name: "text",
		type: "words"
	} : f)
} : shape);
/** Every stage change (`op`) with its fields. */
var stageReference = () => shapes(StageOpSchema, "op");
var WORDS = {
	type: "string",
	minLength: 1
};
/** Applies the draft's conveniences to a step schema: ids are optional, and text and speakers are plain words. */
function relaxStep(step) {
	const props = isObject(step.properties) ? { ...step.properties } : {};
	for (const key of [
		"text",
		"prompt",
		"speaker"
	]) if (key in props) props[key] = WORDS;
	if (isObject(props.options)) {
		const options = props.options;
		const item = isObject(options.items) ? options.items : {};
		const itemProps = isObject(item.properties) ? { ...item.properties } : {};
		if ("text" in itemProps) itemProps.text = WORDS;
		props.options = {
			...options,
			items: {
				...item,
				properties: itemProps,
				required: (Array.isArray(item.required) ? item.required : []).filter((k) => k !== "id")
			}
		};
	}
	const required = (Array.isArray(step.required) ? step.required : []).filter((k) => k !== "id");
	return {
		...step,
		properties: props,
		required
	};
}
/** Applies the draft's conveniences to a sequence item schema: a text item carries its words in `text`. */
function relaxItem(item) {
	const props = isObject(item.properties) ? { ...item.properties } : {};
	if (!("textKey" in props)) return item;
	Reflect.deleteProperty(props, "textKey");
	props.text = WORDS;
	const required = (Array.isArray(item.required) ? item.required : []).map((k) => k === "textKey" ? "text" : k);
	return {
		...item,
		properties: props,
		required
	};
}
/**
* The JSON Schema for the items of a sequence draft, shared by the story and the sequence drafts. Its shared parts are
* renamed (`seq__schema0`) so they never clash with the ones in the step schema when both sit in one document.
*/
function sequenceSchema() {
	const json = JSON.parse(JSON.stringify(z.toJSONSchema(SequenceItemSchema, {
		io: "input",
		target: "draft-2020-12",
		reused: "ref"
	})).replaceAll("__schema", "seq__schema"));
	return {
		schema: {
			type: "object",
			properties: {
				label: {
					type: "string",
					maxLength: 120
				},
				items: {
					type: "array",
					items: { oneOf: list(json.oneOf).map(relaxItem) }
				}
			},
			required: ["items"]
		},
		defs: isObject(json.$defs) ? json.$defs : {}
	};
}
/** The JSON Schema of a sequence draft (`"grs": "sequence"`). */
function sequenceDraftJsonSchema() {
	const { schema, defs } = sequenceSchema();
	return {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		title: "Vortex Studio sequence draft",
		type: "object",
		properties: {
			grs: { const: "sequence" },
			v: { const: 1 },
			...schema.properties
		},
		required: [
			"grs",
			"v",
			"items"
		],
		$defs: defs
	};
}
/** The JSON Schema of a story draft (`"grs": "story"`). */
function storyDraftJsonSchema() {
	const steps = toJson(StepSchema);
	const sequence = sequenceSchema();
	return {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		title: "Vortex Studio story draft",
		type: "object",
		properties: {
			grs: { const: "story" },
			v: { const: 1 },
			scenes: {
				type: "array",
				minItems: 1,
				items: {
					type: "object",
					properties: {
						title: { type: "string" },
						steps: {
							type: "array",
							items: { $ref: "#/$defs/step" }
						}
					},
					required: ["steps"]
				}
			},
			characters: {
				type: "array",
				items: {
					type: "object",
					properties: {
						name: { type: "string" },
						expressions: {
							type: "array",
							items: { type: "string" }
						},
						note: { type: "string" }
					},
					required: ["name"]
				}
			},
			sequences: {
				type: "object",
				additionalProperties: { $ref: "#/$defs/sequence" }
			}
		},
		required: [
			"grs",
			"v",
			"scenes"
		],
		$defs: {
			...isObject(steps.$defs) ? steps.$defs : {},
			...sequence.defs,
			step: { oneOf: list(steps.oneOf).map(relaxStep) },
			sequence: sequence.schema
		}
	};
}
//#endregion
export { forEachAssetRef as $, TransitionModeSchema as $n, PORTRAIT_PICTURES as $r, TextSpeedSchema as $t, SpriteSheetSchema as A, FlagName as Ai, AutoplayEndStepSchema as An, ImageFitSchema as Ar, BoxStyleSchema as At, AssetKind as B, Unit as Bi, ForkStepSchema as Bn, BgStyleSchema as Br, DEFAULT_TEXT_SPEED as Bt, CollectionNodeSchema as C, ConditionSchema as Ci, transitionLength as Cn, DialogPlaybackSchema as Cr, TriggerPresentationSchema as Ct, GRAPHIC_BLEND_MODES as D, AssetKey as Di, leaveTarget as Dn, EASINGS as Dr, triggeredScenes as Dt, ThemeSchema as E, conditionUsesCompleted as Ei, forkBlockEnd as En, AnimationSchema as Er, triggerPresentation as Et, ASSET_KINDS as F, Pos as Fi, EXPR_CHANGES as Fn, SequenceItemSchema as Fr, DEFAULT_SCENE_GAP_MS as Ft, ROLE_PREFIX as G, MarkStepSchema as Gn, DEFAULT_PORTRAIT_SETTINGS as Gr, SceneStartSchema as Gt, IMAGE_SIZE as H, HoldEndStepSchema as Hn, TONE_MOODS as Hr, NameTagStyleSchema as Ht, ASSET_ORIGIN_KINDS as I, SCHEMA_VERSION as Ii, EndStepSchema as In, SequenceSchema as Ir, DEFAULT_SCENE_START as It, UPLOAD_MAX_BYTES as J, SetStepSchema as Jn, LinePortraitSchema as Jr, TAG_BORDER_PRESETS as Jt, UPLOAD_ACCEPT as K, NarrationStepSchema as Kn, FACE_SIDES as Kr, StorySettingsSchema as Kt, ASSET_PREFIX as L, SLOTS as Li, EventStepSchema as Ln, BG_STYLES as Lr, DEFAULT_SCENE_TITLE_GAP_MS as Lt, spriteFrame as M, HexColor as Mi, ChoiceOptionSchema as Mn, ImageMotionSchema as Mr, CornersSchema as Mt, spriteFrameRect as N, Id as Ni, ChoiceStepSchema as Nn, SequenceDefaultsSchema as Nr, DEFAULT_NAME_TAG as Nt, GraphicAppearanceSchema as O, AssetRefOrEmpty as Oi, routeChain as On, EasingSchema as Or, BACKGROUND_PRESETS as Ot, spriteStartOffset as P, LangCode as Pi, DelayStepSchema as Pn, SequenceIdSchema as Pr, DEFAULT_SCENE_FADE_MS as Pt, collectAssetRoles as Q, TransitionChannelSchema as Qn, PORTRAIT_LAYERS as Qr, TEXT_STYLES as Qt, ASSET_ROLES as R, Slot as Ri, ExprChangeSchema as Rn, BRIGHTNESS_MAX as Rr, DEFAULT_SCENE_TITLE_MS as Rt, ExportBundleSchema as S, resolveEffect as Si, resolveTransition as Sn, DEFAULT_AUTOPLAY_DELAY_MS as Sr, TRIGGER_PRESENTATIONS as St, FlagRegistrySchema as T, conditionFlags as Ti, effectiveWhen as Tn, resolveDialogPlayback as Tr, storyScenes as Tt, IMAGE_WIDTHS as U, LeaveStepSchema as Un, ToneMood as Ur, SCENE_CARD_MIN_MS as Ut, AssetManifestSchema as V, GotoStepSchema as Vn, StageOpSchema as Vr, DEFAULT_TEXT_STYLE as Vt, ROLE_MEDIA as W, LineStepSchema as Wn, DEFAULT_PORTRAIT_POSITION as Wr, SCENE_STARTS as Wt, VIDEO_WARN_BYTES as X, TRANSITION_CHANNELS as Xn, PORTRAIT_ANIMATIONS as Xr, TEXT_SPEEDS as Xt, UPLOAD_TYPES as Y, StepSchema as Yn, MAX_DIM_EXTRA as Yr, TEXT_PRESETS as Yt, assetSlugFromName as Z, TRANSITION_MODES as Zn, PORTRAIT_IF_TAKEN as Zr, TEXT_SPEED_CPS as Zt, migrateStoryDocument as _, EFFECT_SPECS as _i, portraitOf as _n, patchNarrationPresentation as _r, ContractSchema as _t, stepReference as a, PortraitLayerSchema as ai, CharacterHeadSchema as an, LineEntranceSchema as ar, renameAssetRefs as at, StoryDocumentSchema as b, Speed as bi, stagePictureOf as bn, resolveNarrationPresentation as br, SceneSchema as bt, referencedCharacters as c, PortraitShowSchema as ci, PortraitCropSchema as cn, NarrationPresentationSchema as cr, StringEntrySchema as ct, deriveContract as d, resolvePortraitEmphasis as di, expressionNames as dn, SpeakerBadgeSchema as dr, findMissingTranslations as dt, PORTRAIT_POSITIONS as ei, TextStyleSchema as en, TransitionStepSchema as er, formatAssetOriginRequest as et, eventResultFlag as f, resolvePortraitSettings as fi, faceOf as fn, TEXT_ALIGNMENTS as fr, findStaleTranslations as ft, SchemaVersionError as g, EFFECT_NAMES as gi, nameForLanguage as gn, lineModeIsAutomatic as gr, hashText as gt, STORY_MIGRATIONS as h, toneLookFor as hi, mergeCharacters as hn, automaticLineMode as hr, translationEntry as ht, stageReference as i, PortraitIfTakenSchema as ii, CharacterFitSchema as in, LINE_MODES as ir, parseByteRange as it, spriteCell as j, FlagValue as ji, AutoplayStartStepSchema as jn, ImageFocusSchema as jr, CORNERS as jt, GraphicSizeSchema as k, DurationMs as ki, routeIndex as kn, IMAGE_FOCUS as kr, BORDER_PRESETS as kt, renameCharacterRefs as l, PortraitToneSchema as li, characterFullName as ln, PresentationDefaultsSchema as lr, StringTableSchema as lt, validateStory as m, showsStage as mi, headOf as mn, TextPositionSchema as mr, textOf as mt, sequenceDraftJsonSchema as n, PORTRAIT_TONES as ni, resolveBoxStyle as nn, DEFAULT_NARRATION_PRESENTATION as nr, isAssetRole as nt, storyDraftJsonSchema as o, PortraitPictureSchema as oi, CharacterSchema as on, LinePresentationSchema as or, snapImageWidth as ot, hasErrors as p, showsDialog as pi, fitOf as pn, TEXT_POSITIONS as pr, markupMatches as pt, UPLOAD_ACCEPT_ALL as q, SequenceStepSchema as qn, FaceSideSchema as qr, TAG_BACKGROUND_PRESETS as qt, sequenceItemReference as r, PortraitAnimationSchema as ri, resolveNameTag as rn, LINE_ENTRANCES as rr, parseAssetOriginRequest as rt, autoplayBlockAt as s, PortraitSettingsSchema as si, DEFAULT_HEAD as sn, NARRATION_MODES as sr, sniffUploadType as st, describeType as t, PORTRAIT_SHOWS as ti, cpsOf as tn, DEFAULT_LINE_PRESENTATION as tr, isAssetPrefix as tt, standInCharacters as u, TONE_LOOK as ui, characterIdFromName as un, SPEAKER_BADGES as ur, extractMarkupTags as ut, parseStory as v, EffectName as vi, publicCharacter as vn, presentationForNewStep as vr, DEFAULT_TRIGGER_PRESENTATION as vt, CollectionSchema as w, SetOpSchema as wi, applyRoutes as wn, resolveAutoplaySettings as wr, TriggerSchema as wt, newStoryDocument as x, effectSettingsShape as xi, TRANSITION_DEFAULTS as xn, AutoplaySettingsSchema as xr, StorySchema as xt, MAX_DOCUMENT_BYTES as y, Size as yi, stageArtOf as yn, resolveLinePresentation as yr, FlagDeclSchema as yt, AssetEntrySchema as z, StringKey as zi, ForkRouteSchema as zn, BRIGHTNESS_MIN as zr, DEFAULT_STYLES as zt };
