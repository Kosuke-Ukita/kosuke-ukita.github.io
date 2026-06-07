<script setup lang="ts">
import { awards, awardsJp } from '~/assets/data'

const props = defineProps<{
  previewCount?: number
  wrap?: boolean
  grouped?: boolean
}>()

const { isJp } = useLocale()
const { handleWheel: baseHandleWheel } = useHScroll()
const awardsBase = computed(() => isJp.value ? '/jp/awards' : '/awards')

const nowrap = computed(() => props.wrap !== true)
const handleWheel = (e: WheelEvent) => { if (!props.wrap) baseHandleWheel(e) }

const allAwards = computed(() => isJp.value ? awardsJp : awards)
const displayAwards = computed(() =>
  props.previewCount !== undefined && props.previewCount > 0
    ? allAwards.value.slice(0, props.previewCount)
    : allAwards.value
)
const hasMore = computed(() =>
  props.previewCount !== undefined && props.previewCount > 0 && allAwards.value.length > props.previewCount
)
const groupedAwards = useGroupedAwards()
</script>

<template>
  <!-- Year-grouped view for standalone page -->
  <template v-if="grouped">
    <div v-for="group in groupedAwards" :key="group.year" class="mb-10">
      <h2 class="font-mono text-sm font-semibold text-primary mb-4 pb-1.5 border-b border-gray-100 dark:border-zinc-800">{{ group.year }}</h2>
      <ul class="space-y-4">
        <li v-for="(award, i) in group.items" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" @wheel="baseHandleWheel">
            <div class="min-w-max pr-12">
              <p class="whitespace-nowrap"><a :href="award.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ award.title }}</a></p>
              <p class="whitespace-nowrap"><a :href="award.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ award.organization }}</a></p>
              <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono whitespace-nowrap">{{ award.year }}</p>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ul>
    </div>
  </template>

  <!-- Flat list for preview (index.vue) and cv.vue -->
  <template v-else>
    <ul v-if="displayAwards.length" class="space-y-4">
      <li v-for="(award, i) in displayAwards" :key="i" class="relative flex gap-1 text-sm">
        <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
        <div
          class="min-w-0 flex-1"
          :class="nowrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
          @wheel="handleWheel"
        >
          <div :class="nowrap ? 'min-w-max pr-12' : ''">
            <p :class="{ 'whitespace-nowrap': nowrap }"><a :href="award.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ award.title }}</a></p>
            <p :class="{ 'whitespace-nowrap': nowrap }"><a :href="award.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ award.organization }}</a></p>
            <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono" :class="{ 'whitespace-nowrap': nowrap }">{{ award.year }}</p>
          </div>
        </div>
        <div v-if="nowrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
      </li>
    </ul>
    <div v-if="hasMore" class="mt-5">
      <NuxtLink :to="awardsBase" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">All awards →</NuxtLink>
    </div>
  </template>
</template>
