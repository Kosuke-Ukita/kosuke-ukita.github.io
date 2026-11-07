<script setup lang="ts">
useHead({ title: 'Publications' })

const refereedOnly = ref(false)
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-4 mb-12">
      <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl tracking-tight">Publications</h1>
      <label class="inline-flex items-center gap-2 shrink-0 cursor-pointer select-none">
        <span class="font-mono text-[0.72rem] transition-colors"
          :class="refereedOnly ? 'text-primary' : 'text-gray-500 dark:text-zinc-400'"
        >Peer-reviewed only</span>
        <button type="button" role="switch" :aria-checked="refereedOnly" title="Show peer-reviewed only"
          class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
          :class="refereedOnly ? 'bg-primary' : 'bg-gray-200 dark:bg-zinc-600'"
          @click="refereedOnly = !refereedOnly"
        >
          <span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out" :class="refereedOnly ? 'translate-x-4' : 'translate-x-0'"/>
        </button>
      </label>
    </div>
    <PublicationsSection grouped :refereed-only="refereedOnly" />
  </div>
</template>
