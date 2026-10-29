import { describe, expect, it } from "vitest";
import {
  readMapProperties,
  readMapListEditor,
  readMapUnits,
  readLayerEditor,
} from "../src/protocol/index";
const battle = {
  fields: [
    {
      path: ["rules", "win", "kind"],
      label: "Goal",
      type: "choice",
      choices: [
        { value: "reach", label: "Reach" },
        { value: "survive", label: "Survive" },
      ],
    },
    {
      path: ["rules", "win", "rounds"],
      label: "Rounds",
      type: "number",
      min: 1,
      max: 99,
      integer: true,
      default: 1,
      when: { path: ["rules", "win", "kind"], values: ["survive"] },
    },
  ],
};
const base = {
  version: 1,
  stage: { width: ["arena", "width"], height: ["arena", "height"] },
  pictures: ["arena", "sprites"],
  bands: [{ value: "base", label: "Base" }],
};
describe("declarative map forms", () => {
  it("retains safe conditional fields and list defaults", () => {
    expect(readMapProperties(battle)).toEqual(battle);
    expect(
      readMapListEditor({
        ...battle,
        path: ["arena", "triggers"],
        maxItems: 50,
        defaults: { once: true },
      })?.defaults,
    ).toEqual({ once: true });
    expect(readLayerEditor({ ...base, battle }).ok).toBe(true);
  });
  it("rejects unsafe paths, duplicates, invalid bounds, defaults and references", () => {
    for (const extra of [
      { path: ["__proto__", "polluted"] },
      { path: ["constructor"] },
      { min: 100, max: 1 },
      { default: 0 },
      { reference: { path: ["__proto__"], id: "id" }, type: "reference" },
      { when: { path: ["prototype"], values: ["x"] } },
    ])
      expect(
        readMapProperties({ fields: [{ ...battle.fields[1], ...extra }] }),
      ).toBeNull();
    expect(
      readMapProperties({ fields: [battle.fields[0], battle.fields[0]] }),
    ).toBeNull();
    expect(
      readMapListEditor({
        ...battle,
        path: ["arena", "triggers"],
        maxItems: 1,
        defaults: JSON.parse('{"__proto__":true}'),
      }),
    ).toBeNull();
  });
  it("rejects collisions between authoring paths", () => {
    expect(
      readLayerEditor({
        ...base,
        events: {
          ...battle,
          path: ["arena", "sprites"],
          maxItems: 50,
          defaults: {},
        },
      }).ok,
    ).toBe(false);
    expect(
      readLayerEditor({
        ...base,
        battle: { fields: [{ path: ["arena"], label: "Arena", type: "text" }] },
      }).ok,
    ).toBe(false);
  });
});

it("retains optional grouping and default/empty-target copy without inventing saved values", () => {
  const form = {
    groups: [{ id: "optional", label: "Optional rules" }],
    fields: [
      {
        path: ["rules", "kind"],
        label: "Battle type",
        type: "choice",
        unsetLabel: "Defeat all enemies",
        choices: [{ value: "reach", label: "Reach" }],
      },
      {
        path: ["rules", "target"],
        label: "Region",
        type: "reference",
        reference: { path: ["regions"], id: "id" },
        emptyLabel: "Add an event region to choose a target.",
        group: "optional",
      },
    ],
  };
  expect(readMapProperties(form)).toEqual(form);
  expect(
    readMapProperties({
      ...form,
      groups: [
        { id: "optional", label: "A" },
        { id: "optional", label: "B" },
      ],
    }),
  ).toBeNull();
  expect(readMapProperties({ ...form, groups: [] })).toBeNull();
  expect(
    readMapProperties({ fields: [{ ...form.fields[0], required: true }] }),
  ).toBeNull();
  expect(
    readMapProperties({ fields: [{ ...form.fields[0], default: "reach" }] }),
  ).toBeNull();
  expect(
    readMapProperties({
      fields: [{ path: ["x"], label: "X", type: "text", emptyLabel: "None" }],
    }),
  ).toBeNull();
});

