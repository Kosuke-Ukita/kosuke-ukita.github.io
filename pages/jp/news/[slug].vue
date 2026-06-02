<script setup lang="ts">
provide('currentLang', 'jp')

const route = useRoute()
const slug = route.params.slug as string

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
      to="/jp/news"
      class="inline-flex items-center gap-1 font-mono text-[0.72rem] text-gray-400 dark:text-zinc-500 hover:underline mb-8"
    >
      <Icon name="heroicons:arrow-left" class="w-3 h-3" />
      Back to News
    </NuxtLink>

    <article class="prose prose-sm dark:prose-invert max-w-none
      prose-headings:font-mono prose-headings:tracking-tight prose-headings:text-primary
      prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900 dark:prose-strong:text-zinc-100
      prose-code:font-mono prose-code:text-sm
    ">
      <ContentRenderer v-if="article" :value="article" />
    </article>
  </div>
</template>
