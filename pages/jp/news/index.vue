<script setup lang="ts">
useHead({ title: 'News' })

const { data: allNews } = await useAsyncData('all-news-jp', () =>
  queryContent('news')
    .only(['date', 'content', 'contentjp', '_path'])
    .sort({ date: -1 })
    .find()
)

const groupedNews = computed(() => {
  if (!allNews.value) return []
  const map: Record<string, typeof allNews.value> = {}
  for (const item of allNews.value) {
    const year = (item.date as string)?.slice(0, 4) ?? '—'
    if (!map[year]) map[year] = []
    map[year].push(item)
  }
  return Object.entries(map)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }))
})

const slug = (path: string) => path.split('/').pop() ?? ''
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-8 tracking-tight">News</h1>

    <div v-for="group in groupedNews" :key="group.year" class="mb-10">
      <h2 class="font-mono text-sm font-semibold text-primary mb-4 pb-1.5 border-b border-gray-100 dark:border-zinc-800">
        {{ group.year }}
      </h2>
      <div class="space-y-4">
        <div v-for="(item, i) in group.items" :key="i" class="flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
          <span class="font-mono text-gray-400 dark:text-zinc-500 text-[0.72rem] sm:shrink-0 sm:w-[4.5rem] sm:pt-0.5">{{ item.date }}</span>
          <div>
            <p class="text-gray-700 dark:text-zinc-300">
              <NuxtLink :to="`/news/${slug(item._path)}`" class="hover:underline underline-offset-2">{{ item.contentjp }}</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
