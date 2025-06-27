<script lang="ts">
import type { AppConfig } from '@nuxt/schema';

import theme from '#build/ui/icon';

import type { ComponentConfig } from '../../types';

type Icon = ComponentConfig<typeof theme, AppConfig, 'icon'>;

export interface IconProps {
    /**
     * Display an icon from `ui.icons`.
     */
    icon?: keyof AppConfig['ui']['icons'];
    /**
     * Display an icon from Iconify.
     * @IconifyIcon
     */
    name?: string;
    /**
     * @defaultValue 'solid'
     */
    variant?: Icon['variants']['variant'];
    mode?: 'svg' | 'css';
    size?: string | number;
    customize?: (content: string, name?: string, prefix?: string, provider?: string) => string;
    class?: any;
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core';
import { useIcon } from '#ui/composables/useIcon';
import { tv } from '#ui/utils/tv';
import { useForwardProps } from 'reka-ui';

const props = withDefaults(defineProps<IconProps>(), { mode: 'svg', variant: 'solid' });

const iconProps = useForwardProps(reactivePick(props, 'mode', 'size', 'customize'));

const appConfig = useAppConfig() as Icon['AppConfig'];
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.components?.icon || {} }));

const iconify = computed(() => useIcon({ icon: props.icon, name: props.name, variant: props.variant }));
const iconset = computed(() => props.variant === 'outline' ? 'outline' : appConfig.ui.iconset);
</script>

<template>
    <Icon
        :name="iconify"
        :class="ui({ variant: props.variant, class: [iconset === 'outline' ? 'p-[0.025rem]' : '', props.class] })"
        v-bind="iconProps"
    />
</template>
