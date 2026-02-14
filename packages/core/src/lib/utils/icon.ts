import { replaceIDs, iconToSVG as toSVG } from "@iconify/utils";
import { camelCase } from "scule";

import { icons } from "#build/ui/icons";

import type { Dict } from "../types";

export const iconToSVG = /* @__PURE__ */ (icon: string) => {
  const [collectionRaw, name] = icon.split(":");
  if (!collectionRaw || !name) return null;

  const collectionKey = camelCase(collectionRaw);

  const iconSet = (icons as Dict<string, Dict>)[collectionKey];
  if (!iconSet) return null;

  const iconData = iconSet.icons?.[name];
  if (!iconData) return null;

  const { attributes, body } = toSVG(
    { ...iconSet, ...iconData },
    { height: "1em", width: "1em" },
  );

  return { attributes, body: replaceIDs(body) };
};
