<script setup lang="ts">
import { publications } from '~/assets/data'

useHead({ title: 'Media' })

const { isJp } = useLocale()
const newsBase = computed(() => isJp.value ? '/jp/news' : '/news')

const { data: articles } = await useAsyncData('media-images', () =>
  queryContent('news').sort({ date: -1 }).find()
)

// ── Types ──────────────────────────────────────────────────────────────

type MediaType = 'image' | 'pdf' | 'slides' | 'poster' | 'link'

interface MediaItem {
  type: MediaType
  src: string
  alt: string
  date: string
  label?: string
  title?: string
  articlePath?: string
  domain?: string
}

// ── Helpers ────────────────────────────────────────────────────────────

function extractImages(node: any): { src: string; alt: string }[] {
  if (!node) return []
  const imgs: { src: string; alt: string }[] = []
  if (node.tag === 'img' && typeof node.props?.src === 'string' && node.props.src.startsWith('/assets/')) {
    imgs.push({ src: node.props.src, alt: node.props.alt ?? '' })
  }
  if ((node.type === 'raw' || node.type === 'html') && typeof node.value === 'string') {
    const re = /<img[^>]+>/g
    let m: RegExpExecArray | null
    while ((m = re.exec(node.value)) !== null) {
      const src = /src="([^"]+)"/.exec(m[0])?.[1]
      const alt = /alt="([^"]*)"/.exec(m[0])?.[1] ?? ''
      if (src && src.startsWith('/assets/')) imgs.push({ src, alt })
    }
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) imgs.push(...extractImages(child))
  }
  return imgs
}

const MONTH_MAP: Record<string, string> = {
  January: '01', February: '02', March: '03', April: '04',
  May: '05', June: '06', July: '07', August: '08',
  September: '09', October: '10', November: '11', December: '12',
}

function parsePubDate(d: string): string {
  const parts = (d ?? '').trim().match(/^(\w+)\s+(\d{4})$/)
  if (!parts) return d ?? ''
  const [, month, year] = parts
  return `${year}-${MONTH_MAP[month ?? ''] ?? '01'}-01`
}

function getDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return url }
}

function isImageUrl(url: string): boolean {
  return /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)
}

// ── Data ───────────────────────────────────────────────────────────────

const newsItems = computed<MediaItem[]>(() => {
  if (!articles.value) return []
  const items: MediaItem[] = []
  const seen = new Set<string>()
  for (const article of articles.value) {
    const slug = (article._path as string)?.split('/').pop() ?? ''
    for (const img of extractImages(article.body)) {
      if (seen.has(img.src)) continue
      seen.add(img.src)
      items.push({
        type: 'image',
        src: img.src,
        alt: img.alt,
        date: (article.date as string) ?? '',
        articlePath: `${newsBase.value}/${slug}`,
      })
    }
  }
  return items
})

const pubItems = computed<MediaItem[]>(() => {
  const items: MediaItem[] = []
  for (const pub of publications) {
    const p = pub as any
    const date = parsePubDate(p.date ?? '')
    const title = p.title as string
    const links = (p.links ?? []) as Array<{ name: string; url: string }>
    let hasPage = false

    for (const link of links) {
      const { name, url } = link
      if (name === 'PDF' && url.startsWith('/assets/')) {
        items.push({ type: 'pdf', src: url, alt: title, date, label: 'PDF', title })
      } else if (name === 'Slides') {
        items.push({ type: 'slides', src: url, alt: title, date, label: 'Slides', title })
      } else if (name === 'Poster') {
        const type: MediaType = isImageUrl(url) ? 'poster' : 'pdf'
        items.push({ type, src: url, alt: title, date, label: 'Poster', title })
      } else if (name === 'Page' && !hasPage) {
        hasPage = true
        items.push({ type: 'link', src: url, alt: title, date, label: 'Page', title, domain: getDomain(url) })
      } else if (name === 'Arxiv' && !hasPage) {
        items.push({ type: 'link', src: url, alt: title, date, label: 'arXiv', title, domain: 'arxiv.org' })
      }
    }
  }
  return items
})

const mediaItems = computed<MediaItem[]>(() => {
  const all = [...newsItems.value, ...pubItems.value]
  all.sort((a, b) => (b.date || '0000').localeCompare(a.date || '0000'))
  return all
})

// ── Pagination ─────────────────────────────────────────────────────────

const PAGE_SIZE = 12
const route = useRoute()
const router = useRouter()

const currentPage = ref(1)
onMounted(() => {
  currentPage.value = Math.max(1, Number(route.query.page) || 1)
})
watch(() => route.query.page, p => {
  currentPage.value = Math.max(1, Number(p) || 1)
})

