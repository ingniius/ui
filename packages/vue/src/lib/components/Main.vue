<script lang="ts">
import type { ClassValue } from "@veehance/core/types";

export interface MainProps {
  as?: any;
  class?: ClassValue;
}

export interface MainSlots {
  default(props?: object): any;
}
</script>

<script setup lang="ts">
import { cx } from "@veehance/core/utils";

import { Primitive } from "reka-ui";
import { computed } from "vue";

const props = withDefaults(defineProps<MainProps>(), { as: "main" });
defineSlots<MainSlots>();
</script>

<template>
  <Primitive :as="as" data-slot="main" :class="cx(props.class)">
    <slot />
  </Primitive>
</template>