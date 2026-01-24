import { describe, expect, it } from "vitest";

import { generateCss } from "./css";

const baseOptions = {
  css: {
    baseColor: "zinc" as const,
    variables: false,
  },
  theme: {
    colors: undefined,
    iconset: "lucide" as const,
    transitions: true,
  },
};

describe("#generateCss", () => {
  it("includes @source lines for each source", () => {
    const css = generateCss({
      ...baseOptions,
      css: { ...baseOptions.css, sources: ["a.css", "b.css"] },
    });

    expect(css).toContain("@source 'a.css';");
    expect(css).toContain("@source 'b.css';");
  });

  it("always includes neutral color references", () => {
    const css = generateCss(baseOptions);

    expect(css).toContain("--color-neutral-50: var(--ui-color-neutral-50);");
    expect(css).toContain("--color-neutral-950: var(--ui-color-neutral-950);");
  });

  it("generates semantic color variables when theme.colors is provided", () => {
    const css = generateCss({
      ...baseOptions,
      theme: {
        ...baseOptions.theme,
        colors: ["primary"],
      },
    });

    expect(css).toContain("--color-primary: var(--ui-primary);");
  });

  it("does NOT generate @layer theme when css.variables is false", () => {
    const css = generateCss({
      ...baseOptions,
      css: {
        ...baseOptions.css,
        variables: false,
      },
    });

    expect(css).not.toContain("@layer theme");

    // sanity: references still exist
    expect(css).toContain("--color-neutral-500: var(--ui-color-neutral-500);");
  });

  it("generates @layer theme with ui color definitions when css.variables is true", () => {
    const css = generateCss({
      ...baseOptions,
      css: {
        ...baseOptions.css,
        variables: true,
      },
    });

    expect(css).toContain("@layer theme");
    expect(css).toContain("--ui-color-neutral-500:");
    expect(css).toContain(':root[data-theme="light"]');
    expect(css).toContain(':root[data-theme="dark"]');
  });

  it("sanitizes and generates only declared theme colors", () => {
    const css = generateCss({
      css: {
        baseColor: "slate",
        variables: true,
        sources: [],
      },
      theme: {
        colors: ["primary", "error"],
        iconset: "lucide",
        transitions: true,
      },
    });

    expect(css).toContain("--ui-color-primary-500");
    expect(css).toContain("--ui-color-error-500");
    expect(css).not.toContain("--ui-color-success-500");
  });

  it("always includes text, background, border and radius tokens", () => {
    const css = generateCss(baseOptions);

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
