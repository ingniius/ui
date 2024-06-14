/**
 * @publicApi
 */
export type Strategy = "merge" | "override";

/**
 * @publicApi
 */
export type UI = {
  strategy?: Strategy;
  [key: string]: any;
};
