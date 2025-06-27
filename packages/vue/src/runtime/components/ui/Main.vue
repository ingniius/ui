<script lang="ts">
import type { AppConfig } from '@nuxt/schema';

import theme from '#build/ui/main';

import type { ComponentConfig } from '../../types';

type Main = ComponentConfig<typeof theme, AppConfig, 'main'>;

export interface MainProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    container?: boolean;
    class?: any;
}

export interface MainSlots {
    default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { tv } from '#ui/utils/tv';
import { Primitive } from 'reka-ui';

const props = withDefaults(defineProps<MainProps>(), { as: 'main', container: false });
defineSlots<MainSlots>();

const appConfig = useAppConfig() as Main['AppConfig'];
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.components?.main || {} }));
</script>

<template>
    <Primitive :as="as" :class="ui({ container: props.container, class: props.class })" data-ui-main>
        <slot />
    </Primitive>
</template>
