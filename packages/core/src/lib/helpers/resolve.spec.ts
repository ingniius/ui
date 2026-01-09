import { describe, expect, it } from "vitest";

import * as icon from "../../icon";
import { resolveColors, resolveConfig, resolveOptions } from "./resolve";

describe("#resolveColors", () => {
  it("should return default colors when no input is provided", () => {
    expect(resolveColors()).toEqual([
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "error",
    ]);
  });

  it('should prepend "primary" and remove duplicates when custom colors are provided', () => {
    expect(resolveColors(["success", "warning", "success"])).toEqual([
      "primary",
      "success",
      "warning",
    ]);
  });
});

describe("#resolveConfig", () => {
  it("should pick only provided colors + neutral", () => {
    const config = resolveConfig(["success", "info"]);
    expect(config.colors).toEqual({
      success: "green",
      info: "blue",
      neutral: "zinc",
    });
  });

  it("should include neutral even if no colors are passed", () => {
    const config = resolveConfig();
    expect(config.colors).toEqual({ neutral: "zinc" });
  });

  it("should should resolve icons when a iconset is passed", () => {
    expect(resolveConfig(undefined, "tabler").icons).toBe(icon.tabler);
  });
});

describe("#resolveOptions", () => {
  it("should return default options object", () => {
    expect(resolveOptions()).toEqual({
      prefix: "U",
      theme: {
        defaultVariants: {
          color: "primary",
          size: "md",
        },
        colors: undefined,
        iconset: "lucide",
        transitions: true,
      },
    });
  });
});
