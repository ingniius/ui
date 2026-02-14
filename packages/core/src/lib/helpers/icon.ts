import { defu } from "defu";

import * as iconset from "../../iconset";
import { defaults } from "../defaults";
import type { Macro } from "../types";

export const ICONSET_MAP = {
  "heroicons-outline": iconset.heroicons_outline,
  "heroicons-solid": iconset.heroicons_solid,
  hugeicons: iconset.hugeicons,
  lucide: iconset.lucide,
  phosphor: iconset.phosphor,
  tabler: iconset.tabler,
} as const;

export function defineIcons(iconset?: Macro["iconset"]) {
  const [key, overrides] = parseIconset(iconset);
  return defu(overrides, ICONSET_MAP[key]);
}

function parseIconset(iconset: Macro["iconset"] = defaults.theme.iconset) {
  return Array.isArray(iconset) ? iconset : ([iconset, {}] as const);
}
