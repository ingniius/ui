import type { z } from "zod";

import type icons from "../../theme/icon/lucide";
import type { iconsetSchema } from "../schemas";
import type { Dict, Prettify } from "./abstract";

export type IconKey = keyof typeof icons;

export type Icons<T extends IconKey = IconKey> = Prettify<
  Dict<T | (string & {}), string>
>;

export type Iconset = z.infer<typeof iconsetSchema>;
