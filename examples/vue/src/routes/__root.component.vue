<script setup lang="ts">
import { en } from "@veehance/core/locale";

import { Outlet } from "@tanstack/vue-router";
import { TanStackRouterDevtools } from "@tanstack/vue-router-devtools";

import { UApp } from "#build/ui/components";
</script>

<template>
  <UApp :locale="en">
    <Outlet />
  </UApp>
  <TanStackRouterDevtools position="bottom-left" />
</template>