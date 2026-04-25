<script setup lang="ts">
import { profile } from '~/data/profile'
import { publications } from '~/data/publications'
import { awards } from '~/data/awards'
import { grants } from '~/data/grants'
import { education } from '~/data/education'
import { experience } from '~/data/experience'
import { others } from '~/data/others'

useHead({ title: 'CV' })

const highlightAuthor = (authors: string) =>
  authors
    .replace(/Kosuke Ukita/g, `<strong>Kosuke Ukita</strong>`)
    .replace(/浮田嵩祐/g, `<strong>浮田嵩祐</strong>`)

const skillGroups = others.filter(o => o.category !== 'Research Interests')

const linkIcon = (name: string, dataIcon?: string): string => {
  const map: Record<string, string> = {
    PDF:    'heroicons:document-text',
    Code:   'heroicons:code-bracket-square',
    Page:   'heroicons:arrow-top-right-on-square',
    Arxiv:  'heroicons:document-magnifying-glass',
    Slides: 'heroicons:presentation-chart-bar',
  }
  return map[name] || dataIcon || 'heroicons:link'
}
</script>

<template>
  <div class="space-y-10">

    <!-- ── Header ─────────────────────────────────────────────────────────── -->
    <div class="flex items-start justify-between gap-4 pb-6 border-b border-gray-100 dark:border-zinc-800">
      <div class="space-y-0.5 min-w-0">
        <h1 class="font-mono font-bold text-gray-900 dark:text-zinc-100 text-xl tracking-tight">{{ profile.name }}</h1>
        <p class="text-sm text-primary font-medium">{{ profile.grade }}</p>
        <p class="text-sm text-gray-600 dark:text-zinc-400">{{ profile.affiliation }}</p>
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] text-gray-500 dark:text-zinc-400 pt-1.5 font-mono">
          <span class="break-all">{{ profile.email }}</span>
          <a :href="profile.socials.find(s => s.name === 'GitHub')?.url"        target="_blank" rel="noopener" class="hover:text-primary shrink-0">GitHub</a>
          <a :href="profile.socials.find(s => s.name === 'Google Scholar')?.url" target="_blank" rel="noopener" class="hover:text-primary shrink-0">Scholar</a>
          <a :href="profile.socials.find(s => s.name === 'ORCID')?.url"         target="_blank" rel="noopener" class="hover:text-primary shrink-0">ORCID</a>
        </div>
      </div>
      <a
        href="/assets/CV-KosukeUkita.pdf" target="_blank"
        class="shrink-0 font-mono text-[0.72rem] text-gray-500 dark:text-zinc-400 hover:text-primary border border-gray-200 dark:border-zinc-700 hover:border-primary/30 px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap inline-flex items-center gap-1"
      > PDF </a>
    </div>

    <!-- ── Education ──────────────────────────────────────────────────────── -->
    <section>
      <h2 class="section-title">Education</h2>
      <div class="space-y-5">
        <div v-for="(edu, i) in education" :key="i" class="flex flex-col sm:flex-row gap-0.5 sm:gap-6 text-sm">
          <span class="font-mono text-gray-500 dark:text-zinc-400 text-[0.72rem] sm:shrink-0 sm:w-44 sm:pt-0.5">{{ edu.year }}</span>
          <div>
            <p class="font-semibold text-gray-900 dark:text-zinc-100">{{ edu.degree }}</p>
            <p class="text-gray-700 dark:text-zinc-300 text-xs mt-0.5">{{ edu.school }}</p>
            <p v-if="edu.depart" class="text-[0.7rem] text-gray-500 dark:text-zinc-400 mt-0.5 pl-0.5 leading-snug whitespace-pre-line">{{ edu.depart }}</p>
            <p v-if="edu.thesis" class="font-mono text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-1 leading-snug">{{ edu.thesis }}</p>
            <p v-if="edu.description" class="text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-0.5 font-mono">{{ edu.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Work Experience ────────────────────────────────────────────────── -->
    <section>
      <h2 class="section-title">Work Experience</h2>
      <div class="space-y-5">
        <div v-for="(exp, i) in experience" :key="i" class="flex flex-col sm:flex-row gap-0.5 sm:gap-6 text-sm">
          <span class="font-mono text-gray-500 dark:text-zinc-400 text-[0.72rem] sm:shrink-0 sm:w-44 sm:pt-0.5">{{ exp.year }}</span>
          <div>
            <p class="font-semibold text-gray-900 dark:text-zinc-100">{{ exp.name }}</p>
            <p v-for="(d, j) in exp.descriptions" :key="j" class="text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-0.5">{{ d }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Publications ───────────────────────────────────────────────────── -->
    <section>
      <h2 class="section-title">Publications</h2>
      <ol class="space-y-6">
        <li v-for="(paper, i) in publications" :key="i" class="flex gap-1 p-2 hover:shadow-md dark:shadow-white/10 transition-shadow">
          <span class="pub-number">[{{ i + 1 }}]</span>
          <div class="min-w-0 flex-1">
            <p class="pub-title text-sm">{{ paper.title }}</p>
            <p class="pub-authors" v-html="highlightAuthor(paper.authors)" />
            <p class="pub-venue">{{ paper.venue }}</p>
            <span v-if="paper.date" class="text-xs text-gray-400 dark:text-zinc-500">{{ paper.date }}</span>
            <span v-if="paper.location" class="text-xs text-gray-400 dark:text-zinc-500"> &middot; {{ paper.location }}</span>
            <div class="flex flex-wrap items-center gap-2 mt-1.5">
              <span
                v-if="paper.type"
                class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm"
                :class="['Spotlight','Oral'].includes(paper.type)
                  ? 'text-primary border-primary/40'
                  : 'text-gray-500 dark:text-zinc-400 border-gray-300 dark:border-zinc-600'"
              >{{ paper.type }}</span>
              <span
                class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm"
                :class="paper.note === 'Refeered'
                  ? 'text-gray-700 dark:text-zinc-300 border-gray-400 dark:border-zinc-500'
                  : 'text-gray-400 dark:text-zinc-500 border-gray-200 dark:border-zinc-700'"
              >{{ paper.note === 'Refeered' ? 'refereed' : 'non-refereed' }}</span>
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
    </section>

    <!-- ── Grants ─────────────────────────────────────────────────────────── -->
    <section id="grants">
      <h2 class="section-title">Grants</h2>
      <ul class="space-y-4">
        <li v-for="(grant, i) in grants" :key="i" class="flex flex-col sm:flex-row gap-0.5 sm:gap-2 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div>
            <p><a :href="grant.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 dark:hover:text-primary hover:text-primary transition-colors">{{ grant.name }}</a></p>
            <p><a :href="grant.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ grant.organization }}</a></p>
            <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono">{{ grant.year }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- ── Awards ─────────────────────────────────────────────────────────── -->
    <section id="awards">
      <h2 class="section-title">Awards</h2>
      <ul class="space-y-4">
        <li v-for="(award, i) in awards" :key="i" class="flex flex-col sm:flex-row gap-0.5 sm:gap-2 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div>
            <a :href="award.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 dark:hover:text-primary hover:text-primary transition-colors">{{ award.title }}</a>
            <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono">{{ award.organization }}</p>
            <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono">{{ award.year }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- ── Skills ─────────────────────────────────────────────────────────── -->
    <section>
      <h2 class="section-title">Skills</h2>
      <div class="space-y-4">
        <div v-for="(group, i) in skillGroups" :key="i">
          <p class="font-mono text-[0.65rem] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-widest mb-1.5">{{ group.category }}</p>
          <p class="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">{{ group.items.join(' · ') }}</p>
        </div>
      </div>
    </section>

  </div>
</template>
