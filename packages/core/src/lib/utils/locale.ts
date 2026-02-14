import { get } from "radash";

import type { Locale, Translator, TranslatorOption } from "../types";

export function buildTranslator<M>(locale: Locale<M>): Translator {
  return (path, option) => translate(path, option, locale);
}

function translate<M>(
  path: string,
  option: TranslatorOption | undefined,
  locale: Locale<M>,
): string {
  return get(locale, `messages.${path}`, path).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`,
  );
}
