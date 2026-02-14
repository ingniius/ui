import type { Dict, Prettify } from "./abstract";
import type { Colors } from "./color";
import type { Components } from "./component";
import type { Icons } from "./icon";
import type { Raw, Schema, Token } from "./schema";
import type { Theme } from "./theme";

export type Options<T extends Dict = Dict> = Prettify<{
  output?: string;
  /**
   * Prefix for components
   * @defaultValue `U`
   */
  prefix?: string;
  /**
   * Enable or disable `color-mode` integration
   * @defaultValue `true`
   */
  colorMode?: boolean;
  /**
   * Enable or disable `fonts` integration
   * @defaultValue `true`
   */
  fonts?: boolean | null;
  /**
   * Enable or disable `image` integration
   * @defaultValue `true`
   */
  image?: boolean | null;
  /**
   * Enable or disable `locale` integration
   * @defaultValue `true`
   */
  locale?: boolean;
  /**
   * - `false` (default): Disable routing, use anchor tags
   * - `true`: Use router compatibility layer
   * - `'inertia'`: Use inertia compatibility layer
   * - `'tanstack'`: Use tanstack compatibility layer
   * - `null`: Use framework compatibility layer
   * @defaultValue `false`
   */
  router?: boolean | Token["router"] | null;
  /**
   * Customize how the `css` is generated
   */
  css?: Schema["css"];
  /**
   * Customize how the `dts` is generated
   */
  dts?: Schema["dts"];
  /**
   * Customize how the `theme` is generated
   */
  theme?: Theme;
  /**
   * Customize how the `ui` is generated
   */
  ui?: UI<T>;
}>;

export type UI<
  T extends Dict = Dict,
  C extends Token["color"] = Token["color"],
  I extends Token["icon"] = Token["icon"],
> = Prettify<{
  colors?: Partial<Colors<C>>;
  components?: Components<T>;
  css?: Raw["css"];
  icons?: Partial<Icons<I>>;
}>;
