import { createDefu, defu } from "defu";
import { extendTailwindMerge } from "tailwind-merge";

import { str } from "@vee-ui/util";

import type { Strategy } from "./types";

/**
 * @internal
 */
export const customTwMerge = extendTailwindMerge<string, string>({
  extend: {
    classGroups: {
      icons: [(classPart: string) => /^i-/.test(classPart)],
    },
  },
});

/**
 * @private
 */
const defuTwMerge = createDefu((obj, k, v, n) => {
  if (n === "default" || n.startsWith("default.")) return false;
  if (str(obj[k]) && str(v) && obj[k] && v) {
    // @ts-ignore
    obj[k] = customTwMerge(obj[k], v);
    return true;
  }
});

/**
 * @publicApi
 */
export function mergeConfig<T>(strategy: Strategy, ...configs: any[]): T {
  if (strategy === "override") return defu({}, ...configs) as T;
  return defuTwMerge({}, ...configs) as T;
}
