import * as icon from "../../icon";
import type { Dict, Iconset } from "../types";

export function generateIconSet(icons?: Dict<string, string>) {
  const collections = parseIconSet(icons || {});
  if (!collections.size) return `export default {}`;

  const sortedCollections = [...collections.entries()].sort(([a], [b]) =>
    a.localeCompare(b),
  );

  const imports = sortedCollections.map(
    ([collection, { varName }]) =>
      `import { icons as ${varName} } from '@iconify-json/${collection}/icons.json'`,
  );

  const mappings = sortedCollections
    .flatMap(([, { varName, icons }]) =>
      Object.entries(icons)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, icon]) => `  ${key}: ${varName}['${icon}'],`),
    )
    .join("\n");

  return `${imports.join("\n")}

export default {
${mappings}
}
`.trimEnd();
}

export function parseIconSet(icons: Dict<string, string>) {
  const collections = new Map<
    string,
    { varName: string; icons: Record<string, string> }
  >();

  for (const [key, value] of Object.entries(icons)) {
    if (!value.includes(":")) continue;

    const [collection, icon] = value.split(":");
    if (!collection || !icon) continue;

    const varName = collection.replace(/[^a-zA-Z0-9_$]/g, "_");

    if (!collections.has(collection)) {
      collections.set(collection, { varName, icons: {} });
    }

    // biome-ignore lint/style/noNonNullAssertion: safe_to_set
    collections.get(collection)!.icons[key] = icon;
  }

  return collections;
}

export function resolveIconSet(iconset?: Iconset) {
  switch (iconset) {
    case "heroicons-solid":
      return icon.heroicons_solid;
    case "heroicons-outline":
      return icon.heroicons_outline;
    case "hugeicons":
      return icon.hugeicons;
    case "phosphor":
      return icon.phosphor;
    case "tabler":
      return icon.tabler;
    default:
      return icon.lucide;
  }
}
