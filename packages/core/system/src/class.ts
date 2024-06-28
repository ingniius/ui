import { clsx } from "clsx";

import { customTwMerge } from "./merge";
import type { ClassName } from "./types";

/**
 * @publicApi
 * @param values
 */
export function cn(...values: ClassName[]) {
  return customTwMerge(clsx(values));
}

/**
 * @publicApi
 * @param value
 */
export function cx<T>(value: T) {
  return value as T;
}
