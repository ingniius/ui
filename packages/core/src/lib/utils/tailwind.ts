import { type CnOptions, cnMerge, createTV } from "tailwind-variants";

import appConfig from "#build/app.config";

export const cc = <T>(theme: T) => theme;

export const cn = /* @__PURE__ */ (...classes: CnOptions) =>
  cnMerge(classes)({
    twMerge: true,
    twMergeConfig: appConfig.ui.tw.options,
  });

export const cv = /* @__PURE__ */ createTV({
  twMerge: appConfig.ui.tw.merge,
  twMergeConfig: appConfig.ui.tw.options,
});

export { cx } from "tailwind-variants";
