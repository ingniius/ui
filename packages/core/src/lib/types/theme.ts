import type { Prettify } from "./abstract";
import type { ColorKeys } from "./color";
import type { Iconset } from "./icon";

export type Theme = Prettify<{
  defaultVariants?: {
    /**
     * The default color variant to use for components
     * @defaultValue `'primary'`
     */
    color?: ColorKeys | (string & {});
    /**
     * The default size variant to use for components
     * @defaultValue `'md'`
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | (string & {});
  };
  /**
   * Define the color aliases available for components
   * @defaultValue `['primary', 'secondary', 'success', 'info', 'warning', 'error']`
   */
  colors?: string[];
  /**
   * @defaultValue `lucide`
   */
  iconset?: Iconset;
  /**
   * Enable or disable transitions on components
   * @defaultValue `true`
   */
  transitions?: boolean;
}>;
