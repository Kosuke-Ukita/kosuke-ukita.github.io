<script setup lang="ts">
const props = defineProps<{ lang: string }>()
const currentLang = inject<string>('currentLang', 'en')
</script>

<template>
  <div v-if="props.lang === currentLang">
    <slot />
  </div>
</template>
