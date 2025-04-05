import { pick } from "es-toolkit";
import { defaultConfig as tv } from "tailwind-variants";

import type { ModuleOptions } from "./module";

import icons from "./theme/icons";

export function getUiConfig(colors?: string[]) {
  return {
    colors: pick(
      {
        primary: "emerald",
        secondary: "indigo",
        success: "green",
        info: "blue",
        warning: "yellow",
        error: "red",
        neutral: "zinc",
      },
      [...(colors || []), "neutral" as any],
    ),
    components: {},
    icons,
    tv,
  };
}

export function getUiOptions(): ModuleOptions {
  return {
    prefix: "U",
    colorMode: true,
    image: false,
    fonts: true,
    theme: {
      colors: undefined,
      transitions: true,
    },
  };
}

export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set(["primary", ...colors])]
    : ["primary", "secondary", "success", "info", "warning", "error"];
}
