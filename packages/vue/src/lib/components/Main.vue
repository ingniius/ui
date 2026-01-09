<script lang="ts">
import theme from "#build/theme/main";

import type { ClassValue } from "@veehance/core/types";

export interface MainProps {
  as?: any;
  class?: ClassValue;
}

export interface MainSlots {
  default(props?: object): any;
}
</script>

<script setup lang="ts">
import { computed } from "vue";

import { useAppConfig } from "#imports";

import { cv } from "@veehance/core/utils";

import { Primitive } from "reka-ui";

const props = withDefaults(defineProps<MainProps>(), { as: "main" });
defineSlots<MainSlots>();

const appConfig = useAppConfig() as {
  ui?: { components?: { main: typeof theme } };
};

const ui = computed(() =>
  cv({ extend: cv(theme), ...(appConfig.ui?.components?.main || {}) }),
);
</script>

<template>
  <Primitive :as="as" :class="ui({ class: props.class })">
    <slot />
  </Primitive>
</template>