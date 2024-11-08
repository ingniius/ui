<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import { page as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { page: Partial<typeof theme> } };

const page = cva({ extend: cva(theme), ...(appConfig.ui?.page || {}) });

export interface PageProps extends UComp {
  class?: any;
  ui?: Partial<typeof page.slots>;
}

export interface PageSlots {
  left(props?: {}): any;
  default(props?: {}): any;
  right(props?: {}): any;
}
</script>

<script lang="ts" setup>
import { computed } from "vue";

import { Primitive, Slot } from "radix-vue";

const props = defineProps<PageProps>();
const slots = defineSlots<PageSlots>();

const ui = computed(() => page({ left: !!slots.left, right: !!slots.right }));
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <Slot v-if="!!slots.left" :class="ui.left({ class: props.ui?.left })">
      <slot name="left" />
    </Slot>

    <div :class="ui.center({ class: props.ui?.center })">
      <slot />
    </div>

    <Slot v-if="!!slots.right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" />
    </Slot>
  </Primitive>
</template>