describe("placed characters", () => {
  const units = {
    path: ["units"],
    maxItems: 40,
    defaults: {},
    kit: ["type"],
    position: ["pos"],
    character: ["character"],
    help: "Characters on the map.",
    fields: [
      {
        path: ["avoidsOwnSide"],
        label: "Avoids hitting its own side",
        type: "boolean",
      },
      {
        path: ["behaviour"],
        label: "Behaviour",
        type: "choice",
        unsetLabel: "Default",
        choices: [{ value: "attack", label: "Attack" }],
      },
      {
        path: ["goesFor"],
        label: "Goes for",
        type: "reference",
        reference: { path: ["units"], id: "id" },
        when: { path: ["behaviour"], values: ["attack"] },
      },
      {
        path: ["waitUntil", "kind"],
        label: "Waits until",
        type: "choice",
        unsetLabel: "Never waits",
        choices: [{ value: "signal", label: "Story signal" }],
      },
      {
        path: ["waitUntil", "signal"],
        label: "Signal",
        type: "text",
        when: { path: ["waitUntil", "kind"], values: ["signal"] },
      },
    ],
  };
  it("accepts a units descriptor and keeps its locations", () => {
    expect(readMapUnits(units)).toEqual(units);
    expect(
      readMapUnits({ ...units, character: undefined })?.character,
    ).toBeUndefined();
  });
  it("keeps library groups and the definitions path, and rejects bad ones", () => {
    const groups = [
      { id: "players", label: "Players", kits: ["khang", "cinnoa"] },
      { id: "enemies", label: "Enemies", kits: ["grunt"] },
    ];
    const full = {
      ...units,
      definitions: ["characters"],
      libraryGroups: groups,
    };
    expect(readMapUnits(full)).toEqual(full);
    expect(
      readMapUnits({
        ...units,
        libraryGroups: [groups[0], { id: "x", label: "X", kits: ["khang"] }],
      }),
    ).toBeNull();
    expect(readMapUnits({ ...units, libraryGroups: [] })).toBeNull();
    expect(readMapUnits({ ...units, definitions: ["units"] })).toBeNull();
    expect(readMapUnits({ ...units, definitions: ["__proto__"] })).toBeNull();
  });
  it("keeps a tag and drawable ranges, and rejects bad ones", () => {
    const withFields = {
      ...units,
      fields: [
        ...units.fields,
        { path: ["group"], label: "Group tag", type: "text" },
        { path: ["wakeRange"], label: "Wake range", type: "number" },
      ],
    };
    const full = {
      ...withFields,
      tag: ["group"],
      ranges: [
        { id: "move", label: "Movement", stat: ["stats", "moveRadius"] },
        {
          id: "wake",
          label: "Wake range",
          field: ["wakeRange"],
          fallback: { of: "move", share: 0.5 },
        },
      ],
    };
    expect(readMapUnits(full)).toEqual(full);
    expect(readMapUnits({ ...withFields, tag: ["nowhere"] })).toBeNull();
    expect(readMapUnits({ ...full, ranges: [] })).toBeNull();
    expect(
      readMapUnits({ ...full, ranges: [{ id: "x", label: "X" }] }),
    ).toBeNull();
    expect(
      readMapUnits({ ...full, ranges: [full.ranges[0], full.ranges[0]] }),
    ).toBeNull();
    expect(
      readMapUnits({
        ...full,
        ranges: [{ id: "a", label: "A", fallback: { of: "zz", share: 1 } }],
      }),
    ).toBeNull();
    expect(
      readMapUnits({
        ...full,
        ranges: [{ id: "a", label: "A", field: ["notAField"] }],
      }),
    ).toBeNull();
    expect(
      readMapUnits({
        ...full,
        ranges: [{ id: "a", label: "A", stat: ["__proto__"] }],
      }),
    ).toBeNull();
  });
  it("keeps a percentage share field on a range and a unit on a number", () => {
    const withShare = {
      ...units,
      fields: [
        ...units.fields,
        { path: ["wakePercent"], label: "Wake", type: "number", unit: "%" },
      ],
      ranges: [
        { id: "move", label: "Movement", stat: ["stats", "moveRadius"] },
        {
          id: "wake",
          label: "Wake",
          fallback: { of: "move", share: 0.5, shareField: ["wakePercent"] },
        },
      ],
    };
    expect(readMapUnits(withShare)).toEqual(withShare);
    const bad = (ranges: unknown) => readMapUnits({ ...withShare, ranges });
    expect(
      bad([
        withShare.ranges[0],
        { id: "w", label: "W", fallback: { of: "move", share: 1, shareField: ["zz"] } },
      ]),
    ).toBeNull();
    expect(
      readMapUnits({
        ...withShare,
        fields: [
          ...units.fields,
          { path: ["wakePercent"], label: "Wake", type: "text", unit: "%" },
        ],
      }),
    ).toBeNull();
  });
  it("keeps a range that adds another, and a reference that leaves out its own row", () => {
    const added = {
      ...units,
      ranges: [
        { id: "move", label: "Movement", stat: ["stats", "moveRadius"] },
        { id: "reach", label: "Reach", stat: ["stats", "reach"], plus: "move" },
      ],
    };
    expect(readMapUnits(added)).toEqual(added);
    const bad = (plus: unknown) =>
      readMapUnits({
        ...added,
        ranges: [added.ranges[0], { ...added.ranges[1], plus }],
      });
    expect(bad("nowhere")).toBeNull();
    expect(bad("reach")).toBeNull();
    expect(bad("__proto__")).toBeNull();
    const withReference = (excludeSelf: unknown) =>
      readMapProperties({
        fields: [
          {
            path: ["next"],
            label: "Next",
            type: "reference",
            reference: { path: ["rows"], id: "id", excludeSelf },
          },
        ],
      });
    expect(withReference(true)?.fields[0]?.reference?.excludeSelf).toBe(true);
    expect(withReference(undefined)?.fields[0]?.reference).not.toHaveProperty("excludeSelf");
    expect(withReference("yes")).toBeNull();
    const labelled = readMapProperties({
      fields: [
        {
          path: ["next"],
          label: "Next",
          type: "reference",
          unsetLabel: "Next in the list",
          reference: { path: ["rows"], id: "id" },
        },
      ],
    });
    expect(labelled?.fields[0]?.unsetLabel).toBe("Next in the list");
  });
  it("keeps a group that starts unfolded", () => {
    const form = (open: unknown) =>
      readMapProperties({
        groups: [{ id: "more", label: "More", open }],
        fields: [{ path: ["a"], label: "A", type: "text", group: "more" }],
      });
    expect(form(true)?.groups).toEqual([{ id: "more", label: "More", open: true }]);
    expect(form(undefined)?.groups).toEqual([{ id: "more", label: "More" }]);
    expect(form("yes")).toBeNull();
  });
  it("rejects missing, unsafe or overlapping locations", () => {
    expect(readMapUnits({ ...units, kit: undefined })).toBeNull();
    expect(readMapUnits({ ...units, position: ["__proto__"] })).toBeNull();
    expect(readMapUnits({ ...units, kit: ["pos"] })).toBeNull();
    expect(readMapUnits({ ...units, kit: ["id"] })).toBeNull();
    expect(
      readMapUnits({
        ...units,
        fields: [{ path: ["type"], label: "Type", type: "text" }],
      }),
    ).toBeNull();
  });
  it("is part of the layer descriptor and may not sit inside another path", () => {
    const ok = readLayerEditor({ ...base, units });
    expect(ok.ok && ok.descriptor.units?.kit).toEqual(["type"]);
    expect(
      readLayerEditor({
        ...base,
        units: { ...units, kit: ["nope"], position: [] },
      }).ok,
    ).toBe(false);
    expect(
      readLayerEditor({
        ...base,
        units: { ...units, path: ["arena", "sprites"] },
      }).ok,
    ).toBe(false);
  });
});
