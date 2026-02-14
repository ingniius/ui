<script lang="ts">
import type { ClassValue, Component } from "@veehance/core/types";

import theme from "#build/theme/container";

type Container = Component<typeof theme, "container", "ui">;

export interface ContainerProps {
  as?: any;
  class?: ClassValue;
}

export interface ContainerSlots {
  default(props?: object): any;
}
</script>

<script setup lang="ts">
import { cv } from "@veehance/core/utils";

import { Primitive } from "reka-ui";
import { computed } from "vue";

import { useAppConfig } from "#build/ui/imports";

const props = withDefaults(defineProps<ContainerProps>(), { as: "div" });
defineSlots<ContainerSlots>();

const appConfig = useAppConfig() as Container["config"];

const ui = computed(() => cv({ extend: cv(theme), ...(appConfig.ui?.components?.container || {}) }));
</script>

<template>
  <Primitive :as="as" data-slot="container" :class="ui({ class: props.class })">
    <slot />
  </Primitive>
</template>