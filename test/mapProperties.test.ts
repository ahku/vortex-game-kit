import { describe, expect, it } from "vitest";
import {
  readMapProperties,
  readMapListEditor,
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
