import type { Direction, Locale, Translator } from "@veehance/core/types";
import { buildTranslator } from "@veehance/core/utils";

import { computed, isRef, type MaybeRef, type Ref, ref, unref } from "vue";

export type LocaleContext<M> = {
  locale: Ref<Locale<M>>;
  lang: Ref<string>;
  dir: Ref<Direction>;
  code: Ref<string>;
  t: Translator;
};

export function buildLocaleContext<M>(
  locale: MaybeRef<Locale<M>>,
): LocaleContext<M> {
  const lang = computed(() => unref(locale).name);
  const code = computed(() => unref(locale).code);
  const dir = computed(() => unref(locale).dir);

  const localeRef = isRef(locale) ? locale : (ref(locale) as Ref<Locale<M>>);
  const localeValue = unref(locale);

  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(localeValue),
  };
}
