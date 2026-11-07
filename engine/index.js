import { D as DEFAULT_SCENE_TITLE_GAP_MS, a as DEFAULT_SCENE_FADE_MS, b as DEFAULT_SCENE_GAP_MS, c as DEFAULT_SCENE_TITLE_MS, d as DEFAULT_SCENE_START, l as leaveTarget, t as triggerPresentation, r as routeIndex, e as applyRoutes, f as routeChain, g as resolveTransition, h as resolveAutoplaySettings, s as showsStage, i as DEFAULT_PORTRAIT_POSITION, j as eventResultFlag, v as validateStory, k as hasErrors, m as resolvePortraitSettings, n as showsDialog, o as resolveDialogPlayback, p as resolveLinePresentation, q as resolveNarrationPresentation, u as textOf, w as nameForLanguage } from "../shared/validate.js";
import "zod";
const ENGINE_API_VERSION = 1;
function evaluateCondition(cond, ctx) {
  if ("flag" in cond) {
    const value = ctx.getFlag(cond.flag);
    if ("is" in cond) return value !== void 0 && value === cond.is;
    if ("isNot" in cond) return value === void 0 || value !== cond.isNot;
    if (typeof value !== "number") return false;
    if ("gt" in cond) return value > cond.gt;
    if ("gte" in cond) return value >= cond.gte;
    if ("lt" in cond) return value < cond.lt;
    return value <= cond.lte;
  }
  if ("completed" in cond) return ctx.isCompleted?.(cond.completed) ?? false;
  if ("and" in cond) return cond.and.every((c) => evaluateCondition(c, ctx));
  if ("or" in cond) return cond.or.some((c) => evaluateCondition(c, ctx));
  return !evaluateCondition(cond.not, ctx);
}
function applySetOp(current, op) {
  if ("to" in op) return op.to;
  return (typeof current === "number" ? current : 0) + op.add;
}
function initialFlags(story, registry) {
  const store = {};
  for (const [name, decl] of Object.entries(registry?.flags ?? {})) store[name] = decl.default;
  for (const [name, decl] of Object.entries(story.flags)) store[name] = decl.default;
  return store;
}
const TITLE_TAIL_MS = DEFAULT_SCENE_TITLE_GAP_MS;
function fade(id, mode, outMs, inMs, stage, holdMs = 0, dialog = false) {
  return {
    id,
    type: "transition",
    mode,
    color: "#000000",
    // The dialog box is only part of a fade when one is on screen: the player keeps the last text step's box up
    // for it, so asking for it after a sequence or at the start of a scene would bring an old box back.
    affects: dialog ? ["picture", "dialog"] : ["picture"],
    outMs,
    holdMs,
    inMs,
    skippable: false,
    ...stage ? { stage } : {}
  };
}
function flattenScenes(story) {
  const storyOutMs = story.settings?.sceneFadeOutMs ?? DEFAULT_SCENE_FADE_MS;
  const storyInMs = story.settings?.sceneFadeInMs ?? DEFAULT_SCENE_FADE_MS;
  const storyGapMs = story.settings?.sceneGapMs ?? DEFAULT_SCENE_GAP_MS;
  const storyTitleMs = story.settings?.sceneTitleMs ?? DEFAULT_SCENE_TITLE_MS;
  const titleGapMs = story.settings?.sceneTitleGapMs ?? DEFAULT_SCENE_TITLE_GAP_MS;
  const inStory = story.scenes.filter((sc) => !sc.trigger);
  const ordered = [...inStory, ...story.scenes.filter((sc) => sc.trigger)];
  const triggered = new Set(story.scenes.filter((sc) => sc.trigger).map((sc) => sc.id));
  const flat = [];
  const leaves = /* @__PURE__ */ new Map();
  const sceneEnds = /* @__PURE__ */ new Map();
  ordered.forEach((scene, s) => {
    let entries = [];
    const trig = triggered.has(scene.id);
    const outMs = trig ? 0 : storyOutMs;
    const inMs = trig ? 0 : storyInMs;
    const gapMs = trig ? 0 : storyGapMs;
    const titleMs = trig ? 0 : storyTitleMs;
    const startMode = trig ? "quiet" : scene.meta.start ?? story.settings?.sceneStart ?? DEFAULT_SCENE_START;
    scene.steps.forEach((step, n) => {
      if (step.type === "leave") leaves.set(step.id, leaveTarget(scene.steps, n));
      if (step.type === "goto" && step.scene !== void 0 && step.mark === void 0)
        leaves.set(step.id, { scene: step.scene });
      if (step.type === "goto" && step.mark !== void 0 && step.scene === void 0)
        leaves.set(step.id, { mark: step.mark });
    });
    const pause = s > 0 ? gapMs : 0;
    const bgAsset = trig && triggerPresentation(scene) === "overlay" ? void 0 : scene.meta.backgroundAsset;
    const bgOp = bgAsset ? [{ op: "bg", asset: bgAsset }] : [];
    const uncover = s > 0 ? outMs > 0 || inMs > 0 || pause > 0 : inMs > 0;
    const carrier = uncover || bgOp.length > 0;
    const routes = routeIndex(scene.steps);
    applyRoutes(scene.steps).forEach((step, n) => {
      const start = n === 0;
      const chain = routeChain(scene.steps[n], routes).map(({ fork, route }) => {
        const when = [fork.when, route.when].filter((c) => c !== void 0);
        return {
          fork: fork.id,
          route: route.id,
          ...when.length > 0 ? { when: when.length === 1 ? when[0] : { and: when } } : {}
        };
      });
      const own = scene.steps[n].when;
      const inForks = chain.length > 0 ? { chain, ...own ? { own } : {} } : {};
      if (start && carrier && step.type !== "transition") {
        const moves = !step.hidden && !step.when;
        const { stage, ...rest } = step;
        const under = [...bgOp, ...moves ? stage ?? [] : []];
        entries.push({
          sceneId: scene.id,
          sceneStart: false,
          step: fade(
            `scene-in:${scene.id}`,
            "through",
            0,
            inMs,
            under.length > 0 ? under : void 0,
            pause
          )
        });
        entries.push({
          sceneId: scene.id,
          sceneStart: true,
          step: moves ? rest : step,
          ...inForks
        });
      } else {
        const first = start && step.type === "transition" && bgOp.length > 0 ? { ...step, stage: [...bgOp, ...step.stage ?? []] } : step;
        entries.push({ sceneId: scene.id, sceneStart: start, step: first, ...inForks });
      }
    });
    const meta = scene.meta;
    const firstAt = entries.findIndex((e) => e.sceneStart);
    if (titleMs > 0 && startMode === "title" && (meta.title?.trim() || meta.displayTitle) && firstAt >= 0) {
      const first = entries[firstAt];
      if (first.step.type !== "transition") {
        entries[firstAt] = { ...first, sceneStart: false };
        entries.splice(firstAt, 0, {
          sceneId: scene.id,
          sceneStart: false,
          title: titleMs,
          step: {
            id: `scene-title:${scene.id}`,
            type: "delay",
            ms: titleMs,
            skippable: true
          }
        });
        if (titleGapMs > 0)
          entries.splice(firstAt + 1, 0, {
            sceneId: scene.id,
            sceneStart: false,
            step: {
              id: `scene-title-tail:${scene.id}`,
              type: "delay",
              ms: titleGapMs,
              skippable: true
            }
          });
      }
    }
    if (outMs > 0) {
      const lastShown = (before) => {
        for (let i = before - 1; i >= 0; i--) if (!entries[i].step.hidden) return i;
        return -1;
      };
      let insertAt = entries.length;
      let at = lastShown(entries.length);
      if (at >= 0 && entries[at].step.type === "end") {
        insertAt = at;
        at = lastShown(at);
      }
      const last = entries[at]?.step;
      if (last && last.type !== "transition") {
        const held = last.type === "sequence" && last.blocking && !last.hold ? last : null;
        if (held) entries[at] = { ...entries[at], step: { ...held, hold: true } };
        let shown = at;
        while (shown > 0 && (entries[shown].step.hidden || entries[shown].step.type === "set"))
          shown--;
        const text = ["line", "narration"].includes(entries[shown]?.step.type ?? "");
        const added = [
          {
            sceneId: scene.id,
            sceneStart: false,
            step: fade(`scene-out:${scene.id}`, "out", outMs, 0, void 0, 0, text)
          }
        ];
        if (held)
          added.push({
            sceneId: scene.id,
            sceneStart: false,
            step: {
              id: `scene-hold-end:${scene.id}`,
              type: "hold-end",
              start: held.id,
              ending: "cut",
              fadeMs: 0
            }
          });
        entries.splice(insertAt, 0, ...added);
        sceneEnds.set(scene.id, added[0].step.id);
      }
    }
    if (scene.after && !trig) {
      const id = `scene-after:${scene.id}`;
      entries.push({
        sceneId: scene.id,
        sceneStart: false,
        step: { id, type: "leave", from: "scene" }
      });
      leaves.set(id, "end" in scene.after ? "end" : { scene: scene.after.scene });
    }
    if (startMode === "quiet")
      entries = entries.map((e) => e.sceneStart ? { ...e, quiet: true } : e);
    if (startMode === "corner")
      entries = entries.map((e) => e.sceneStart ? { ...e, corner: true } : e);
    const sceneWhen = scene.when;
    if (sceneWhen)
      entries = entries.map((e) => ({
        ...e,
        step: { ...e.step, when: e.step.when ? { and: [sceneWhen, e.step.when] } : sceneWhen },
        ...e.chain ? { own: e.own ? { and: [sceneWhen, e.own] } : sceneWhen } : {}
      }));
    flat.push(...entries);
  });
  const firstOf = /* @__PURE__ */ new Map();
  for (const e of flat) if (!firstOf.has(e.sceneId)) firstOf.set(e.sceneId, e.step.id);
  const sceneOrder = inStory.map((sc) => sc.id);
  const flatIds = new Set(flat.map((e) => e.step.id));
  return flat.map((e) => {
    if (e.step.type !== "leave" && e.step.type !== "goto" || !leaves.has(e.step.id)) return e;
    const target = leaves.get(e.step.id);
    if (target === void 0) return e;
    if (target === "end") return { ...e, jump: null };
    if (typeof target === "object" && "mark" in target) {
      return flatIds.has(target.mark) ? { ...e, jump: target.mark } : e;
    }
    if (typeof target === "object") {
      const to = firstOf.get(target.scene);
      return to === void 0 ? e : { ...e, jump: to };
    }
    if (target !== "scene") return { ...e, jump: target };
    if (triggered.has(e.sceneId)) return { ...e, jump: null };
    const own = sceneEnds.get(e.sceneId);
    if (own) return { ...e, jump: own };
    for (let i = sceneOrder.indexOf(e.sceneId) + 1; i < sceneOrder.length; i++) {
      const next = firstOf.get(sceneOrder[i]);
      if (next) return { ...e, jump: next };
    }
    return { ...e, jump: null };
  });
}
function emptyStage() {
  return { background: null, music: null, tone: null, portraits: {}, objects: {}, veil: null };
}
function omit(value, ...keys) {
  const copy = { ...value };
  for (const key of keys) delete copy[key];
  return copy;
}
function without(record, key) {
  return Object.fromEntries(Object.entries(record).filter(([k]) => k !== key));
}
const contextOf = (ctx) => typeof ctx === "function" ? { defaultExpression: ctx } : ctx ?? {};
function occupantsOf(stage, slot, who) {
  return Object.entries(stage.portraits).filter(([id, p]) => id !== who && p.slot === slot && !p.pos).map(([id]) => id);
}
function applyStageOp(stage, op, context = {}) {
  const defaultExpression = contextOf(context).defaultExpression ?? (() => void 0);
  switch (op.op) {
    case "bg":
      return { ...stage, background: op.asset };
    case "music":
      return {
        ...stage,
        music: op.asset === null ? null : { asset: op.asset, volume: op.volume ?? 1 }
      };
    case "tone":
      return { ...stage, tone: op.mood };
    case "dim": {
      const next = { ...stage };
      delete next.dim;
      return op.amount > 0 ? { ...next, dim: op.amount } : next;
    }
    case "backdrop": {
      const next = { ...stage };
      delete next.backdrop;
      const brightness = op.brightness !== void 0 && op.brightness !== 1 ? op.brightness : void 0;
      const blur = op.blur ? op.blur : void 0;
      return brightness !== void 0 || blur !== void 0 ? {
        ...next,
        backdrop: {
          ...brightness !== void 0 ? { brightness } : {},
          ...blur !== void 0 ? { blur } : {}
        }
      } : next;
    }
    case "light": {
      const current = stage.portraits[op.who];
      if (!current) return stage;
      const rest = omit(current, "brightness");
      return {
        ...stage,
        portraits: {
          ...stage.portraits,
          [op.who]: op.brightness === 1 ? rest : { ...rest, brightness: op.brightness }
        }
      };
    }
    case "enter": {
      const expr = op.expr ?? defaultExpression(op.who);
      const kept = op.share === false && op.slot && !op.pos ? occupantsOf(stage, op.slot, op.who).reduce(without, stage.portraits) : stage.portraits;
      return {
        ...stage,
        portraits: {
          ...kept,
          [op.who]: {
            ...op.slot ? { slot: op.slot } : {},
            ...op.pos ? { pos: op.pos } : {},
            ...expr ? { expr } : {},
            ...op.flip ? { flip: true } : {},
            ...op.layer ? { layer: op.layer } : {}
          }
        }
      };
    }
    case "exit":
      return { ...stage, portraits: without(stage.portraits, op.who) };
    case "expr": {
      const current = stage.portraits[op.who];
      if (!current) return stage;
      const held = omit(current, "exprChange");
      return {
        ...stage,
        portraits: { ...stage.portraits, [op.who]: { ...held, expr: op.expr } }
      };
    }
    case "show":
      return {
        ...stage,
        objects: {
          ...stage.objects,
          [op.id]: {
            asset: op.asset,
            ...op.slot ? { slot: op.slot } : {},
            ...op.pos ? { pos: op.pos } : {},
            layer: op.layer ?? "front"
          }
        }
      };
    case "hide":
      return { ...stage, objects: without(stage.objects, op.id) };
    case "clear":
      return { ...stage, portraits: {}, objects: {} };
    case "sfx":
    case "effect":
      return stage;
  }
}
function applyStageOps(stage, ops, context) {
  return ops.reduce((s, op) => applyStageOp(s, op, context), stage);
}
function dropTemporary(stage) {
  const ids = Object.entries(stage.portraits).filter(([, p]) => p.temporary).map(([id]) => id);
  return ids.length === 0 ? stage : { ...stage, portraits: ids.reduce(without, stage.portraits) };
}
function applyLinePortrait(stage, step, context) {
  const who = step.speaker;
  const p = step.portrait;
  const cur = stage.portraits[who];
  const layer = p?.layer ?? cur?.layer;
  const held = cur ? omit(cur, "exprChange") : {};
  const change = cur && step.expr && step.expr !== (cur.expr ?? context.defaultExpression?.(who)) && step.exprChange ? { exprChange: step.exprChange } : {};
  const put = (entry) => ({
    ...stage,
    portraits: { ...stage.portraits, [who]: { ...entry, ...layer ? { layer } : {} } }
  });
  const byDefault = p?.show !== void 0 ? showsStage(p.show) : context.stageByDefault !== false;
  const ownSide = p?.faceSide === "left" || p?.faceSide === "right" ? p.faceSide : void 0;
  const picture = p?.picture ?? (cur || byDefault && (step.expr || context.defaultExpression?.(who) || context.hasPicture?.(who)) ? "temporary" : "face");
  if (picture === "face") return stage;
  if (picture === "leave") {
    if (!cur) return stage;
    return put({ ...held, ...step.expr ? { expr: step.expr } : {}, ...change, temporary: true });
  }
  const expr = step.expr ?? cur?.expr ?? context.defaultExpression?.(who);
  const flip = p?.flip ?? cur?.flip;
  if (cur && !cur.temporary && picture === "temporary") {
    const to = p?.slot ?? (!p?.pos ? ownSide : void 0);
    const moves = p?.pos !== void 0 || to !== void 0;
    const unplaced = omit(held, "slot", "pos");
    return put({
      ...moves ? unplaced : held,
      ...p?.pos ? { pos: p.pos } : to ? { slot: to } : {},
      ...step.expr ? { expr: step.expr } : {},
      ...change
    });
  }
  const free = p?.pos;
  const slot = free ? void 0 : p?.slot ?? ownSide ?? cur?.slot ?? context.home?.(who) ?? context.speakerSide?.(who, p) ?? DEFAULT_PORTRAIT_POSITION;
  let portraits = stage.portraits;
  if (slot) {
    const there = occupantsOf(stage, slot, who);
    if (picture === "stage") {
      const out = (p?.ifTaken ?? "replace") === "replace" ? there : there.slice(0, there.length - 1);
      portraits = out.reduce(without, portraits);
    }
  }
  return {
    ...stage,
    portraits: {
      ...portraits,
      [who]: {
        ...slot ? { slot } : {},
        ...free ? { pos: free } : {},
        ...expr ? { expr } : {},
        ...change,
        ...flip ? { flip: true } : {},
        ...layer ? { layer } : {},
        ...cur?.brightness ? { brightness: cur.brightness } : {},
        ...picture === "temporary" ? { temporary: true } : {}
      }
    }
  };
}
function applyStep(stage, step, context) {
  const ctx = contextOf(context);
  const ops = step.stage ?? [];
  const fadingOut = step.type === "transition" && resolveTransition(step).mode === "out";
  let next = applyStageOps(
    fadingOut ? stage : dropTemporary(stage),
    ops.filter((op) => op.op !== "light"),
    ctx
  );
  if (step.type === "autoplay-start") {
    next = {
      ...next,
      autoplay: [
        ...(next.autoplay ?? []).filter((entry) => entry.start !== step.id),
        { start: step.id, settings: resolveAutoplaySettings(step.settings) }
      ]
    };
  }
  if (step.type === "autoplay-end") {
    const at = next.autoplay?.findIndex((entry) => entry.start === step.start) ?? -1;
    if (at >= 0) {
      const remaining = next.autoplay.slice(0, at);
      next = { ...next };
      if (remaining.length) next.autoplay = remaining;
      else delete next.autoplay;
    }
  }
  if (step.type === "line") next = applyLinePortrait(next, step, ctx);
  next = applyStageOps(
    next,
    ops.filter((op) => op.op === "light"),
    ctx
  );
  if (step.type !== "transition") return next;
  const t = resolveTransition(step);
  return { ...next, veil: t.mode === "out" ? { color: t.color, affects: t.affects } : null };
}
const MAX_JUMPS = 1e3;
function createEngine() {
  const listeners = /* @__PURE__ */ new Set();
  let bundle = null;
  let options = {};
  let steps = [];
  let indexById = /* @__PURE__ */ new Map();
  let tables = {};
  let lang = "en";
  let flags = {};
  let baseFlags = {};
  let history = [];
  let visits = {};
  let stage = emptyStage();
  let phase = "idle";
  let cursor = -1;
  const openHolds = /* @__PURE__ */ new Map();
  let lastScene;
  let exitName;
  let current = null;
  let handledEvents = /* @__PURE__ */ new Set();
  let ignoreWhen = false;
  let chosenRoutes = /* @__PURE__ */ new Map();
  let storyEnd = 0;
  let playing = null;
  const emit = (key, ...args) => {
    for (const l of [...listeners]) {
      const fn = l[key];
      fn?.apply(l, args);
    }
  };
  const requireBundle = () => {
    if (!bundle) throw new Error("No story loaded. Call load() first.");
    return bundle;
  };
  const text = (key) => {
    const own = textOf(tables[lang]?.entries[key]);
    if (own !== void 0) return own;
    const source = requireBundle().story.languages.source;
    return textOf(tables[source]?.entries[key]) ?? `⟦${key}⟧`;
  };
  const character = (id) => requireBundle().characters.find((c) => c.id === id);
  const characterName = (id) => {
    const names = character(id)?.names;
    if (!names) return id;
    return nameForLanguage(names, lang, requireBundle().story.languages.source) ?? id;
  };
  const stageContext = {
    defaultExpression: (id) => character(id)?.defaultExpression,
    hasPicture: (id) => Object.keys(character(id)?.expressions ?? {}).length > 0,
    home: (id) => character(id)?.home,
    speakerSide: (id, portrait) => {
      const settings = resolvePortraitSettings(requireBundle().story.settings?.portraits);
      if (!showsDialog(portrait?.show ?? settings.show)) return void 0;
      const side = portrait?.faceSide ?? character(id)?.faceSide ?? settings.faceSide;
      return side === "follow" ? void 0 : side;
    },
    get stageByDefault() {
      return showsStage(resolvePortraitSettings(requireBundle().story.settings?.portraits).show);
    }
  };
  const getFlag = (name) => flags[name];
  const writeFlag = (name, value) => {
    const previous = flags[name];
    flags = { ...flags, [name]: value };
    if (previous !== value) emit("flagChanged", name, value, previous);
  };
  const ctx = {
    getFlag,
    isCompleted: (id) => options.isCompleted?.(id) ?? false
  };
  const holds = (step) => ignoreWhen || step.when === void 0 || evaluateCondition(step.when, ctx);
  const holdsFlat = (flat) => {
    const chain = flat.chain;
    if (ignoreWhen || !chain || chosenRoutes.size === 0) return holds(flat.step);
    let picked = false;
    for (const link of chain) {
      const route = chosenRoutes.get(link.fork);
      if (route === void 0) continue;
      if (route !== link.route) return false;
      picked = true;
    }
    if (!picked) return holds(flat.step);
    const rest = chain.flatMap((l) => !chosenRoutes.has(l.fork) && l.when ? [l.when] : []);
    if (flat.own) rest.push(flat.own);
    return rest.every((c) => evaluateCondition(c, ctx));
  };
  const present = (view, ops) => {
    current = { view, stage };
    emit("view", view, stage, ops);
  };
  const transientsOf = (ops) => ops.filter((o) => o.op === "effect" || o.op === "sfx");
  const viewFor = (step, covered = false) => {
    const story = requireBundle().story;
    const scene = story.scenes.find((s) => s.steps.some((item) => item.id === step.id));
    const active = stage.autoplay?.at(-1)?.settings;
    const durationMs = step.type === "line" || step.type === "narration" ? step.playback?.durationMs : void 0;
    const legacy = (step.type === "line" || step.type === "narration") && (scene?.playback || step.playback || story.settings?.autoplayDelayMs !== void 0 || story.settings?.autoplayAllowManualAdvance !== void 0) ? resolveDialogPlayback(story.settings, scene?.playback, step.playback) : void 0;
    const resolved = active ? { ...active, ...durationMs === void 0 ? {} : { durationMs } } : legacy;
    const playback = resolved ? { playback: resolved } : {};
    switch (step.type) {
      case "narration":
        return {
          kind: "narration",
          presentation: resolveNarrationPresentation(
            step.presentation,
            story.settings?.presentation
          ),
          ...playback,
          stepId: step.id,
          text: text(step.text),
          ...step.voice ? { voice: step.voice } : {},
          ...step.voice && step.duckMusic === false ? { duckMusic: false } : {}
        };
      case "line": {
        const color = character(step.speaker)?.color;
        const speakerBadge = character(step.speaker)?.speakerBadge;
        return {
          kind: "line",
          // With no style chosen, a speaker whose stage portrait shows gets a plain box, not a face box.
          presentation: resolveLinePresentation(step.presentation, story.settings?.presentation, {
            stagePortrait: !!step.speaker && !!stage.portraits[step.speaker] && Object.keys(character(step.speaker)?.expressions ?? {}).length > 0
          }),
          ...speakerBadge ? { speakerBadge } : {},
          ...playback,
          stepId: step.id,
          speaker: step.speaker,
          speakerName: characterName(step.speaker),
          ...color ? { speakerColor: color } : {},
          ...step.expr ? { expr: step.expr } : {},
          ...step.portrait ? { portrait: step.portrait } : {},
          text: text(step.text),
          ...step.voice ? { voice: step.voice } : {},
          ...step.voice && step.duckMusic === false ? { duckMusic: false } : {}
        };
      }
      case "choice": {
        const options2 = step.options.filter((o) => holds(o)).map((o) => ({ id: o.id, text: text(o.text) }));
        return {
          kind: "choice",
          stepId: step.id,
          ...step.prompt ? { prompt: text(step.prompt) } : {},
          options: options2
        };
      }
      case "sequence":
        return {
          kind: "sequence",
          ...playback,
          stepId: step.id,
          sequenceId: step.ref,
          sequence: requireBundle().story.sequences[step.ref] ?? { items: [] },
          blocking: step.blocking,
          hold: !!step.hold,
          keepDialog: !!step.keepDialog,
          layer: step.layer === "front" ? "front" : "behind",
          skippable: step.skippable,
          trigger: step.trigger,
          ...step.skipPromptKey ? { skipPrompt: text(step.skipPromptKey) } : {}
        };
      case "delay":
        return {
          kind: "delay",
          ...playback,
          stepId: step.id,
          ms: step.ms,
          skippable: !!step.skippable
        };
      case "transition":
        return {
          kind: "transition",
          ...playback,
          stepId: step.id,
          ...resolveTransition(step),
          covered
        };
      case "hold-end":
        return {
          kind: "hold-end",
          stepId: step.id,
          start: step.start,
          ending: step.ending,
          fadeMs: step.fadeMs
        };
      case "event":
        return {
          kind: "waiting-for-host",
          stepId: step.id,
          event: step.name,
          params: step.params ?? {}
        };
      default:
        return null;
    }
  };
  const sceneInfo = (sceneId) => {
    const scene = requireBundle().story.scenes.find((s) => s.id === sceneId);
    const m = scene.meta;
    return {
      sceneId,
      title: m.displayTitle ? text(m.displayTitle) : m.title,
      ...m.displaySubtitle ? { subtitle: text(m.displaySubtitle) } : m.subtitle ? { subtitle: m.subtitle } : {},
      ...m.location ? { location: m.location } : {},
      ...m.time ? { time: m.time } : {}
    };
  };
  const cornerOf = (sceneId) => {
    const scene = requireBundle().story.scenes.find((s) => s.id === sceneId);
    const mode = scene.trigger ? "quiet" : scene.meta.start ?? requireBundle().story.settings?.sceneStart ?? DEFAULT_SCENE_START;
    return mode === "corner" ? { ...sceneInfo(sceneId), corner: true } : sceneInfo(sceneId);
  };
  const endPlaying = (exit) => {
    const done = playing;
    if (!done) return;
    playing = null;
    ({ phase, cursor, stage, exitName, current, chosenRoutes } = done.outer);
    emit("playEnd", { sceneId: done.sceneId, exit });
  };
  const finish = (exit) => {
    if (playing) {
      endPlaying(exit);
      return;
    }
    phase = "ended";
    exitName = exit;
    const view = { kind: "ended", exit };
    present(view, []);
    emit("exit", exit);
  };
  const run = (from, force = false) => {
    let i = from;
    let jumps = 0;
    for (; ; ) {
      const flat = steps[i];
      const inRun = playing ? i >= playing.from && i < playing.to : i < storyEnd;
      if (!flat || !inRun) return finish("done");
      const { step } = flat;
      if (stage.autoplay) {
        const remaining = stage.autoplay.filter((entry) => {
          const start = steps.findIndex((candidate) => candidate.step.id === entry.start);
          const end = steps.findIndex(
            (candidate) => candidate.step.type === "autoplay-end" && candidate.step.start === entry.start
          );
          return start >= 0 && end >= 0 && i >= start && i <= end && steps[start]?.sceneId === flat.sceneId;
        });
        if (remaining.length !== stage.autoplay.length) {
          stage = { ...stage };
          if (remaining.length) stage.autoplay = remaining;
          else delete stage.autoplay;
        }
      }
      if (!(force && i === from) && (step.hidden || !holdsFlat(flat))) {
        i++;
        continue;
      }
      if (step.type === "choice" && !step.options.some((o) => holds(o))) {
        i++;
        continue;
      }
      cursor = i;
      if (!playing) {
        if (lastScene !== void 0 && flat.sceneId !== lastScene) {
          for (const [start, sceneId] of [...openHolds]) {
            if (sceneId === flat.sceneId) continue;
            openHolds.delete(start);
            present(
              {
                kind: "hold-end",
                stepId: `scene-end:${start}`,
                start,
                ending: "cut",
                fadeMs: 0,
                force: true
              },
              []
            );
          }
        }
        lastScene = flat.sceneId;
      }
      if (!playing) history.push(step.id);
      const ops = step.stage ?? [];
      const covered = stage.veil !== null;
      stage = applyStep(stage, step, stageContext);
      if (flat.sceneStart && !flat.quiet)
        emit(
          "scene",
          flat.corner ? { ...sceneInfo(flat.sceneId), corner: true } : sceneInfo(flat.sceneId)
        );
      else if (flat.title !== void 0)
        emit("scene", { ...sceneInfo(flat.sceneId), durationMs: flat.title });
      for (const t of transientsOf(ops)) emit("transient", t);
      switch (step.type) {
        case "narration":
        case "line":
          phase = "showing";
          present(viewFor(step), ops);
          return;
        case "set":
          for (const op of step.set) writeFlag(op.flag, applySetOp(getFlag(op.flag), op));
          i++;
          continue;
        case "choice":
          phase = "choice";
          present(viewFor(step), ops);
          return;
        case "sequence": {
          const view = viewFor(step);
          if (step.hold && !playing) openHolds.set(step.id, flat.sceneId);
          if (step.blocking) {
            phase = "sequence";
            present(view, ops);
            return;
          }
          present(view, ops);
          i++;
          continue;
        }
        case "delay":
          phase = "delay";
          present(viewFor(step), ops);
          return;
        case "transition":
          phase = "transition";
          present(viewFor(step, covered), ops);
          return;
        case "hold-end":
          present(viewFor(step), ops);
          i++;
          continue;
        case "event": {
          if (handledEvents.has(step.name)) {
            phase = "waiting";
            present(viewFor(step), ops);
            visits[step.id] = (visits[step.id] ?? 0) + 1;
            emit("hostEvent", {
              stepId: step.id,
              visit: visits[step.id],
              name: step.name,
              params: step.params ?? {},
              outcomes: step.outcomes
            });
            return;
          }
          writeFlag(eventResultFlag(step), step.default);
          i++;
          continue;
        }
        case "autoplay-start":
        case "autoplay-end":
        case "mark":
          i++;
          continue;
        case "leave":
        case "goto": {
          if (flat.jump === void 0) {
            i++;
            continue;
          }
          if (flat.jump === null) {
            finish("done");
            return;
          }
          if (++jumps > MAX_JUMPS) {
            finish("loop");
            return;
          }
          i = indexById.get(flat.jump) ?? i + 1;
          continue;
        }
        case "end":
          finish(step.exit);
          return;
      }
    }
  };
  const stepAt = (i) => steps[i]?.step;
  const engine = {
    apiVersion: ENGINE_API_VERSION,
    get lang() {
      return lang;
    },
    load(b, opts = {}) {
      const issues = validateStory(b.story, {
        ...b.strings[b.story.languages.source] ? { strings: b.strings[b.story.languages.source] } : {},
        ...b.registry ? { registry: b.registry } : {},
        characters: b.characters,
        assets: b.assets
      });
      if (hasErrors(issues)) {
        const first = issues.filter((i) => i.level === "error").slice(0, 5);
        throw new Error(
          `Story "${b.story.id}" is invalid:
` + first.map((i) => `- ${i.path}: ${i.message}`).join("\n")
        );
      }
      bundle = b;
      options = opts;
      steps = flattenScenes(b.story);
      playing = null;
      const triggeredIds = new Set(b.story.scenes.filter((sc) => sc.trigger).map((sc) => sc.id));
      const firstTriggered = steps.findIndex((e) => triggeredIds.has(e.sceneId));
      storyEnd = firstTriggered < 0 ? steps.length : firstTriggered;
      indexById = new Map(steps.map((s, i) => [s.step.id, i]));
      tables = b.strings;
      lang = opts.lang && tables[opts.lang] ? opts.lang : b.story.languages.source;
      handledEvents = new Set(opts.hostEvents ?? []);
      const warnings = [];
      for (const name of b.story.contract.reads.length ? b.story.contract.reads : []) {
        if (opts.hostFlags?.[name] === void 0 && b.registry?.flags[name] === void 0) {
          warnings.push(`Shared flag "${name}" was not provided by the host.`);
        }
      }
      for (const { step } of steps) {
        if (step.type === "event" && !handledEvents.has(step.name)) {
          warnings.push(
            `Host event "${step.name}" is not handled; step "${step.id}" will use its default outcome "${step.default}".`
          );
        }
      }
      baseFlags = { ...initialFlags(b.story, b.registry), ...opts.hostFlags ?? {} };
      flags = { ...baseFlags };
      history = [];
      openHolds.clear();
      lastScene = void 0;
      visits = {};
      stage = emptyStage();
      phase = "idle";
      cursor = -1;
      exitName = void 0;
      current = null;
      return { warnings: [...new Set(warnings)] };
    },
    start(startOptions = {}) {
      requireBundle();
      playing = null;
      flags = { ...baseFlags, ...startOptions.flags ?? {} };
      history = [];
      openHolds.clear();
      lastScene = void 0;
      visits = {};
      stage = emptyStage();
      exitName = void 0;
      current = null;
      ignoreWhen = false;
      chosenRoutes = /* @__PURE__ */ new Map();
      let first = 0;
      const from = startOptions.from;
      if (from) {
        const idx = indexById.get(from.stepId);
        if (idx === void 0 || steps[idx].sceneId !== from.sceneId) {
          throw new Error(`Cannot start at unknown step "${from.sceneId}/${from.stepId}".`);
        }
        first = idx;
        const opening = requireBundle().story.scenes.find((sc) => sc.id === from.sceneId);
        const authored = opening?.steps[0];
        if (startOptions.withOpening && opening && !opening.trigger && authored?.id === from.stepId && !authored.hidden && !authored.when) {
          const at = steps.findIndex((e) => e.sceneId === from.sceneId);
          if (at >= 0 && at < idx) first = at;
        }
        let foldFrom = 0;
        const scene = requireBundle().story.scenes.find((sc) => sc.id === from.sceneId);
        if (scene?.trigger) {
          foldFrom = idx;
          while (foldFrom > 0 && steps[foldFrom - 1].sceneId === from.sceneId) foldFrom--;
          let to = idx;
          while (steps[to]?.sceneId === from.sceneId) to++;
          playing = {
            sceneId: scene.id,
            presentation: triggerPresentation(scene),
            from: foldFrom,
            to,
            outer: {
              phase: "idle",
              cursor: -1,
              stage: emptyStage(),
              exitName: void 0,
              current: null,
              chosenRoutes: /* @__PURE__ */ new Map()
            }
          };
        }
        for (const link of steps[idx].chain ?? []) chosenRoutes.set(link.fork, link.route);
        const open = /* @__PURE__ */ new Map();
        for (let i = foldFrom; i < first; i++) {
          const s = steps[i].step;
          if (s.hidden || !holdsFlat(steps[i])) continue;
          if (!playing) history.push(s.id);
          stage = applyStep(stage, s, stageContext);
          if (s.type === "set") {
            for (const op of s.set) writeFlag(op.flag, applySetOp(getFlag(op.flag), op));
          } else if (s.type === "event" && !handledEvents.has(s.name)) {
            writeFlag(eventResultFlag(s), s.default);
          } else if (s.type === "sequence" && s.hold) {
            open.set(s.id, s);
            openHolds.set(s.id, steps[i].sceneId);
          } else if (s.type === "hold-end") {
            open.delete(s.start);
            openHolds.delete(s.start);
          }
        }
        for (const [id] of [...open]) {
          if (openHolds.get(id) !== steps[first].sceneId) {
            open.delete(id);
            openHolds.delete(id);
          }
        }
        for (const s of open.values()) {
          const view = viewFor(s);
          if (view?.kind === "sequence") present({ ...view, blocking: false, played: true }, []);
        }
      }
      ignoreWhen = !!startOptions.ignoreConditions;
      run(first, from !== void 0);
    },
    play(sceneId) {
      const b = requireBundle();
      const scene = b.story.scenes.find((sc) => sc.id === sceneId);
      if (!scene?.trigger) return { status: "unknown" };
      if (playing || !(phase === "idle" || phase === "ended" || phase === "waiting"))
        return { status: "busy" };
      if (!ignoreWhen && scene.when && !evaluateCondition(scene.when, ctx))
        return { status: "skipped" };
      const from = steps.findIndex((e) => e.sceneId === sceneId);
      if (from < 0) return { status: "skipped" };
      let to = from;
      while (steps[to]?.sceneId === sceneId) to++;
      const presentation = triggerPresentation(scene);
      playing = {
        sceneId,
        presentation,
        from,
        to,
        outer: { phase, cursor, stage, exitName, current, chosenRoutes }
      };
      stage = emptyStage();
      chosenRoutes = /* @__PURE__ */ new Map();
      exitName = void 0;
      phase = "idle";
      cursor = -1;
      current = null;
      emit("playStart", { sceneId, presentation });
      run(from);
      return { status: "started", presentation };
    },
    cancelPlay() {
      if (playing) endPlaying("cancelled");
    },
    getPlaying: () => playing ? { sceneId: playing.sceneId, presentation: playing.presentation } : null,
    advance() {
      if (phase !== "showing") return;
      run(cursor + 1);
    },
    choose(optionId) {
      if (phase !== "choice") throw new Error("There is no choice to answer right now.");
      const step = stepAt(cursor);
      if (step?.type !== "choice") throw new Error("Internal error: not at a choice step.");
      const option = step.options.find((o) => o.id === optionId && holds(o));
      if (!option) throw new Error(`"${optionId}" is not an available option at "${step.id}".`);
      for (const op of option.set ?? []) writeFlag(op.flag, applySetOp(getFlag(op.flag), op));
      run(cursor + 1);
    },
    resume(outcome) {
      if (phase !== "waiting") throw new Error("The engine is not waiting for the host.");
      const step = stepAt(cursor);
      if (step?.type !== "event") throw new Error("Internal error: not at an event step.");
      if (outcome === "error" && !step.outcomes.includes("error")) outcome = step.default;
      if (!step.outcomes.includes(outcome)) {
        throw new Error(
          `"${outcome}" is not an outcome of event "${step.name}" (expected: ${step.outcomes.join(", ")}).`
        );
      }
      writeFlag(eventResultFlag(step), outcome);
      run(cursor + 1);
    },
    sequenceDone() {
      if (phase !== "sequence") return;
      run(cursor + 1);
    },
    delayDone() {
      if (phase !== "delay") return;
      run(cursor + 1);
    },
    transitionDone() {
      if (phase !== "transition") return;
      run(cursor + 1);
    },
    setLanguage(next) {
      if (!bundle) return;
      lang = tables[next] ? next : bundle.story.languages.source;
      const step = stepAt(cursor);
      if (!step || phase === "idle" || phase === "ended") return;
      const view = viewFor(step);
      if (view) present(view, []);
    },
    getView: () => current,
    getFlags: () => ({ ...flags }),
    getFlag,
    setFlag(name, value) {
      writeFlag(name, value);
    },
    snapshot() {
      const b = requireBundle();
      const at = playing ? playing.outer : { phase, cursor, exitName };
      const flat = steps[at.cursor];
      return {
        apiVersion: ENGINE_API_VERSION,
        storyId: b.story.id,
        schemaVersion: b.schemaVersion,
        lang,
        cursor: at.phase === "idle" || at.phase === "ended" || !flat ? null : { sceneId: flat.sceneId, stepId: flat.step.id },
        ...at.exitName !== void 0 ? { ended: at.exitName } : {},
        flags: { ...flags },
        history: [...history],
        visits: { ...visits }
      };
    },
    restore(snap) {
      const b = requireBundle();
      if (snap.apiVersion !== ENGINE_API_VERSION) {
        throw new Error(
          `Snapshot is for engine API ${snap.apiVersion}, this is ${ENGINE_API_VERSION}.`
        );
      }
      if (snap.storyId !== b.story.id) {
        throw new Error(`Snapshot belongs to story "${snap.storyId}", not "${b.story.id}".`);
      }
      lang = tables[snap.lang] ? snap.lang : b.story.languages.source;
      playing = null;
      flags = { ...snap.flags };
      history = [...snap.history];
      visits = { ...snap.visits ?? {} };
      stage = emptyStage();
      let coveredBefore = false;
      history.forEach((id, n) => {
        const idx2 = indexById.get(id);
        const s = idx2 === void 0 ? void 0 : steps[idx2].step;
        if (n === history.length - 1) coveredBefore = stage.veil !== null;
        if (s) stage = applyStep(stage, s, stageContext);
      });
      exitName = snap.ended;
      if (snap.ended !== void 0) {
        phase = "ended";
        cursor = -1;
        present({ kind: "ended", exit: snap.ended }, []);
        return;
      }
      if (!snap.cursor) {
        phase = "idle";
        cursor = -1;
        current = null;
        return;
      }
      const idx = indexById.get(snap.cursor.stepId);
      if (idx === void 0)
        throw new Error(`Snapshot refers to unknown step "${snap.cursor.stepId}".`);
      cursor = idx;
      const step = steps[idx].step;
      emit("scene", cornerOf(steps[idx].sceneId));
      switch (step.type) {
        case "choice":
          phase = "choice";
          break;
        case "sequence":
          phase = "sequence";
          break;
        case "delay":
          phase = "delay";
          break;
        case "transition":
          phase = "transition";
          break;
        case "event":
          phase = "waiting";
          break;
        default:
          phase = "showing";
      }
      const view = viewFor(step, coveredBefore);
      if (view) present(view, []);
      if (step.type === "event" && handledEvents.has(step.name)) {
        emit("hostEvent", {
          stepId: step.id,
          visit: visits[step.id] ?? 1,
          name: step.name,
          params: step.params ?? {},
          outcomes: step.outcomes
        });
      }
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
  return engine;
}
const TAG = /\[(\/?)([a-z][a-z0-9-]*)(?::([^\]]*))?\]/gi;
function parseMarkup(text) {
  const out = [];
  const open = [];
  let last = 0;
  const pushText = (chunk) => {
    if (chunk) out.push({ kind: "text", text: chunk, tags: [...open] });
  };
  for (const m of text.matchAll(TAG)) {
    pushText(text.slice(last, m.index));
    last = (m.index ?? 0) + m[0].length;
    const closing = m[1] === "/";
    const name = (m[2] ?? "").toLowerCase();
    if (name === "pause" && !closing) {
      const ms = Number(m[3]);
      out.push({ kind: "pause", ms: Number.isFinite(ms) && ms >= 0 ? ms : 0 });
    } else if (closing) {
      const i = open.lastIndexOf(name);
      if (i >= 0) open.splice(i, 1);
    } else {
      open.push(name);
    }
  }
  pushText(text.slice(last));
  return out;
}
function stripMarkup(text) {
  return text.replace(TAG, "");
}
const EASE = {
  linear: (k) => k,
  in: (k) => k * k * k,
  out: (k) => 1 - (1 - k) ** 3,
  inOut: (k) => k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2
};
function sampleTrack(frames, t) {
  if (!frames || frames.length === 0) return void 0;
  const sorted = frames.every((f, i2) => i2 === 0 || f.t >= frames[i2 - 1].t) ? frames : [...frames].sort((a, b) => a.t - b.t);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (t <= first.t) return first.value;
  if (t >= last.t) return last.value;
  let i = 1;
  while (sorted[i].t < t) i++;
  const from = sorted[i - 1];
  const to = sorted[i];
  const span = to.t - from.t;
  if (span <= 0) return to.value;
  const k = EASE[from.ease ?? "linear"]((t - from.t) / span);
  return from.value + (to.value - from.value) * k;
}
const ANIMATION_REST = {
  x: 0,
  y: 0,
  scale: 1,
  scaleY: 1,
  rotation: 0,
  opacity: 1
};
function sampleAnimation(animation, t) {
  const out = { ...ANIMATION_REST };
  if (!animation) return out;
  for (const track of Object.keys(ANIMATION_REST)) {
    const value = sampleTrack(animation[track], t);
    if (value !== void 0) out[track] = value;
  }
  return out;
}
function sequenceDuration(seq) {
  let end = 0;
  for (const item of seq.items) {
    const t = "endTime" in item && item.endTime !== void 0 ? item.endTime : item.startTime;
    end = Math.max(end, t);
  }
  return end;
}
function visibleImages(seq, t) {
  return seq.items.filter(
    (i) => i.type === "image" && t >= i.startTime && (i.endTime === void 0 || t < i.endTime)
  );
}
function visibleVisuals(seq, t) {
  return seq.items.filter(
    (i) => (i.type === "image" || i.type === "text" || i.type === "video" || i.type === "color") && !i.hidden && t >= i.startTime && (i.endTime === void 0 || t < i.endTime)
  );
}
const MUSIC_END_FADE_MS = 1500;
function musicAt(seq, t) {
  let current = null;
  let since = -1;
  seq.items.forEach((item) => {
    if ((item.type === "music" || item.type === "music_stop") && item.startTime <= t) {
      if (item.startTime >= since) {
        since = item.startTime;
        current = item.type === "music" && item.src ? item : null;
      }
    }
  });
  const m = current;
  if (!m) return null;
  if (m.endTime !== void 0) {
    const fade2 = Math.min(m.fadeOutMs ?? MUSIC_END_FADE_MS, m.endTime - m.startTime);
    if (t >= m.endTime - fade2) return null;
  }
  return { item: m, offsetMs: t - m.startTime };
}
function itemsStartingIn(seq, from, to) {
  const found = seq.items.filter(
    (i) => i.type !== "image" && i.type !== "text" && i.type !== "video" && i.type !== "color" && i.startTime >= from && i.startTime < to
  );
  for (const m of seq.items) {
    if (m.type !== "music" || m.endTime === void 0 || m.endTime <= m.startTime) continue;
    const end = m.endTime;
    const fade2 = Math.min(m.fadeOutMs ?? MUSIC_END_FADE_MS, end - m.startTime);
    const at = end - fade2;
    if (at < from || at >= to) continue;
    const replaced = seq.items.some(
      (o) => o !== m && o.type === "music" && o.startTime > m.startTime && o.startTime <= end
    );
    if (!replaced) found.push({ type: "music_stop", startTime: at, fadeMs: fade2 });
  }
  return found;
}
const sequenceEnd = (seq) => endSceneTime(seq) ?? sequenceDuration(seq);
const DEFAULT_IMAGE_FADE_MS = 300;
function imageFades(seq, img, theme) {
  return {
    inMs: img.fadeInMs ?? seq.defaults?.imageFadeInMs ?? theme?.imageFadeInMs ?? DEFAULT_IMAGE_FADE_MS,
    outMs: img.fadeOutMs ?? seq.defaults?.imageFadeOutMs ?? theme?.imageFadeOutMs ?? DEFAULT_IMAGE_FADE_MS
  };
}
function imageOpacity(seq, img, t, theme) {
  const { inMs, outMs } = imageFades(seq, img, theme);
  let opacity = 1;
  if (inMs > 0) opacity = Math.min(opacity, (t - img.startTime) / inMs);
  if (outMs > 0) opacity = Math.min(opacity, ((img.endTime ?? sequenceEnd(seq)) - t) / outMs);
  return Math.max(0, Math.min(1, opacity));
}
function imageMotions(seq, img, theme) {
  return {
    enter: ("enter" in img ? img.enter : void 0) ?? seq.defaults?.imageEnter ?? theme?.imageEnter ?? "fade",
    exit: ("exit" in img ? img.exit : void 0) ?? seq.defaults?.imageExit ?? theme?.imageExit ?? "fade"
  };
}
const DIRECTION = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  top: { x: 0, y: -1 },
  bottom: { x: 0, y: 1 }
};
function imageSlide(seq, img, t, theme) {
  const { inMs, outMs } = imageFades(seq, img, theme);
  const { enter, exit } = imageMotions(seq, img, theme);
  let x = 0;
  let y = 0;
  if (enter !== "fade" && inMs > 0) {
    const left = 1 - Math.min(1, Math.max(0, (t - img.startTime) / inMs));
    const d = DIRECTION[enter];
    const k = left ** 3;
    x += d.x * k;
    y += d.y * k;
  }
  if (exit !== "fade" && outMs > 0) {
    const gone = 1 - Math.min(1, Math.max(0, ((img.endTime ?? sequenceEnd(seq)) - t) / outMs));
    const d = DIRECTION[exit];
    const k = gone ** 3;
    x += d.x * k;
    y += d.y * k;
  }
  return { x, y };
}
function staysWhenHeld(seq, img) {
  return !("exit" in img && img.exit !== void 0) && (img.endTime === void 0 || img.endTime >= sequenceEnd(seq));
}
function endSceneTime(seq) {
  const times = seq.items.filter((i) => i.type === "end_scene").map((i) => i.startTime);
  return times.length ? Math.min(...times) : void 0;
}
function itemFrame(seq, img, t, theme) {
  const animated = itemAnimated(img);
  const slide = animated ? { x: 0, y: 0 } : imageSlide(seq, img, t, theme);
  const a = sampleAnimation(img.animation, t - img.startTime);
  const scaleAnimated = img.animation?.scale !== void 0;
  return {
    opacity: Math.max(
      0,
      Math.min(1, (animated ? 1 : imageOpacity(seq, img, t, theme)) * a.opacity)
    ),
    x: slide.x + a.x,
    y: slide.y + a.y,
    scale: a.scale,
    scaleY: img.animation?.scaleY !== void 0 ? a.scaleY : scaleAnimated ? a.scale : a.scaleY,
    rotation: a.rotation
  };
}
const itemAnimated = (item) => item.animated === true || item.animation !== void 0 && Object.values(item.animation).some((track) => track?.length);
const VIDEO_DRIFT_MS = 150;
function videoTime(item, t, durationSec) {
  const sec = Math.max(0, t - item.startTime) / 1e3;
  if (item.loop && durationSec !== void 0 && durationSec > 0) return sec % durationSec;
  return sec;
}
function videoNeedsSeek(currentSec, targetSec, loopSec) {
  let gap = Math.abs(currentSec - targetSec);
  if (loopSec !== void 0 && loopSec > 0) gap = Math.min(gap, loopSec - gap % loopSec);
  return gap * 1e3 > VIDEO_DRIFT_MS;
}
function autoplayReadingMs(chars) {
  return Math.min(7e3, Math.max(1400, 900 + chars * 45));
}
function createAutoplayClock(readingMs, delayMs, durationMs) {
  let elapsed = 0;
  let tail = 0;
  let ready = false;
  return {
    /** Call only with active elapsed time. Custom duration replaces reading and tail, never truncating voice. */
    tick(ms, typed, speaking) {
      if (!typed) return false;
      elapsed += Math.max(0, ms);
      if (durationMs !== void 0) return elapsed >= durationMs && !speaking;
      if (!ready && elapsed >= readingMs && !speaking) {
        ready = true;
        return delayMs === 0;
      }
      if (ready) {
        if (speaking) {
          ready = false;
          tail = 0;
          return false;
        }
        tail += Math.max(0, ms);
      }
      return ready && tail >= delayMs;
    }
  };
}
export {
  ANIMATION_REST,
  DEFAULT_IMAGE_FADE_MS,
  EASE,
  ENGINE_API_VERSION,
  MAX_JUMPS,
  MUSIC_END_FADE_MS,
  TITLE_TAIL_MS,
  VIDEO_DRIFT_MS,
  applySetOp,
  applyStageOp,
  applyStageOps,
  applyStep,
  autoplayReadingMs,
  createAutoplayClock,
  createEngine,
  emptyStage,
  endSceneTime,
  evaluateCondition,
  flattenScenes,
  imageFades,
  imageMotions,
  imageOpacity,
  imageSlide,
  initialFlags,
  itemAnimated,
  itemFrame,
  itemsStartingIn,
  musicAt,
  parseMarkup,
  sampleAnimation,
  sampleTrack,
  sequenceDuration,
  sequenceEnd,
  staysWhenHeld,
  stripMarkup,
  videoNeedsSeek,
  videoTime,
  visibleImages,
  visibleVisuals
};
