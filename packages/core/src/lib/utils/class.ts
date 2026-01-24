import { createTV } from "tailwind-variants";

import appConfig from "#build/app.config";

export const cc = <T>(config: T) => config;

export const cv = /* @__PURE__ */ createTV({
  twMerge: appConfig.ui.css.strategy === "merge",
  twMergeConfig: {
    prefix: appConfig.ui.css.prefix,
    classGroups: appConfig.ui.css.classGroups,
  },
});

export { cn, cx } from "tailwind-variants";
