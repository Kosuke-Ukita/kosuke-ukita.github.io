<script setup lang="ts">
const props = defineProps<{
  previewCount?: number
  grouped?: boolean
}>()

const { isJp } = useLocale()
const newsBase = computed(() => isJp.value ? '/jp/news' : '/news')

const { data: newsData } = await useAsyncData(
  () => `news-${props.grouped ? 'all' : `flat-${props.previewCount}`}-${isJp.value ? 'jp' : 'en'}`,
  async () => {
    const q = queryContent('news')
      .only(['date', 'content', 'contentjp', '_path'])
      .sort({ date: -1 })
    return (props.previewCount && props.previewCount > 0) ? q.limit(props.previewCount).find() : q.find()
  }
)

const groupedNews = useGroupedNews(newsData as any)
const slug = (path: string) => path.split('/').pop() ?? ''
const hasMore = computed(() =>
  props.previewCount !== undefined && props.previewCount > 0
)
</script>

<template>
  <!-- Year-grouped view for standalone page -->
  <template v-if="grouped">
    <div v-for="group in groupedNews" :key="group.year" class="mb-10">
      <h2 class="font-mono text-sm font-semibold text-primary mb-4 pb-1.5 border-b border-gray-100 dark:border-zinc-800">{{ group.year }}</h2>
      <div class="space-y-4">
        <div v-for="(item, i) in group.items" :key="i" class="flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
          <span class="font-mono text-gray-400 dark:text-zinc-500 text-[0.72rem] sm:shrink-0 sm:w-[4.5rem] sm:pt-0.5">{{ item.date }}</span>
          <p class="text-gray-700 dark:text-zinc-300">
            <NuxtLink :to="`${newsBase}/${slug(item._path)}`" class="hover:underline underline-offset-2">{{ isJp ? item.contentjp : item.content }}</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </template>

  <!-- Flat list for preview (index.vue) -->
  <template v-else>
    <div class="space-y-3.5">
      <div v-for="(item, i) in newsData" :key="i" class="flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
        <span class="font-mono text-gray-400 dark:text-zinc-500 text-[0.72rem] sm:shrink-0 sm:w-[4.5rem] sm:pt-0.5">{{ item.date }}</span>
        <p class="text-gray-700 dark:text-zinc-300">
          <NuxtLink :to="`${newsBase}/${slug(item._path)}`" class="hover:underline underline-offset-2">{{ isJp ? item.contentjp : item.content }}</NuxtLink>
        </p>
      </div>
    </div>
    <div v-if="hasMore" class="mt-5">
      <NuxtLink :to="newsBase" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">All news →</NuxtLink>
    </div>
  </template>
</template>
