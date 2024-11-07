import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import type { ClassValue } from "clsx";
import { clsx } from "clsx";

/**
 * @publicApi
 * @name cn
 * @param values
 */
export function cn(...values: ClassValue[]) {
  return twMerge(clsx(values));
}

/**
 * @publicApi
 * @name cva
 * @param config
 * @param ui
 */
export function cva<T extends { base: string }>(config: T, ui: Partial<T> = {}) {
  return tv({ extend: tv(config), ...ui });
}
