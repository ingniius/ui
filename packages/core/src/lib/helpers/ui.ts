import { defu } from "defu";
import { isString, omit } from "radash";

import { defaults } from "../defaults";
import type { Config, Macro, Options } from "../types";
import { defineColors } from "./color";
import { defineComponents } from "./component";
import { defineIcons } from "./icon";

export function resolveConfig(
  ...layers: (Options | null | undefined)[]
): Options {
  return layers
    .filter((l): l is Options => l != null)
    .reduce<Options>(
      (acc, layer) => defu(layer, acc),
      omit(defaults, ["ui", "uiPro"]),
    );
}

export function resolveRawConfig(
  config: Config["raw"] | null,
): Config["schema"] | null {
  if (!config) return null;
  return {
    dts: config.dts,
    ...config.framework.features,
    router: {
      core: false,
      inertia: "inertia" as const,
      next: null,
      nuxt: null,
      router: true,
      tanstack: "tanstack" as const,
    }[config.framework.adapter],
    tailwind: config.tailwind,
    theme: config.theme,
    ui: config.ui,
    uiPro: config.uiPro,
  };
}

export function resolveUI(options: Options) {
  return defu(options.ui, {
    colors: defineColors(options.ui?.colors?.neutral, options.theme?.colors),
    components: defineComponents(options.theme?.preset),
    icons: defineIcons(options.theme?.iconset),
    tw: defineTW(options.tailwind?.strategy),
  });
}

function defineTW(strategy?: Macro["strategy"]) {
  const { merge, options } = parseStrategy(strategy);
  return defu({ merge, options }, { options: { prefix: "" } });
}

function parseStrategy(
  strategy: Macro["strategy"] = defaults.tailwind.strategy,
) {
  const merge = (isString(strategy) ? strategy : strategy[0]) === "merge";
  return { merge, options: isString(strategy) ? {} : strategy[1] };
}
