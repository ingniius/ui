import type {
  ClassValue,
  TVCompoundVariants,
  TVDefaultVariants,
  TVVariants,
} from "tailwind-variants";

import type { Dict, Prettify } from "./abstract";
import type { Raw } from "./schema";

export type Components<T extends Dict> = Prettify<
  Raw["preset"] & {
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

export type Component<
  T extends Dict,
  K extends string,
  U extends ComponentScope = "ui",
> = {
  config: ComponentConfig<NormalizedTheme<T>, K, U>;
  variants: ComponentVariants<NormalizedTheme<T>>;
  slots: ComponentSlots<T>;
  ui: ComponentUI<T>;
};

type ComponentConfig<
  T extends Dict,
  K extends string,
  U extends ComponentScope,
> = U extends "ui.prose"
  ? { ui?: { components?: { prose?: { [P in K]?: Partial<T> } } } }
  : { ui?: { components?: { [P in K]?: Partial<T> } } };

type ComponentScope = "ui" | "ui.prose";

type ComponentSlots<T extends Dict> = Prettify<{
  [K in keyof NormalizedTheme<T>["slots"]]?: ClassValue;
}>;

type ComponentVariants<T extends Dict> = T extends {
  variants: infer V extends Dict;
}
  ? {
      [K in keyof V]: keyof V[K];
    }
  : // biome-ignore lint/complexity/noBannedTypes: safe_to_set
    {};

type ComponentUI<T extends Dict> = Prettify<{
  [K in keyof NormalizedTheme<T>["slots"]]: (props?: Dict) => string;
}>;

type NormalizeBase<T> = T extends { base: infer B }
  ? B extends ClassValue
    ? B
    : never
  : undefined;

type NormalizeSlots<T> = T extends { slots: infer S extends Dict }
  ? S
  : { root: ClassValue };

type NormalizedTheme<T extends Dict> = {
  base?: NormalizeBase<T>;
  slots?: NormalizeSlots<T>;
  variants?: NormalizeVariants<T["variants"], NormalizeSlots<T>>;
};

type NormalizeVariants<V, S extends Dict> = V extends Dict
  ? {
      [K in keyof V]: V[K] extends Dict
        ? {
            [P in keyof V[K]]: {
              [Slot in keyof S]?: ClassValue;
            };
          }
        : never;
    }
  : undefined;

type WidenVariantsValues<V extends Dict | undefined> = V extends Dict
  ? V & {
      [K in keyof V]: V[K] extends Dict ? V[K] & Dict<string & {}, any> : V[K];
    }
  : V;
