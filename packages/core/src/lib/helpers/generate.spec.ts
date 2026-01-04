import { describe, expect, it } from "vitest";

import type { Theme } from "../types";
import { generateCSS } from "./generate";

const defaultTheme: Theme = {
  colors: undefined,
  iconset: "lucide",
  transitions: true,
};

describe("#generateCSS", () => {
  it("include @source lines for each source", () => {
    const css = generateCSS({
      sources: ["a.css", "b.css"],
      theme: defaultTheme,
    });
    expect(css).toContain("@source 'a.css';");
    expect(css).toContain("@source 'b.css';");
  });

  it("always include neutral shades", () => {
    const css = generateCSS({ sources: [], theme: defaultTheme });
    expect(css).toContain("--color-neutral-50: var(--ui-color-neutral-50);");
    expect(css).toContain("--color-neutral-950: var(--ui-color-neutral-950);");
  });

  it("generate custom color variables when theme.colors is provided", () => {
    const css = generateCSS({
      sources: [],
      theme: { ...defaultTheme, colors: ["brand"] },
    });
    expect(css).toContain("--color-brand: var(--ui-brand);");
  });

  it("always include text, background, border, radius variables", () => {
    const css = generateCSS({ sources: [], theme: defaultTheme });

    expect(css).toContain("--text-color-default: var(--ui-text);");
    expect(css).toContain("--text-color-inverted: var(--ui-text-inverted);");

    expect(css).toContain("--background-color-default: var(--ui-bg);");
    expect(css).toContain(
      "--background-color-inverted: var(--ui-bg-inverted);",
    );

    expect(css).toContain("--border-color-default: var(--ui-border);");
    expect(css).toContain(
      "--border-color-inverted: var(--ui-border-inverted);",
    );

    expect(css).toContain("--radius-sm: var(--ui-radius);");
    expect(css).toContain("--radius-3xl: calc(var(--ui-radius) * 6);");
  });
});
