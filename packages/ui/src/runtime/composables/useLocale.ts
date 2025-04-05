import type { InjectionKey, Ref } from "vue";

import { createSharedComposable } from "@vueuse/core";
import { computed, inject, toRef } from "vue";

import type { Locale, Messages } from "../types/locale";

import en from "../locales/en";
import { buildLocaleContext } from "../utils/locale";

export const localeContextInjectionKey: InjectionKey<Ref<Locale<unknown> | undefined>> = Symbol.for("ui.locale-context");

function _useLocale(localeOverrides?: Ref<Locale<Messages> | undefined>) {
  const locale = localeOverrides || toRef(inject<Locale<Messages>>(localeContextInjectionKey));
  return buildLocaleContext<Messages>(computed(() => locale.value || en));
}

export const useLocale = createSharedComposable(_useLocale);
