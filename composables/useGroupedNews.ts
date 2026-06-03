import { computed, type Ref } from 'vue'
import { groupByYear } from './groupByYear'

export const useGroupedNews = <T extends { date?: unknown }>(allNews: Ref<T[] | null>) =>
  computed(() =>
    allNews.value
      ? groupByYear(allNews.value, item => String(item.date ?? '').slice(0, 4) || '—')
      : []
  )
