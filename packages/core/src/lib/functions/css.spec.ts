import { describe, expect, it } from "vitest";

import { generateCSS } from "./css";

const baseOptions = {
  css: {
    baseColor: "zinc" as const,
    variables: true,
  },
  theme: {
    colors: undefined,
    iconset: "lucide" as const,
    transitions: true,
  },
};

describe("#generateCSS", () => {
  it("includes @source lines for each source", () => {
    const css = generateCSS({
      ...baseOptions,
      css: { ...baseOptions.css, sources: ["a.css", "b.css"] },
    });

    expect(css).toContain("@source 'a.css';");
    expect(css).toContain("@source 'b.css';");
  });

  it("generates @source inline(...) from collected class attributes", () => {
    const css = generateCSS(baseOptions, [
      "dark",
      "custom-theme",
      "layout-default",
    ]);

    expect(css).toContain(`@source inline("dark");`);
    expect(css).toContain(`@source inline("custom-theme");`);
    expect(css).toContain(`@source inline("layout-default");`);
  });

  it("ignores undefined class attributes when generating inline sources", () => {
    const css = generateCSS(baseOptions, ["dark", undefined, ""]);

    expect(css).toContain(`@source inline("dark");`);
    expect(css).not.toContain(`@source inline("");`);
  });

  it("does not generate inline sources when not provided", () => {
    const css = generateCSS(baseOptions);

    expect(css).not.toContain("@source inline(");
  });

  it("always includes neutral color references", () => {
    const css = generateCSS(baseOptions);

    expect(css).toContain("--color-neutral-50: var(--ui-color-neutral-50);");
    expect(css).toContain("--color-neutral-950: var(--ui-color-neutral-950);");
  });

  it("generates semantic color variables when theme.colors is provided", () => {
    const css = generateCSS({
      ...baseOptions,
      theme: { ...baseOptions.theme, colors: ["primary"] },
    });

    expect(css).toContain("--color-primary: var(--ui-primary);");
  });

  it("does NOT generate @layer theme when css.variables is false", () => {
    const css = generateCSS({
      ...baseOptions,
      css: { ...baseOptions.css, variables: false },
    });

    expect(css).not.toContain("@layer theme");
    expect(css).toContain("--color-neutral-500: var(--ui-color-neutral-500);");
  });

  it("generates @layer theme with ui color definitions by default", () => {
    const css = generateCSS(baseOptions);

    expect(css).toContain("@layer theme");
    expect(css).toContain("--ui-color-neutral-500:");
    expect(css).toContain(':root[data-theme="light"]');
    expect(css).toContain(':root[data-theme="dark"]');
  });

  it("sanitizes and generates only declared theme colors", () => {
    const css = generateCSS({
      css: {
        baseColor: "slate",
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
    const css = generateCSS(baseOptions);

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
