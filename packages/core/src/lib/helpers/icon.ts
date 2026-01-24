import { defu } from "defu";

import { ICONSET_MAP } from "../constants";
import type { Iconset } from "../types";

export function defineIcons(iconset?: Iconset) {
  const [key, overrides = {}] = Array.isArray(iconset)
    ? iconset
    : [iconset, {}];

  return defu(
    overrides ?? {},
    ICONSET_MAP[key as keyof typeof ICONSET_MAP] || ICONSET_MAP.lucide,
  );
}
