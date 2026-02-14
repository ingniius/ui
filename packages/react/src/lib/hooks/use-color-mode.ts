"use client";

import type { ColorMode, ColorModePreference } from "@veehance/core/types";

import { useTheme as _useTheme } from "next-themes";
import { useMemo } from "react";

import appConfig from "#build/app.config";

export const useColorMode = () => {
  const { theme, systemTheme, setTheme } = _useTheme();

  return useMemo(() => {
    if (!appConfig.colorMode) return { forced: true as const };

    const preference: ColorModePreference =
      theme === "light" || theme === "dark" ? theme : "system";

    const value: ColorMode | undefined =
      preference === "system"
        ? (systemTheme as ColorMode | undefined)
        : preference;

    return {
      forced: false as const,
      preference,
      setTheme: (value: ColorModePreference) => setTheme(value),
      value,
    };
  }, [theme, systemTheme, setTheme]);
};
