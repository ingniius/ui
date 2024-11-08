<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { SlideoverProps } from "@nuxt/ui";

import _appConfig from "#build/app.config";
import { header as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { header: Partial<typeof theme> } };

const header = cva({ extend: cva(theme), ...(appConfig.ui?.header || {}) });

export interface HeaderProps extends UComp {
  title?: string;
  to?: string;
  slideover?: Partial<
    Pick<SlideoverProps, "content" | "overlay" | "transition" | "side" | "preventClose" | "portal">
  >;
  class?: any;
  ui?: Partial<typeof header.slots>;
}

export interface HeaderSlots {
  title(props?: {}): any;
  left(props?: {}): any;
  default(props?: {}): any;
  right(props?: {}): any;
  toggle(props?: {}): any;
  top(props?: {}): any;
  bottom(props?: {}): any;
  content(props?: {}): any;
}
</script>

<script lang="ts" setup>
import { computed, watch, toRef } from "vue";

import { useAppConfig, useRoute } from "#imports";
import { getSlotChildrenText } from "#ui-system/slot";

import { createReusableTemplate } from "@vueuse/core";
import { Primitive } from "radix-vue";

import UButton from "#ui/components/Button.vue";
import UContainer from "#ui/components/Container.vue";
import ULink from "#ui/components/Link.vue";
import USlideover from "#ui/components/Slideover.vue";

const props = withDefaults(defineProps<HeaderProps>(), {
  as: "header",
  to: "/",
  title: "Veehance UI",
});

const slots = defineSlots<HeaderSlots>();

const open = defineModel<boolean>("open");

const slideoverProps = toRef(() => props.slideover);

const route = useRoute();
const appConfig = useAppConfig();
const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();

const ariaLabel = computed(() =>
  (props.title || (slots.title && getSlotChildrenText(slots.title())) || "Nuxt UI Pro").trim(),
);

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);

const ui = header();
</script>

<template>
  <DefineLeftTemplate>
    <div :class="ui.left({ class: props.ui?.left })">
      <slot name="left">
        <ULink :to="to" :aria-label="ariaLabel" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </ULink>
      </slot>
    </div>
  </DefineLeftTemplate>

  <DefineRightTemplate>
    <div :class="ui.right({ class: props.ui?.right })">
      <slot name="right" />

      <slot name="toggle" :open="open">
        <UButton
          v-if="!!slots.content"
          color="neutral"
          variant="ghost"
          :class="ui.toggle({ class: props.ui?.toggle })"
          :aria-label="`${open ? 'Close' : 'Open'} Menu`"
          :icon="open ? appConfig.ui.icons.close : appConfig.ui.icons.menu"
          @click="open = !open"
        />
      </slot>
    </div>
  </DefineRightTemplate>

  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <slot name="top" />

    <UContainer :class="ui.container({ class: props.ui?.container })">
      <ReuseLeftTemplate />

      <div :class="ui.center({ class: props.ui?.center })">
        <slot />
      </div>

      <ReuseRightTemplate />
    </UContainer>

    <slot name="bottom" />
  </Primitive>

  <USlideover
    v-model:open="open"
    v-bind="slideoverProps"
    :ui="{
      header: ui.container({ class: props.ui?.container }),
      overlay: ui.toggle({ class: props.ui?.toggle }),
      content: ui.toggle({ class: props.ui?.toggle }),
    }"
  >
    <template #header>
      <ReuseLeftTemplate />

      <ReuseRightTemplate />
    </template>

    <template #body>
      <slot name="content" />
    </template>
  </USlideover>
</template>
