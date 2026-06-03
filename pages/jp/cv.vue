<script setup lang="ts">
import { profile, publications, awards_jp, grants_jp, education_jp, experience_jp, others } from '~/assets/data'

useHead({ title: 'CV' })

const wrap = ref(false)

const highlightAuthor = (authors: string) =>
  authors
    .replace(/Kosuke Ukita/g, `<strong>Kosuke Ukita</strong>`)
    .replace(/浮田嵩祐/g, `<strong>浮田嵩祐</strong>`)

const skillGroups = others.filter(o => o.category !== 'Research Interests')

const linkIcon = (name: string, dataIcon?: string): string => {
  const map: Record<string, string> = {
    PDF:    'fa6-regular:file-pdf',
    Code:   'fa6-solid:code',
    Page:   'fa7-solid:arrow-up-right-from-square',
    Arxiv:  'academicons:arxiv',
    Cite:   'fa7-solid:quote-right',
    Slides: 'fa7-solid:chalkboard',
    Poster: 'fa6-regular:file-image',
  }
  return map[name] || dataIcon || 'heroicons:link'
}

const handleCardWheel = (e: WheelEvent) => {
  if (wrap.value) return
  e.preventDefault()
  const el = e.currentTarget as HTMLElement
  el.scrollLeft += e.deltaY + e.deltaX
}
</script>

