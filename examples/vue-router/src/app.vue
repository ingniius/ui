<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed, ref } from "vue";

const appConfig = useAppConfig();

appConfig.dir = ref("ltr");
appConfig.lang = ref("en");

useHead({
  htmlAttrs: {
    dir: computed(() => appConfig.dir as "ltr" | "rtl"),
    lang: computed(() => appConfig.lang as string),
  },
});
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>