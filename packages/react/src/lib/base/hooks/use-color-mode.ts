"use client";

import type { ColorMode, ColorModePreference } from "@veehance/core/types";

import { use, useMemo } from "react";

import appConfig from "#build/app.config";

import { ColorModeProviderContext } from "../contexts";

export const useColorMode = () => {
  const { theme, resolvedTheme, setTheme } = _useColorMode();

  return useMemo(() => {
    if (!appConfig.colorMode) return { forced: true as const };

    const preference: ColorModePreference =
      theme === "light" || theme === "dark" ? theme : "system";

    const value: ColorMode | undefined =
      preference === "system"
        ? (resolvedTheme as ColorMode | undefined)
        : preference;

    return {
      forced: false as const,
      preference,
      setTheme: (value: ColorModePreference) => setTheme(value),
      value,
    };
  }, [theme, resolvedTheme, setTheme]);
};

function _useColorMode() {
  const context = use(ColorModeProviderContext);
  if (!context) throw new Error("useColorMode must be used within a <UApp>");
  return context;
}
