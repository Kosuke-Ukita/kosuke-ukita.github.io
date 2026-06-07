<script setup lang="ts">
useHead({ title: 'Home' })

import { profile, others } from '~/assets/data'

const { isJp } = useLocale()

const researchInterests = others.find(o => o.category === 'Research Interests')?.items ?? []
</script>

<template>
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
