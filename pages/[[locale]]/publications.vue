<script setup lang="ts">
useHead({ title: 'Publications' })

const { highlightAuthor, linkIcon } = usePubUtils()
const { handleWheel } = useHScroll()
const { hoveredIndex, startHover, endHover } = usePubHover()
const { cite, copied, open: openModal, close: closeModal, copy: copyCite } = useBibtexModal()
const groupedPublications = useGroupedPublications()
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl tracking-tight mb-10">Publications</h1>

    <div v-for="group in groupedPublications" :key="group.year" class="mb-12">
      <h2 class="font-mono text-sm font-semibold text-primary pb-2 mb-7 border-b border-gray-100 dark:border-zinc-800">{{ group.year }}</h2>

      <ol class="space-y-8">
        <li
          v-for="paper in group.items" :key="paper.globalIndex" class="relative flex gap-1 p-2 hover:shadow-md dark:shadow-white/10 transition-shadow"
          @mouseenter="startHover(paper.globalIndex)"
          @mouseleave="endHover"
        >
          <span class="pub-number shrink-0">[{{ paper.globalIndex }}]</span>

          <div class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" @wheel="handleWheel">
            <div class="min-w-max pr-12">
              <p class="pub-title text-sm leading-snug whitespace-nowrap">
                <a v-if="paper.links?.find(l => l.name === 'Page')"
                  :href="paper.links.find(l => l.name === 'Page')!.url" target="_blank" rel="noopener"
                  class="hover:text-primary transition-colors"
                >{{ paper.title }}</a>
                <span v-else>{{ paper.title }}</span>
              </p>

              <p class="pub-authors whitespace-nowrap" v-html="highlightAuthor(paper.authors)" />
              <p class="pub-venue whitespace-nowrap">{{ paper.venue }}</p>

              <div class="whitespace-nowrap">
                <span v-if="paper.date" class="text-xs text-gray-400 dark:text-zinc-500">{{ paper.date }}</span>
                <span v-if="paper.location" class="text-xs text-gray-400 dark:text-zinc-500"> &middot; {{ paper.location }}</span>
              </div>

              <div class="flex flex-nowrap items-center gap-2 mt-2">
                <span
                  class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm shrink-0"
                  :class="paper.note === 'Refereed'
                    ? 'text-primary border-primary/40'
                    : 'text-gray-400 dark:text-zinc-500 border-gray-200 dark:border-zinc-700'"
                >{{ paper.note === 'Refereed' ? 'refereed' : 'non-refereed' }}</span>

                <span v-if="paper.type"
                  class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm shrink-0"
                  :class="paper.type.includes('Spotlight') || paper.type.includes('Oral')
                    ? 'text-primary border-primary/40'
                    : paper.type.includes('Poster')
                      ? 'text-gray-600 dark:text-zinc-400 border-gray-400 dark:border-zinc-500'
                      : 'text-gray-400 dark:text-zinc-600 border-gray-200 dark:border-zinc-700'"
                >{{ paper.type }}</span>
                
                <a v-for="link in paper.links"
                  :key="link.name" :href="link.url" target="_blank" rel="noopener" :title="link.name"
                  class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors p-0.5 rounded shrink-0"
                >
                  <Icon :name="linkIcon(link.name, link.icon)" class="w-[0.72rem] h-[0.72rem]" />
                </a>

                <button v-if="paper.cite"
                  title="BibTeX"
                  class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors p-0.5 rounded cursor-pointer shrink-0"
                  @click="openModal(paper.cite)"
                >
                  <Icon :name="linkIcon('Cite')" class="w-[0.72rem] h-[0.72rem]" />
                </button>
              </div>
            </div>
          </div>

          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />

          <Transition name="fade">
            <div v-if="hoveredIndex === paper.globalIndex" class="absolute left-0 top-full z-20 mt-1 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded shadow-xl p-3 space-y-1.5">
              <p class="text-[0.78rem] font-semibold text-gray-900 dark:text-zinc-100 leading-snug">{{ paper.title }}</p>
              <p class="text-[0.72rem] text-gray-500 dark:text-zinc-400 leading-relaxed [&_strong]:underline [&_strong]:underline-offset-2" v-html="highlightAuthor(paper.authors)" />
              <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 italic leading-snug">{{ paper.venue }}</p>
            </div>
          </Transition>
        </li>
      </ol>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cite"
        class="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-6"
        @click.self="closeModal"
      >
        <div class="w-full max-w-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded shadow-2xl">
          <div class="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-zinc-800">
            <span class="font-mono text-[0.7rem] text-gray-400 dark:text-zinc-500 select-none">BibTeX</span>
            <div class="flex items-center gap-1">
              <button :title="copied ? 'Copied!' : 'Copy'"
                class="transition-colors p-1 rounded"
                :class="copied ? 'text-primary' : 'text-gray-400 dark:text-zinc-500 hover:text-primary'"
                @click="copyCite"
              >
                <Icon :name="copied ? 'fa7-solid:check' : 'fa6-regular:copy'" class="w-3.5 h-3.5" />
              </button>
              <button title="Close"
                class="text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors p-1 rounded"
                @click="closeModal"
              >
                <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <pre class="bibtex-pre font-mono text-[0.7rem] text-gray-600 dark:text-zinc-400 p-4 overflow-auto max-h-72 whitespace-pre leading-relaxed [scrollbar-width:none]" @wheel="handleWheel"
          >{{ cite.trim() }}</pre>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
