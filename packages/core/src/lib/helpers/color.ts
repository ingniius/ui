import { pick } from "radash";

import { COLOR_KEYS } from "../constants";
import { defaults } from "../defaults";
import type { Colors, NeutralColor } from "../types";

export function defineColors(
  baseColor: NeutralColor = "zinc",
  colors: string[] = COLOR_KEYS as unknown as string[],
) {
  return pick({ ...defaults.ui.colors, neutral: baseColor } as Colors, [
    ...colors,
    "neutral",
  ]);
}

export function resolveColors(colors?: string[]) {
  return colors?.length ? [...new Set(["primary", ...colors])] : COLOR_KEYS;
}
