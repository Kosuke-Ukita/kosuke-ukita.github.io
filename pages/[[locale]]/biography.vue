<script setup lang="ts">
useHead({ title: 'Biography' })

const { isJp } = useLocale()
const lang = computed(() => isJp.value ? 'jp' : 'en')

const { data: bio } = await useAsyncData(
  () => `bio-${lang.value}`,
  () => queryContent('biography', lang.value).findOne()
)
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 tracking-tight">Biography</h1>

    <article class="markdown">
      <ContentRenderer v-if="bio" :value="bio" />
    </article>
  </div>
</template>
