<script lang="ts">
import type { AppConfig } from '@nuxt/schema';

import theme from '#build/ui/color-mode/image';

import type { ComponentConfig } from '../../../types';

type ColorModeImage = ComponentConfig<typeof theme, AppConfig, 'image', 'ui.colorMode'>;

export interface ColorModeImageProps {
    dark: string;
    light: string;
    alt?: string;
}
</script>

<script setup lang="ts">
import UImage from '#build/ui-image';
import { refinePath } from '#ui/utils/refine';

defineOptions({ inheritAttrs: false });

const props = defineProps<ColorModeImageProps>();

const appConfig = useAppConfig() as ColorModeImage['AppConfig'];
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.components?.colorMode?.image || {} }));

const lightSrc = computed(() => refinePath(props.light));
const darkSrc = computed(() => refinePath(props.dark));
</script>

<template>
    <component :is="UImage" :src="lightSrc" :alt="alt" :class="ui({ class: ['dark:hidden', props.class] })" v-bind="$attrs" />
    <component :is="UImage" :src="darkSrc" :alt="alt" :class="ui({ class: ['hidden dark:block', props.class] })" v-bind="$attrs" />
</template>
