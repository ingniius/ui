import { describe, expect, it } from "vitest";

import * as icon from "../../icon";
import {
  resolveColors,
  resolveConfig,
  resolveIcons,
  resolveOptions,
} from "./resolve";

describe("#resolveColors", () => {
  it("return default colors when no input is provided", () => {
    expect(resolveColors()).toEqual([
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "error",
    ]);
  });

  it('prepend "primary" and remove duplicates when custom colors are provided', () => {
    expect(resolveColors(["success", "warning", "success"])).toEqual([
      "primary",
      "success",
      "warning",
    ]);
  });
});

describe("#resolveConfig", () => {
  it("pick only provided colors + neutral", () => {
    const config = resolveConfig(["success", "info"]);
    expect(config.colors).toEqual({
      success: "green",
      info: "blue",
      neutral: "slate",
    });
  });

  it("include neutral even if no colors are passed", () => {
    const config = resolveConfig();
    expect(config.colors).toEqual({ neutral: "slate" });
  });

  it("should resolve icons when a iconset is passed", () => {
    expect(resolveConfig(undefined, "tabler").icons).toBe(icon.tabler);
  });
});

describe("#resolveIcons", () => {
  it("resolve defined iconset", () => {
    expect(resolveIcons("heroicons-outline")).toBe(icon.heroicons_outline);
    expect(resolveIcons("heroicons-solid")).toBe(icon.heroicons_solid);
    expect(resolveIcons("hugeicons")).toBe(icon.hugeicons);
    expect(resolveIcons("phosphor")).toBe(icon.phosphor);
    expect(resolveIcons("tabler")).toBe(icon.tabler);
  });

  it("default to lucide when no match", () => {
    expect(resolveIcons()).toBe(icon.lucide);
  });
});

describe("#resolveOptions", () => {
  it("return default options object", () => {
    expect(resolveOptions()).toEqual({
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
