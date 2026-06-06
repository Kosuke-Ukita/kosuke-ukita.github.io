import { computed } from 'vue'
import { grants, grantsJp } from '~/assets/data'
import { groupByYear } from './groupByYear'

export const useGroupedGrants = () => {
  const { isJp } = useLocale()
  return computed(() =>
    groupByYear(
      isJp.value ? grantsJp : grants,
      item => item.year.match(/\d{4}/)?.[0] ?? ''
    )
  )
}
