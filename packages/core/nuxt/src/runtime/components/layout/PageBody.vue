<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import { pageBody as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { pageBody: Partial<typeof theme> } };

const pageBody = cva({ extend: cva(theme), ...(appConfig.ui?.pageBody || {}) });

export interface PageBodyProps extends UComp {
  class?: any;
}

export interface PageBodySlots {
  default(props?: {}): any;
}
</script>

<script lang="ts" setup>
import { Primitive } from "radix-vue";

const props = defineProps<PageBodyProps>();
defineSlots<PageBodySlots>();
</script>

<template>
  <Primitive :as="as" :class="pageBody({ class: props.class })">
    <slot />
  </Primitive>
</template>
