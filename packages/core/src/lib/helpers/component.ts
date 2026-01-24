import { defu } from "defu";

import { PRESET_MAP } from "../constants";
import type { IgnoredInput, Input, Prettify, StyleKey } from "../types";

export function defineComponents<T extends IgnoredInput | Input>(
  overrides: T,
  style: StyleKey | (string & {}) = "vega",
) {
  return defu(
    overrides ?? {},
    PRESET_MAP[style as keyof typeof PRESET_MAP] || PRESET_MAP.vega,
    { icon: { dynamic: false } },
  ) as Prettify<T & { icon: { dynamic: boolean } }>;
}
