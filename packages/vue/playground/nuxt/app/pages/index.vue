<script setup lang="ts">
const { title, description } = { title: 'Veehance UI', description: '...' };

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
});
</script>

<template>
    <vee-container class="flex flex-col items-center justify-center gap-8 opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
        <h1 class="font-bold text-7xl">
            Veehance UI 🌈
        </h1>

        <div class="flex flex-row items-center gap-4">
            <vee-icon icon="user" variant="solid" />
            <vee-icon icon="user" variant="outline" />
        </div>
    </vee-container>
</template>
