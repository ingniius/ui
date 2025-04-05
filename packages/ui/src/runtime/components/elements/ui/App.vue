<script lang="ts">
import type { ConfigProviderProps } from "reka-ui";

import type { Locale, Messages } from "../../../types/locale";

export interface AppProps<T extends Messages = Messages> extends Omit<ConfigProviderProps, "useId" | "dir" | "locale"> {
  locale?: Locale<T>;
}

export interface AppSlots {
  default: (props?: object) => any;
}

export default { name: "App" };
</script>

<script setup lang="ts" generic="T extends Messages">
import { reactivePick } from "@vueuse/core";
import { ConfigProvider, useForwardProps } from "reka-ui";
import { provide, toRef, useId } from "vue";

import { localeContextInjectionKey } from "../../../composables/useLocale";

const props = defineProps<AppProps<T>>();
defineSlots<AppSlots>();

const configProviderProps = useForwardProps(reactivePick(props, "scrollBody"));

const locale = toRef(() => props.locale);
provide(localeContextInjectionKey, locale);
</script>

<template>
  <ConfigProvider :use-id="() => (useId() as string)" :dir="locale?.dir" :locale="locale?.code" v-bind="configProviderProps">
    <slot />
  </ConfigProvider>
</template>
