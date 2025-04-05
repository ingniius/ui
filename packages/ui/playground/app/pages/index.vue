<script setup lang="ts">
const { title, description } = { title: "Veehance UI", description: "..." };

useSeoMeta({ title, ogTitle: title, description, ogDescription: description });
</script>

<template>
  <section class="flex flex-1 justify-center items-center">
    <h1 class="font-bold md:text-6xl text-5xl">
      A Visual Enhanced Design System
    </h1>
  </section>
</template>
