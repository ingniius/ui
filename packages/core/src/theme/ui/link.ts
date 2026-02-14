import type { Options } from "../../lib/types";
import { cc } from "../../lib/utils";

export default (options: Options) =>
  cc({
    base: "focus-visible:outline-primary",
    variants: {
      active: {
        false: "text-muted",
        true: "text-primary",
      },
      disabled: {
        true: "cursor-not-allowed opacity-75",
      },
    },
    compoundVariants: [
      {
        active: false,
        disabled: false,
        class: [
          "hover:text-default",
          options.theme?.transitions && "transition-colors",
        ],
      },
    ],
  });
