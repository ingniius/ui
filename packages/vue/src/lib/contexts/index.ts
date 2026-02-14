import type { Locale } from "@veehance/core/types";

import type { InjectionKey, Ref } from "vue";

export const localeContext: InjectionKey<Ref<Locale<unknown> | undefined>> =
  Symbol.for("ui:locale");
