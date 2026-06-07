<script setup lang="ts">
import { experience, experienceJp } from '~/assets/data'

const props = defineProps<{
  wrap?: boolean
}>()

const { isJp } = useLocale()
const { handleWheel: baseHandleWheel } = useHScroll()

const nowrap = computed(() => props.wrap !== true)
const handleWheel = (e: WheelEvent) => { if (!props.wrap) baseHandleWheel(e) }

const exp = computed(() => isJp.value ? experienceJp : experience)
</script>

<template>
  <div class="space-y-5">
    <div v-for="(item, i) in exp" :key="i" class="relative flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-sm">
      <span class="font-mono text-gray-500 dark:text-zinc-400 text-[0.72rem] sm:shrink-0 sm:w-40 sm:pt-0.5">{{ item.year }}</span>
      <div
        class="min-w-0 flex-1"
        :class="nowrap ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''"
        @wheel="handleWheel"
      >
        <div :class="nowrap ? 'min-w-max pr-12' : ''">
          <p class="font-semibold text-gray-900 dark:text-zinc-100" :class="{ 'whitespace-nowrap': nowrap }">{{ item.name }}</p>
          <p v-for="(d, j) in item.descriptions" :key="j" class="text-[0.72rem] text-gray-500 dark:text-zinc-400 mt-0.5" :class="{ 'whitespace-nowrap': nowrap }">{{ d }}</p>
        </div>
      </div>
      <div v-if="nowrap" class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
    </div>
  </div>
</template>
