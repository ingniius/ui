import { defu } from "defu";

import { DEFAULT_THEME, ICONSET_MAP } from "../constants";
import type { Schema } from "../types";

export function defineIcons(iconset?: Schema["iconset"]) {
  const [key, overrides] = parseIconset(iconset);
  return defu(overrides, ICONSET_MAP[key || DEFAULT_THEME.iconset]);
}

function parseIconset(iconset?: Schema["iconset"]) {
  return Array.isArray(iconset) ? iconset : ([iconset, {}] as const);
}
