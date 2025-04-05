<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { DialogContentEmits, DialogContentProps } from "reka-ui";
import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";

import _appConfig from "#build/app.config";
import theme from "#build/ui/drawer";

import type { EmitsToProps } from "../../../types/generic";

import { tv } from "../../../utils/class";

const appConfig = _appConfig as AppConfig & {
  ui: { components: { drawer: Partial<typeof theme> } };
};

const drawer = tv({
  extend: tv(theme),
  ...(appConfig.ui?.components?.drawer || {}),
});

export interface DrawerProps extends Pick<DrawerRootProps, "activeSnapPoint" | "closeThreshold" | "shouldScaleBackground" | "setBackgroundColorOnScale" | "scrollLockTimeout" | "fixed" | "dismissible" | "modal" | "open" | "defaultOpen" | "nested" | "direction" | "noBodyStyles" | "handleOnly" | "preventScrollRestoration" | "snapPoints"> {
  as?: any;
  title?: string;
  description?: string;
  inset?: boolean;
  content?: Omit<DialogContentProps, "as" | "asChild" | "forceMount"> & Partial<EmitsToProps<DialogContentEmits>>;
  overlay?: boolean;
  handle?: boolean;
  portal?: boolean;
  class?: any;
  ui?: Partial<typeof drawer.slots>;
}

export interface DrawerEmits extends DrawerRootEmits {}

export interface DrawerSlots {
  default: (props?: object) => any;
  content: (props?: object) => any;
  header: (props?: object) => any;
  title: (props?: object) => any;
  description: (props?: object) => any;
  body: (props?: object) => any;
  footer: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { reactivePick } from "@vueuse/core";
import { useForwardPropsEmits } from "reka-ui";
import { DrawerContent, DrawerDescription, DrawerHandle, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle, DrawerTrigger } from "vaul-vue";
import { computed, toRef } from "vue";

const props = withDefaults(defineProps<DrawerProps>(), {
  direction: "bottom",
  portal: true,
  overlay: true,
  handle: true,
  modal: true,
  dismissible: true,
});
const emits = defineEmits<DrawerEmits>();
const slots = defineSlots<DrawerSlots>();

const rootProps = useForwardPropsEmits(reactivePick(props, "activeSnapPoint", "closeThreshold", "shouldScaleBackground", "setBackgroundColorOnScale", "scrollLockTimeout", "fixed", "dismissible", "modal", "open", "defaultOpen", "nested", "direction", "noBodyStyles", "handleOnly", "preventScrollRestoration", "snapPoints"), emits);
const contentProps = toRef(() => props.content);
const contentEvents = {
  closeAutoFocus: (e: Event) => e.preventDefault(),
};

const ui = computed(() => drawer({
  direction: props.direction,
  inset: props.inset,
}));
</script>

<template>
  <DrawerRoot v-bind="rootProps">
    <DrawerTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot />
    </DrawerTrigger>

    <DrawerPortal :disabled="!portal">
      <DrawerOverlay v-if="overlay" :class="ui.overlay({ class: props.ui?.overlay })" />

      <DrawerContent :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })" v-bind="contentProps" v-on="contentEvents">
        <DrawerHandle v-if="handle" :class="ui.handle({ class: props.ui?.handle })" />

        <slot name="content">
          <div :class="ui.container({ class: props.ui?.container })">
            <div v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description)" :class="ui.header({ class: props.ui?.header })">
              <slot name="header">
                <DrawerTitle v-if="title || !!slots.title" :class="ui.title({ class: props.ui?.title })">
                  <slot name="title">
                    {{ title }}
                  </slot>
                </DrawerTitle>

                <DrawerDescription v-if="description || !!slots.description" :class="ui.description({ class: props.ui?.description })">
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DrawerDescription>
              </slot>
            </div>

            <div v-if="!!slots.body" :class="ui.body({ class: props.ui?.body })">
              <slot name="body" />
            </div>

            <div v-if="!!slots.footer" :class="ui.footer({ class: props.ui?.footer })">
              <slot name="footer" />
            </div>
          </div>
        </slot>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
