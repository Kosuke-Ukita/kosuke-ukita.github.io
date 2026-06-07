<script setup lang="ts">
useHead({ title: 'CV' })

import { profile, others } from '~/assets/data'

const { isJp } = useLocale()

const wrap = ref(false)

const cvPdf = computed(() => isJp.value ? '/assets/cv/jp.pdf' : '/assets/cv/en.pdf')
const profileName = computed(() => isJp.value ? profile.namejp : profile.name)
const profileGrade = computed(() => isJp.value ? profile.gradejp : profile.grade)
const profileAffiliation = computed(() => isJp.value ? profile.affiliationjp : profile.affiliation)

const skillGroups = others.filter(o => o.category !== 'Research Interests')
</script>

<template>
  <div class="space-y-10">
    <div class="flex items-start justify-between gap-4 pb-6 border-b border-gray-100 dark:border-zinc-800">
      <div class="space-y-0.5 min-w-0">
        <h1 class="font-mono font-bold text-gray-900 dark:text-zinc-100 text-xl tracking-tight">{{ profileName }}</h1>
        <p class="text-sm text-primary font-medium">{{ profileGrade }}</p>
        <p class="text-sm text-gray-600 dark:text-zinc-400">{{ profileAffiliation }}</p>
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] text-gray-500 dark:text-zinc-400 pt-1.5 font-mono">
          <span class="break-all">{{ profile.email }}</span>
          <a :href="profile.socials.find(s => s.name === 'GitHub')?.url"         target="_blank" rel="noopener" class="hover:text-primary shrink-0">GitHub</a>
          <a :href="profile.socials.find(s => s.name === 'Google Scholar')?.url" target="_blank" rel="noopener" class="hover:text-primary shrink-0">Scholar</a>
          <a :href="profile.socials.find(s => s.name === 'ORCID')?.url"          target="_blank" rel="noopener" class="hover:text-primary shrink-0">ORCID</a>
        </div>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <button title="Toggle line wrap"
          class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
          :class="wrap ? 'bg-primary' : 'bg-gray-200 dark:bg-zinc-600'"
          @click="wrap = !wrap"
        >
          <span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out" :class="wrap ? 'translate-x-4' : 'translate-x-0'"/>
        </button>
        <a :href="cvPdf" target="_blank"
          class="font-mono text-[0.72rem] text-gray-500 dark:text-zinc-400 hover:text-primary border border-gray-200 dark:border-zinc-700 hover:border-primary/30 px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap inline-flex items-center gap-1"
        >PDF</a>
      </div>
    </div>

    <section>
      <h2 class="section-title">Education</h2>
      <EducationSection :wrap="wrap" />
    </section>

    <section>
      <h2 class="section-title">Work Experience</h2>
      <ExperienceSection :wrap="wrap" />
    </section>

    <section>
      <h2 class="section-title">Publications</h2>
      <PublicationsSection :wrap="wrap" />
    </section>

    <section id="grants">
      <h2 class="section-title">Grants</h2>
      <GrantsSection :wrap="wrap" />
    </section>

    <section id="awards">
      <h2 class="section-title">Awards</h2>
      <AwardsSection :wrap="wrap" />
    </section>

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
