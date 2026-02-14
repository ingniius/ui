"use client";

import type { Locale, Messages } from "@veehance/core/types";

import { LocaleContext } from "../contexts";

/* -------------------------------------------------------------------------- */
/* types                                                                      */
/* -------------------------------------------------------------------------- */

export type LocaleProviderProps<M extends Messages = Messages> = {
  children: React.ReactNode;
  locale?: Locale<M>;
};

/* -------------------------------------------------------------------------- */
/* provider                                                                   */
/* -------------------------------------------------------------------------- */

export function LocaleProvider<M extends Messages>({
  children,
  locale,
}: LocaleProviderProps<M>) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
