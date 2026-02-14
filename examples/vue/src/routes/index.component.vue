<script setup lang="ts">
import { UContainer, UIcon, UImage, UMain } from "#build/ui/components";
import { useHead } from "#build/ui/imports";

useHead({ title: "Veehance UI" });
</script>

<template>
  <UMain class="flex min-h-screen flex-col items-center justify-center">
    <UContainer class="flex flex-col items-center justify-center gap-8 lg:grow">
      <div class="flex gap-2">
        <UImage src="https://logo.svgcdn.com/logos/vitejs.png" alt="Framework" :height="64" :width="64" />
      </div>
      <h1 class="font-bold text-5xl md:text-7xl">Veehance UI</h1>
      <div class="flex gap-2">
        <div class="size-8 rounded-xs border border-default bg-primary"></div>
        <div class="size-8 rounded-xs border border-default bg-secondary"></div>
        <div class="size-8 rounded-xs border border-default bg-default"></div>
        <div class="size-8 rounded-xs border border-default bg-muted"></div>
        <div class="size-8 rounded-xs border border-default bg-elevated"></div>
        <div class="size-8 rounded-xs border border-default bg-accented"></div>
        <div class="size-8 rounded-xs border border-default bg-inverted"></div>
        <div class="size-8 rounded-xs border border-default bg-success"></div>
        <div class="size-8 rounded-xs border border-default bg-info"></div>
        <div class="size-8 rounded-xs border border-default bg-warning"></div>
        <div class="size-8 rounded-xs border border-default bg-error"></div>
      </div>
      <div class="flex gap-2">
        <span class="text-dimmed">Dimmed</span>
        <span class="text-muted">Muted</span>
        <span class="text-toned">Toned</span>
        <span class="text-default">Default</span>
        <span class="text-highlighted">Highlighted</span>
      </div>
      <div class="flex gap-2">
        <UIcon name="dark" class="size-6" />
        <UIcon name="light" class="size-6" />
        <UIcon name="system" class="size-6" />
        <UIcon name="user" class="size-6" />
      </div>
    </UContainer>
  </UMain>
</template>