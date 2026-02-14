import { defu } from "defu";

import { DEFAULT_THEME, PRESET_MAP } from "../constants";
import type { Schema } from "../types";

export function defineComponents(preset?: Schema["preset"]) {
  const [key, overrides] = parsePreset(preset);
  return defu(overrides ?? {}, PRESET_MAP[key ?? DEFAULT_THEME.preset], {
    icon: { dynamic: false },
  });
}

function parsePreset(preset?: Schema["preset"]) {
  return Array.isArray(preset) ? preset : ([preset, {}] as const);
}
