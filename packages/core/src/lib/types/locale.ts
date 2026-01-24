export type Direction = "ltr" | "rtl";

export type Locale<M> = {
  name: string;
  code: string;
  dir: Direction;
  messages: M;
};

export interface DefineOptions<M> {
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
