<script lang="ts">
import appConfig from "#build/app.config";

import type { UComp } from "@vee-ui/system/types";

export interface ColorModeProps extends UComp {
  class?: any;
}
</script>

<script lang="ts" setup>
import { computed } from "vue";

import { useColorMode } from "#imports";

import UButton from "#ui/components/Button.vue";

withDefaults(defineProps<ColorModeProps>(), { as: "div", class: undefined });

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? appConfig.ui.icons.dark : appConfig.ui.icons.light"
      v-bind="{
        ...($ui?.button?.secondary as any),
        ...$attrs,
      }"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
