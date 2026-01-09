import { defu } from "defu";
import { pick } from "es-toolkit";

import type {
  Colors,
  Iconset,
  IgnoredInput,
  Input,
  NeutralColor,
  Prettify,
} from "../types";
import { resolveIconSet } from "./iconset";

export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set(["primary", ...colors])]
    : ["primary", "secondary", "success", "info", "warning", "error"];
}

export function resolveConfig(colors?: string[], iconset?: Iconset) {
  return {
    colors: pick(
      {
        primary: "emerald",
        secondary: "cyan",
        success: "green",
        info: "blue",
        warning: "yellow",
        error: "red",
        neutral: "zinc",
      } as Colors,
      [...(colors || []), "neutral" as NeutralColor],
    ),
    icons: resolveIconSet(iconset),
  };
}

export function resolveOptions<T extends IgnoredInput | Input>(options?: T) {
  return defu(options, {
    prefix: "U",
    theme: {
      defaultVariants: {
        color: "primary" as const,
        size: "md" as const,
      },
      colors: undefined,
      iconset: "lucide" as const,
      transitions: true,
    },
  }) as Prettify<T>;
}
