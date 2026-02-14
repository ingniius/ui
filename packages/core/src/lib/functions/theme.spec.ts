import { describe, expect, it } from "vitest";

import type { Options } from "../types";
import { generateTheme } from "./theme";

const plainObjectComponent = {
  slots: {
    root: "rounded-lg",
    header: "p-4 sm:px-6",
    body: "p-4 sm:px-6",
    footer: "p-4 sm:px-6",
  },
  variants: {
    variant: {
      solid: { root: "bg-inverted text-inverted" },
      outline: { root: "divide-y divide-default bg-default ring ring-default" },
      soft: { root: "divide-y divide-default bg-elevated/50" },
      subtle: {
        root: "divide-y divide-default bg-elevated/50 ring ring-default",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
  },
};

function functionComponent(options: Options) {
  return {
    base: [
      "inline font-medium underline-offset-[6px] hover:decoration-current",
      options.theme?.transitions && "transition-colors",
    ],
    variants: {
      active: { true: "", false: "" },
      disabled: { true: "cursor-not-allowed opacity-75", false: "" },
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""]),
        ),
        neutral: "",
      },
      variant: {
        solid: "underline",
        ghost: "no-underline hover:underline",
        subtle: "no-underline",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  };
}

const defaultTheme: Options["theme"] = {
  colors: undefined,
  iconset: "lucide",
  transitions: true,
};

describe("generateTheme", () => {
  it("generates template from plain object", () => {
    const output = generateTheme(
      { component: plainObjectComponent },
      "component",
    );

    expect(output).toContain("export default");
    expect(output).toContain('"slots"');
    expect(output).toContain("const variant =");
    expect(output).toContain('"outline"');
  });

  it("generates template from function", () => {
    const output = generateTheme(
      { component: functionComponent },
      "component",
      { theme: defaultTheme },
    );

    expect(output).toContain("export default");
    expect(output).toContain('"variants"');
    expect(output).toContain("const variant =");
    expect(output).toContain('"ghost"');
  });

  it("respects theme transitions in function component", () => {
    const output = generateTheme(
      { component: functionComponent },
      "component",
      { theme: { ...defaultTheme, transitions: false } },
    );

    expect(output).not.toContain("transition-colors");
  });
});
