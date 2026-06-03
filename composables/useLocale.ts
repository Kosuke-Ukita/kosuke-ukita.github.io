import { computed } from 'vue'

export const useLocale = () => {
  const route = useRoute()
  const isJp = computed(() => route.params.locale === 'jp')
  return { isJp }
}
