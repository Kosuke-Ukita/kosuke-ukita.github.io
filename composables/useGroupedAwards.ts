import { computed } from 'vue'
import { awards, awardsJp } from '~/assets/data'
import { groupByYear } from './groupByYear'

export const useGroupedAwards = () => {
  const { isJp } = useLocale()
  return computed(() =>
    groupByYear(
      isJp.value ? awardsJp : awards,
      item => item.year.slice(5, 9)
    )
  )
}
