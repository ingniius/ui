<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import { pageAside as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { pageAside: Partial<typeof theme> } };

const pageAside = cva({ extend: cva(theme), ...(appConfig.ui?.pageAside || {}) });

export interface PageAsideProps extends UComp {
  class?: any;
  ui?: Partial<typeof pageAside.slots>;
}

export interface PageAsideSlots {
  top(props?: {}): any;
  default(props?: {}): any;
  bottom(props?: {}): any;
}
</script>

<script setup lang="ts">
import { Primitive } from "radix-vue";

const props = withDefaults(defineProps<PageAsideProps>(), { as: "aside", class: undefined });
const slots = defineSlots<PageAsideSlots>();

const ui = pageAside();
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <div :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.top" :class="ui.top({ class: props.ui?.top })">
        <div :class="ui.topHeader({ class: props.ui?.topHeader })" />
        <div :class="ui.topBody({ class: props.ui?.topBody })">
          <slot name="top" />
        </div>
        <div :class="ui.topFooter({ class: props.ui?.topFooter })" />
      </div>

      <slot />

      <slot name="bottom" />
    </div>
  </Primitive>
</template>
