import type { Direction, Locale, Translator } from "@veehance/core/types";
import { buildTranslator } from "@veehance/core/utils";

type LocaleContext<M> = {
  locale: Locale<M>;
  lang: string;
  dir: Direction;
  code: string;
  t: Translator;
};

export function buildLocaleContext<M>(locale: Locale<M>): LocaleContext<M> {
  return {
    locale,
    lang: locale.name,
    code: locale.code,
    dir: locale.dir,
    t: buildTranslator(locale),
  };
}
