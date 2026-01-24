import { DEFAULT_FEATURES } from "../constants";
import type { IgnoredInput, Input, Options, Theme } from "../types";
import { defineColors } from "./color";
import { defineComponents } from "./component";
import { defineIcons } from "./icon";

export const defaultOptions = {
  prefix: "U",
  css: {
    strategy: "merge" as const,
    baseColor: "zinc" as const,
    prefix: "",
    unstyled: false,
    variables: false,
    entry: undefined,
    sources: ["./ui"],
  },
  ...DEFAULT_FEATURES,
  theme: {
    defaultVariants: {
      color: "primary" as const,
      size: "md" as const,
    },
    colors: undefined,
    iconset: "lucide" as const,
    style: "vega" as const,
    transitions: true,
  },
};

export function resolveUI<T extends IgnoredInput | Input>(
  css: Options["css"],
  preset: T,
  theme: Theme,
) {
  return {
    colors: defineColors(css?.baseColor, theme.colors),
    components: defineComponents<T>(preset, theme.style),
    css: { strategy: css?.strategy ?? "merge", prefix: css?.prefix ?? "" },
    icons: defineIcons(theme.iconset),
  };
}
