<script lang="ts">
import type { AppConfig } from "@nuxt/schema";

import _appConfig from "#build/app.config";
import theme from "#build/ui/header";

import type { ButtonProps, DrawerProps, ModalProps, SlideoverProps } from "../../../types";

import { tv } from "../../../utils/class";

const appConfigHeader = _appConfig as AppConfig & {
  ui: { components: { header: Partial<typeof theme> } };
};

const header = tv({
  extend: tv(theme),
  ...(appConfigHeader.ui?.components?.header || {}),
});

type HeaderMode = "modal" | "slideover" | "drawer";

type HeaderMenu<T> = T extends "modal"
  ? ModalProps
  : T extends "slideover"
    ? SlideoverProps
    : T extends "drawer"
      ? DrawerProps
      : never;

export interface HeaderProps<T> {
  as?: any;
  title?: string;
  to?: string;
  mode?: T;
  menu?: HeaderMenu<T>;
  toggle?: boolean | Partial<ButtonProps>;
  toggleSide?: "left" | "right";
  class?: any;
  ui?: Partial<typeof header.slots>;
}

export interface HeaderSlots {
  title: (props?: object) => any;
  left: (props?: object) => any;
  default: (props?: object) => any;
  right: (props?: object) => any;
  toggle: (props?: object) => any;
  top: (props?: object) => any;
  bottom: (props?: object) => any;
  body: (props?: object) => any;
  content: (props?: object) => any;
}
</script>

<script setup lang="ts" generic="T extends HeaderMode">
import { createReusableTemplate } from "@vueuse/core";
import { useRoute } from "#imports";
import { defu } from "defu";
import { Primitive } from "reka-ui";
import { computed, toRef, watch } from "vue";

import { useLocale } from "../../../composables/useLocale";
import { useUI } from "../../../composables/useUI";
import { isObject } from "../../../utils/assertion";
import { getSlotChildrenText } from "../../../utils/slot";
import UDrawer from "./Drawer.vue";
import UModal from "./Modal.vue";
import USlideover from "./Slideover.vue";

const props = withDefaults(defineProps<HeaderProps<T>>(), {
  as: "header",
  mode: "modal" as never,
  toggle: true,
  toggleSide: "right",
  to: "/",
  title: "Veehance UI",
});
const slots = defineSlots<HeaderSlots>();

const route = useRoute();
const { icons } = useUI();
const { t } = useLocale();

const open = defineModel<boolean>("open", { default: false });

const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();

const ariaLabel = computed(() =>
  (
    props.title
    || (slots.title && getSlotChildrenText(slots.title()))
    || "Veehance UI"
  ).trim(),
);

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);

const ui = header();

const Menu = computed(
  () =>
    ({
      slideover: USlideover,
      modal: UModal,
      drawer: UDrawer,
    })[props.mode as HeaderMode],
);

const menuProps = toRef(
  () =>
    defu(
      props.menu,
      { content: { onOpenAutoFocus: (e: Event) => e.preventDefault() } },
      props.mode === "modal" ? { fullscreen: true, transition: false } : {},
    ) as HeaderMenu<T>,
);
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" :open="open">
      <UButton
        v-if="toggle"
        v-bind="isObject(toggle) ? (toggle as Partial<ButtonProps>) : {}"
        :class="ui.toggle({ class: props.ui?.toggle, toggleSide })"
        :icon="open ? icons.close : icons.menu"
        :aria-label="open ? t('header.close') : t('header.open')"
        color="neutral"
        variant="ghost"
        @click="open = !open"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineLeftTemplate>
    <div :class="ui.left({ class: props.ui?.left })">
      <ReuseToggleTemplate v-if="toggleSide === 'left'" />

      <slot name="left">
        <ULink
          :to="to"
          :aria-label="ariaLabel"
          :class="ui.title({ class: props.ui?.title })"
        >
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

      <ReuseToggleTemplate v-if="toggleSide === 'right'" />
    </div>
  </DefineRightTemplate>

  <Primitive
    :as="as"
    :class="ui.root({ class: [props.class, props.ui?.root] })"
  >
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

  <Menu
    v-bind="menuProps"
    v-model:open="open"
    :ui="{
      overlay: ui.overlay({ class: props.ui?.overlay }),
      content: ui.content({ class: props.ui?.content }),
    }"
  >
    <template #content>
      <slot name="content">
        <div
          v-if="mode !== 'drawer'"
          :class="ui.header({ class: props.ui?.header })"
        >
          <ReuseLeftTemplate />
          <ReuseRightTemplate />
        </div>

        <div :class="ui.body({ class: props.ui?.body })">
          <slot name="body" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
