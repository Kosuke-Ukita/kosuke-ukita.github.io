import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { publications } from '~/assets/data'
import { groupByYear } from './groupByYear'

export type PubWithIndex = typeof publications[0] & { globalIndex: number }

const extractYear = (date?: string) => date?.trim().split(/\s+/).pop() ?? '—'

export const useGroupedPublications = (refereedOnly: MaybeRefOrGetter<boolean> = false) =>
  computed(() =>
    groupByYear(
      publications
        .filter(pub => !toValue(refereedOnly) || pub.refereed)
        .map((pub, i): PubWithIndex => ({ ...pub, globalIndex: i + 1 })),
      pub => extractYear(pub.date)
    )
  )
