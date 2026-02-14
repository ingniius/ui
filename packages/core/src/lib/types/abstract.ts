export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};

type Primitve = string | number | symbol;

export type Dict<K extends Primitve = string, V = any> = Record<K, V>;
