/**
 * @private
 */
type Key = string | number | symbol;

/**
 * @publicApi
 */
export type Dict<T extends Key = Key, V = any> = Record<T, V>;

/**
 * @publicApi
 */
export type Func = (...args: any[]) => any;
