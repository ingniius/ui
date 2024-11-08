import type { Component } from "vue";

export type { VariantProps } from "tailwind-variants";

/**
 * @publicApi
 */
export type UComp = {
  as?: Component | string;
  asChild?: boolean;
};
