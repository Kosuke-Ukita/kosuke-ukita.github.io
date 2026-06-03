import { computed } from 'vue'
import { publications } from '~/assets/data'
import { groupByYear } from './groupByYear'

export type PubWithIndex = typeof publications[0] & { globalIndex: number }

const extractYear = (date?: string) => date?.trim().split(/\s+/).pop() ?? '—'

export const useGroupedPublications = () =>
  computed(() =>
    groupByYear(
      publications.map((pub, i): PubWithIndex => ({ ...pub, globalIndex: i + 1 })),
      pub => extractYear(pub.date)
    )
  )
