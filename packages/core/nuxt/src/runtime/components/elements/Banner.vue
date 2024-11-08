<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { ButtonProps, LinkProps } from "@nuxt/ui";

import _appConfig from "#build/app.config";
import { banner as theme } from "#ui-config";
import type { PartialString } from "#ui/types/utils";

import { cva } from "@vee-ui/system/th";
import type { UComp, VariantProps } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { banner: Partial<ReturnType<typeof theme>> } };

const banner = cva({ extend: cva(theme(appConfig.ui)), ...(appConfig.ui?.banner || {}) });

type BannerVariants = VariantProps<typeof banner>;

export interface BannerProps extends UComp {
  /**
   * A unique id saved to local storage to remember if the banner has been dismissed.
   * Change this value to show the banner again.
   * @defaultValue 1
   */
  id?: string;
  /** The icon of the banner. */
  icon?: string;
  /** The title of the banner. */
  title?: string;
  /** The actions displayed in the banner. */
  actions?: ButtonProps[];
  to?: LinkProps["to"];
  target?: LinkProps["target"];
  color?: BannerVariants["color"];
  /**
   * Display a close button to dismiss the banner.
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`
   * @emits `close`
   * @defaultValue true
   */
  close?: ButtonProps | boolean;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.ui.icons.close
   */
  closeIcon?: string;
  class?: any;
  ui?: PartialString<typeof banner.slots>;
}

export interface BannerSlots {
  leading(props?: {}): any;
  title(props?: {}): any;
  actions(props?: {}): any;
  close(props: { ui: any }): any;
}
</script>

<script lang="ts" setup>
import { computed } from "vue";

import { useHead, useAppConfig } from "#imports";

import { Primitive } from "radix-vue";

const props = withDefaults(defineProps<BannerProps>(), { close: true });
const slots = defineSlots<BannerSlots>();

const appConfig = useAppConfig();

const ui = computed(() => banner({ color: props.color, to: !!props.to }));

const id = computed(() => `banner-${props.id || 1}`);

if (import.meta.server) {
  useHead({
    script: [
      {
        key: "prehydrate-template-banner",
        innerHTML: `
if (localStorage.getItem('${id.value}') === 'true') {
  document.querySelector('html').classList.add('hide-banner')
}`.replace(/\s+/g, " "),
        type: "text/javascript",
      },
    ],
  });
}

function onClose() {
  localStorage.setItem(id.value, "true");
  document.querySelector("html")?.classList.add("hide-banner");
}
</script>

<template>
  <Primitive :as="as" class="banner" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <NuxtLink
      v-if="to"
      :to="to"
      :target="target"
      class="focus:outline-none"
      :aria-label="title"
      tabindex="-1"
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </NuxtLink>

    <UContainer :class="ui.container({ class: props.ui?.container })">
      <div :class="ui.left({ class: props.ui?.left })" />

      <div :class="ui.center({ class: props.ui?.center })">
        <slot name="leading">
          <UIcon v-if="icon" :name="icon" :class="ui.icon({ class: props.ui?.icon })" />
        </slot>

        <div v-if="title || !!slots.title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div v-if="actions?.length" :class="ui.actions({ class: props.ui?.actions })">
          <slot name="actions">
            <UButton
              v-for="(action, index) in actions"
              :key="index"
              color="neutral"
              size="xs"
              v-bind="action"
            />
          </slot>
        </div>
      </div>

      <div :class="ui.right({ class: props.ui?.right })">
        <slot name="close" :ui="ui">
          <UButton
            v-if="close"
            :icon="closeIcon || appConfig.ui.icons.close"
            size="md"
            color="neutral"
            variant="ghost"
            aria-label="Close banner"
            v-bind="typeof close === 'object' ? close : undefined"
            :class="ui.close({ class: props.ui?.close })"
            @click="onClose"
          />
        </slot>
      </div>
    </UContainer>
  </Primitive>
</template>

<style scoped>
.hide-banner .banner {
  display: none;
}
</style>
