import { pick } from "es-toolkit";

import type { ModuleOptions } from "./module";

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
    icons: {
      arrowLeft: "lucide-arrow-left",
      arrowRight: "lucide-arrow-right",
      caution: "lucide-circle-alert",
      check: "lucide-check",
      chevronDoubleLeft: "lucide-chevrons-left",
      chevronDoubleRight: "lucide-chevrons-right",
      chevronDown: "lucide-chevron-down",
      chevronLeft: "lucide-chevron-left",
      chevronRight: "lucide-chevron-right",
      chevronUp: "lucide-chevron-up",
      close: "lucide-x",
      copy: "lucide-copy",
      copyCheck: "lucide-copy-check",
      dark: "lucide-moon",
      error: "lucide-circle-x",
      ellipsis: "lucide-ellipsis",
      eye: "lucide-eye",
      eyeOff: "lucide-eye-off",
      external: "lucide-arrow-up-right",
      file: "lucide-file-text",
      folder: "lucide-folder",
      folderOpen: "lucide-folder-open",
      hash: "lucide-hash",
      info: "lucide-info",
      light: "lucide-sun",
      loading: "lucide-refresh-cw",
      menu: "lucide-menu",
      minus: "lucide-minus",
      panelClose: "lucide-panel-left-close",
      panelOpen: "lucide-panel-left-open",
      plus: "lucide-plus",
      search: "lucide-search",
      success: "lucide-circle-check",
      system: "lucide-monitor",
      tip: "lucide-lightbulb",
      warning: "lucide-triangle-alert",
    },
  };
}

export function getUiOptions(): ModuleOptions {
  return {
    prefix: "U",
    colorMode: true,
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
