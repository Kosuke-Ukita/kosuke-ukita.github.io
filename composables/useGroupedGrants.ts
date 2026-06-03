import { computed } from 'vue'
import { grants, grantsJp } from '~/assets/data'
import { groupByYear } from './groupByYear'

export const useGroupedGrants = () => {
  const { isJp } = useLocale()
  return computed(() =>
    groupByYear(
      isJp.value ? grantsJp : grants,
      item => item.year.slice(5, 9)
    )
  )
}
