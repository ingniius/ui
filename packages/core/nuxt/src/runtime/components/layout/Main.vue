<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import { main as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { main: Partial<typeof theme> } };

const main = cva({ extend: cva(theme), ...(appConfig.ui?.main || {}) });

export interface MainProps extends UComp {
  class?: any;
}

export interface MainSlots {
  default(props?: {}): any;
}
</script>

<script lang="ts" setup>
import { Primitive } from "radix-vue";

const props = withDefaults(defineProps<MainProps>(), { as: "main", class: undefined });
defineSlots<MainSlots>();
</script>

<template>
  <Primitive :as="as" :class="main({ class: props.class })">
    <slot />
  </Primitive>
</template>
