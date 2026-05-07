<script setup lang="ts">
import { publications } from '~/data/publications'

useHead({ title: 'Publications' })

const highlightAuthor = (authors: string) =>
  authors
    .replace(/Kosuke Ukita/g, `<strong>Kosuke Ukita</strong>`)
    .replace(/浮田嵩祐/g, `<strong>浮田嵩祐</strong>`)

// Extract year from date strings like "June 2026", "October 2025", etc.
const extractYear = (date?: string) => date?.trim().split(/\s+/).pop() ?? '—'

// Map link name → icon (falls back to data icon, then generic)
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

const copiedIndex = ref<number | null>(null)
const copyCite = async (index: number, cite: string) => {
  await navigator.clipboard.writeText(cite)
  copiedIndex.value = index
  setTimeout(() => { copiedIndex.value = null }, 2000)
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

      <!-- Year header -->
      <h2 class="font-mono text-sm font-semibold text-primary pb-2 mb-7 border-b border-gray-100 dark:border-zinc-800">
        {{ group.year }}
      </h2>

      <ol class="space-y-8">
        <li v-for="paper in group.pubs" :key="paper.globalIndex" class="flex gap-1 p-2 hover:shadow-md dark:shadow-white/10 transition-shadow">
          <span class="pub-number">[{{ paper.globalIndex }}]</span>

          <div class="min-w-0 flex-1">
            <!-- Title -->
            <p class="pub-title text-sm leading-snug">{{ paper.title }}</p>

            <!-- Authors -->
            <p class="pub-authors" v-html="highlightAuthor(paper.authors)" />

            <!-- Venue -->
            <p class="pub-venue">{{ paper.venue }}</p>
            <span v-if="paper.date" class="text-xs text-gray-400 dark:text-zinc-500">{{ paper.date }}</span>
            <span v-if="paper.location" class="text-xs text-gray-400 dark:text-zinc-500"> &middot; {{ paper.location }}</span>

            <!-- Tags, refereed status, and link icons -->
            <div class="flex flex-wrap items-center gap-2 mt-2">
              <!-- Presentation type badge -->
              <span
                v-if="paper.type"
                class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm"
                :class="['Spotlight', 'Oral'].includes(paper.type)
                  ? 'text-primary border-primary/40'
                  : 'text-gray-500 dark:text-zinc-400 border-gray-300 dark:border-zinc-600'"
              >{{ paper.type }}</span>

              <!-- Refereed status (always shown) -->
              <span
                class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm"
                :class="paper.note === 'Refeered'
                  ? 'text-gray-700 dark:text-zinc-300 border-gray-400 dark:border-zinc-500'
                  : 'text-gray-400 dark:text-zinc-500 border-gray-200 dark:border-zinc-700'"
              >{{ paper.note === 'Refeered' ? 'refereed' : 'non-refereed' }}</span>

              <!-- Link icons -->
              <a
                v-for="link in paper.links"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener"
                :title="link.name"
                class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors p-0.5 rounded"
              >
                <Icon :name="linkIcon(link.name, link.icon)" class="w-[1.05rem] h-[1.05rem]" />
              </a>

              <!-- BibTeX copy button -->
              <button
                v-if="paper.cite"
                @click="copyCite(paper.globalIndex, paper.cite)"
                :title="copiedIndex === paper.globalIndex ? 'Copied!' : 'BibTeX'"
                class="transition-colors p-0.5 rounded cursor-pointer"
                :class="copiedIndex === paper.globalIndex
                  ? 'text-primary'
                  : 'text-gray-500 dark:text-zinc-400 hover:text-primary'"
              >
                <Icon
                  :name="copiedIndex === paper.globalIndex ? 'fa7-solid:check' : linkIcon('Cite')"
                  class="w-[1.05rem] h-[1.05rem]"
                />
              </button>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
