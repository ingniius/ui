export default {
    slots: {
        root: 'rounded-lg',
        header: 'p-4 sm:px-6',
        body: 'p-4 sm:px-6',
        footer: 'p-4 sm:px-6',
    },
    variants: {
        variants: {
            solid: 'bg-inverted text-inverted',
            outline: 'bg-default ring ring-default divide-y divide-default',
            soft: 'bg-elevated/50 divide-y divide-default',
            subtle: 'bg-elevated/50 ring ring-default divide-y divide-default',
        },
    },
    defaultsVariants: {
        variant: 'outline',
    },
};
