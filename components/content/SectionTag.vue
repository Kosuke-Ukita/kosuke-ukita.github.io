<script setup lang="ts">
defineProps<{ section: string }>()
</script>

<template>
  <h2 class="section-title">{{ section }}</h2>
</template>