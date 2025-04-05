<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import theme from "#build/ui/main";

import { tv } from "../../../utils/class";

const appConfig = _appConfig as AppConfig & {
  ui: { components: { main: Partial<typeof theme> } };
};

const main = tv({
  extend: tv(theme),
  ...(appConfig.ui?.components?.main || {}),
});

export interface MainProps {
  class?: any;
}

export interface MainSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { Primitive } from "reka-ui";

const props = defineProps<MainProps>();
defineSlots<MainSlots>();
</script>

<template>
  <Primitive as="main" :class="main({ class: props.class })">
    <slot />
  </Primitive>
</template>
