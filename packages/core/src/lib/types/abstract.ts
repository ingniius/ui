type Primitve = string | number | symbol;

export type Dict<K extends Primitve = string, V = any> = Record<K, V>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};

export type Input = Dict<string | number | symbol>;

export type IgnoredInput =
  | boolean
  | number
  | null
  | any[]
  | Dict<never>
  | undefined;

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Template = {
  filename: string;
  write?: boolean;
  getContents: (...args: any[]) => string;
};
