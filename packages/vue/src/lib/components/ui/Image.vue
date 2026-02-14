<script lang="ts">
import type { ClassValue } from "@veehance/core/types";

import type { ImgHTMLAttributes } from "../../types/html";

export interface ImageProps extends /** @vue-ignore */ ImgHTMLAttributes {
  src: string;
  alt: string;
  height: number;
  width: number;
  layout?: "fixed" | "constrained" | "fullWidth";
  class?: ClassValue;
}
</script>

<script setup lang="ts">
import { cx } from "@veehance/core/utils";

import { Image } from "#build/ui/components";

const props = defineProps<ImageProps>();
</script>

<template>
  <component :is="Image" :src="props.src" :alt="props.alt" :class="cx(props.class)" />
</template>