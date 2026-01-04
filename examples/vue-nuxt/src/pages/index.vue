<script setup lang="ts">
useSeoMeta({ title: "Veehance UI" });
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center gap-8 opacity-100 starting:opacity-0 transition-opacity duration-750 lg:grow">
      <h1 class="font-bold text-5xl md:text-7xl">Veehance UI</h1>
      <div class="flex gap-2">
        <div class="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg)"></div>
        <div class="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg-muted)"></div>
        <div class="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg-elevated)"></div>
        <div class="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg-accented)"></div>
        <div class="size-8 rounded-xs border border-(--ui-border) bg-(--ui-bg-inverted)"></div>
      </div>
      <div class="flex gap-2">
        <span class="text-(--ui-text-dimmed)">Dimmed</span>
        <span class="text-(--ui-text-muted)">Muted</span>
        <span class="text-(--ui-text-toned)">Toned</span>
        <span class="text-(--ui-text)">Default</span>
        <span class="text-(--ui-text-highlighted)">Highlighted</span>
      </div>
    </div>
  </main>
</template>