const totalPages = computed(() => Math.ceil(mediaItems.value.length / PAGE_SIZE))
const pageItems = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return mediaItems.value.slice(start, start + PAGE_SIZE)
})

const goTo = (page: number) => {
  router.push({ query: { ...route.query, page: page === 1 ? undefined : page } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ── Unified preview (all types) ────────────────────────────────────────

const previewIndex = ref(-1)
const previewItem = computed(() =>
  previewIndex.value >= 0 ? (mediaItems.value[previewIndex.value] ?? null) : null
)

// Default iframe dimensions per media type (overridable via openPreview second arg)
const DEFAULT_PREVIEW_SIZES: Partial<Record<MediaType, { width: string; height: string }>> = {
  pdf:    { width: 'min(680px, calc(100% - 7rem))',  height: 'calc(90vh - 8rem)' },
  slides: { width: 'min(680px, calc(100% - 7rem))', height: 'calc(90vh - 8rem)' },
}

const previewSizeOverride = ref<{ width: string; height: string } | null>(null)

const previewSize = computed(() =>
  previewSizeOverride.value
  ?? (previewItem.value ? (DEFAULT_PREVIEW_SIZES[previewItem.value.type] ?? null) : null)
)

const openPreview = (item: MediaItem, size?: { width: string; height: string }) => {
  // pageItems are slices of mediaItems — same object references, so indexOf works
  previewIndex.value = mediaItems.value.indexOf(item)
  previewSizeOverride.value = size ?? null
}
const closePreview = () => { previewIndex.value = -1; previewSizeOverride.value = null }
const prevPreview = () => {
  if (previewIndex.value > 0) { previewIndex.value--; previewSizeOverride.value = null }
}
const nextPreview = () => {
  if (previewIndex.value < mediaItems.value.length - 1) { previewIndex.value++; previewSizeOverride.value = null }
}

// Screenshot loading state for link-type preview
const screenshotState = ref<'loading' | 'loaded' | 'error'>('loading')
watch(() => previewItem.value?.src, () => { screenshotState.value = 'loading' })

// ── Image skeleton ─────────────────────────────────────────────────────

const loaded = reactive<Record<string, boolean>>({})

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (!previewItem.value) return
    if (e.key === 'Escape') closePreview()
    if (e.key === 'ArrowLeft') prevPreview()
    if (e.key === 'ArrowRight') nextPreview()
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
        <template v-for="item in pageItems" :key="`${item.src}|${item.date}|${item.label ?? ''}`">

          <!-- ── Photo / Poster image ───────────────────────── -->
          <button
            v-if="item.type === 'image' || item.type === 'poster'"
            class="relative aspect-square overflow-hidden group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            :class="loaded[item.src] ? 'bg-gray-100 dark:bg-zinc-800' : 'skeleton'"
            @click="openPreview(item)"
          >
            <img
              :ref="(el: any) => { if (el?.complete) loaded[item.src] = true }"
              :src="item.src"
              :alt="item.alt"
              class="w-full h-full object-cover transition-[opacity,transform] duration-300 group-hover:scale-105"
              :class="loaded[item.src] ? 'opacity-100' : 'opacity-0'"
              loading="lazy"
              data-no-fade
              @load="loaded[item.src] = true"
              @error="loaded[item.src] = true"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end">
              <p v-if="item.alt" class="text-white text-[0.6rem] font-mono px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-2 leading-snug text-left">
                {{ item.alt }}
              </p>
            </div>
            <span v-if="item.type === 'image'" class="absolute top-1.5 right-1.5 font-mono text-[0.48rem] bg-black/55 text-white/90 px-1 py-0.5 rounded-sm tracking-wide">Photo</span>
            <span v-else-if="item.type === 'poster'" class="absolute top-1.5 right-1.5 font-mono text-[0.48rem] bg-black/55 text-white/90 px-1 py-0.5 rounded-sm tracking-wide">Poster</span>
          </button>

          <!-- ── PDF card ───────────────────────────────────── -->
          <button v-else-if="item.type === 'pdf'" class="relative aspect-square bg-rose-100/20 dark:bg-red-900/10 group flex flex-col items-center justify-center gap-2 p-3 focus:outline-none hover:shadow-md transition-shadow border border-transparent hover:border-rose-100 dark:hover:border-rose-500/10" @click="openPreview(item)">
            <Icon name="heroicons:document-text" class="w-5 h-5 text-rose-300 dark:text-rose-300/50" />
            <p class="text-[0.57rem] font-mono text-gray-600 dark:text-zinc-400 line-clamp-4 text-center leading-snug w-full group-hover:scale-105 transition-transform duration-300">{{ item.title }}</p>
            <span class="absolute top-1.5 right-1.5 font-mono text-[0.48rem] border border-rose-100 dark:border-rose-300/20 text-rose-400 dark:text-rose-300 px-1 py-0.5 rounded-sm bg-white/60 dark:bg-zinc-900/60">{{ item.label }}</span>
          </button>

          <!-- ── Slides card ────────────────────────────────── -->
          <button v-else-if="item.type === 'slides'" class="relative aspect-square bg-amber-100/20 dark:bg-amber-900/10 group flex flex-col items-center justify-center gap-2 p-3 focus:outline-none hover:shadow-md transition-shadow border border-transparent hover:border-amber-100 dark:hover:border-amber-500/10" @click="openPreview(item)">
            <Icon name="heroicons:computer-desktop" class="w-5 h-5 text-amber-300 dark:text-amber-300/50" />
            <p class="text-[0.57rem] font-mono text-gray-600 dark:text-zinc-400 line-clamp-4 text-center leading-snug w-full group-hover:scale-105 transition-transform duration-300">{{ item.title }}</p>
            <span class="absolute top-1.5 right-1.5 font-mono text-[0.48rem] border border-amber-100 dark:border-amber-300/20 text-amber-400 dark:text-amber-300 px-1 py-0.5 rounded-sm bg-white/60 dark:bg-zinc-900/60">{{ item.label }}</span>
          </button>

          <!-- ── Link card ──────────────────────────────────── -->
          <button v-else-if="item.type === 'link'" class="relative aspect-square bg-sky-100/20 dark:bg-sky-900/10 group flex flex-col items-center justify-center gap-2 p-3 focus:outline-none hover:shadow-md transition-shadow border border-transparent hover:border-sky-100 dark:hover:border-sky-500/10" @click="openPreview(item)">
            <div class="flex flex-col items-center gap-0.5 mb-0.5">
              <img
                v-if="item.domain"
                :src="`https://www.google.com/s2/favicons?domain=${item.domain}&sz=32`"
                :alt="item.domain" class="w-4 h-4 rounded" data-no-fade loading="lazy"
              />
              <p v-if="item.domain" class="text-[0.5rem] font-mono text-gray-400 dark:text-zinc-500 truncate max-w-full">{{ item.domain }}</p>
            </div>
            <p class="text-[0.57rem] font-mono text-gray-600 dark:text-zinc-400 line-clamp-3 text-center leading-snug w-full group-hover:scale-105 transition-transform duration-300">{{ item.title }}</p>
            <span class="absolute top-1.5 right-1.5 font-mono text-[0.48rem] border border-slate-300 dark:border-zinc-600 text-slate-500 dark:text-zinc-400 px-1 py-0.5 rounded-sm bg-white/60 dark:bg-zinc-900/60">{{ item.label }}</span>
          </button>

        </template>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between mt-8">
        <button
          :disabled="currentPage <= 1"
          class="font-mono text-[0.75rem] text-gray-500 dark:text-zinc-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          @click="goTo(currentPage - 1)"
        >← Prev</button>
        <span class="font-mono text-[0.7rem] text-gray-400 dark:text-zinc-500">{{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="currentPage >= totalPages"
          class="font-mono text-[0.75rem] text-gray-500 dark:text-zinc-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          @click="goTo(currentPage + 1)"
        >Next →</button>
      </div>
    </template>

    <!-- ── Unified preview overlay ─────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="previewItem"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          @click.self="closePreview"
        >
          <!-- Close -->
          <button
            class="absolute top-4 right-4 z-20 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
            @click="closePreview"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>

          <!-- Prev -->
          <button
            :disabled="previewIndex <= 0"
            class="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors p-2"
            aria-label="Previous"
            @click="prevPreview"
          >
            <Icon name="heroicons:chevron-left" class="w-8 h-8" />
          </button>

          <!-- Content — fades on navigation -->
          <Transition name="lb-slide" mode="out-in">

            <!-- image / poster: full bleed on dark bg -->
            <img
              v-if="previewItem.type === 'image' || previewItem.type === 'poster'"
              :key="previewIndex"
              :src="previewItem.src"
              :alt="previewItem.alt"
              class="max-h-[calc(100vh-9rem)] max-w-[calc(100%-7rem)] object-contain rounded shadow-2xl"
              data-no-fade
            />

            <!-- pdf / slides: floating iframe, no surrounding panel -->
            <iframe
              v-else-if="previewItem.type === 'pdf' || previewItem.type === 'slides'"
              :key="previewIndex"
              :src="previewItem.src"
              :title="previewItem.title ?? 'Preview'"
              class="rounded-xl border-0 shadow-2xl bg-white"
              :style="previewSize
                ? { width: previewSize.width, height: previewSize.height }
                : { width: 'calc(100% - 7rem)', height: 'calc(100vh - 8rem)' }"
            />

            <!-- link: screenshot card -->
            <div
              v-else
              :key="previewIndex"
              class="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden w-full max-w-md"
            >
              <!-- Screenshot area -->
              <div class="relative aspect-video bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                <!-- Shimmer skeleton while loading -->
                <div
                  class="absolute inset-0 skeleton transition-opacity duration-300"
                  :class="screenshotState === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'"
                />
                <!-- Screenshot image -->
                <img
                  v-if="screenshotState !== 'error'"
                  :src="`https://image.thum.io/get/width/800/${previewItem.src}`"
                  class="w-full h-full object-cover transition-opacity duration-500"
                  :class="screenshotState === 'loaded' ? 'opacity-100' : 'opacity-0'"
                  data-no-fade
                  @load="screenshotState = 'loaded'"
                  @error="screenshotState = 'error'"
                />
                <!-- Fallback when screenshot unavailable -->
                <div v-if="screenshotState === 'error'" class="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <img
                    v-if="previewItem.domain"
                    :src="`https://www.google.com/s2/favicons?domain=${previewItem.domain}&sz=64`"
                    class="w-10 h-10 rounded-lg opacity-50"
                    data-no-fade
                  />
                  <span class="font-mono text-[0.6rem] text-gray-400 dark:text-zinc-500">Preview unavailable</span>
                </div>
              </div>
              <!-- Card info -->
              <div class="px-5 py-4 flex flex-col gap-2.5">
                <div v-if="previewItem.domain" class="flex items-center gap-1.5">
                  <img
                    :src="`https://www.google.com/s2/favicons?domain=${previewItem.domain}&sz=32`"
                    class="w-4 h-4 rounded shrink-0"
                    data-no-fade
                  />
                  <span class="font-mono text-[0.65rem] text-gray-400 dark:text-zinc-500">{{ previewItem.domain }}</span>
                </div>
                <p class="font-mono text-[0.8rem] text-gray-700 dark:text-zinc-200 leading-snug">{{ previewItem.title }}</p>
                <a
                  :href="previewItem.src"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline self-start mt-0.5"
                >Open in new tab <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3" /></a>
              </div>
            </div>

          </Transition>

          <!-- Next -->
          <button
            :disabled="previewIndex >= mediaItems.length - 1"
            class="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors p-2"
            aria-label="Next"
            @click="nextPreview"
          >
            <Icon name="heroicons:chevron-right" class="w-8 h-8" />
          </button>

          <!-- Bottom info bar -->
          <div class="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none z-10">
            <p
              v-if="(previewItem.type === 'image' || previewItem.type === 'poster') && previewItem.alt"
              class="text-white/80 text-sm font-mono text-center px-20 line-clamp-2"
            >{{ previewItem.alt }}</p>
            <div class="flex items-center gap-3 pointer-events-auto">
              <NuxtLink
                v-if="previewItem.articlePath"
                :to="previewItem.articlePath"
                class="text-white/50 hover:text-white text-[0.7rem] font-mono underline underline-offset-2 transition-colors"
                @click="closePreview"
              >{{ previewItem.date }} →</NuxtLink>
              <a
                v-else-if="previewItem.type === 'pdf' || previewItem.type === 'slides'"
                :href="previewItem.src"
                target="_blank"
                rel="noopener"
                class="text-white/40 hover:text-white/80 text-[0.65rem] font-mono underline underline-offset-2 transition-colors"
              >Open →</a>
              <span class="text-white/30 text-[0.65rem] font-mono">{{ previewIndex + 1 }} / {{ mediaItems.length }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Fast, high-contrast shimmer replacing Tailwind's slow animate-pulse */
.skeleton {
  background: linear-gradient(90deg, #d1d5db 25%, #f9fafb 50%, #d1d5db 75%);
  background-size: 200% 100%;
  animation: shimmer 2.0s ease-in-out infinite;
}

:global(.dark .skeleton) {
  background: linear-gradient(90deg, #27272a 25%, #52525b 50%, #27272a 75%);
  background-size: 200% 100%;
}

.lb-slide-enter-active,
.lb-slide-leave-active { transition: opacity 0.12s ease; }
.lb-slide-enter-from,
.lb-slide-leave-to    { opacity: 0; }
</style>
