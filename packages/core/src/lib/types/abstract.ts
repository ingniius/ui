export type Dict<K extends string | number | symbol = string, V = any> = Record<
  K,
  V
>;

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Input = Dict<string | number | symbol>;

export type IgnoredInput =
  | boolean
  | number
  | null
  | any[]
  | Dict<never>
  | undefined;
