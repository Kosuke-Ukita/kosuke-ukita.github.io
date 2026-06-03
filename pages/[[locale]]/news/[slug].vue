<script setup lang="ts">
const { isJp } = useLocale()
provide('currentLang', isJp.value ? 'jp' : 'en')

const route = useRoute()
const slug = route.params.slug as string
const newsBase = computed(() => isJp.value ? '/jp/news' : '/news')

const { data: article } = await useAsyncData(`news-${slug}`, () =>
  queryContent('news', slug).findOne()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'News article not found' })
}

useHead({ title: article.value.title })
</script>

<template>
  <div>
    <NuxtLink
      :to="newsBase"
      class="inline-flex items-center gap-1 font-mono text-[0.72rem] text-gray-400 dark:text-zinc-500 hover:underline mb-8"
    >
      <Icon name="heroicons:arrow-left" class="w-3 h-3" />
      Back to News
    </NuxtLink>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-8 tracking-tight">News —</h1>

    <article :class="['markdown', isJp ? 'show-jp' : 'show-en']">
      <ContentRenderer v-if="article" :value="article" />
    </article>
  </div>
</template>
