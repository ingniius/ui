<script setup lang="ts">
import ULink from "#build/link";
</script>

<template>
  <UMain class="flex min-h-screen flex-col items-center justify-center">
    <UContainer class="flex flex-col items-center justify-center gap-8 opacity-100 starting:opacity-0 transition-opacity duration-750 lg:grow">
      <h1 class="font-bold text-5xl md:text-7xl">Playground</h1>
      <div class="flex gap-2">
        <ULink as="button" to="/">Go Back</ULink>
      </div>
    </UContainer>
  </UMain>
</template>