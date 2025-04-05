<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: { lang: "en" },
});
</script>

<template>
  <Body>
    <main class="flex flex-1 min-h-screen">
      <NuxtPage />
    </main>
  </Body>
</template>
