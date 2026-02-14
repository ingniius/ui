import { describe, expect, it } from "vitest";

import { DEFAULT_THEME } from "../constants";
import { detectIconset, generateIconset } from "./iconset";

describe("#detectIconset", () => {
  it("returns 'lucide' when icons is undefined", () => {
    expect(detectIconset()).toEqual([DEFAULT_THEME.iconset]);
  });

  it("extracts unique collections from valid icon references", () => {
    expect(
      detectIconset({
        alert: "lucide:triangle-alert",
        dark: "lucide:moon",
        github: "simple-icons:github",
      }),
    ).toEqual(["lucide", "simple-icons"]);
  });

  it("deduplicates repeated collections", () => {
    expect(
      detectIconset({
        a: "lucide:moon",
        b: "lucide:sun",
        c: "lucide:user",
      }),
    ).toEqual(["lucide"]);
  });

  it("ignores values without ':' separator", () => {
    expect(detectIconset({ a: "lucide:moon", b: "invalid", c: "" })).toEqual([
      "lucide",
    ]);
  });

  it("falls back to 'lucide' if no valid icon references exist", () => {
    expect(detectIconset({ a: "invalid", b: "" })).toEqual([
      DEFAULT_THEME.iconset,
    ]);
  });
});

describe("generateIconset", () => {
  it("defaults to lucide when no argument is provided", () => {
    const result = generateIconset();

    expect(result).toContain("@iconify-json/lucide/icons.json");
    expect(result).toContain("{ lucide }");
  });

  it("generates multiple icon imports when provided", () => {
    const result = generateIconset({
      alert: "lucide:triangle-alert",
      dark: "lucide:moon",
      github: "mdi:github",
    });

    expect(result).toContain("@iconify-json/lucide/icons.json");
    expect(result).toContain("@iconify-json/mdi/icons.json");
    expect(result).toContain("{ lucide, mdi }");
  });
});
