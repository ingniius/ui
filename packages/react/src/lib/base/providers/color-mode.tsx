"use client";

import { THEME_KEY } from "@veehance/core/constants";
import type { ColorMode, ColorModePreference } from "@veehance/core/types";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ColorModeProviderContext } from "../contexts";

/* -------------------------------------------------------------------------- */
/* types                                                                      */
/* -------------------------------------------------------------------------- */

export type ColorModeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ColorModePreference;
  storageKey?: string;
};

/* -------------------------------------------------------------------------- */
/* provider                                                                   */
/* -------------------------------------------------------------------------- */

export function ColorModeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_KEY,
}: ColorModeProviderProps) {
  const storageKeyRef = useRef(storageKey);

  const [theme, setThemeState] = useState<ColorModePreference>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (
      (localStorage.getItem(storageKeyRef.current) as ColorModePreference) ??
      defaultTheme
    );
  });

  const resolvedTheme = useMemo<ColorMode>(() => {
    if (theme !== "system") return theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applySystemTheme = () => {
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
    };

    applySystemTheme();
    media.addEventListener("change", applySystemTheme);

    return () => {
      media.removeEventListener("change", applySystemTheme);
    };
  }, [theme]);

  const setTheme = useCallback((next: ColorModePreference) => {
    localStorage.setItem(storageKeyRef.current, next);
    setThemeState(next);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: safe_to_set
  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme],
  );

  return (
    <ColorModeProviderContext.Provider value={value}>
      {children}
    </ColorModeProviderContext.Provider>
  );
}
