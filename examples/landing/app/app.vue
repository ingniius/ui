<script lang="ts" setup>
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/images/favicon.ico" }],
  htmlAttrs: { lang: "en" },
});

useSeoMeta({
  ogImage: "/images/social-card.png",
  twitterImage: "/images/social-card.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  --font-family-sans: Inter, sans-serif;
}
</style>
