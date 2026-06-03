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
    <NuxtLink :to="newsBase" class="inline-flex items-center gap-1 font-mono text-[0.72rem] text-gray-400 dark:text-zinc-500 hover:underline mb-8">
      ← Back to News
    </NuxtLink>

    <article :class="['markdown', isJp ? 'show-jp' : 'show-en']">
      <ContentRenderer v-if="article" :value="article" />
    </article>
  </div>
</template>
