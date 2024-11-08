<script lang="ts">
import type { AppConfig } from "@nuxt/schema";
import type { ButtonProps } from "@nuxt/ui";

import type { NuxtError } from "#app";
import _appConfig from "#build/app.config";
import { error as theme } from "#ui-config";

import { cva } from "@vee-ui/system/th";
import type { UComp } from "@vee-ui/system/types";

const appConfig = _appConfig as AppConfig & { ui: { error: Partial<typeof theme> } };

const error = cva({ extend: cva(theme), ...(appConfig.ui?.error || {}) });

export interface ErrorProps extends UComp {
  error?: Partial<NuxtError>;
  /**
   * The URL to redirect to when the error is cleared.
   * @defaultValue '/'
   */
  redirect?: string;
  /**
   * Display a button to clear the error in the links slot.
   * `{ size: 'lg', color: 'primary', variant: 'solid', label: 'Back to home' }`{lang="ts-type"}
   * @defaultValue true
   */
  clear?: ButtonProps | boolean;
  class?: any;
  ui?: Partial<typeof error.slots>;
}

export interface ErrorSlots {
  default(props?: {}): any;
  statusCode(props?: {}): any;
  statusMessage(props?: {}): any;
  links(props?: {}): any;
}
</script>

<script lang="ts" setup>
import { clearError } from "#imports";

import { Primitive } from "radix-vue";

import UButton from "#ui/components/Button.vue";

const props = withDefaults(defineProps<ErrorProps>(), {
  as: "main",
  redirect: "/",
  clear: true,
});

defineSlots<ErrorSlots>();

const ui = error();

function handleError() {
  clearError({ redirect: props.redirect });
}
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <p :class="ui.statusCode({ class: props.ui?.statusCode })">
      {{ props.error?.statusCode }}
    </p>
    <h1 :class="ui.statusMessage({ class: props.ui?.statusMessage })">
      {{ props.error?.statusMessage }}
    </h1>
    <div :class="ui.links({ class: props.ui?.links })">
      <UButton
        v-if="clear"
        size="lg"
        color="primary"
        variant="solid"
        label="Back to home"
        v-bind="typeof clear === 'object' ? clear : undefined"
        @click="handleError"
      />
    </div>
  </Primitive>
</template>
