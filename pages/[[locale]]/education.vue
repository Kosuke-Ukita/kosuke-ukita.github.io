<script setup lang="ts">
useHead({ title: 'Education' })

import { profile, publications, awards, awardsJp, grants, grantsJp, education, educationJp, experience, experienceJp, others } from '~/assets/data'

const { isJp } = useLocale()
const { handleWheel: baseHandleWheel } = useHScroll()

const wrap = ref(false)
const handleCardWheel = (e: WheelEvent) => { if (!wrap.value) baseHandleWheel(e) }

const edu = computed(() => isJp.value ? educationJp : education)
</script>

<template>
    <section>
      <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl my-8 tracking-tight">Education</h1>
      <h2 class="section-title"></h2>
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

</template>
