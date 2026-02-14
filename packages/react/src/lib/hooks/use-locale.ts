import { en } from "@veehance/core/locale";
import type { Locale } from "@veehance/core/types";

import { use, useMemo } from "react";

import { LocaleContext } from "../contexts";
import { buildLocaleContext } from "../utils";

export const useLocale = <M>(localeOverride?: Locale<M>) => {
  const locale = localeOverride ?? _useLocale() ?? en;
  return useMemo(() => buildLocaleContext(locale), [locale]);
};

function _useLocale() {
  const context = use(LocaleContext);
  if (!context) throw new Error("useLocale must be used within a <UApp>");
  return context;
}
