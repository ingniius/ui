type Key = string | number | symbol;

/**
 * @publicApi
 */
export type Dict<K extends Key = Key, V = any> = Record<K, V>;
