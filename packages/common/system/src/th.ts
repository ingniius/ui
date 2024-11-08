import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";
import { clsx } from "clsx";

export { tv as cva } from "tailwind-variants";

/**
 * @publicApi
 * @name cn
 * @param values
 */
export function cn(...values: ClassValue[]) {
  return twMerge(clsx(values));
}
