<script setup lang="ts">
useHead({ title: 'CV' })

import { profile, publications, awards, awardsJp, grants, grantsJp, education, educationJp, experience, experienceJp, others } from '~/assets/data'

const { isJp } = useLocale()
const { highlightAuthor, linkIcon } = usePubUtils()
const { handleWheel: baseHandleWheel } = useHScroll()

const wrap = ref(false)
const handleCardWheel = (e: WheelEvent) => { if (!wrap.value) baseHandleWheel(e) }

const edu = computed(() => isJp.value ? educationJp : education)
const exp = computed(() => isJp.value ? experienceJp : experience)
const grantList = computed(() => isJp.value ? grantsJp : grants)
const awardList = computed(() => isJp.value ? awardsJp : awards)
const skillGroups = others.filter(o => o.category !== 'Research Interests')

const cvPdf = computed(() => isJp.value ? '/assets/cv-jp.pdf' : '/assets/cv.pdf')
const profileName = computed(() => isJp.value ? profile.namejp : profile.name)
const profileGrade = computed(() => isJp.value ? profile.gradejp : profile.grade)
const profileAffiliation = computed(() => isJp.value ? profile.affiliationjp : profile.affiliation)
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
      <div class="space-y-5">
        <div v-for="(item, i) in edu" :key="i" class="relative flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
          <span class="font-mono text-gray-500 dark:text-zinc-400 text-[0.72rem] sm:shrink-0 sm:w-40 sm:pt-0.5">{{ item.year }}</span>
          <div class="min-w-0 flex-1" :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''" @wheel="handleCardWheel">
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p class="font-semibold text-gray-900 dark:text-zinc-100" :class="{ 'whitespace-nowrap': !wrap }">{{ item.degree }}</p>
              <p class="text-gray-700 dark:text-zinc-300 text-xs mt-0.5" :class="{ 'whitespace-nowrap': !wrap }">{{ item.school }}</p>
              <p v-if="item.depart" class="text-[0.7rem] text-gray-500 dark:text-zinc-400 mt-0.5 pl-0.5 leading-snug" :class="!wrap ? 'whitespace-nowrap' : 'whitespace-pre-line'">{{ item.depart }}</p>
              <p v-if="item.thesis" class="font-mono text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-1 leading-snug underline" :class="{ 'whitespace-nowrap': !wrap }">{{ item.thesis }}</p>
              <p v-if="item.description" class="text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-0.5 font-mono" :class="{ 'whitespace-nowrap': !wrap }">{{ item.description }}</p>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </div>
      </div>
    </section>

    <section>
      <h2 class="section-title">Work Experience</h2>
      <div class="space-y-5">
        <div v-for="(item, i) in exp" :key="i" class="relative flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
          <span class="font-mono text-gray-500 dark:text-zinc-400 text-[0.72rem] sm:shrink-0 sm:w-40 sm:pt-0.5">{{ item.year }}</span>
          <div class="min-w-0 flex-1" :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''" @wheel="handleCardWheel">
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p class="font-semibold text-gray-900 dark:text-zinc-100" :class="{ 'whitespace-nowrap': !wrap }">{{ item.name }}</p>
              <p v-for="(d, j) in item.descriptions" :key="j" class="text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-0.5" :class="{ 'whitespace-nowrap': !wrap }">{{ d }}</p>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </div>
      </div>
    </section>

    <section>
      <h2 class="section-title">Publications</h2>
      <ol class="space-y-6">
        <li v-for="(paper, i) in publications" :key="i" class="relative flex gap-1 p-2 hover:shadow-md dark:shadow-white/10 transition-shadow">
          <span class="pub-number">[{{ i + 1 }}]</span>
          <div class="min-w-0 flex-1" :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''" @wheel="handleCardWheel">
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
              </div>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ol>
    </section>

    <section id="grants">
      <h2 class="section-title">Grants</h2>
      <ul class="space-y-4">
        <li v-for="(grant, i) in grantList" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div class="min-w-0 flex-1" :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''" @wheel="handleCardWheel">
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p :class="{ 'whitespace-nowrap': !wrap }"><a :href="grant.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ grant.name }}</a></p>
              <p :class="{ 'whitespace-nowrap': !wrap }"><a :href="grant.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ grant.organization }}</a></p>
              <p class="text-[0.7rem] text-gray-400 dark:text-zinc-500 font-mono" :class="{ 'whitespace-nowrap': !wrap }">{{ grant.year }} · {{ grant.price }}</p>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ul>
    </section>

    <section id="awards">
      <h2 class="section-title">Awards</h2>
      <ul class="space-y-4">
        <li v-for="(award, i) in awardList" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div class="min-w-0 flex-1" :class="!wrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''" @wheel="handleCardWheel">
            <div :class="!wrap ? 'min-w-max pr-12' : ''">
              <p :class="{ 'whitespace-nowrap': !wrap }"><a :href="award.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ award.title }}</a></p>
              <p :class="{ 'whitespace-nowrap': !wrap }"><a :href="award.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ award.organization }}</a></p>
              <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono" :class="{ 'whitespace-nowrap': !wrap }">{{ award.year }}</p>
            </div>
          </div>
          <div v-if="!wrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ul>
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
