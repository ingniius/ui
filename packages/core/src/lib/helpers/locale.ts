import { defu } from "defu";

import type { DeepPartial, DefineOptions, Direction, Locale } from "../types";

export function defineLocale<M>(options: DefineOptions<M>): Locale<M> {
  return defu<DefineOptions<M>, [{ dir: Direction }]>(options, { dir: "ltr" });
}

export function extendLocale<M>(
  locale: Locale<M>,
  options: Partial<DefineOptions<DeepPartial<M>>>,
): Locale<M> {
  return defu<Locale<M>, [DefineOptions<M>]>(options, locale);
}
