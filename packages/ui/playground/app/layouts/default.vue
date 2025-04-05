<script setup lang="ts">
const { code } = useLocale();
const { icons } = useUI();
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="font-bold text-lg">
        🌈 Veehance UI
      </NuxtLink>
    </template>

    <template #right>
      <UButton :label="code.toUpperCase()" variant="subtle" />
    </template>
  </UHeader>

  <UMain class="flex flex-col">
    <slot />
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-sm text-(--ui-text-muted)">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UButton
        :icon="icons.github"
        to="https://github.com/ingniius/ui"
        target="_blank"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
