import { ref } from 'vue'

export const usePubHover = () => {
  const hoveredIndex = ref<number | null>(null)
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  const startHover = (i: number) => {
    if (timer.value) clearTimeout(timer.value)
    timer.value = setTimeout(() => { hoveredIndex.value = i }, 1000)
  }

  const endHover = () => {
    if (timer.value) { clearTimeout(timer.value); timer.value = null }
    hoveredIndex.value = null
  }

  return { hoveredIndex, startHover, endHover }
}
