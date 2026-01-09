import type icons from "../../icon/lucide";
import type { Dict, Prettify } from "./abstract";

export type IconKeys = keyof typeof icons;

export type Icons = Prettify<Dict<IconKeys | (string & {}), string>>;

export type Iconset =
  | "heroicons-solid"
  | "hugeicons"
  | "heroicons-outline"
  | "lucide"
  | "phosphor"
  | "tabler";
