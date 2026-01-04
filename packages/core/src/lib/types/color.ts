import type twColors from "tailwindcss/colors";

import type { Dict, Prettify } from "./abstract";

type _Color = "inherit" | "current" | "transparent" | "black" | "white";

export type Color =
  | Exclude<keyof typeof twColors, _Color | NeutralColor>
  | (string & {});

export type ColorKeys =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error";

export type Colors = Prettify<
  Dict<ColorKeys | (string & {}), Color> & {
    neutral?: NeutralColor | (string & {});
  }
>;

export type NeutralColor = "slate" | "gray" | "zinc" | "neutral" | "stone";
