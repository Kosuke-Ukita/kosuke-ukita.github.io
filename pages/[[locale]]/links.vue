<script setup lang="ts">
import { profile } from '~/assets/data'

useHead({ title: 'Links' })

const { isJp } = useLocale()
const p = computed(() => isJp.value ? '/jp' : '')

const mainPages = computed(() => [
  { to: isJp.value ? '/jp' : '/',  label: 'Home',         desc: 'Overview & recent activity',           descJp: 'ホーム・概要・最近の活動' },
  { to: `${p.value}/news`,         label: 'News',         desc: 'Latest updates and announcements',     descJp: '最新情報・お知らせ' },
  { to: `${p.value}/biography`,    label: 'Biography',    desc: 'Academic and professional background', descJp: '略歴・自己紹介' },
  { to: `${p.value}/cv`,           label: 'CV',           desc: 'Curriculum vitae',                     descJp: '履歴書' },
  { to: `${p.value}/publications`, label: 'Publications', desc: 'Full list of publications',            descJp: '論文・発表一覧' },
  { to: `${p.value}/awards`,       label: 'Awards',       desc: 'Awards and honors received',           descJp: '受賞・表彰' },
  { to: `${p.value}/grants`,       label: 'Grants',       desc: 'Research grants and funding',          descJp: '研究費・資金獲得' },
  { to: `${p.value}/contact`,      label: 'Contact',      desc: 'Get in touch',                         descJp: 'お問い合わせ' },
])

</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl my-8 tracking-tight">Links</h1>

    <!-- Main pages -->
    <section class="mb-10">
      <h2 class="section-title">Pages</h2>
      <ul class="space-y-3">
        <li v-for="link in mainPages" :key="link.to">
          <NuxtLink :to="link.to" class="group flex items-baseline gap-3 text-sm">
            - 
            <span class="font-mono font-small text-gray-700 dark:text-zinc-300 group-hover:text-primary transition-colors w-32 shrink-0">{{ link.label }}</span>
            <span class="text-[0.72rem] text-gray-400 dark:text-zinc-500 font-mono">{{ isJp ? link.descJp : link.desc }}</span>
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
              <div class="font-mono ml-2 text-[0.7rem] text-gray-500 dark:text-zinc-400 hover:underline">{{ social.name }}</div>
            </span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
