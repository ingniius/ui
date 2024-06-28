import { is, str } from "./assertion";
import type { Dict } from "./types";

/**
 * @publicApi
 * @description Get value from an object.
 * @param object
 * @param path
 * @param defaultValue
 */
export function get(
  object: Dict,
  path: (string | number)[] | string,
  defaultValue?: any,
): any {
  if (str(path)) {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return isNaN(numKey) ? key : numKey;
    });
  }

  let result: any = object;

  for (const key of path) {
    if (!is(result)) return defaultValue;
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

/**
 * @publicApi
 * @description Omit values from an object.
 * @param object
 * @param keysToOmit
 */
export function omit<T extends Dict, K extends keyof T>(
  object: T,
  keysToOmit: K[] | any[],
): Pick<T, Exclude<keyof T, K>> {
  const result = { ...object };

  for (const key of keysToOmit) {
    // @ts-ignore
    delete result[key];
  }

  return result;
}
