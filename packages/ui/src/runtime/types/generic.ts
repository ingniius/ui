export type DeepPartial<T, O = any> = {
  [P in keyof T]?: T[P] extends Array<string>
    ? string
    : T[P] extends object
      ? DeepPartial<T[P], O>
      : T[P];
} & {
  [key: string]: O | TightMap<O>;
};

export type EmitsToProps<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: T[K] extends [...args: infer Args]
    ? (...args: Args) => void
    : never
};

export type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any>
  ? MaybeObject[Key]
  : never;

export interface TightMap<O = any> {
  [key: string]: TightMap | O;
}
