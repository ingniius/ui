import { describe, expect, it } from "vitest";

import { DEFAULT_COLORS, PRIMARY_COLOR } from "../constants";
import { defineColors, resolveColors } from "./color";

describe("#defineColors", () => {
  it("resolves the default palette with neutral color", () => {
    expect(defineColors()).toEqual({
      primary: "emerald",
      secondary: "cyan",
      success: "green",
      info: "blue",
      warning: "yellow",
      error: "red",
      neutral: "zinc",
    });
  });

  it("uses the provided baseColor for neutral", () => {
    expect(defineColors("slate")).toMatchObject({
      neutral: "slate",
    });
  });

  it("only returns requested colors plus neutral", () => {
    expect(defineColors("zinc", ["primary", "warning"])).toEqual({
      primary: "emerald",
      warning: "yellow",
      neutral: "zinc",
    });
  });

  it("always includes neutral even if not explicitly requested", () => {
    expect(defineColors("stone", ["success"])).toEqual({
      success: "green",
      neutral: "stone",
    });
  });
});

describe("#resolveColors", () => {
  it("returns default colors when no input is provided", () => {
    expect(resolveColors()).toEqual(DEFAULT_COLORS);
  });

  it(`prepends "${PRIMARY_COLOR}" and removes duplicates when custom colors are provided`, () => {
    expect(resolveColors(["success", "warning", "success"])).toEqual([
      PRIMARY_COLOR,
      "success",
      "warning",
    ]);
  });

  it(`does not duplicate "${PRIMARY_COLOR}" if already present`, () => {
    expect(resolveColors(["primary", "info"])).toEqual(["primary", "info"]);
  });
});
