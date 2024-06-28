import type { ClassArray, ClassDictionary } from "clsx";

import type { DeepPartial, Dict } from "@vee-ui/util";

/**
 * @publicApi
 */
export type Abstract<T = Dict> =
  | (Partial<T> & { strategy?: Strategy })
  | (DeepPartial<T> & { strategy?: Strategy });

/**
 * @publicApi
 */
export type ClassName =
  | string
  | number
  | bigint
  | boolean
  | ClassArray
  | ClassDictionary
  | null
  | undefined;

/**
 * @publicApi
 */
export type Strategy = "merge" | "override";

/**
 * @publicApi
 */
export type UI = {
  strategy?: Strategy;
  [key: string]: any;
};
