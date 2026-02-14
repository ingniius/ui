<script lang="ts">
import type { ClassValue, Component } from "@veehance/core/types";

import theme from "#build/theme/main";

type Main = Component<typeof theme, "main", "ui">;

export interface MainProps {
  as?: any;
  class?: ClassValue;
}

export interface MainSlots {
  default(props?: object): any;
}
</script>

<script setup lang="ts">
import { cv } from "@veehance/core/utils";

import { Primitive } from "reka-ui";
import { computed } from "vue";

import { useAppConfig } from "#build/ui/imports";

const props = withDefaults(defineProps<MainProps>(), { as: "main" });
defineSlots<MainSlots>();

const appConfig = useAppConfig() as Main["config"];

const ui = computed(() => cv({ extend: cv(theme), ...(appConfig.ui?.components?.main || {}) }));
</script>

<template>
  <Primitive :as="as" data-slot="main" :class="ui({ class: props.class })">
    <slot />
  </Primitive>
</template>