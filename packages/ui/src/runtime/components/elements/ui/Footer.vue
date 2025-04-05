<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import theme from "#build/ui/footer";

import { tv } from "../../../utils/class";

const appConfig = _appConfig as AppConfig & {
  ui: { components: { footer: Partial<typeof theme> } };
};

const footer = tv({
  extend: tv(theme),
  ...(appConfig.ui?.components?.footer || {}),
});

export interface FooterProps {
  as?: any;
  class?: any;
  ui?: Partial<typeof footer.slots>;
}

export interface FooterSlots {
  default: (props?: object) => any;
  bottom: (props?: object) => any;
  left: (props?: object) => any;
  right: (props?: object) => any;
  top: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { Primitive } from "reka-ui";

const props = withDefaults(defineProps<FooterProps>(), { as: "footer" });
const slots = defineSlots<FooterSlots>();

const ui = footer();
</script>

<template>
  <Primitive
    :as="as"
    :class="ui.root({ class: [props.class, props.ui?.root] })"
  >
    <div v-if="!!slots.top" :class="ui.top({ class: props.ui?.top })">
      <slot name="top" />
    </div>

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

    <div v-if="!!slots.bottom" :class="ui.bottom({ class: props.ui?.bottom })">
      <slot name="bottom" />
    </div>
  </Primitive>
</template>
