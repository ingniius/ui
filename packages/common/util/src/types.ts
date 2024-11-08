type Key = string | number | symbol;

/**
 * @publicApi
 */
export type Dict<K extends Key = Key, V = any> = Record<K, V>;

type DeepKey<T, Keys extends Key[]> = Keys extends [infer First, ...infer Rest]
  ? First extends keyof T
    ? Rest extends string[]
      ? DeepKey<T[First], Rest>
      : never
    : never
  : T;

/**
 * @publicApi
 */
export type ExtractDeepObject<T, Path extends string[]> =
  DeepKey<T, Path> extends infer Result ? (Result extends Dict ? Result : never) : never;

/**
 * @publicApi
 */
export type ExtractDeepKey<T, Path extends string[]> =
  DeepKey<T, Path> extends infer Result
    ? Result extends Dict<string>
      ? keyof Result
      : never
    : never;

/**
 * @publicApi
 */
export type NestedKeyOf<T extends Dict> = {
  [Key in keyof T]: T[Key] extends Dict ? NestedKeyOf<T[Key]> : Key;
}[keyof T];
