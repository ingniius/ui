import { defu } from "defu";

import * as preset from "../../preset";
import { defaults } from "../defaults";
import type { Macro } from "../types";

export const PRESET_MAP = {
  lyra: preset.lyra,
  maia: preset.maia,
  mira: preset.mira,
  nova: preset.nova,
  vega: preset.vega,
};

export function defineComponents(preset?: Macro["preset"]) {
  const [key, overrides] = parsePreset(preset);
  return defu(overrides ?? {}, PRESET_MAP[key], {
    icon: { dynamic: false },
  });
}

function parsePreset(preset: Macro["preset"] = defaults.theme.preset) {
  return Array.isArray(preset) ? preset : ([preset, {}] as const);
}
