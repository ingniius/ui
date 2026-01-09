<script lang="ts">
import theme from "#build/theme/container";

import type { ClassValue } from "@veehance/core/types";

export interface ContainerProps {
  as?: any;
  class?: ClassValue;
}

export interface ContainerSlots {
  default(props?: object): any;
}
</script>

<script setup lang="ts">
import { computed } from "vue";

import { useAppConfig } from "#imports";

import { cv } from "@veehance/core/utils";

import { Primitive } from "reka-ui";

const props = withDefaults(defineProps<ContainerProps>(), { as: "div" });
defineSlots<ContainerSlots>();

const appConfig = useAppConfig() as {
  ui?: { components?: { container: typeof theme } };
};

const ui = computed(() =>
  cv({ extend: cv(theme), ...(appConfig.ui?.components?.container || {}) }),
);
</script>

<template>
  <Primitive :as="as" :class="ui({ class: props.class })">
    <slot />
  </Primitive>
</template>