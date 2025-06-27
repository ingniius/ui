import antfu from "@antfu/eslint-config";
import turbo from "eslint-config-turbo/flat";

import { config, rules } from "./base.mjs";

/** @type {Awaited<import('@antfu/eslint-config').TypedFlatConfigItem[]>} */
export default (options) =>
  antfu(
    {
      ...config,
      vue: {
        overrides: {
          "import/first": "off",
          "vue/no-multiple-template-root": "off",
          "vue/operator-linebreak": ["error", "before"],
        },
      },
    },
    { rules },
    ...turbo,
    ...options,
  );
