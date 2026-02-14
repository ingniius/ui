import { createTV } from "tailwind-variants";

export const cc = <T>(config: T) => config;

export const cv = /* @__PURE__ */ createTV({
  twMerge: true,
  twMergeConfig: { prefix: "" },
});

export { cn, cx } from "tailwind-variants";
