<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { VariantProps } from "tailwind-variants";

import _appConfig from "#build/app.config";
import theme from "#build/ui/avatar-group";

import { tv } from "../../../utils/class";

const appConfig = _appConfig as AppConfig & {
  ui: { components: { avatarGroup: Partial<typeof theme> } };
};

const avatarGroup = tv({
  extend: tv(theme),
  ...(appConfig.ui?.components?.avatarGroup || {}),
});

type AvatarGroupVariants = VariantProps<typeof avatarGroup>;

export interface AvatarGroupProps {
  as?: any;
  size?: AvatarGroupVariants["size"];
  max?: number | string;
  class?: any;
  ui?: Partial<typeof avatarGroup.slots>;
}

export interface AvatarGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { Primitive } from "reka-ui";
import { computed, provide } from "vue";

import { avatarGroupInjectionKey } from "../../../composables/useAvatarGroup";
import { isString } from "../../../utils/assertion";
import UAvatar from "./Avatar.vue";

const props = defineProps<AvatarGroupProps>();
const slots = defineSlots<AvatarGroupSlots>();

const ui = computed(() => avatarGroup({ size: props.size }));

const max = computed(() => isString(props.max) ? Number.parseInt(props.max, 10) : props.max);

const children = computed(() => {
  let children = slots.default?.();
  if (children?.length) {
    children = children.flatMap((child: any) => {
      if (typeof child.type === "symbol") {
        if (isString(child.children))
          // eslint-disable-next-line array-callback-return
          return;

        return child.children;
      }

      return child;
    }).filter(Boolean);
  }

  return children || [];
});

const visibleAvatars = computed(() => {
  if (!children.value.length)
    return [];

  if (!max.value || max.value <= 0)
    return [...children.value].reverse();

  return [...children.value].slice(0, max.value).reverse();
});

const hiddenCount = computed(() => {
  if (!children.value.length)
    return 0;

  return children.value.length - visibleAvatars.value.length;
});

provide(avatarGroupInjectionKey, computed(() => ({ size: props.size })));
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <UAvatar v-if="hiddenCount > 0" :text="`+${hiddenCount}`" :class="ui.base({ class: props.ui?.base })" />
    <component :is="avatar" v-for="(avatar, count) in visibleAvatars" :key="count" :class="ui.base({ class: props.ui?.base })" />
  </Primitive>
</template>
