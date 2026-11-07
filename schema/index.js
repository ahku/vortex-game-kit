import { S as SCHEMA_VERSION, x as StorySchema, y as deriveContract, z as SequenceItemSchema, A as StepSchema, B as StageOpSchema } from "../shared/validate.js";
import { C, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, T, U, V, W, X, Y, Z, _, $, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, aa, ab, i, ac, a, b, d, D, c, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap, aq, ar, as, at, au, av, aw, ax, ay, az, aA, aB, aC, aD, aE, aF, aG, aH, aI, aJ, aK, aL, aM, aN, aO, aP, aQ, aR, aS, aT, aU, aV, aW, aX, aY, aZ, a_, a$, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk, bl, bm, bn, bo, bp, bq, br, bs, bt, bu, bv, bw, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bK, bL, bM, bN, bO, bP, bQ, bR, bS, bT, bU, bV, bW, bX, bY, bZ, b_, b$, c0, c1, c2, c3, c4, c5, c6, c7, e, c8, c9, ca, cb, cc, cd, ce, cf, cg, ch, j, ci, cj, ck, cl, cm, cn, co, cp, cq, k, cr, cs, ct, cu, l, cv, cw, cx, w, cy, cz, cA, cB, cC, cD, cE, cF, h, cG, o, cH, p, cI, q, cJ, m, g, f, r, n, s, cK, cL, cM, cN, cO, cP, cQ, cR, cS, u, cT, cU, cV, t, cW, v } from "../shared/validate.js";
import { z } from "zod";
const MAX_DOCUMENT_BYTES = 15e5;
const STORY_MIGRATIONS = {
  // 1: (doc) => ({ ...doc, schemaVersion: 2, /* transform */ }),
};
class SchemaVersionError extends Error {
  constructor(message) {
    super(message);
    this.name = "SchemaVersionError";
  }
}
function migrateStoryDocument(raw) {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new SchemaVersionError("A story must be a JSON object.");
  }
  let doc = raw;
  const declared = doc.schemaVersion;
  if (typeof declared !== "number" || !Number.isInteger(declared) || declared < 1) {
    throw new SchemaVersionError("Missing or invalid schemaVersion.");
  }
  let version = declared;
  if (version > SCHEMA_VERSION) {
    throw new SchemaVersionError(
      `This story uses schema version ${version}, but this software only understands up to ${SCHEMA_VERSION}. Update the studio or engine.`
    );
  }
  while (version < SCHEMA_VERSION) {
    const step = STORY_MIGRATIONS[version];
    if (!step) throw new SchemaVersionError(`No migration from schema version ${version}.`);
    doc = step(doc);
    version = doc.schemaVersion;
  }
  return doc;
}
function parseStory(raw) {
  return StorySchema.parse(migrateStoryDocument(raw));
}
function referencedCharacters(story) {
  const seen = /* @__PURE__ */ new Set();
  for (const scene of story.scenes) {
    for (const step of scene.steps) if (step.type === "line") seen.add(step.speaker);
  }
  for (const id of deriveContract(story).characters) seen.add(id);
  return [...seen];
}
function standInCharacters(story, known) {
  const defined = new Set(known.map((c10) => c10.id));
  const lang = story.languages.source;
  return referencedCharacters(story).filter((id) => !defined.has(id)).map((id) => ({
    id,
    names: { [lang]: id.charAt(0).toUpperCase() + id.slice(1) },
    expressions: {}
  }));
}
function renameCharacterRefs(node, renames) {
  if (node === null || typeof node !== "object") return 0;
  let changed = 0;
  if (Array.isArray(node)) {
    for (const item of node) changed += renameCharacterRefs(item, renames);
    return changed;
  }
  const record = node;
  for (const [key, value] of Object.entries(record)) {
    if ((key === "speaker" || key === "who") && typeof value === "string") {
      const next = renames.get(value);
      if (next !== void 0) {
        record[key] = next;
        changed++;
      }
    } else if (key === "contract" && value !== null && typeof value === "object") {
      const ids = value.characters;
      if (Array.isArray(ids))
        ids.forEach((id, i2) => {
          const next = typeof id === "string" ? renames.get(id) : void 0;
          if (next !== void 0) {
            ids[i2] = next;
            changed++;
          }
        });
    } else if (key !== "characters") changed += renameCharacterRefs(value, renames);
  }
  return changed;
}
function autoplayBlockAt(steps, at2) {
  const open = [];
  for (let i2 = 0; i2 <= at2; i2++) {
    const step = steps[i2];
    if (!step || step.hidden) continue;
    if (step.type === "autoplay-start") open.push(step);
    if (i2 === at2) return open.at(-1);
    if (step.type === "autoplay-end") {
      const index = open.findIndex((start) => start.id === step.start);
      if (index >= 0) open.splice(index);
    }
  }
  return void 0;
}
const toJson = (schema) => z.toJSONSchema(schema, { io: "input", target: "draft-2020-12", reused: "ref" });
const isObject = (v2) => typeof v2 === "object" && v2 !== null;
const list = (v2) => Array.isArray(v2) ? v2.filter(isObject) : [];
const PATTERN_NAMES = [
  ["^[a-z0-9][a-z0-9_./-]", "asset name"],
  ["^[A-Za-z][A-Za-z0-9_.-]", "flag name"],
  ["^[A-Za-z][A-Za-z0-9_-]", "id"],
  ["^#[0-9a-fA-F]{6}", "color #rrggbb"]
];
function describeType(schema, defs = {}) {
  if (typeof schema.$ref === "string") {
    const def = defs[schema.$ref.split("/").pop() ?? ""];
    if (!isObject(def)) return "object";
    const variants = list(def.anyOf ?? def.oneOf);
    const props = (v2) => isObject(v2.properties) ? v2.properties : {};
    if (variants.some((v2) => "flag" in props(v2) || "completed" in props(v2))) return "a condition";
    if (variants.length > 0 && variants.every((v2) => "op" in props(v2))) return "a stage change";
    return describeType(def, defs);
  }
  if ("const" in schema) return JSON.stringify(schema.const);
  if (Array.isArray(schema.enum)) return schema.enum.map((v2) => JSON.stringify(v2)).join(" | ");
  const either = list(schema.anyOf ?? schema.oneOf);
  if (either.length > 0) {
    if (either.every((v2) => isObject(v2.properties) && "op" in v2.properties))
      return "a stage change";
    return [...new Set(either.map((v2) => describeType(v2, defs)))].join(" or ");
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
    case "boolean":
      return "true or false";
    case "object": {
      const keys = isObject(schema.properties) ? Object.keys(schema.properties) : [];
      return keys.length > 0 ? `object with ${keys.join(", ")}` : "object";
    }
    case "null":
      return "null";
    default:
      return "any";
  }
}
function describeShape(name, schema, defs) {
  const props = isObject(schema.properties) ? schema.properties : {};
  const required = new Set(Array.isArray(schema.required) ? schema.required : []);
  const fields = Object.entries(props).filter(([key]) => key !== "type" && key !== "op").map(([key, value]) => {
    const info = {
      name: key,
      type: describeType(isObject(value) ? value : {}, defs),
      required: required.has(key)
    };
    if (isObject(value) && "default" in value) info.default = JSON.stringify(value.default);
    return info;
  });
  return { name, fields };
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
const DRAFT_TYPES = {
  text: "words",
  prompt: "words",
  speaker: "character name",
  skipPromptKey: "words"
};
const stepReference = () => shapes(StepSchema, "type").filter((shape) => !["fork", "leave", "goto", "mark"].includes(shape.name)).map((shape) => ({
  ...shape,
  fields: shape.fields.filter((f2) => f2.name !== "inRoute").map((f2) => ({
    ...f2,
    ...f2.name === "id" ? { required: false } : {},
    ...f2.name in DRAFT_TYPES ? { type: DRAFT_TYPES[f2.name] } : {}
  }))
}));
const sequenceItemReference = () => shapes(SequenceItemSchema, "type").map(
  (shape) => shape.name === "text" ? {
    ...shape,
    fields: shape.fields.map(
      (f2) => f2.name === "textKey" ? { ...f2, name: "text", type: "words" } : f2
    )
  } : shape
);
const stageReference = () => shapes(StageOpSchema, "op");
const WORDS = { type: "string", minLength: 1 };
function relaxStep(step) {
  const props = isObject(step.properties) ? { ...step.properties } : {};
  for (const key of ["text", "prompt", "speaker"]) if (key in props) props[key] = WORDS;
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
        required: (Array.isArray(item.required) ? item.required : []).filter(
          (k2) => k2 !== "id"
        )
      }
    };
  }
  const required = (Array.isArray(step.required) ? step.required : []).filter(
    (k2) => k2 !== "id"
  );
  return { ...step, properties: props, required };
}
function relaxItem(item) {
  const props = isObject(item.properties) ? { ...item.properties } : {};
  if (!("textKey" in props)) return item;
  Reflect.deleteProperty(props, "textKey");
  props.text = WORDS;
  const required = (Array.isArray(item.required) ? item.required : []).map(
    (k2) => k2 === "textKey" ? "text" : k2
  );
  return { ...item, properties: props, required };
}
function sequenceSchema() {
  const json = JSON.parse(
    JSON.stringify(
      z.toJSONSchema(SequenceItemSchema, { io: "input", target: "draft-2020-12", reused: "ref" })
    ).replaceAll("__schema", "seq__schema")
  );
  return {
    schema: {
      type: "object",
      properties: {
        label: { type: "string", maxLength: 120 },
        items: { type: "array", items: { oneOf: list(json.oneOf).map(relaxItem) } }
      },
      required: ["items"]
    },
    defs: isObject(json.$defs) ? json.$defs : {}
  };
}
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
    required: ["grs", "v", "items"],
    $defs: defs
  };
}
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
            steps: { type: "array", items: { $ref: "#/$defs/step" } }
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
            expressions: { type: "array", items: { type: "string" } },
            note: { type: "string" }
          },
          required: ["name"]
        }
      },
      sequences: { type: "object", additionalProperties: { $ref: "#/$defs/sequence" } }
    },
    required: ["grs", "v", "scenes"],
    $defs: {
      ...isObject(steps.$defs) ? steps.$defs : {},
      ...sequence.defs,
      step: { oneOf: list(steps.oneOf).map(relaxStep) },
      sequence: sequence.schema
    }
  };
}
export {
  C as ASSET_KINDS,
  E as ASSET_ORIGIN_KINDS,
  F as ASSET_PREFIX,
  G as ASSET_ROLES,
  H as AnimationSchema,
  I as AssetEntrySchema,
  J as AssetKey,
  K as AssetKind,
  L as AssetManifestSchema,
  M as AssetRefOrEmpty,
  N as AutoplayEndStepSchema,
  O as AutoplaySettingsSchema,
  P as AutoplayStartStepSchema,
  Q as BACKGROUND_PRESETS,
  R as BG_STYLES,
  T as BORDER_PRESETS,
  U as BRIGHTNESS_MAX,
  V as BRIGHTNESS_MIN,
  W as BgStyleSchema,
  X as BoxStyleSchema,
  Y as CORNERS,
  Z as CharacterFitSchema,
  _ as CharacterHeadSchema,
  $ as CharacterSchema,
  a0 as ChoiceOptionSchema,
  a1 as ChoiceStepSchema,
  a2 as CollectionNodeSchema,
  a3 as CollectionSchema,
  a4 as ConditionSchema,
  a5 as ContractSchema,
  a6 as CornersSchema,
  a7 as DEFAULT_AUTOPLAY_DELAY_MS,
  a8 as DEFAULT_HEAD,
  a9 as DEFAULT_LINE_PRESENTATION,
  aa as DEFAULT_NAME_TAG,
  ab as DEFAULT_NARRATION_PRESENTATION,
  i as DEFAULT_PORTRAIT_POSITION,
  ac as DEFAULT_PORTRAIT_SETTINGS,
  a as DEFAULT_SCENE_FADE_MS,
  b as DEFAULT_SCENE_GAP_MS,
  d as DEFAULT_SCENE_START,
  D as DEFAULT_SCENE_TITLE_GAP_MS,
  c as DEFAULT_SCENE_TITLE_MS,
  ad as DEFAULT_STYLES,
  ae as DEFAULT_TEXT_SPEED,
  af as DEFAULT_TEXT_STYLE,
  ag as DEFAULT_TRIGGER_PRESENTATION,
  ah as DelayStepSchema,
  ai as DialogPlaybackSchema,
  aj as DurationMs,
  ak as EASINGS,
  al as EFFECT_NAMES,
  am as EFFECT_SPECS,
  an as EXPR_CHANGES,
  ao as EasingSchema,
  ap as EffectName,
  aq as EndStepSchema,
  ar as EventStepSchema,
  as as ExportBundleSchema,
  at as ExprChangeSchema,
  au as FACE_SIDES,
  av as FaceSideSchema,
  aw as FlagDeclSchema,
  ax as FlagName,
  ay as FlagRegistrySchema,
  az as FlagValue,
  aA as ForkRouteSchema,
  aB as ForkStepSchema,
  aC as GRAPHIC_BLEND_MODES,
  aD as GotoStepSchema,
  aE as GraphicAppearanceSchema,
  aF as GraphicSizeSchema,
  aG as HexColor,
  aH as HoldEndStepSchema,
  aI as IMAGE_FOCUS,
  aJ as IMAGE_SIZE,
  aK as IMAGE_WIDTHS,
  aL as Id,
  aM as ImageFitSchema,
  aN as ImageFocusSchema,
  aO as ImageMotionSchema,
  aP as LINE_ENTRANCES,
  aQ as LINE_MODES,
  aR as LangCode,
  aS as LeaveStepSchema,
  aT as LineEntranceSchema,
  aU as LinePortraitSchema,
  aV as LinePresentationSchema,
  aW as LineStepSchema,
  aX as MAX_DIM_EXTRA,
  MAX_DOCUMENT_BYTES,
  aY as MarkStepSchema,
  aZ as NARRATION_MODES,
  a_ as NameTagStyleSchema,
  a$ as NarrationPresentationSchema,
  b0 as NarrationStepSchema,
  b1 as PORTRAIT_ANIMATIONS,
  b2 as PORTRAIT_IF_TAKEN,
  b3 as PORTRAIT_LAYERS,
  b4 as PORTRAIT_PICTURES,
  b5 as PORTRAIT_POSITIONS,
  b6 as PORTRAIT_SHOWS,
  b7 as PORTRAIT_TONES,
  b8 as PortraitAnimationSchema,
  b9 as PortraitCropSchema,
  ba as PortraitIfTakenSchema,
  bb as PortraitLayerSchema,
  bc as PortraitPictureSchema,
  bd as PortraitSettingsSchema,
  be as PortraitShowSchema,
  bf as PortraitToneSchema,
  bg as Pos,
  bh as PresentationDefaultsSchema,
  bi as ROLE_MEDIA,
  bj as ROLE_PREFIX,
  bk as SCENE_CARD_MIN_MS,
  bl as SCENE_STARTS,
  SCHEMA_VERSION,
  bm as SLOTS,
  bn as SPEAKER_BADGES,
  STORY_MIGRATIONS,
  bo as SceneSchema,
  bp as SceneStartSchema,
  SchemaVersionError,
  bq as SequenceDefaultsSchema,
  br as SequenceIdSchema,
  SequenceItemSchema,
  bs as SequenceSchema,
  bt as SequenceStepSchema,
  bu as SetOpSchema,
  bv as SetStepSchema,
  bw as Size,
  bx as Slot,
  by as SpeakerBadgeSchema,
  bz as Speed,
  bA as SpriteSheetSchema,
  StageOpSchema,
  StepSchema,
  bB as StoryDocumentSchema,
  StorySchema,
  bC as StorySettingsSchema,
  bD as StringEntrySchema,
  bE as StringKey,
  bF as StringTableSchema,
  bG as TAG_BACKGROUND_PRESETS,
  bH as TAG_BORDER_PRESETS,
  bI as TEXT_ALIGNMENTS,
  bJ as TEXT_POSITIONS,
  bK as TEXT_PRESETS,
  bL as TEXT_SPEEDS,
  bM as TEXT_SPEED_CPS,
  bN as TEXT_STYLES,
  bO as TONE_LOOK,
  bP as TONE_MOODS,
  bQ as TRANSITION_CHANNELS,
  bR as TRANSITION_DEFAULTS,
  bS as TRANSITION_MODES,
  bT as TRIGGER_PRESENTATIONS,
  bU as TextPositionSchema,
  bV as TextSpeedSchema,
  bW as TextStyleSchema,
  bX as ThemeSchema,
  bY as ToneMood,
  bZ as TransitionChannelSchema,
  b_ as TransitionModeSchema,
  b$ as TransitionStepSchema,
  c0 as TriggerPresentationSchema,
  c1 as TriggerSchema,
  c2 as UPLOAD_ACCEPT,
  c3 as UPLOAD_ACCEPT_ALL,
  c4 as UPLOAD_MAX_BYTES,
  c5 as UPLOAD_TYPES,
  c6 as Unit,
  c7 as VIDEO_WARN_BYTES,
  e as applyRoutes,
  c8 as assetSlugFromName,
  c9 as automaticLineMode,
  autoplayBlockAt,
  ca as characterFullName,
  cb as characterIdFromName,
  cc as collectAssetRoles,
  cd as conditionFlags,
  ce as conditionUsesCompleted,
  cf as cpsOf,
  deriveContract,
  describeType,
  cg as effectSettingsShape,
  ch as effectiveWhen,
  j as eventResultFlag,
  ci as expressionNames,
  cj as extractMarkupTags,
  ck as faceOf,
  cl as findMissingTranslations,
  cm as findStaleTranslations,
  cn as fitOf,
  co as forEachAssetRef,
  cp as forkBlockEnd,
  cq as formatAssetOriginRequest,
  k as hasErrors,
  cr as hashText,
  cs as headOf,
  ct as isAssetPrefix,
  cu as isAssetRole,
  l as leaveTarget,
  cv as lineModeIsAutomatic,
  cw as markupMatches,
  cx as mergeCharacters,
  migrateStoryDocument,
  w as nameForLanguage,
  cy as newStoryDocument,
  cz as parseAssetOriginRequest,
  cA as parseByteRange,
  parseStory,
  cB as patchNarrationPresentation,
  cC as portraitOf,
  cD as presentationForNewStep,
  cE as publicCharacter,
  referencedCharacters,
  cF as renameAssetRefs,
  renameCharacterRefs,
  h as resolveAutoplaySettings,
  cG as resolveBoxStyle,
  o as resolveDialogPlayback,
  cH as resolveEffect,
  p as resolveLinePresentation,
  cI as resolveNameTag,
  q as resolveNarrationPresentation,
  cJ as resolvePortraitEmphasis,
  m as resolvePortraitSettings,
  g as resolveTransition,
  f as routeChain,
  r as routeIndex,
  sequenceDraftJsonSchema,
  sequenceItemReference,
  n as showsDialog,
  s as showsStage,
  cK as snapImageWidth,
  cL as sniffUploadType,
  cM as spriteCell,
  cN as spriteFrame,
  cO as spriteFrameRect,
  cP as spriteStartOffset,
  cQ as stageArtOf,
  cR as stagePictureOf,
  stageReference,
  standInCharacters,
  stepReference,
  storyDraftJsonSchema,
  cS as storyScenes,
  u as textOf,
  cT as toneLookFor,
  cU as transitionLength,
  cV as translationEntry,
  t as triggerPresentation,
  cW as triggeredScenes,
  v as validateStory
};
