import type { Component } from "vue";

/**
 * @publicApi
 */
export type UComp = {
  as?: Component | string;
  asChild?: boolean;
};
