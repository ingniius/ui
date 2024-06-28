/**
 * @private
 */
type Key = string | number | symbol;

/**
 * @private
 */
type Intersect<T, U> = Omit<T | U, keyof Subtract<T, U>>;

/**
 * @private
 */
type Subtract<
  T,
  U,
  X = Omit<T, keyof U> & Omit<U, keyof T>,
  Y = {
    [K in keyof X]: X[K];
  },
> = Y;

/**
 * @publicApi
 */
export type DeepMerge<
  T,
  U,
  // non shared keys are optional
  X = Partial<Subtract<T, U>> & {
    // shared keys are required
    [K in keyof Intersect<T, U>]: T[K] | U[K];
  },
  Y = { [K in keyof X]: X[K] },
> = Y;

/**
 * @publicApi
 */
export type DeepPartial<T> = T extends Dict
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/**
 * @publicApi
 */
export type Dict<K extends Key = Key, V = any> = Record<K, V>;

/**
 * @publicApi
 */
export type Func = (...args: any[]) => any;
