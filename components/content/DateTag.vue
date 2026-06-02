<script setup lang="ts">
defineProps<{ date: string }>()
</script>

<template>
  <p class="font-mono text-gray-400 dark:text-zinc-500 text-[0.72rem] text-right">{{ date }}</p>
</template>
