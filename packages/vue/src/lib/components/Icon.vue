<script lang="ts">
import type { ClassValue, Dict, IconKeys } from "@veehance/core/types";

export interface IconProps {
  name: IconKeys | (string & {});
  size?: number | string;
  class?: ClassValue;
}
</script>

<script setup lang="ts">
import { computed } from "vue";

import iconset from "#build/iconset";

import { cx } from "@veehance/core/utils";

import { isString } from "es-toolkit";

const props = withDefaults(defineProps<IconProps>(), { size: 24 });

const icon = computed(() => {
  return (iconset as Dict)[props.name] as { body:string };
});

const size = computed(() =>
  isString(props.size) ? props.size : `${props.size}px`,
);
</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    :class="cx(props.class)" 
    :height="size"
    :width="size"
    v-html="icon.body"
    v-bind="$attrs"
  />
</template>