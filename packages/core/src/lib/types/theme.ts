import type { Prettify, Stringify } from "./abstract";
import type { Schema, Token } from "./schema";

export type Theme = Prettify<{
  defaultVariants?: {
    /**
     * The default color variant to use for components
     * @defaultValue `'primary'`
     */
    color?: Stringify<Token["color"]>;
    /**
     * The default size variant to use for components
     * @defaultValue `'md'`
     */
    size?: Stringify<Token["size"]>;
  };
  /**
   * Define the color aliases available for components
   * @defaultValue `['primary', 'secondary', 'success', 'info', 'warning', 'error']`
   */
  colors?: string[];
  /**
   * Define the iconset available for components
   * @defaultValue `lucide`
   */
  iconset?: Schema["iconset"];
  /**
   * Define the preset styles for components
   * @defaultValue `vega`
   */
  preset?: Schema["preset"];
  /**
   * Enable or disable transitions on components
   * @defaultValue `true`
   */
  transitions?: boolean;
}>;
