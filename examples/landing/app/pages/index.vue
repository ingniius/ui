<script lang="ts" setup>
const { data: page } = await useAsyncData("index", () => queryContent("/").findOne());

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
});
</script>

<template>
  <UContainer as="section">
    <h1 class="text-4xl font-medium md:text-5xl">{{ page?.hero.title }}</h1>
  </UContainer>
</template>
