"use client";

import type { ColorMode, ColorModePreference } from "@veehance/core/types";

import { createContext } from "react";

/* -------------------------------------------------------------------------- */
/* types                                                                      */
/* -------------------------------------------------------------------------- */

type ColorModeValue = {
  theme: ColorModePreference;
  resolvedTheme: ColorMode;
  setTheme: (theme: ColorModePreference) => void;
};

/* -------------------------------------------------------------------------- */
/* context                                                                    */
/* -------------------------------------------------------------------------- */

export const ColorModeProviderContext = createContext<ColorModeValue | null>(
  null,
);
