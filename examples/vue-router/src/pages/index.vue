<script setup lang="ts">
import UImage from "#build/image";
import ULink from "#build/link";
</script>

<template>
  <UMain class="flex min-h-screen flex-col items-center justify-center">
    <UContainer class="flex flex-col items-center justify-center gap-8 opacity-100 starting:opacity-0 transition-opacity duration-750 lg:grow">
      <div class="flex gap-2">
        <UImage class="size-16" src="https://logo.svgcdn.com/logos/vue.png" alt="framework"/>
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
      <div class="flex gap-2">
        <ULink as="button" to="/playground">Playground</ULink>
      </div>
    </UContainer>
  </UMain>
</template>