<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { VariantProps } from "tailwind-variants";

import _appConfig from "#build/app.config";
import theme from "#build/ui/avatar";

import { tv } from "../../../utils/class";

const appConfig = _appConfig as AppConfig & {
  ui: { components: { avatar: Partial<typeof theme> } };
};

const avatar = tv({
  extend: tv(theme),
  ...(appConfig.ui?.components?.avatar || {}),
});

type AvatarVariants = VariantProps<typeof avatar>;

export interface AvatarProps {
  as?: any;
  src?: string;
  alt?: string;
  icon?: string;
  text?: string;
  size?: AvatarVariants["size"];
  class?: any;
  style?: any;
  ui?: Partial<typeof avatar.slots>;
}

export interface AvatarSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import ImageComponent from "#build/ui-image-component";
import { Primitive, Slot } from "reka-ui";
import { computed, ref, watch } from "vue";

import { useAvatarGroup } from "../../../composables/useAvatarGroup";
import UIcon from "./Icon.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<AvatarProps>(), { as: "span", size: "md" });
defineSlots<AvatarSlots>();

const fallback = computed(() => props.text || (props.alt || "").split(" ").map(word => word.charAt(0)).join("").substring(0, 2));

const { size } = useAvatarGroup(props);

const ui = computed(() => avatar({ size: size.value }));

const sizePx = computed(() => ({
  "3xs": 16,
  "2xs": 20,
  "xs": 24,
  "sm": 28,
  "md": 32,
  "lg": 36,
  "xl": 40,
  "2xl": 44,
  "3xl": 48,
})[props.size || "md"]);

const error = ref(false);

watch(() => props.src, () => {
  if (error.value) {
    error.value = false;
  }
});

function onError() {
  error.value = true;
}
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })" :style="props.style">
    <component
      :is="ImageComponent"
      v-if="src && !error"
      role="img"
      :src="src"
      :alt="alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="$attrs"
      :class="ui.image({ class: props.ui?.image })"
      @error="onError"
    />

    <Slot v-else v-bind="$attrs">
      <slot>
        <UIcon v-if="icon" :name="icon" :class="ui.icon({ class: props.ui?.icon })" />
        <span v-else :class="ui.fallback({ class: props.ui?.fallback })">{{ fallback || '&nbsp;' }}</span>
      </slot>
    </Slot>
  </Primitive>
</template>
