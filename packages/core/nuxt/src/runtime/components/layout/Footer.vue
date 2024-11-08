<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import { footer as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { footer: Partial<typeof theme> } };

const footer = cva({ extend: cva(theme), ...(appConfig.ui?.footer || {}) });

export interface FooterProps extends UComp {
  class?: any;
  ui?: Partial<typeof footer.slots>;
}

export interface FooterSlots {
  left(props?: {}): any;
  default(props?: {}): any;
  right(props?: {}): any;
  top(props?: {}): any;
  bottom(props?: {}): any;
}
</script>

<script lang="ts" setup>
import { Primitive } from "radix-vue";

import UContainer from "#ui/components/Container.vue";

const props = withDefaults(defineProps<FooterProps>(), { as: "footer", class: undefined });
defineSlots<FooterSlots>();

const ui = footer();
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <slot name="top" />

    <UContainer :class="ui.container({ class: props.ui?.container })">
      <div :class="ui.right({ class: props.ui?.right })">
        <slot name="right" />
      </div>

      <div :class="ui.center({ class: props.ui?.center })">
        <slot />
      </div>

      <div :class="ui.left({ class: props.ui?.left })">
        <slot name="left" />
      </div>
    </UContainer>

    <slot name="bottom" />
  </Primitive>
</template>
