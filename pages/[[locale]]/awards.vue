<script setup lang="ts">
useHead({ title: 'Awards' })

const { handleWheel } = useHScroll()
const groupedAwards = useGroupedAwards()
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 tracking-tight">Awards</h1>

    <div v-for="group in groupedAwards" :key="group.year" class="mb-10">
      <h2 class="font-mono text-sm font-semibold text-primary mb-4 pb-1.5 border-b border-gray-100 dark:border-zinc-800">{{ group.year }}</h2>
      <ul class="space-y-4">
        <li v-for="(item, i) in group.items" :key="i" class="relative flex gap-1 text-sm">
          <span class="text-gray-300 dark:text-zinc-600 shrink-0 mt-0.5 select-none">–</span>
          <div class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" @wheel="handleWheel">
            <div class="min-w-max pr-12">
              <p class="whitespace-nowrap"><a :href="item.url" target="_blank" rel="noopener" class="font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors">{{ item.title }}</a></p>
              <p class="whitespace-nowrap"><a :href="item.orgurl" target="_blank" rel="noopener" class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono hover:underline">{{ item.organization }}</a></p>
              <p class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono whitespace-nowrap">{{ item.year }}</p>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent" />
        </li>
      </ul>
    </div>
  </div>
</template>
