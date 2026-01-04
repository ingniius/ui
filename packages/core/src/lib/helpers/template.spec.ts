import { describe, expect, it } from "vitest";

import type { Theme } from "../types";
import { writeTemplate } from "./template";

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
      outline: { root: "bg-default ring-default divide-default divide-y ring" },
      soft: { root: "bg-elevated/50 divide-default divide-y" },
      subtle: {
        root: "bg-elevated/50 ring-default divide-default divide-y ring",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
  },
};

function functionComponent(options: Required<{ theme: Theme }>) {
  return {
    base: [
      "inline font-medium underline-offset-[6px] hover:decoration-current",
      options.theme.transitions && "transition-colors",
    ],
    variants: {
      active: { true: "", false: "" },
      disabled: { true: "cursor-not-allowed opacity-75", false: "" },
      color: {
        ...Object.fromEntries(
          (options.theme.colors || []).map((color: string) => [color, ""]),
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

const defaultTheme: Theme = {
  iconset: "lucide",
  transitions: true,
  colors: undefined,
};

describe("writeTemplate", () => {
  it("generate template from plain object", async () => {
    const output = await writeTemplate(
      { component: plainObjectComponent },
      "component",
    );
    expect(output).toContain("export default");
    expect(output).toContain('"slots"');
    expect(output).toContain("const variant =");
    expect(output).toContain('"outline"');
  });

  it("generate template from function", async () => {
    const output = await writeTemplate(
      { component: functionComponent },
      "component",
      { theme: defaultTheme },
    );
    expect(output).toContain("export default");
    expect(output).toContain('"variants"');
    expect(output).toContain("const variant =");
    expect(output).toContain('"ghost"');
  });

  it("respect theme transitions in function component", async () => {
    const output = await writeTemplate(
      { component: functionComponent },
      "component",
      {
        theme: { ...defaultTheme, transitions: false },
      },
    );
    expect(output).not.toContain("transition-colors");
  });
});
