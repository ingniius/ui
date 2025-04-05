<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { VariantProps } from "tailwind-variants";

import _appConfig from "#build/app.config";
import theme from "#build/ui/button-group";

import { tv } from "../../../utils/class";

const appConfig = _appConfig as AppConfig & {
  ui: { components: { buttonGroup: Partial<typeof theme> } };
};

const buttonGroup = tv({
  extend: tv(theme),
  ...(appConfig.ui?.components?.buttonGroup || {}),
});

type ButtonGroupVariants = VariantProps<typeof buttonGroup>;

export interface ButtonGroupProps {
  as?: any;
  size?: ButtonGroupVariants["size"];
  orientation?: ButtonGroupVariants["orientation"];
  class?: any;
}

export interface ButtonGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { Primitive } from "reka-ui";
import { computed, provide } from "vue";

import { buttonGroupInjectionKey } from "../../../composables/useButtonGroup";

const props = withDefaults(defineProps<ButtonGroupProps>(), { orientation: "horizontal" });
defineSlots<ButtonGroupSlots>();

provide(buttonGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  size: props.size,
})));
</script>

<template>
  <Primitive :as="as" :class="buttonGroup({ orientation, class: props.class })">
    <slot />
  </Primitive>
</template>
