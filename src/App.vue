<template>
    <div class="max-w-7xl mx-auto my-4">
        <header class="h-16 mb-4">
            <h1 class="text-2xl font-semibold">Release Note Tool</h1>
        </header>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
