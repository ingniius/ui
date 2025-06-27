import type { ClassValue } from 'tailwind-variants';

/**
 * Utility type to flatten intersection types for better IDE hover information.
 * @template T The type to flatten.
 */
type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentVariants<T extends { variants?: Record<string, Record<string, any>> }> = {
    [K in keyof T['variants']]: keyof T['variants'][K]
};

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
    [K in keyof T['slots']]?: ClassValue
}>;

type GetComponentAppConfig<A, U extends string, K extends string>
  = A extends Record<U, Record<K, any>> ? A[U][K] : object;

type ComponentAppConfig<
    T,
    A extends Record<string, any>,
    K extends string,
    U extends string = 'ui' | 'ui.colorMode' | 'ui.prose',
> = A & (
    U extends 'ui.colorMode'
        ? { ui?: { components?: { colorMode?: { [k in K]?: Partial<T> } } } }
        : U extends 'ui.prose'
            ? { ui?: { components?: { prose?: { [k in K]?: Partial<T> } } } }
            : { ui?: { components?: { [k in K]?: Partial<T> } } }
);

/**
 * Defines the configuration shape expected for a component.
 * @template T The component's theme imported from `#build/ui/*`.
 * @template A The base AppConfig type from `@nuxt/schema`.
 * @template K The key identifying the component (e.g., 'badge').
 * @template U The top-level key in AppConfig ('ui').
 */
export interface ComponentConfig<
    T extends Record<string, any>,
    A extends Record<string, any>,
    K extends string,
    U extends 'ui' | 'ui.colorMode' | 'ui.prose' = 'ui',
> {
    AppConfig: ComponentAppConfig<T, A, K, U>;
    variants: ComponentVariants<T & GetComponentAppConfig<A, U, K>>;
    slots: ComponentSlots<T>;
}
