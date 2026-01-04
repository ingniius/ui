import type { Colors } from "../types";

export const CORE_PKG = "@veehance/core";

export const DEFAULT_COLORS = {
  primary: "indigo",
  secondary: "cyan",
  success: "green",
  info: "blue",
  warning: "yellow",
  error: "red",
  neutral: "slate",
} as Colors;

export const SHARED_PLUGINS = ["@tailwindcss/vite"];

export const SHARED_PACKAGES = ["es-toolkit", "tailwind-variants"];

export const SHADES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
