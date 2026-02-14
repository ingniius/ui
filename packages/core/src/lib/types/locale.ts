import type { Dict } from "./abstract";

export type Direction = "ltr" | "rtl";

export type Locale<M> = {
  name: string;
  code: string;
  dir: Direction;
  messages: M;
};

export interface LocaleOptions<M> {
  name: string;
  code: string;
  dir?: Direction;
  messages: M;
}

export type Messages = {
  colorMode: {
    dark: string;
    light: string;
    switchToDark: string;
    switchToLight: string;
    system: string;
  };
  error: {
    clear: string;
  };
};

export type Translator = (path: string, option?: TranslatorOption) => string;

export type TranslatorOption = Dict<string, string | number>;
