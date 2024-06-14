import type { Dict, Func } from "./types";

/**
 * @publicApi
 * @description Check if a value is a function.
 * @param n
 */
export function func(n: unknown): n is Func {
  return typeof n === "function";
}

/**
 * @publicApi
 * @description Check if a value is not null and not undefined.
 * @param n
 */
export function is<T>(n: T): n is Exclude<T, undefined | null> {
  return n !== undefined && n !== null;
}

/**
 * @publicApi
 * @description Check if a value is a number.
 * @param n
 */
export function num(n: unknown): n is number {
  return typeof n === "number" && !Number.isNaN(n);
}

/**
 * @publicApi
 * @description Check if a value is an object.
 * @param n
 */
export function obj(n: unknown): n is Dict {
  return typeof n === "object" && n !== null && !Array.isArray(n);
}

/**
 * @publicApi
 * @description Check if a value is a string.
 * @param n
 */
export function str(n: unknown): n is Exclude<string, ""> {
  return typeof n === "string" && n !== "";
}
