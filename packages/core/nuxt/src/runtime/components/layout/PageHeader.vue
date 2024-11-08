<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { ButtonProps } from "@nuxt/ui";

import _appConfig from "#build/app.config";
import { pageHeader as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { pageHeader: Partial<typeof theme> } };

const pageHeader = cva({ extend: cva(theme), ...(appConfig.ui?.pageHeader || {}) });

export interface PageHeaderProps extends UComp {
  headline?: string;
  title?: string;
  description?: string;
  links?: ButtonProps[];
  class?: any;
  ui?: Partial<typeof pageHeader.slots>;
}

export interface PageHeaderSlots {
  headline(props?: {}): any;
  title(props?: {}): any;
  description(props?: {}): any;
  links(props?: {}): any;
  default(props?: {}): any;
}
</script>

<script lang="ts" setup>
import { Primitive } from "radix-vue";

import UButton from "#ui/components/Button.vue";

const props = defineProps<PageHeaderProps>();
const slots = defineSlots<PageHeaderSlots>();

const ui = pageHeader();
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <div v-if="headline || !!slots.headline" :class="ui.headline({ class: props.ui?.headline })">
      <slot name="headline">
        {{ headline }}
      </slot>
    </div>

    <div :class="ui.container({ class: props.ui?.container })">
      <div :class="ui.wrapper({ class: props.ui?.wrapper })">
        <h1 v-if="title || !!slots.title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <div v-if="links?.length || !!slots.links" :class="ui.links({ class: props.ui?.links })">
          <slot name="links">
            <UButton
              v-for="(link, index) in links"
              :key="index"
              color="neutral"
              variant="outline"
              v-bind="link"
            />
          </slot>
        </div>
      </div>

      <div
        v-if="description || !!slots.description"
        :class="ui.description({ class: props.ui?.description })"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <slot />
    </div>
  </Primitive>
</template>
