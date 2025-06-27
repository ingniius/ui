<script lang="ts">
import type { AppConfig } from '@nuxt/schema';

import theme from '#build/ui/container';

import type { ComponentConfig } from '../../types';

type Container = ComponentConfig<typeof theme, AppConfig, 'container'>;

export interface ContainerProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    class?: any;
}

export interface ContainerSlots {
    default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { tv } from '#ui/utils/tv';
import { Primitive } from 'reka-ui';

const props = withDefaults(defineProps<ContainerProps>(), { as: 'div' });
defineSlots<ContainerSlots>();

const appConfig = useAppConfig() as Container['AppConfig'];
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.components?.container || {} }));
</script>

<template>
    <Primitive :as="as" :class="ui({ class: props.class })" data-ui-container>
        <slot />
    </Primitive>
</template>
