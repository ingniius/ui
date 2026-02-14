"use client";

import type { Locale } from "@veehance/core/types";

import { createContext } from "react";

/* -------------------------------------------------------------------------- */
/* types                                                                      */
/* -------------------------------------------------------------------------- */

type LocaleValue<M> = Locale<M>;

/* -------------------------------------------------------------------------- */
/* context                                                                    */
/* -------------------------------------------------------------------------- */
export const LocaleContext = createContext<LocaleValue<any> | null>(null);
