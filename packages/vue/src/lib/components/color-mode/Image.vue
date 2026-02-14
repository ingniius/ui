<script lang="ts">
import type { ClassValue } from "@veehance/core/types";

import type { ImgHTMLAttributes } from "../../types/html";

export interface ColorModeImageProps
  extends /** @vue-ignore */ Omit<ImgHTMLAttributes, "src"> {
  src: string;
  alt: string;
  height: number;
  width: number;
  layout?: "fixed" | "constrained" | "fullWidth";
  class?: ClassValue;
}
</script>

<script setup lang="ts">
import { cn } from "@veehance/core/utils";

import Image from "../ui/Image.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<ColorModeImageProps>();
</script>

<template>
  <component :is="Image" :src="light" :class="cn('dark:hidden', props.class)" v-bind="$attrs" />
  <component :is="Image" :src="dark" :class="cn('hidden dark:block', props.class)" v-bind="$attrs" />
</template>