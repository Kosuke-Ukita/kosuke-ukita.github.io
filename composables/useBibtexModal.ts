import { ref, onMounted, onUnmounted } from 'vue'

export const useBibtexModal = () => {
  const cite = ref<string | null>(null)
  const copied = ref(false)

  const open = (text: string) => {
    cite.value = text
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    cite.value = null
    copied.value = false
    document.body.style.overflow = ''
  }

  const copy = async () => {
    if (!cite.value) return
    await navigator.clipboard.writeText(cite.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }

  onMounted(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    onUnmounted(() => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    })
  })

  return { cite, copied, open, close, copy }
}
