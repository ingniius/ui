import type {
  ClassValue,
  TVCompoundVariants,
  TVDefaultVariants,
  TVVariants,
  VariantProps,
} from "tailwind-variants";

import type { Dict, Prettify } from "./abstract";

export type { ClassValue, VariantProps };

export type CVConfig<T extends Dict> = Prettify<
  {
    [P in keyof T]?: {
      [K in keyof T[P] as K extends
        | "base"
        | "slots"
        | "variants"
        | "defaultVariants"
        ? K
        : never]?: K extends "base"
        ? ClassValue
        : K extends "slots"
          ? {
              [S in keyof T[P]["slots"]]?: ClassValue;
            }
          : K extends "variants"
            ? TVVariants<
                T[P]["slots"],
                ClassValue,
                WidenVariantsValues<T[P]["variants"]>
              >
            : K extends "defaultVariants"
              ? TVDefaultVariants<
                  WidenVariantsValues<T[P]["variants"]>,
                  T[P]["slots"],
                  object,
                  undefined
                >
              : never;
    };
  } & {
    [P in keyof T]?: {
      compoundVariants?: TVCompoundVariants<
        WidenVariantsValues<T[P]["variants"]>,
        T[P]["slots"],
        ClassValue,
        object,
        undefined
      >;
    };
  }
>;

type WidenVariantsValues<V extends Dict | undefined> = V extends Dict
  ? V & {
      [K in keyof V]: V[K] extends Dict ? V[K] & Dict<string & {}, any> : V[K];
    }
  : V;
