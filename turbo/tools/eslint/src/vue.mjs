import antfu from "@antfu/eslint-config";
import turbo from "eslint-plugin-turbo";

import { options, rules } from "./base.mjs";

/** @type {ReturnType<typeof antfu>} */
export default (configs) =>
  antfu(
    {
      ...options,
      yaml: true,
      vue: {
        overrides: {
          "vue/no-multiple-template-root": "off",
          "vue/operator-linebreak": ["error", "before"],
        },
      },
    },
    { ignores: ["**/*.config.*"], plugins: { turbo } },
    { rules: { ...rules, "import/first": "off" } },
    ...configs,
  );
