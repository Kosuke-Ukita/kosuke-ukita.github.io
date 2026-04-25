<script setup lang="ts">
import { profile } from '~/data/profile'
import { news } from '~/data/news'
import { publications } from '~/data/publications'
import { awards } from '~/data/awards'
import { grants } from '~/data/grants'
import { others } from '~/data/others'

const highlightAuthor = (authors: string) =>
  authors
    .replace(/Kosuke Ukita/g, `<strong>Kosuke Ukita</strong>`)
    .replace(/浮田嵩祐/g, `<strong>浮田嵩祐</strong>`)

// Map link name → icon (falls back to data icon, then generic)
const linkIcon = (name: string, dataIcon?: string): string => {
  const map: Record<string, string> = {
    PDF:    'heroicons:document-text',
    Code:   'heroicons:code-bracket-square',
    Page:   'heroicons:arrow-top-right-on-square',
    Arxiv:  'heroicons:document-magnifying-glass',
    Slides: 'heroicons:presentation-chart-bar',
    Video:  'heroicons:video-camera',
    Demo:   'heroicons:play-circle',
    Poster: 'heroicons:photo',
  }
  return map[name] || dataIcon || 'heroicons:link'
}

const researchInterests = others.find(o => o.category === 'Research Interests')?.items ?? []
const recentNews = news.slice(0, 5)
const selectedPubs = publications.slice(0, 3)
const recentGrants = grants.slice(0, 5)
const recentAwards = awards.slice(0, 5)
</script>

<template>
  <div class="space-y-11">

    <!-- Brief bio -->
    <section>
      <p class="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">{{ profile.bio }}</p>
    </section>

    <!-- News -->
    <section>
      <h2 class="section-title">News</h2>
      <div class="space-y-3.5">
        <div
          v-for="(item, i) in recentNews"
          :key="i"
          class="flex gap-4 sm:gap-6 text-sm leading-relaxed"
        >
          <span class="font-mono text-gray-400 dark:text-zinc-500 shrink-0 w-[4.5rem] text-[0.72rem] pt-0.5">{{ item.date }}</span>
          <span class="text-gray-700 dark:text-zinc-300">{{ item.content }}</span>
        </div>
      </div>
      <div class="mt-5">
        <NuxtLink to="/news" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">
          All news →
        </NuxtLink>
      </div>
    </section>

    <!-- Selected Publications -->
    <section>
      <h2 class="section-title">Selected Publications</h2>
      <ol class="space-y-7">
        <li v-for="(paper, i) in selectedPubs" :key="i" class="flex gap-1">
          <span class="pub-number">[{{ i + 1 }}]</span>

          <div class="min-w-0 flex-1">
            <!-- Title -->
            <p class="pub-title text-sm leading-snug">{{ paper.title }}</p>

            <!-- Authors -->
            <p class="pub-authors" v-html="highlightAuthor(paper.authors)" />

            <!-- Venue -->
            <p class="pub-venue">
              {{ paper.venue }}<span v-if="paper.date">, {{ paper.date }}</span>
              <span v-if="paper.location" class="not-italic text-gray-400 dark:text-zinc-500"> &middot; {{ paper.location }}</span>
            </p>

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
            </div>
          </div>
        </li>
      </ol>
      <div class="mt-6">
        <NuxtLink to="/publications" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">
          All publications →
        </NuxtLink>
      </div>
    </section>

    <!-- Grants -->
    <section v-if="recentGrants.length">
      <h2 class="section-title">Grants</h2>
      <ul class="space-y-4">
        <li v-for="(grant, i) in recentGrants" :key="i" class="flex gap-2 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div>
            <a :href="grant.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary transition-colors">
              {{ grant.name }}
            </a>
            <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 mt-0.5 font-mono">{{ grant.organization }} · {{ grant.year }}</p>
          </div>
        </li>
      </ul>
      <div class="mt-5">
        <a href="/cv#grants" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">
          All grants →
        </a>
      </div>
    </section>

    <!-- Awards -->
    <section v-if="recentAwards.length">
      <h2 class="section-title">Awards</h2>
      <ul class="space-y-4">
        <li v-for="(award, i) in recentAwards" :key="i" class="flex gap-2 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div>
            <a :href="award.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary transition-colors">
              {{ award.title }}
            </a>
            <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 mt-0.5 font-mono">{{ award.organization }} · {{ award.year }}</p>
          </div>
        </li>
      </ul>
      <div class="mt-5">
        <a href="/cv#awards" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">
          All awards →
        </a>
      </div>
    </section>

    <!-- Research Interests -->
    <section v-if="researchInterests.length">
      <h2 class="section-title">Research Interests</h2>
      <ul class="space-y-1.5">
        <li
          v-for="interest in researchInterests"
          :key="interest"
          class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-zinc-300"
        >
          <span class="text-primary shrink-0 select-none mt-px">—</span>
          <span class="font-mono">{{ interest }}</span>
        </li>
      </ul>
    </section>

  </div>
</template>
