export default {
    base: 'min-h-[calc(100vh-var(--ui-header-height))] [[data-ui-container]_&]:px-0 px-4 sm:px-6 lg:px-8',
    variants: {
        container: {
            true: 'w-full max-w-(--ui-container) mx-auto',
        },
    },
    defaultVariants: {
        container: false,
    },
};
