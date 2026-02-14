<script setup lang="ts">
import { en } from "@veehance/core/locale";

import { UApp } from "#build/ui/components";
import { useHead } from "#build/ui/imports";

useHead({
  htmlAttrs: { dir: en.dir, lang: en.code },
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
});
</script>

<template>
  <UApp :locale="en">
    <Suspense>
      <RouterView />
    </Suspense>
  </UApp>
</template>