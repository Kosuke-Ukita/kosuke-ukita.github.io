<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <h1 class="font-mono font-semibold text-gray-800 dark:text-zinc-100 text-xl mb-8 tracking-tight">{{ title }}</h1>
</template>