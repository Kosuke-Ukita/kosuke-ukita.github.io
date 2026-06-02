<script setup lang="ts">
import { publications } from '~/assets/data'

useHead({ title: 'Publications' })

const highlightAuthor = (authors: string) =>
  authors
    .replace(/Kosuke Ukita/g, `<strong>Kosuke Ukita</strong>`)
    .replace(/浮田嵩祐/g, `<strong>浮田嵩祐</strong>`)

const extractYear = (date?: string) => date?.trim().split(/\s+/).pop() ?? '—'

const linkIcon = (name: string, dataIcon?: string): string => {
  const map: Record<string, string> = {
    PDF:    'fa6-regular:file-pdf',
    Code:   'fa6-solid:code',
    Page:   'fa7-solid:arrow-up-right-from-square',
    Arxiv:  'academicons:arxiv',
    Slides: 'fa7-solid:chalkboard',
    Poster: 'fa6-regular:file-image',
    Cite:   'fa7-solid:quote-right',
  }
  return map[name] || dataIcon || 'heroicons:link'
}

type PubWithIndex = typeof publications[0] & { globalIndex: number }

const modalCite = ref<string | null>(null)
const isCopied = ref(false)

const openModal = (cite: string) => {
  modalCite.value = cite
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  modalCite.value = null
  isCopied.value = false
  document.body.style.overflow = ''
}
const copyCite = async () => {
  if (!modalCite.value) return
  await navigator.clipboard.writeText(modalCite.value)
  isCopied.value = true
  setTimeout(() => { isCopied.value = false }, 2000)
}

const hoveredPubIndex = ref<number | null>(null)
const hoverTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const startHover = (index: number) => {
  if (hoverTimer.value) clearTimeout(hoverTimer.value)
  hoverTimer.value = setTimeout(() => { hoveredPubIndex.value = index }, 1000)
}
const endHover = () => {
  if (hoverTimer.value) { clearTimeout(hoverTimer.value); hoverTimer.value = null }
  hoveredPubIndex.value = null
}

onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => {
    window.removeEventListener('keydown', onKey)
    document.body.style.overflow = ''
  })
})
const handlePreWheel = (e: WheelEvent) => {
  e.preventDefault()
  const el = e.currentTarget as HTMLElement
  el.scrollLeft += e.deltaY + e.deltaX
}
const handleCardWheel = (e: WheelEvent) => {
  e.preventDefault()
  const el = e.currentTarget as HTMLElement
  el.scrollLeft += e.deltaY + e.deltaX
}

