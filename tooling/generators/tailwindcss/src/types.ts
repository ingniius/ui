import type { Config as TwConfig } from "tailwindcss/types/config";

import type {
  CollectionNames,
  IconsPluginOptions,
} from "@egoist/tailwindcss-icons";

/**
 * @publicApi
 */
export type Config = Partial<TwConfig> & {
  ui?: {
    framework?: "vue" | "nuxt";
    icons?: CollectionNames[] | "all" | IconsPluginOptions;
  };
};
