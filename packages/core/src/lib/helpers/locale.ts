import { defu } from "defu";

import type { DeepPartial, Direction, Locale, LocaleOptions } from "../types";

export function defineLocale<M>(options: LocaleOptions<M>): Locale<M> {
  return defu<LocaleOptions<M>, [{ dir: Direction }]>(options, { dir: "ltr" });
}

export function extendLocale<M>(
  locale: Locale<M>,
  options: DeepPartial<LocaleOptions<M>>,
): Locale<M> {
  return defu<Locale<M>, [LocaleOptions<M>]>(options, locale);
}
