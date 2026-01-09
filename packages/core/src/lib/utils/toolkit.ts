import { diff, isEqual } from "ohash/utils";

export function mergeClasses(
  configClass?: string | string[],
  propClass?: string,
) {
  if (!configClass && !propClass) return "";
  return [
    ...(Array.isArray(configClass) ? configClass : [configClass]),
    propClass,
  ].filter(Boolean);
}

export function isPartiallyEqual(item1: any, item2: any) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === "added") {
      filtered.add(q.key);
    }
    return filtered;
  }, new Set<string>());

  const item1Filtered = Object.fromEntries(
    Object.entries(item1).filter(([key]) => !diffedKeys.has(key)),
  );
  const item2Filtered = Object.fromEntries(
    Object.entries(item2).filter(([key]) => !diffedKeys.has(key)),
  );

  return isEqual(item1Filtered, item2Filtered);
}