const groupedPublications = computed(() => {
  const map: Record<string, PubWithIndex[]> = {}
  publications.forEach((pub, i) => {
    const year = extractYear(pub.date)
    if (!map[year]) map[year] = []
    map[year].push({ ...pub, globalIndex: i + 1 })
  })
  return Object.entries(map)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, pubs]) => ({ year, pubs }))
})
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl tracking-tight mb-10">Publications</h1>

    <div v-for="group in groupedPublications" :key="group.year" class="mb-12">

      <h2 class="font-mono text-sm font-semibold text-primary pb-2 mb-7 border-b border-gray-100 dark:border-zinc-800">
        {{ group.year }}
      </h2>

      <ol class="space-y-8">
        <li
          v-for="paper in group.pubs"
          :key="paper.globalIndex"
          class="relative flex gap-1 p-2 hover:shadow-md dark:shadow-white/10 transition-shadow"
          @mouseenter="startHover(paper.globalIndex)"
          @mouseleave="endHover"
        >
          <span class="pub-number shrink-0">[{{ paper.globalIndex }}]</span>

          <!-- Horizontal scroll container (entire entry as one card) -->
          <div class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" @wheel="handleCardWheel">
            <div class="min-w-max pr-12">
              <!-- Title -->
              <p class="pub-title text-sm leading-snug whitespace-nowrap">
                <a
                  v-if="paper.links?.find(l => l.name === 'Page')"
                  :href="paper.links.find(l => l.name === 'Page')!.url"
                  target="_blank"
                  rel="noopener"
                  class="hover:text-primary transition-colors"
                >{{ paper.title }}</a>
                <span v-else>{{ paper.title }}</span>
              </p>

              <!-- Authors -->
              <p class="pub-authors whitespace-nowrap" v-html="highlightAuthor(paper.authors)" />

              <!-- Venue -->
              <p class="pub-venue whitespace-nowrap">{{ paper.venue }}</p>

              <!-- Date and location -->
              <div class="whitespace-nowrap">
                <span v-if="paper.date" class="text-xs text-gray-400 dark:text-zinc-500">{{ paper.date }}</span>
                <span v-if="paper.location" class="text-xs text-gray-400 dark:text-zinc-500"> &middot; {{ paper.location }}</span>
              </div>

              <!-- Tags, refereed status, and link icons -->
              <div class="flex flex-nowrap items-center gap-2 mt-2">
                <span
                  v-if="paper.type"
                  class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm shrink-0"
                  :class="['Spotlight', 'Oral'].includes(paper.type)
                    ? 'text-primary border-primary/40'
                    : 'text-gray-500 dark:text-zinc-400 border-gray-300 dark:border-zinc-600'"
                >{{ paper.type }}</span>

                <span
                  class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm shrink-0"
                  :class="paper.note === 'Refereed'
                    ? 'text-primary border-primary/40'
                    : 'text-gray-400 dark:text-zinc-500 border-gray-200 dark:border-zinc-700'"
                >{{ paper.note === 'Refereed' ? 'refereed' : 'non-refereed' }}</span>

                <a
                  v-for="link in paper.links"
                  :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                  :title="link.name"
                  class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors p-0.5 rounded shrink-0"
                >
                  <Icon :name="linkIcon(link.name, link.icon)" class="w-[0.72rem] h-[0.72rem]" />
                </a>

                <button
                  v-if="paper.cite"
                  @click="openModal(paper.cite)"
                  title="BibTeX"
                  class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors p-0.5 rounded cursor-pointer shrink-0"
                >
                  <Icon :name="linkIcon('Cite')" class="w-[0.72rem] h-[0.72rem]" />
                </button>
              </div>
            </div>
          </div>

          <!-- Right gradient overlay -->
          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />

          <!-- Hover tooltip (appears after 1s) -->
          <Transition name="fade">
            <div
              v-if="hoveredPubIndex === paper.globalIndex"
              class="absolute left-0 top-full z-20 mt-1 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded shadow-xl p-3 space-y-1.5"
            >
              <p class="text-[0.78rem] font-semibold text-gray-900 dark:text-zinc-100 leading-snug">{{ paper.title }}</p>
              <p class="text-[0.72rem] text-gray-500 dark:text-zinc-400 leading-relaxed [&_strong]:underline [&_strong]:underline-offset-2" v-html="highlightAuthor(paper.authors)" />
              <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 italic leading-snug">{{ paper.venue }}</p>
            </div>
          </Transition>
        </li>
      </ol>
    </div>
  </div>

  <!-- BibTeX Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modalCite"
        class="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-6"
        @click.self="closeModal"
      >
        <div class="w-full max-w-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded shadow-2xl">
          <div class="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-zinc-800">
            <span class="font-mono text-[0.7rem] text-gray-400 dark:text-zinc-500 select-none">BibTeX</span>
            <div class="flex items-center gap-1">
              <button
                @click="copyCite"
                :title="isCopied ? 'Copied!' : 'Copy'"
                class="transition-colors p-1 rounded"
                :class="isCopied ? 'text-primary' : 'text-gray-400 dark:text-zinc-500 hover:text-primary'"
              >
                <Icon :name="isCopied ? 'fa7-solid:check' : 'fa6-regular:copy'" class="w-3.5 h-3.5" />
              </button>
              <button
                @click="closeModal"
                title="Close"
                class="text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors p-1 rounded"
              >
                <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <pre
            class="bibtex-pre font-mono text-[0.7rem] text-gray-600 dark:text-zinc-400 p-4 overflow-auto max-h-72 whitespace-pre leading-relaxed [scrollbar-width:none]"
            @wheel="handlePreWheel"
          >{{ modalCite.trim() }}</pre>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
