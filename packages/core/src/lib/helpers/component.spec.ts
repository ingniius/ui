import { describe, expect, it } from "vitest";

import { PRESET_MAP } from "../constants";
import { defineComponents } from "./component";

describe("#defineComponents", () => {
  it("uses VEGA style by default", () => {
    const result = defineComponents({});

    expect(result).toMatchObject({
      ...PRESET_MAP.vega,
      icon: { dynamic: false },
    });
  });

  it("resolves LYRA style when specified", () => {
    const result = defineComponents({}, "lyra");

    expect(result).toMatchObject({
      ...PRESET_MAP.lyra,
      icon: { dynamic: false },
    });
  });

  it("resolves MAIA style when specified", () => {
    const result = defineComponents({}, "maia");

    expect(result).toMatchObject({
      ...PRESET_MAP.maia,
      icon: { dynamic: false },
    });
  });

  it("resolves MIRA style when specified", () => {
    const result = defineComponents({}, "mira");

    expect(result).toMatchObject({
      ...PRESET_MAP.mira,
      icon: { dynamic: false },
    });
  });

  it("resolves NOVA style when specified", () => {
    const result = defineComponents({}, "nova");

    expect(result).toMatchObject({
      ...PRESET_MAP.nova,
      icon: { dynamic: false },
    });
  });

  it("falls back to VEGA for unknown style keys", () => {
    const result = defineComponents({}, "unknown");

    expect(result).toMatchObject({
      ...PRESET_MAP.vega,
      icon: { dynamic: false },
    });
  });

  it("merges preset over style defaults", () => {
    const result = defineComponents(
      { button: { rounded: false }, icon: { dynamic: true } },
      "vega",
    );

    expect(result.button.rounded).toBe(false);
    expect(result.icon.dynamic).toBe(true);
  });

  it("injects icon.dynamic=false when not provided", () => {
    const result = defineComponents({});

    expect(result.icon.dynamic).toBe(false);
  });

  it("handles undefined preset safely", () => {
    const result = defineComponents(undefined as any);

    expect(result).toMatchObject({
      ...PRESET_MAP.vega,
      icon: { dynamic: false },
    });
  });
});
