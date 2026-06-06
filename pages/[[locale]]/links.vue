<script setup lang="ts">
import { profile, pages } from '~/assets/data'

useHead({ title: 'Links' })

const { isJp } = useLocale()

const linkPages = computed(() => {
  return pages.pages.map(page => ({
    to: isJp.value ? `/jp/${page.to}` : page.to,
    label: page.label,
    desc: isJp.value ? page.descJp : page.desc
  }))
})
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl my-8 tracking-tight">Links</h1>

    <!-- Main pages -->
    <section class="mb-10">
      <h2 class="section-title">Pages</h2>
      <ul class="space-y-3">
        <li v-for="page in linkPages" :key="page.to">
          <NuxtLink :to="page.to" class="group flex items-baseline gap-3 text-sm">
            - 
            <span class="font-mono font-small text-gray-700 dark:text-zinc-300 group-hover:text-primary transition-colors w-32 shrink-0">{{ page.label }}</span>
            <span class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono group-hover:underline">{{ page.desc }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- External links -->
    <section class="mb-10">
      <h2 class="section-title">External</h2>
      <ul class="space-y-3">
        <li v-for="social in profile.socials" :key="social.name">
          <a :href="social.url" target="_blank" rel="noopener" class="group flex items-center gap-3 text-sm">
            · 
            <span class="flex items-center gap-1.5 font-mono font-medium text-gray-700 dark:text-zinc-300 group-hover:text-primary transition-colors shrink-0">
              <Icon :name="social.icon" class="w-3.5 h-3.5 shrink-0" />
              <div class="font-mono ml-2 text-[0.7rem] text-gray-500 dark:text-zinc-400 group-hover:underline">{{ social.name }}</div>
            </span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
