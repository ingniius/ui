import { describe, expect, it } from "vitest";

import { PRESET_MAP } from "../constants";
import { defineComponents } from "./component";

const defaultComponents = {
  icon: { dynamic: false },
};

describe("#defineComponents", () => {
  it("uses VEGA style by default", () => {
    const result = defineComponents();

    expect(result).toMatchObject({
      ...PRESET_MAP.vega,
      ...defaultComponents,
    });
  });

  it.each([
    ["lyra"],
    ["maia"],
    ["mira"],
    ["nova"],
  ] as const)("resolves %s style when specified", (style) => {
    const result = defineComponents(style);

    expect(result).toMatchObject({
      ...PRESET_MAP[style],
      ...defaultComponents,
    });
  });

  it("merges overrides over preset defaults", () => {
    const result = defineComponents(["vega", { icon: { dynamic: true } }]);

    expect(result.icon.dynamic).toBe(true);
  });

  it("injects icon.dynamic=false when not provided", () => {
    const result = defineComponents("vega");

    expect(result.icon.dynamic).toBe(false);
  });

  it("handles undefined style safely", () => {
    const result = defineComponents(undefined as any);

    expect(result).toMatchObject({
      ...PRESET_MAP.vega,
      ...defaultComponents,
    });
  });
});
