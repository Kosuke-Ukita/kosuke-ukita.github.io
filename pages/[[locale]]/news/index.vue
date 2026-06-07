<script setup lang="ts">
useHead({ title: 'News' })
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-8 tracking-tight">News</h1>
    <NewsSection grouped />
  </div>
</template>
