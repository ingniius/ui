import type { z } from "zod";

import type { cssSchema, iconsetSchema, rawCssSchema } from "../schemas";
import type { Dict, Prettify } from "./abstract";
import type { Colors } from "./color";
import type { Components } from "./component";
import type { Icons } from "./icon";
import type { ColorKey, IconKey, RouterKey, SizeKey, StyleKey } from "./schema";

export type Theme = Prettify<{
  defaultVariants?: {
    color?: ColorKey | (string & {});
    size?: SizeKey | (string & {});
  };
  colors?: string[];
  iconset?: z.infer<typeof iconsetSchema>;
  style?: StyleKey;
  transitions?: boolean;
}>;

export interface Options<T extends Dict = Dict> {
  output?: string;
  css?: Partial<z.infer<typeof cssSchema>>;
  prefix?: string;
  colorMode?: boolean;
  fonts?: boolean | null;
  image?: boolean | null;
  locale?: boolean;
  router?: boolean | RouterKey | null;
  theme?: Theme;
  ui?: UI<T>;
}

export interface UI<
  T extends Dict = Dict,
  C extends ColorKey = ColorKey,
  I extends IconKey = IconKey,
> {
  colors?: Partial<Colors<C>>;
  components?: Components<T>;
  css: Partial<z.infer<typeof rawCssSchema>>;
  icons?: Partial<Icons<I>>;
}
