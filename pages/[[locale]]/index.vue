<script setup lang="ts">
useHead({ title: 'Home' })

import { profile, others } from '~/assets/data'

const { isJp } = useLocale()

const researchInterests = others.find(o => o.category === 'Research Interests')?.items ?? []
</script>

<template>
  <!-- mobile profile block -->
  <div class="md:hidden flex gap-5 items-start mb-12 pb-8 border-b border-gray-100 dark:border-zinc-800">
    <img :src="profile.photo" alt="Kosuke Ukita" class="w-[4.5rem] h-[4.5rem] object-cover rounded shrink-0" onerror="this.onerror=null; this.src='https://placehold.co/400x400?text=KU'"/>
    <div class="space-y-0.5">
      <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-[1rem] leading-tight tracking-tight">{{ profile.name }}</h1>
      <p class="text-xs text-gray-500 dark:text-zinc-400">{{ profile.namejp }}</p>
      <p class="text-xs text-primary font-medium mt-1">{{ profile.role }}</p>
      <p class="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">{{ profile.affiliation }}</p>
      <p class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">{{ profile.place }}</p>
      <div class="flex flex-wrap gap-2.5 mt-2">
        <a v-for="social in profile.socials.filter(s => ['GitHub','Google Scholar','ORCID','LinkedIn'].includes(s.name))"
          :key="social.name" :href="social.url" target="_blank" rel="noopener" :title="social.name"
          class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors"
        ><Icon :name="social.icon" class="w-3.5 h-3.5" /></a>
      </div>
      <a :href="`mailto:${profile.email}`" class="text-[0.7rem] text-gray-500 dark:text-zinc-400 hover:text-primary font-mono block mt-1 transition-colors">{{ profile.email }}</a>
    </div>
  </div>


  <div class="space-y-11">
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 tracking-tight">Home</h1>

    <section>
      <p class="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">{{ isJp ? profile.bio : profile.bioen }}</p>
    </section>

    <section>
      <h2 class="section-title">News</h2>
      <NewsSection :previewCount="5" />
    </section>

    <section>
      <h2 class="section-title">Selected Publications</h2>
      <PublicationsSection :previewCount="3" />
    </section>

    <section>
      <h2 class="section-title">Grants</h2>
      <GrantsSection :previewCount="3" />
    </section>

    <section>
      <h2 class="section-title">Awards</h2>
      <AwardsSection :previewCount="3" />
    </section>

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
