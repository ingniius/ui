import { defu } from "defu";

import { DEFAULT_OPTIONS, DEFAULT_STRATEGY } from "../constants";
import type { Options } from "../types";
import { defineColors } from "./color";
import { defineComponents } from "./component";
import { defineIcons } from "./icon";

export function resolveOptions(
  ...layers: (Options | null | undefined)[]
): Options {
  return layers
    .filter((l): l is Options => l != null)
    .reduce<Options>((acc, layer) => defu(layer, acc), DEFAULT_OPTIONS);
}

export function resolveUI(options: Options) {
  return defu(options.ui, {
    colors: defineColors(
      options.ui?.colors?.neutral ?? options.css?.baseColor,
      options.theme?.colors,
    ),
    components: defineComponents(options.theme?.preset),
    css: {
      strategy: options.css?.strategy ?? DEFAULT_STRATEGY,
      prefix: options.css?.prefix ?? "",
    },
    icons: defineIcons(options?.theme?.iconset),
  });
}
