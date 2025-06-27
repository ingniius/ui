<script setup lang="ts">
useHead({
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [{ rel: 'icon', href: 'https://fav.farm/🌈' }],
    htmlAttrs: { lang: 'en' },
});
</script>

<template>
    <Body>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </Body>
</template>
