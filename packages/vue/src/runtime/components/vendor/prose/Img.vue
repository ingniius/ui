<script lang="ts">
import type { AppConfig } from '@nuxt/schema';

import theme from '#build/ui/prose/img';

import type { ComponentConfig } from '../../types';

type ProseImg = ComponentConfig<typeof theme, AppConfig, 'img', 'ui.prose'>;

export interface ProseImgProps {
    src: string;
    alt?: string;
}
</script>

<script setup lang="ts">
import UImage from '#build/ui-image';
import { refinePath } from '#ui/utils/refine';

const props = defineProps<ProseImgProps>();

const appConfig = useAppConfig() as ProseImg['AppConfig'];
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.components?.prose?.img || {} }));

const refinedSrc = computed(() => refinePath(props.src));
</script>

<template>
    <component :is="UImage" :src="refinedSrc" :alt="alt" :class="ui({ class: props.class })" v-bind="$attrs" />
</template>
