<script lang="ts">
import type { ClassValue, Stringify, Token } from "@veehance/core/types";

export interface IconProps {
  name?: Stringify<Token["icon"]>;
  icon?: Stringify<Token["icon"]>;
  dynamic?: boolean;
  class?: ClassValue;
}
</script>

<script setup lang="ts">
import { cx, iconToSVG } from "@veehance/core/utils"; 

import { Icon as IconifyIcon } from "@iconify/vue";
import { isString } from "radash";
import { computed, useAttrs } from "vue";

import { useAppConfig, useIcon } from "#build/ui/imports";

defineOptions({ inheritAttrs: false })

const props = defineProps<IconProps>()

const appConfig = useAppConfig();
const attrs = useAttrs();

const icon = computed(() => useIcon(props.name, props.icon));
const isDynamic = computed(() => props.dynamic ?? appConfig.ui.components?.icon?.dynamic);
const shouldRenderSVG = computed(() => !isDynamic.value && isString(icon.value));

const svg = computed(() => {
  if (!shouldRenderSVG.value) return null;
  return iconToSVG(icon.value);
});

const svgAttrs = computed(() => ({ ...svg.value?.attributes, ...attrs }));
</script>

<template>
  <IconifyIcon v-if="isDynamic" :icon="icon" :class="cx(props.class)" v-bind="$attrs" />
  <svg v-else-if="shouldRenderSVG && svg" :class="cx(props.class)" v-bind="svgAttrs" v-html="svg.body" />
</template>