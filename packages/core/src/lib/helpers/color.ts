import { pick } from "es-toolkit";

import { DEFAULT_COLORS, PRIMARY_COLOR } from "../constants";
import type { Colors, NeutralKey } from "../types";

export function defineColors(baseColor = "zinc", colors = DEFAULT_COLORS) {
  return pick(
    {
      primary: "emerald",
      secondary: "cyan",
      success: "green",
      info: "blue",
      warning: "yellow",
      error: "red",
      neutral: baseColor,
    } as Colors,
    [...colors, "neutral" as NeutralKey],
  );
}

export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set([PRIMARY_COLOR, ...colors])]
    : DEFAULT_COLORS;
}
