<script lang="ts" setup></script>

<template>
  <UHeader title="Veehance UI 🌈" to="/">
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <UFooter>
    <template #right>
      <UButton
        to="https://github.com/ingniius/ui"
        target="_blank"
        icon="i-simple-icons:github"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
