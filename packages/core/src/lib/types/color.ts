import type colors from "tailwindcss/colors";

import type { Dict, Prettify } from "./abstract";
import type { ColorKey, NeutralKey } from "./schema";

type _Color = "inherit" | "current" | "transparent" | "black" | "white";

export type Color =
  | Exclude<keyof typeof colors, _Color | NeutralKey>
  | (string & {});

export type Colors<T extends ColorKey = ColorKey> = Prettify<
  Dict<T | (string & {}), Color> & {
    neutral?: NeutralKey | (string & {});
  }
>;
