<script setup lang="ts">
useHead({ title: 'Experience' })

import { experience, experienceJp } from '~/assets/data'

const { isJp } = useLocale()
const { handleWheel: baseHandleWheel } = useHScroll()

const wrap = ref(false)
const handleCardWheel = (e: WheelEvent) => { if (!wrap.value) baseHandleWheel(e) }

const exp = computed(() => isJp.value ? experienceJp : experience)
</script>

<template>

    <section>
      <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 tracking-tight">Work Experience</h1>
      <h2 class="section-title"></h2>
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

</template>
