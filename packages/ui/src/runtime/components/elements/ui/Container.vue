<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import theme from "#build/ui/container";

import { tv } from "../../../utils/class";

const appConfig = _appConfig as AppConfig & {
  ui: { components: { container: Partial<typeof theme> } };
};

const container = tv({
  extend: tv(theme),
  ...(appConfig.ui?.components?.container || {}),
});

export interface ContainerProps {
  as?: any;
  class?: any;
}

export interface ContainerSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { Primitive } from "reka-ui";

const props = defineProps<ContainerProps>();
defineSlots<ContainerSlots>();
</script>

<template>
  <Primitive :as="as" :class="container({ class: props.class })">
    <slot />
  </Primitive>
</template>
