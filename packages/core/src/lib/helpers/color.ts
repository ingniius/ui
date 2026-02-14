import { pick } from "radash";

import {
  DEFAULT_BASE_COLOR,
  DEFAULT_COLORS,
  PRIMARY_COLOR,
} from "../constants";
import type { Colors, Stringify, Token } from "../types";

export function defineColors(
  baseColor: Stringify<Token["baseColor"]> = DEFAULT_BASE_COLOR,
  colors: string[] = DEFAULT_COLORS,
) {
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
    [...colors, "neutral"],
  );
}

export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set([PRIMARY_COLOR, ...colors])]
    : DEFAULT_COLORS;
}
