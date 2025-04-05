<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { DialogContentEmits, DialogContentProps, DialogRootEmits, DialogRootProps } from "reka-ui";
import type { VariantProps } from "tailwind-variants";

import _appConfig from "#build/app.config";
import theme from "#build/ui/slideover";

import type { ButtonProps } from "../../../types";
import type { EmitsToProps } from "../../../types/generic";

import { tv } from "../../../utils/class";

const appConfig = _appConfig as AppConfig & {
  ui: { components: { slideover: Partial<typeof theme> } };
};

const slideover = tv({
  extend: tv(theme),
  ...(appConfig.ui?.components?.slideover || {}),
});

type SlideoverVariants = VariantProps<typeof slideover>;

export interface SlideoverProps extends DialogRootProps {
  title?: string;
  description?: string;
  content?: Omit<DialogContentProps, "as" | "asChild" | "forceMount"> & Partial<EmitsToProps<DialogContentEmits>>;
  overlay?: boolean;
  transition?: boolean;
  side?: SlideoverVariants["side"];
  portal?: boolean;
  close?: boolean | Partial<ButtonProps>;
  closeIcon?: string;
  dismissible?: boolean;
  class?: any;
  ui?: Partial<typeof slideover.slots>;
}

export interface SlideoverEmits extends DialogRootEmits {
  "after:leave": [];
}

export interface SlideoverSlots {
  default: (props: { open: boolean }) => any;
  content: (props?: object) => any;
  header: (props?: object) => any;
  title: (props?: object) => any;
  description: (props?: object) => any;
  close: (props: { ui: ReturnType<typeof slideover> }) => any;
  body: (props?: object) => any;
  footer: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { reactivePick } from "@vueuse/core";
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits, VisuallyHidden } from "reka-ui";
import { computed, toRef } from "vue";

import { useLocale } from "../../../composables/useLocale";
import { useUI } from "../../../composables/useUI";
import { isObject } from "../../../utils/assertion";
import UButton from "./Button.vue";

const props = withDefaults(defineProps<SlideoverProps>(), {
  close: true,
  portal: true,
  overlay: true,
  transition: true,
  modal: true,
  dismissible: true,
  side: "right",
});
const emits = defineEmits<SlideoverEmits>();
const slots = defineSlots<SlideoverSlots>();

const { t } = useLocale();
const { icons } = useUI();

const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  const events = {
    closeAutoFocus: (e: Event) => e.preventDefault(),
  };

  if (!props.dismissible) {
    return {
      pointerDownOutside: (e: Event) => e.preventDefault(),
      interactOutside: (e: Event) => e.preventDefault(),
      escapeKeyDown: (e: Event) => e.preventDefault(),
      ...events,
    };
  }

  return events;
});

const ui = computed(() => slideover({
  transition: props.transition,
  side: props.side,
}));
</script>

<template>
  <DialogRoot v-slot="{ open }" v-bind="rootProps">
    <DialogTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal :disabled="!portal">
      <DialogOverlay v-if="overlay" :class="ui.overlay({ class: props.ui?.overlay })" />

      <DialogContent :data-side="side" :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })" v-bind="contentProps" @after-leave="emits('after:leave')" v-on="contentEvents">
        <VisuallyHidden v-if="!!slots.content && ((title || !!slots.title) || (description || !!slots.description))">
          <DialogTitle v-if="title || !!slots.title">
            <slot name="title">
              {{ title }}
            </slot>
          </DialogTitle>

          <DialogDescription v-if="description || !!slots.description">
            <slot name="description">
              {{ description }}
            </slot>
          </DialogDescription>
        </VisuallyHidden>

        <slot name="content">
          <div v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description) || (close || !!slots.close)" :class="ui.header({ class: props.ui?.header })">
            <slot name="header">
              <div :class="ui.wrapper({ class: props.ui?.wrapper })">
                <DialogTitle v-if="title || !!slots.title" :class="ui.title({ class: props.ui?.title })">
                  <slot name="title">
                    {{ title }}
                  </slot>
                </DialogTitle>

                <DialogDescription v-if="description || !!slots.description" :class="ui.description({ class: props.ui?.description })">
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DialogDescription>
              </div>

              <DialogClose v-if="close || !!slots.close" as-child>
                <slot name="close" :ui="ui">
                  <UButton
                    v-if="close"
                    :icon="closeIcon || icons.close"
                    size="md"
                    color="neutral"
                    variant="ghost"
                    :aria-label="t('slideover.close')"
                    v-bind="(isObject(close) ? close as Partial<ButtonProps> : {})"
                    :class="ui.close({ class: props.ui?.close })"
                  />
                </slot>
              </DialogClose>
            </slot>
          </div>

          <div :class="ui.body({ class: props.ui?.body })">
            <slot name="body" />
          </div>

          <div v-if="!!slots.footer" :class="ui.footer({ class: props.ui?.footer })">
            <slot name="footer" />
          </div>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
