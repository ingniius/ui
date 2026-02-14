import type { DeepPartial, Dict } from "./abstract";
import type { Color, Colors } from "./color";
import type { Components } from "./component";
import type { Icon, Icons } from "./icon";
import type { Raw, Schema, Token } from "./schema";

export type Options = Raw["config"];

export type Router = boolean | Token["router"] | null;

export type RouterKind = "base" | "meta" | "router" | Token["router"];

export type UI<
  T extends Dict = Dict,
  C extends Color = Color,
  I extends Icon = Icon,
> = DeepPartial<{
  colors: Colors<C>;
  components: Components<T>;
  icons: Icons<I>;
  tw: Schema["ui"]["tw"];
}>;
