export function isDefined<T>(n: T): n is Exclude<T, undefined | null> {
  return n !== undefined && n !== null;
}

export function isNumber(n: unknown): n is number {
  return typeof n === "number" && !Number.isNaN(n);
};

export function isObject(
  n: unknown,
): n is Record<string | number | symbol, unknown> {
  return typeof n === "object" && n !== null && !Array.isArray(n);
}

export function isString(n: unknown): n is Exclude<string, ""> {
  return typeof n === "string" && n !== "";
}
