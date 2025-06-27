import type { ClassValue, TVCompoundVariants, TVDefaultVariants, TVVariants } from 'tailwind-variants';

export type TVConfig<T extends Record<string, any>> = {
    [P in keyof T]?: {
        [K in keyof T[P]as K extends 'base' | 'slots' | 'variants' | 'compoundVariants' | 'defaultVariants' ? K : never]?: K extends 'base' ? ClassValue
            : K extends 'slots' ? {
                [S in keyof T[P]['slots']]?: ClassValue
            }
                : K extends 'variants' ? TVVariants<T[P]['slots'], ClassValue, T[P]['variants']>
                    : K extends 'compoundVariants' ? TVCompoundVariants<T[P]['variants'], T[P]['slots'], ClassValue, object, undefined>
                        : K extends 'defaultVariants' ? TVDefaultVariants<T[P]['variants'], T[P]['slots'], object, undefined>
                            : never
    }
};
