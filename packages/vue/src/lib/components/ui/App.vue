<script lang="ts">
import type { Locale, Messages } from "@veehance/core/types";

import type { ConfigProviderProps } from "reka-ui";

export interface AppProps<M extends Messages = Messages>
  extends Omit<ConfigProviderProps, "locale" | "useId"> {
  locale?: Locale<M>;
}

export interface AppSlots {
  default(props?: object): any;
}
</script>

<script setup lang="ts" generic="M extends Messages">
import { reactivePick } from "@vueuse/core";
import { ConfigProvider, useForwardProps } from "reka-ui";
import { provide, toRef, useId } from "vue";

import { localeContext } from "../../contexts";

const props = defineProps<AppProps<M>>();
defineSlots<AppSlots>();

const configProviderProps = useForwardProps(reactivePick(props, "scrollBody"));

const locale = toRef(() => props.locale)
provide(localeContext, locale)
</script>

<template>
  <ConfigProvider 
    :use-id="() => (useId())"
    :dir="props.dir || locale?.dir"
    :locale="locale?.code"
    v-bind="configProviderProps"
  >
    <slot />
  </ConfigProvider>
</template>