import { isFunction } from "radash";

import type { Dict, Options } from "../types";

export function generateTheme(
  ui: Dict<string, Dict>,
  component: string,
  options: Options = {},
) {
  const template = (ui as any)[component];
  const result = isFunction(template) ? template(options) : template;

  // Override default variants from `ui` config
  if (result?.defaultVariants?.color && options.theme?.defaultVariants?.color) {
    result.defaultVariants.color = options.theme.defaultVariants.color;
  }

  if (result?.defaultVariants?.size && options.theme?.defaultVariants?.size) {
    result.defaultVariants.size = options.theme.defaultVariants.size;
  }

  const variants = Object.entries(result.variants || {})
    .filter(([_, values]) => {
      const keys = Object.keys(values as Dict<string, unknown>);
      return keys.some((key) => key !== "true" && key !== "false");
    })
    .map(([key]) => key);

  let json = JSON.stringify(result, null, 2);
  for (const variant of variants) {
    json = json.replace(
      new RegExp(`("${variant}": "[^"]+")`, "g"),
      `$1 as typeof ${variant}[number]`,
    );
    json = json.replace(
      new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, "g"),
      (_, before, match, after) => {
        const replaced = match.replace(
          /("[^"]+")/g,
          `$1 as typeof ${variant}[number]`,
        );
        return `${before}${replaced}${after}`;
      },
    );
  }

  function generateVariantDeclarations(variants: string[]) {
    return variants.map((variant) => {
      const keys = Object.keys(result.variants[variant]);
      return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`;
    });
  }

  return [
    ...generateVariantDeclarations(variants),
    `export default ${json}`,
  ].join("\n\n");
}
