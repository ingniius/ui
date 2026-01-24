<script lang="ts">
import type { ClassValue } from "@veehance/core/types";

export interface ContainerProps {
  as?: any;
  class?: ClassValue;
}

export interface ContainerSlots {
  default(props?: object): any;
}
</script>

<script setup lang="ts">
import { cx } from "@veehance/core/utils";

import { Primitive } from "reka-ui";
import { computed } from "vue";

const props = withDefaults(defineProps<ContainerProps>(), { as: "div" });
defineSlots<ContainerSlots>();
</script>

<template>
  <Primitive :as="as" data-slot="container" :class="cx(props.class)">
    <slot />
  </Primitive>
</template>