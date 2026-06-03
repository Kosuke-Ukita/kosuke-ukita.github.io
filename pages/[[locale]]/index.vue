<script setup lang="ts">
useHead({ title: 'Home' })

import { profile, publications, awards, awardsJp, grants, grantsJp, others } from '~/assets/data'

const { isJp } = useLocale()
const { highlightAuthor, linkIcon } = usePubUtils()
const { handleWheel } = useHScroll()
const { hoveredIndex, startHover, endHover } = usePubHover()

const newsBase = computed(() => isJp.value ? '/jp/news' : '/news')
const pubsBase = computed(() => isJp.value ? '/jp/publications' : '/publications')
const grantsBase = computed(() => isJp.value ? '/jp/grants' : '/grants')
const awardsBase = computed(() => isJp.value ? '/jp/awards' : '/awards')

const researchInterests = others.find(o => o.category === 'Research Interests')?.items ?? []

const { data: recentNews } = await useAsyncData(
  () => `recent-news-${isJp.value ? 'jp' : 'en'}`,
  () => queryContent('news')
    .only(['date', 'content', 'contentjp', '_path'])
    .sort({ date: -1 })
    .limit(5)
    .find()
)

const selectedPubs = publications.slice(0, 3)
const recentGrants = computed(() => (isJp.value ? grantsJp : grants).slice(0, 5))
const recentAwards = computed(() => (isJp.value ? awardsJp : awards).slice(0, 5))

const newsSlug = (path: string) => path.split('/').pop() ?? ''
</script>

<template>
  <div class="space-y-11">
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl tracking-tight mb-10">Home</h1>

    <!-- Bio -->
    <section>
      <p class="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">{{ isJp ? profile.bio : profile.bioen }}</p>
    </section>

    <!-- News -->
    <section>
      <h2 class="section-title">News</h2>
      <div class="space-y-3.5">
        <div v-for="(item, i) in recentNews" :key="i" class="flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
          <span class="font-mono text-gray-400 dark:text-zinc-500 text-[0.72rem] sm:shrink-0 sm:w-[4.5rem] sm:pt-0.5">{{ item.date }}</span>
          <p class="text-gray-700 dark:text-zinc-300">
            <NuxtLink :to="`${newsBase}/${newsSlug(item._path)}`" class="hover:underline underline-offset-2">{{ isJp ? item.contentjp : item.content }}</NuxtLink>
          </p>
        </div>
      </div>
      <div class="mt-5">
        <NuxtLink :to="newsBase" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">All news →</NuxtLink>
      </div>
    </section>

    <!-- Publications -->
    <section>
      <h2 class="section-title">Selected Publications</h2>
      <ol class="space-y-7">
        <li v-for="(paper, i) in selectedPubs" :key="i" class="relative flex gap-1 p-2 hover:shadow-md dark:shadow-white/10 transition-shadow"
          @mouseenter="startHover(i)"
          @mouseleave="endHover"
        >
          <span class="pub-number shrink-0">[{{ i + 1 }}]</span>

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
                  :class="paper.refereed
                    ? 'text-primary border-primary/40'
                    : 'text-gray-400 dark:text-zinc-500 border-gray-200 dark:border-zinc-700'"
                >{{ paper.refereed ? 'Refereed' : 'Non-refereed' }}</span>

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
              </div>
            </div>
          </div>

          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />

          <Transition name="fade">
            <div v-if="hoveredIndex === i" class="absolute left-0 top-full z-20 mt-1 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded shadow-xl p-3 space-y-1.5">
              <p class="text-[0.78rem] font-semibold text-gray-900 dark:text-zinc-100 leading-snug">{{ paper.title }}</p>
              <p class="text-[0.72rem] text-gray-500 dark:text-zinc-400 leading-relaxed [&_strong]:underline [&_strong]:underline-offset-2" v-html="highlightAuthor(paper.authors)" />
              <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 italic leading-snug">{{ paper.venue }}</p>
            </div>
          </Transition>
        </li>
      </ol>
      <div class="mt-6">
        <NuxtLink :to="pubsBase" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">All publications →</NuxtLink>
      </div>
    </section>

    <!-- Grants -->
    <section v-if="recentGrants.length">
      <h2 class="section-title">Grants</h2>
      <ul class="space-y-4">
        <li v-for="(grant, i) in recentGrants" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" @wheel="handleWheel">
            <div class="min-w-max pr-12">
              <p class="whitespace-nowrap"><a :href="grant.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ grant.name }}</a></p>
              <p class="whitespace-nowrap"><a :href="grant.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ grant.organization }}</a></p>
              <p class="text-[0.7rem] text-gray-400 dark:text-zinc-500 font-mono whitespace-nowrap">{{ grant.year }} · {{ grant.price }}</p>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ul>
      <div class="mt-5">
        <NuxtLink :to="grantsBase" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">All grants →</NuxtLink>
      </div>
    </section>

    <!-- Awards -->
    <section v-if="recentAwards.length">
      <h2 class="section-title">Awards</h2>
      <ul class="space-y-4">
        <li v-for="(award, i) in recentAwards" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" @wheel="handleWheel">
            <div class="min-w-max pr-12">
              <p class="whitespace-nowrap"><a :href="award.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ award.title }}</a></p>
              <p class="whitespace-nowrap"><a :href="award.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ award.organization }}</a></p>
              <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono whitespace-nowrap">{{ award.year }}</p>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ul>
      <div class="mt-5">
        <NuxtLink :to="awardsBase" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">All awards →</NuxtLink>
      </div>
    </section>

    <!-- Research Interests -->
    <section v-if="researchInterests.length">
      <h2 class="section-title">Research Interests</h2>
      <ul class="space-y-1.5">
        <li v-for="interest in researchInterests" :key="interest" class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-zinc-300">
          <span class="text-primary shrink-0 select-none mt-px">—</span>
          <span class="font-mono">{{ interest }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
