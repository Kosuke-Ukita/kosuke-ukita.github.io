<script setup lang="ts">
import { education, educationJp } from '~/assets/data'

const props = defineProps<{
  wrap?: boolean
}>()

const { isJp } = useLocale()
const { handleWheel: baseHandleWheel } = useHScroll()

const nowrap = computed(() => props.wrap !== true)
const handleWheel = (e: WheelEvent) => { if (!props.wrap) baseHandleWheel(e) }
const openRandomThesisLink = (thesislink: { pdf: string; slide?: string }, e: MouseEvent) => {
  e.preventDefault()
  const links = [thesislink.pdf, thesislink.slide].filter(Boolean) as string[]
  const url = links[Math.floor(Math.random() * links.length)]
  window.open(url, '_blank', 'noopener,noreferrer')
}

const edu = computed(() => isJp.value ? educationJp : education)
</script>

<template>
  <div class="space-y-5">
    <div v-for="(item, i) in edu" :key="i" class="relative flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
      <span class="font-mono text-gray-500 dark:text-zinc-400 text-[0.72rem] sm:shrink-0 sm:w-40 sm:pt-0.5">{{ item.year }}</span>
      <div
        class="min-w-0 flex-1"
        :class="nowrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
        @wheel="handleWheel"
      >
        <div :class="nowrap ? 'min-w-max pr-12' : ''">
          <p class="font-semibold text-gray-900 dark:text-zinc-100" :class="{ 'whitespace-nowrap': nowrap }">{{ item.degree }}</p>
          <a :href="item.schoolurl" target="_blank" class="text-gray-700 dark:text-zinc-300 text-xs mt-0.5 hover:underline" :class="{ 'whitespace-nowrap': nowrap }">{{ item.school }}</a>
          <p v-if="item.depart" class="text-[0.7rem] text-gray-500 dark:text-zinc-400 mt-0.5 pl-0.5 leading-snug" :class="nowrap ? 'whitespace-nowrap' : 'whitespace-pre-line'">{{ item.depart }}</p>
          <NuxtLink v-if="item.thesislink" :to="item.thesislink.pdf" target="_blank" class="font-mono text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-1 leading-snug underline" :class="{ 'whitespace-nowrap': nowrap }">{{ item.thesis }}</NuxtLink>
          <p v-if="item.description" class="text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-0.5 font-mono" :class="{ 'whitespace-nowrap': nowrap }">{{ item.description }}</p>
        </div>
      </div>
      <div v-if="nowrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
    </div>
  </div>
</template>
