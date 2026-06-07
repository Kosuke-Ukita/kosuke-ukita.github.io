<script setup lang="ts">
import { grants, grantsJp } from '~/assets/data'

const props = defineProps<{
  previewCount?: number
  wrap?: boolean
  grouped?: boolean
}>()

const { isJp } = useLocale()
const { handleWheel: baseHandleWheel } = useHScroll()
const grantsBase = computed(() => isJp.value ? '/jp/grants' : '/grants')

const nowrap = computed(() => props.wrap !== true)
const handleWheel = (e: WheelEvent) => { if (!props.wrap) baseHandleWheel(e) }

const allGrants = computed(() => isJp.value ? grantsJp : grants)
const displayGrants = computed(() =>
  props.previewCount !== undefined && props.previewCount > 0
    ? allGrants.value.slice(0, props.previewCount)
    : allGrants.value
)
const hasMore = computed(() =>
  props.previewCount !== undefined && props.previewCount > 0 && allGrants.value.length > props.previewCount
)
const groupedGrants = useGroupedGrants()
</script>

<template>
  <!-- Year-grouped view for standalone page -->
  <template v-if="grouped">
    <div v-for="group in groupedGrants" :key="group.year" class="mb-10">
      <h2 class="font-mono text-sm font-semibold text-primary mb-4 pb-1.5 border-b border-gray-100 dark:border-zinc-800">{{ group.year }}</h2>
      <ul class="space-y-4">
        <li v-for="(grant, i) in group.items" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" @wheel="baseHandleWheel">
            <div class="min-w-max pr-12">
              <p class="whitespace-nowrap"><a :href="grant.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ grant.name }}</a></p>
              <p class="whitespace-nowrap"><a :href="grant.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ grant.organization }}</a></p>
              <p class="text-[0.7rem] text-gray-400 dark:text-zinc-500 font-mono whitespace-nowrap">{{ grant.year }} · {{ grant.price }}</p>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ul>
    </div>
  </template>

  <!-- Flat list for preview (index.vue) and cv.vue -->
  <template v-else>
    <ul v-if="displayGrants.length" class="space-y-4">
      <li v-for="(grant, i) in displayGrants" :key="i" class="relative flex gap-1 text-sm">
        <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
        <div
          class="min-w-0 flex-1"
          :class="nowrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
          @wheel="handleWheel"
        >
          <div :class="nowrap ? 'min-w-max pr-12' : ''">
            <p :class="{ 'whitespace-nowrap': nowrap }"><a :href="grant.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ grant.name }}</a></p>
            <p :class="{ 'whitespace-nowrap': nowrap }"><a :href="grant.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ grant.organization }}</a></p>
            <p class="text-[0.7rem] text-gray-400 dark:text-zinc-500 font-mono" :class="{ 'whitespace-nowrap': nowrap }">{{ grant.year }} · {{ grant.price }}</p>
          </div>
        </div>
        <div v-if="nowrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
      </li>
    </ul>
    <div v-if="hasMore" class="mt-5">
      <NuxtLink :to="grantsBase" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">All grants →</NuxtLink>
    </div>
  </template>
</template>
