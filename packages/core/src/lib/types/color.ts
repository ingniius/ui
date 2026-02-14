import type colors from "tailwindcss/colors";

import type { Dict, Prettify, Stringify } from "./abstract";
import type { Token } from "./schema";

export type Colors<C extends Token["color"] = Token["color"]> = Prettify<
  Dict<Stringify<C>, Stringify<Color>> & {
    neutral: Stringify<Token["baseColor"]>;
  }
>;

type Color = Exclude<
  keyof typeof colors,
  "inherit" | "current" | "transparent" | "black" | "white" | Token["baseColor"]
>;

export type ColorMode = "light" | "dark";

export type ColorModePreference = ColorMode | "system";
