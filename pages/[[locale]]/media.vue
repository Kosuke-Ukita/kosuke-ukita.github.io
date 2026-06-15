<script setup lang="ts">
useHead({ title: 'Media' })

const { isJp } = useLocale()
const newsBase = computed(() => isJp.value ? '/jp/news' : '/news')

const { data: articles } = await useAsyncData('media-images', () =>
  queryContent('news').sort({ date: -1 }).find()
)

function extractImages(node: any): { src: string; alt: string }[] {
  if (!node) return []
  const images: { src: string; alt: string }[] = []

  if (node.tag === 'img' && typeof node.props?.src === 'string' && node.props.src.startsWith('/assets/')) {
    images.push({ src: node.props.src, alt: node.props.alt ?? '' })
  }

  if ((node.type === 'raw' || node.type === 'html') && typeof node.value === 'string') {
    const re = /<img[^>]+src="([^"]+)"(?:[^>]*alt="([^"]*)")?[^>]*\/?>/g
    let m
    while ((m = re.exec(node.value)) !== null) {
      if (m[1].startsWith('/assets/')) images.push({ src: m[1], alt: m[2] ?? '' })
    }
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) images.push(...extractImages(child))
  }
  return images
}

interface MediaItem {
  src: string
  alt: string
  articlePath: string
  date: string
}

const mediaItems = computed<MediaItem[]>(() => {
  if (!articles.value) return []
  const items: MediaItem[] = []
  for (const article of articles.value) {
    const slug = (article._path as string)?.split('/').pop() ?? ''
    for (const img of extractImages(article.body)) {
      items.push({ ...img, articlePath: `${newsBase.value}/${slug}`, date: article.date as string })
    }
  }
  return items
})

// Pagination
const PAGE_SIZE = 12
const route = useRoute()
const router = useRouter()

const currentPage = computed(() => Math.max(1, Number(route.query.page) || 1))
const totalPages = computed(() => Math.ceil(mediaItems.value.length / PAGE_SIZE))
const pageItems = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return mediaItems.value.slice(start, start + PAGE_SIZE)
})

const goTo = (page: number) => {
  router.push({ query: { ...route.query, page: page === 1 ? undefined : page } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Lightbox
const selectedIndex = ref(-1)
const selected = computed(() => selectedIndex.value >= 0 ? mediaItems.value[selectedIndex.value] : null)

const openLightbox = (item: MediaItem) => {
  selectedIndex.value = mediaItems.value.findIndex(m => m.src === item.src)
}
const closeLightbox = () => { selectedIndex.value = -1 }
const prevItem = () => { if (selectedIndex.value > 0) selectedIndex.value-- }
const nextItem = () => { if (selectedIndex.value < mediaItems.value.length - 1) selectedIndex.value++ }

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (!selected.value) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevItem()
    if (e.key === 'ArrowRight') nextItem()
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-8 tracking-tight">Media</h1>

    <p v-if="mediaItems.length === 0" class="text-sm text-gray-400 dark:text-zinc-500 font-mono">No media found.</p>

    <template v-else>
      <div class="grid grid-cols-3 gap-1">
        <button
          v-for="(item, i) in pageItems"
          :key="i"
          class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800 group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          @click="openLightbox(item)"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end">
            <p v-if="item.alt" class="text-white text-[0.6rem] font-mono px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-2 leading-snug text-left">
              {{ item.alt }}
            </p>
          </div>
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between mt-8">
        <button
          :disabled="currentPage <= 1"
          class="font-mono text-[0.75rem] text-gray-500 dark:text-zinc-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          @click="goTo(currentPage - 1)"
        >← Prev</button>

        <span class="font-mono text-[0.7rem] text-gray-400 dark:text-zinc-500">
          {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          :disabled="currentPage >= totalPages"
          class="font-mono text-[0.75rem] text-gray-500 dark:text-zinc-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          @click="goTo(currentPage + 1)"
        >Next →</button>
      </div>
    </template>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selected"
          class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          @click.self="closeLightbox"
        >
          <!-- Close -->
          <button
            class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
            @click="closeLightbox"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>

          <!-- Prev arrow -->
          <button
            :disabled="selectedIndex <= 0"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors p-2"
            aria-label="Previous photo"
            @click="prevItem"
          >
            <Icon name="heroicons:chevron-left" class="w-8 h-8" />
          </button>

          <!-- Image -->
          <Transition name="lb-slide" mode="out-in">
            <img
              :key="selected.src"
              :src="selected.src"
              :alt="selected.alt"
              class="max-h-[80vh] max-w-[calc(100%-6rem)] object-contain rounded"
            />
          </Transition>

          <!-- Next arrow -->
          <button
            :disabled="selectedIndex >= mediaItems.length - 1"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors p-2"
            aria-label="Next photo"
            @click="nextItem"
          >
            <Icon name="heroicons:chevron-right" class="w-8 h-8" />
          </button>

          <!-- Caption -->
          <div class="mt-3 flex flex-col items-center gap-1.5">
            <p v-if="selected.alt" class="text-white/80 text-sm font-mono text-center">{{ selected.alt }}</p>
            <div class="flex items-center gap-3">
              <NuxtLink
                :to="selected.articlePath"
                class="text-white/50 hover:text-white text-[0.7rem] font-mono underline underline-offset-2 transition-colors"
                @click="closeLightbox"
              >
                {{ selected.date }} →
              </NuxtLink>
              <span class="text-white/30 text-[0.65rem] font-mono">{{ selectedIndex + 1 }} / {{ mediaItems.length }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.lb-slide-enter-active,
.lb-slide-leave-active { transition: opacity 0.15s ease; }
.lb-slide-enter-from,
.lb-slide-leave-to { opacity: 0; }
</style>
