import { camelCase } from "scule";

import { DEFAULT_THEME } from "../constants";
import type { Dict } from "../types";

export function detectIconset(icons?: Dict<string, string>) {
  if (!icons) return [DEFAULT_THEME.iconset];

  const collections = Object.values(icons)
    .map((value) => value.split(":"))
    .filter((parts) => parts.length > 1)
    .map((parts) => parts[0]);

  return collections.length
    ? [...new Set(collections)]
    : [DEFAULT_THEME.iconset];
}

export function generateIconset(icons?: Dict<string, string>) {
  const sets = detectIconset(icons);

  const entries = sets.map((name) => ({ name, identifier: camelCase(name) }));
  const imports = entries
    .map(
      ({ name, identifier }) =>
        `import ${identifier} from '@iconify-json/${name}/icons.json';`,
    )
    .join(" ");

  const iconsObject = entries.map((e) => e.identifier).join(", ");
  return `${imports} export const icons = { ${iconsObject} };\n`;
}
