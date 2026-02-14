import en from "@veehance/core/locale/en";
import type { Locale, Messages } from "@veehance/core/types";

import { createSharedComposable } from "@vueuse/core";
import { computed, inject, type Ref, toRef } from "vue";

import { localeContext } from "../contexts";
import { buildLocaleContext } from "../utils";

export const useLocale = /* @__PURE__ */ import.meta.client
  ? createSharedComposable(_useLocale)
  : _useLocale;

function _useLocale(localeOverrides?: Ref<Locale<Messages> | undefined>) {
  const locale =
    localeOverrides || toRef(inject<Locale<Messages>>(localeContext, en));
  return buildLocaleContext<Messages>(computed(() => locale.value || en));
}
