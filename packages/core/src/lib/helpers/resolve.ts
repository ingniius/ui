import { defu } from "defu";

import * as icon from "../../icon";
import { DEFAULT_COLORS } from "../constants";
import type {
  Iconset,
  IgnoredInput,
  Input,
  NeutralColor,
  Prettify,
} from "../types";
import { pick } from "../utils";

export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set(["primary", ...colors])]
    : ["primary", "secondary", "success", "info", "warning", "error"];
}

export function resolveConfig(colors?: string[], iconset?: Iconset) {
  return {
    colors: pick(DEFAULT_COLORS, [
      ...(colors || []),
      "neutral" as NeutralColor,
    ]),
    icons: resolveIcons(iconset),
  };
}

export function resolveIcons(iconset?: Iconset) {
  switch (iconset) {
    case "heroicons-solid":
      return icon.heroicons_solid;
    case "heroicons-outline":
      return icon.heroicons_outline;
    case "hugeicons":
      return icon.hugeicons;
    case "phosphor":
      return icon.phosphor;
    case "tabler":
      return icon.tabler;
    default:
      return icon.lucide;
  }
}

export function resolveOptions<T extends IgnoredInput | Input>(options?: T) {
  return defu(options, {
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