<template>
  <div class="space-y-10">
    <!-- ── Header ─────────────────────────────────────────────────────────── -->
    <div class="flex items-start justify-between gap-4 pb-6 border-b border-gray-100 dark:border-zinc-800">
      <div class="space-y-0.5 min-w-0">
        <h1 class="font-mono font-bold text-gray-900 dark:text-zinc-100 text-xl tracking-tight">{{ profile.namejp }}</h1>
        <p class="text-sm text-primary font-medium">{{ profile.gradejp }}</p>
        <p class="text-sm text-gray-600 dark:text-zinc-400">{{ profile.affiliationjp }}</p>
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] text-gray-500 dark:text-zinc-400 pt-1.5 font-mono">
          <span class="break-all">{{ profile.email }}</span>
          <a :href="profile.socials.find(s => s.name === 'GitHub')?.url"        target="_blank" rel="noopener" class="hover:text-primary shrink-0">GitHub</a>
          <a :href="profile.socials.find(s => s.name === 'Google Scholar')?.url" target="_blank" rel="noopener" class="hover:text-primary shrink-0">Scholar</a>
          <a :href="profile.socials.find(s => s.name === 'ORCID')?.url"         target="_blank" rel="noopener" class="hover:text-primary shrink-0">ORCID</a>
        </div>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <!-- Apple-style toggle: OFF = scroll, ON = wrap -->
        <button
          @click="wrap = !wrap"
          title="Toggle line wrap"
          class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
          :class="wrap ? 'bg-primary' : 'bg-gray-200 dark:bg-zinc-600'"
        >
          <span
            class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
            :class="wrap ? 'translate-x-4' : 'translate-x-0'"
          />
        </button>
        <a
          href="/assets/cv-jp.pdf" target="_blank"
          class="font-mono text-[0.72rem] text-gray-500 dark:text-zinc-400 hover:text-primary border border-gray-200 dark:border-zinc-700 hover:border-primary/30 px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap inline-flex items-center gap-1"
        > PDF </a>
      </div>
    </div>

    <!-- ── Education ──────────────────────────────────────────────────────── -->
    <section>
      <h2 class="section-title">Education</h2>
      <div class="space-y-5">
        <div v-for="(edu, i) in education_jp" :key="i" class="relative flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
          <span class="font-mono text-gray-500 dark:text-zinc-400 text-[0.72rem] sm:shrink-0 sm:w-40 sm:pt-0.5">{{ edu.year }}</span>
          <div
            class="min-w-0 flex-1"
            :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
            @wheel="handleCardWheel"
          >
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p class="font-semibold text-gray-900 dark:text-zinc-100" :class="{ 'whitespace-nowrap': !wrap }">{{ edu.degree }}</p>
              <p class="text-gray-700 dark:text-zinc-300 text-xs mt-0.5" :class="{ 'whitespace-nowrap': !wrap }">{{ edu.school }}</p>
              <p v-if="edu.depart" class="text-[0.7rem] text-gray-500 dark:text-zinc-400 mt-0.5 pl-0.5 leading-snug" :class="!wrap ? 'whitespace-nowrap' : 'whitespace-pre-line'">{{ edu.depart }}</p>
              <p v-if="edu.thesis" class="font-mono text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-1 leading-snug underline" :class="{ 'whitespace-nowrap': !wrap }">{{ edu.thesis }}</p>
              <p v-if="edu.description" class="text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-0.5 font-mono" :class="{ 'whitespace-nowrap': !wrap }">{{ edu.description }}</p>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </div>
      </div>
    </section>

    <!-- ── Work Experience ────────────────────────────────────────────────── -->
    <section>
      <h2 class="section-title">Work Experience</h2>
      <div class="space-y-5">
        <div v-for="(exp, i) in experience_jp" :key="i" class="relative flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
          <span class="font-mono text-gray-500 dark:text-zinc-400 text-[0.72rem] sm:shrink-0 sm:w-40 sm:pt-0.5">{{ exp.year }}</span>
          <div
            class="min-w-0 flex-1"
            :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
            @wheel="handleCardWheel"
          >
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p class="font-semibold text-gray-900 dark:text-zinc-100" :class="{ 'whitespace-nowrap': !wrap }">{{ exp.name }}</p>
              <p v-for="(d, j) in exp.descriptions" :key="j" class="text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-0.5" :class="{ 'whitespace-nowrap': !wrap }">{{ d }}</p>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </div>
      </div>
    </section>

    <!-- ── Publications ───────────────────────────────────────────────────── -->
    <section>
      <h2 class="section-title">Publications</h2>
      <ol class="space-y-6">
        <li v-for="(paper, i) in publications" :key="i" class="relative flex gap-1 p-2 hover:shadow-md dark:shadow-white/10 transition-shadow">
          <span class="pub-number">[{{ i + 1 }}]</span>
          <div
            class="min-w-0 flex-1"
            :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
            @wheel="handleCardWheel"
          >
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p class="pub-title text-sm" :class="{ 'whitespace-nowrap': !wrap }">{{ paper.title }}</p>
              <p class="pub-authors" :class="{ 'whitespace-nowrap': !wrap }" v-html="highlightAuthor(paper.authors)" />
              <p class="pub-venue" :class="{ 'whitespace-nowrap': !wrap }">{{ paper.venue }}</p>
              <div :class="{ 'whitespace-nowrap': !wrap }">
                <span v-if="paper.date" class="text-xs text-gray-400 dark:text-zinc-500">{{ paper.date }}</span>
                <span v-if="paper.location" class="text-xs text-gray-400 dark:text-zinc-500"> &middot; {{ paper.location }}</span>
              </div>
              <div class="flex items-center gap-2 mt-1.5" :class="!wrap ? 'flex-nowrap' : 'flex-wrap'">
                <span
                  v-if="paper.type"
                  class="font-mono text-[0.65rem] border px-1.5 py-0.5 rounded-sm shrink-0"
                  :class="['Spotlight','Oral'].includes(paper.type)
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
              </div>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ol>
    </section>

    <!-- ── Grants ─────────────────────────────────────────────────────────── -->
    <section id="grants">
      <h2 class="section-title">Grants</h2>
      <ul class="space-y-4">
        <li v-for="(grant, i) in grants_jp" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div
            class="min-w-0 flex-1"
            :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
            @wheel="handleCardWheel"
          >
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p :class="{ 'whitespace-nowrap': !wrap }"><a :href="grant.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 dark:hover:text-primary hover:text-primary transition-colors">{{ grant.name }}</a></p>
              <p :class="{ 'whitespace-nowrap': !wrap }"><a :href="grant.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ grant.organization }}</a></p>
              <p class="text-[0.7rem] text-gray-400 dark:text-zinc-500 font-mono" :class="{ 'whitespace-nowrap': !wrap }">{{ grant.year }} · {{ grant.price }}</p>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ul>
    </section>

    <!-- ── Awards ─────────────────────────────────────────────────────────── -->
    <section id="awards">
      <h2 class="section-title">Awards</h2>
      <ul class="space-y-4">
        <li v-for="(award, i) in awards_jp" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div
            class="min-w-0 flex-1"
            :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
            @wheel="handleCardWheel"
          >
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p :class="{ 'whitespace-nowrap': !wrap }"><a :href="award.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 dark:hover:text-primary hover:text-primary transition-colors">{{ award.title }}</a></p>
              <p :class="{ 'whitespace-nowrap': !wrap }"><a :href="award.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ award.organization }}</a></p>
              <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono" :class="{ 'whitespace-nowrap': !wrap }">{{ award.year }}</p>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
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
