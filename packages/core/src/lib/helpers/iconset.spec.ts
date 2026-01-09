import { describe, expect, it } from "vitest";

import * as icon from "../../icon";
import { generateIconSet, parseIconSet, resolveIconSet } from "./iconset";

describe("#generateIconSet", () => {
  it("should generate a valid iconset file for a single collection", () => {
    const code = generateIconSet({
      dark: "lucide:moon",
      light: "lucide:sun",
    });

    expect(code).toContain(
      `import { icons as lucide } from '@iconify-json/lucide/icons.json'`,
    );

    expect(code).toContain(`dark: lucide['moon']`);
    expect(code).toContain(`light: lucide['sun']`);
  });

  it("should generate imports for multiple collections", () => {
    const code = generateIconSet({
      user: "hugeicons:user",
      home: "lucide:home",
    });

    expect(code).toContain(
      `import { icons as hugeicons } from '@iconify-json/hugeicons/icons.json'`,
    );
    expect(code).toContain(
      `import { icons as lucide } from '@iconify-json/lucide/icons.json'`,
    );

    expect(code).toContain(`user: hugeicons['user']`);
    expect(code).toContain(`home: lucide['home']`);
  });

  it("should return an empty export when no icons are provided", () => {
    expect(generateIconSet()).toBe(`export default {}`);
    expect(generateIconSet({})).toBe(`export default {}`);
  });

  it("should ignore invalid icon entries", () => {
    const code = generateIconSet({
      valid: "lucide:moon",
      invalid: "moon",
    });

    expect(code).toContain(`lucide['moon']`);
    expect(code).not.toContain("invalid");
  });
});

describe("#parseIconSet", () => {
  it("should group icons by collection", () => {
    const result = parseIconSet({
      dark: "lucide:moon",
      light: "lucide:sun",
      user: "hugeicons:user",
    });

    expect(result.size).toBe(2);

    expect(result.get("lucide")).toEqual({
      varName: "lucide",
      icons: {
        dark: "moon",
        light: "sun",
      },
    });

    expect(result.get("hugeicons")).toEqual({
      varName: "hugeicons",
      icons: {
        user: "user",
      },
    });
  });

  it("should ignore invalid icon definitions", () => {
    const result = parseIconSet({
      valid: "lucide:moon",
      invalid1: "moon",
      invalid2: "lucide:",
      invalid3: ":moon",
    });

    expect(result.size).toBe(1);
    expect(result.get("lucide")?.icons).toEqual({
      valid: "moon",
    });
  });

  it("should return empty map when no icons are provided", () => {
    const result = parseIconSet({});
    expect(result.size).toBe(0);
  });
});

describe("#resolveIconSet", () => {
  it("should create defined iconset", () => {
    expect(resolveIconSet("heroicons-outline")).toBe(icon.heroicons_outline);
    expect(resolveIconSet("heroicons-solid")).toBe(icon.heroicons_solid);
    expect(resolveIconSet("hugeicons")).toBe(icon.hugeicons);
    expect(resolveIconSet("phosphor")).toBe(icon.phosphor);
    expect(resolveIconSet("tabler")).toBe(icon.tabler);
  });

  it("should default to lucide when no match", () => {
    expect(resolveIconSet()).toBe(icon.lucide);
  });
});
