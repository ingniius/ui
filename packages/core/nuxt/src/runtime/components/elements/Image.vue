<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import { image as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { image: Partial<typeof theme> } };

const image = cva({ extend: cva(theme), ...(appConfig.ui?.image || {}) });

export interface ImageProps extends UComp {
  alt: string;
  src: string;
  optimize?: boolean;
  class?: string;
}
</script>

<script lang="ts" setup>
import { NuxtImg } from "#components";

import { Primitive } from "radix-vue";

const props = withDefaults(defineProps<ImageProps>(), { as: "img", class: undefined });
</script>

<template>
  <NuxtImg
    v-if="optimize && !asChild"
    :src="src"
    :alt="alt"
    :class="image({ class: props.class })"
    v-bind="$attrs"
  />
  <Primitive
    v-else
    :as="as"
    :src="src"
    :alt="alt"
    :class="image({ class: props.class })"
    v-bind="$attrs"
  />
</template>
