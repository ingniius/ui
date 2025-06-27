<script lang="ts">
import type { AppConfig } from '@nuxt/schema';

import theme from '#build/ui/image';

import type { ComponentConfig } from '../../types';

type Image = ComponentConfig<typeof theme, AppConfig, 'image'>;

export interface ImageProps {
    src: string;
    alt?: string;
}
</script>

<script setup lang="ts">
import UImage from '#build/ui-image';
import { refinePath } from '#ui/utils/refine';

const props = defineProps<ImageProps>();

const appConfig = useAppConfig() as Image['AppConfig'];
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.components?.image || {} }));

const refinedSrc = computed(() => refinePath(props.src));
</script>

<template>
    <component :is="UImage" :src="refinedSrc" :alt="alt" :class="ui({ class: props.class })" v-bind="$attrs" />
</template>
