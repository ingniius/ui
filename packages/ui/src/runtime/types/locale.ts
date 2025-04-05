export type Direction = "ltr" | "rtl";

export interface Locale<M> {
  name: string;
  code: string;
  dir: Direction;
  messages: M;
}

export interface Messages {
  modal: {
    close: string;
  };
  slideover: {
    close: string;
  };
}
