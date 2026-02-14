"use client";

import { THEME_KEY } from "@veehance/core/constants";

import { ThemeProvider } from "next-themes";

import appConfig from "#build/app.config";

/* -------------------------------------------------------------------------- */
/* types                                                                      */
/* -------------------------------------------------------------------------- */

export type ColorModeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  disableTransition?: boolean;
  storageKey?: string;
};

/* -------------------------------------------------------------------------- */
/* provider                                                                   */
/* -------------------------------------------------------------------------- */

export function ColorModeProvider({
  children,
  defaultTheme,
  disableTransition = true,
  storageKey = THEME_KEY,
}: ColorModeProviderProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme={defaultTheme ?? (appConfig.colorMode ? "system" : "light")}
      disableTransitionOnChange={disableTransition}
      enableSystem={appConfig.colorMode}
      storageKey={storageKey}
    >
      {children}
    </ThemeProvider>
  );
}
