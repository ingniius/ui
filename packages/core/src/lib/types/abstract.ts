type Booleanable = boolean | "false" | "true" | "";

export type Stringable = string | Booleanable | number;

type Primitve = string | number | symbol;

export type Dict<K extends Primitve = string, V = any> = Record<K, V>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Stringify<T> = T | (string & {});

export type Template<Args extends any[] = any[]> = {
  filename: string;
  write?: boolean;
  getContents: (...args: Args) => string;
};
