import { describe, expect, it } from "vitest";

import { COLOR_SHADES } from "../constants";
import { generateColors } from "./color";

describe("generateColors", () => {
  it("generates a theme layer with root, light and dark blocks", () => {
    const css = generateColors({ primary: "blue", secondary: "red" });

    expect(css).toContain("@layer theme");
    expect(css).toContain(":root, :host {");
    expect(css).toContain(':root[data-theme="light"]');
    expect(css).toContain(':root[data-theme="dark"]');
  });

  it("generates color shade variables for each provided color", () => {
    const css = generateColors({ primary: "blue" });

    for (const shade of COLOR_SHADES) {
      expect(css).toContain(`--ui-color-primary-${shade}:`);
      expect(css).toContain(`--color-blue-${shade}`);
    }
  });

  it("uses old-neutral fallback when color value is neutral", () => {
    const css = generateColors({ neutral: "neutral" });

    for (const shade of COLOR_SHADES) {
      expect(css).toContain(
        `--ui-color-neutral-${shade}: var(--color-old-neutral-${shade}`,
      );
    }
  });

  it("generates light theme variables using shade 500", () => {
    const css = generateColors({ primary: "green", secondary: "purple" });

    expect(css).toContain("--ui-primary: var(--ui-color-primary-500);");
    expect(css).toContain("--ui-secondary: var(--ui-color-secondary-500);");
  });

  it("generates dark theme variables using shade 400", () => {
    const css = generateColors({ primary: "green", secondary: "purple" });

    expect(css).toContain("--ui-primary: var(--ui-color-primary-400);");
    expect(css).toContain("--ui-secondary: var(--ui-color-secondary-400);");
  });

  it("ignores undefined or falsy color entries", () => {
    const css = generateColors({ primary: "blue", secondary: undefined });

    expect(css).toContain("--ui-color-primary-");
    expect(css).not.toContain("--ui-color-secondary-");
  });

  it("does not throw when an unknown tailwind color is used", () => {
    expect(() =>
      generateColors({ primary: "not-a-real-color" as any }),
    ).not.toThrow();
  });
});
