<script setup lang="ts">
import { profile } from '~/data/profile'

const isMenuOpen = ref(true)
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
const closeMenu = () => { isMenuOpen.value = false }

const route = useRoute()
// Exact match for '/', prefix match for others
const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)

useSeoMeta({
  ogTitle: 'Kosuke Ukita',
  description: 'Personal website of Kosuke Ukita, PhD student at Kyushu Institute of Technology.',
  ogDescription: 'Personal website of Kosuke Ukita, PhD student at Kyushu Institute of Technology.',
  ogImage: '/assets/photo.jpg',
  twitterCard: 'summary_large_image',
})
useHead({
  meta: [{ name: 'google-site-verification', content: 'Vueua9w0ImvYpxqfLC-2PPndYTAHZ6YKxhlPQ-p2F30' }],
  titleTemplate: (chunk) => chunk ? `${chunk} — Kosuke Ukita` : 'Kosuke Ukita',
  script: [{
    innerHTML: `(function(){var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');})()`,
    tagPriority: 'critical',
  }],
})

const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/biography',   label: 'Biography' },
  { to: '/publications', label: 'Publications' },
  { to: '/cv',          label: 'CV' },
]

const isDark = ref(false)
onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
})
const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 font-sans">

    <!-- ── Mobile overlay ─────────────────────────────────────────────────── -->
    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/20 z-20 md:hidden"
        @click="closeMenu"
      />
    </Transition>

    <!-- ── Mobile drawer (slides from left) ───────────────────────────────── -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800',
        'flex flex-col px-5 py-7 overflow-y-auto',
        'transition-transform duration-200 ease-in-out md:hidden',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="mb-4 shrink-0">
        <img
          src="/assets/photo.jpg"
          alt="Kosuke Ukita"
          class="w-20 h-20 object-cover rounded"
          onerror="this.onerror=null; this.src='https://placehold.co/400x400?text=KU'"
        />
      </div>
      <div class="mb-3 space-y-0.5">
        <h2 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-sm">{{ profile.name }}</h2>
        <p class="text-xs text-gray-500 dark:text-zinc-400">{{ profile.namejp }}</p>
        <p class="text-xs text-primary font-medium mt-1">{{ profile.role }}</p>
        <p class="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">{{ profile.affiliation }}</p>
        <p class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">{{ profile.place }}</p>
      </div>
      <div class="flex flex-wrap gap-2.5 mb-2">
        <a
          v-for="social in profile.socials"
          :key="social.name"
          :href="social.url"
          target="_blank"
          rel="noopener"
          :title="social.name"
          class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors"
        ><Icon :name="social.icon" class="w-3.5 h-3.5" /></a>
      </div>
      <a
        :href="`mailto:${profile.email}`"
        class="text-[0.67rem] text-gray-500 dark:text-zinc-400 hover:text-primary font-mono break-all mb-6 transition-colors"
      >{{ profile.email }}</a>
      <nav class="space-y-0.5">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link.to) }"
          @click="closeMenu"
        >{{ link.label }}</NuxtLink>
      </nav>
      <div class="mt-auto pt-8 text-[0.65rem] text-gray-400 dark:text-zinc-500 font-mono">
        &copy; {{ new Date().getFullYear() }} {{ profile.name }}
      </div>
    </aside>

    <!-- ── Mobile top bar ─────────────────────────────────────────────────── -->
    <header class="md:hidden sticky top-0 z-10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-gray-100 dark:border-zinc-800 h-11 flex items-center justify-between px-4">
      <button @click="toggleMenu">
        <span class="font-mono font-semibold text-sm text-gray-900 dark:text-zinc-100 tracking-tight">Kosuke Ukita</span>
      </button>
      <div class="flex items-center gap-1">
        <button
          @click="toggleDark"
          class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors p-1"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Icon v-if="isDark" name="heroicons:sun" class="w-4 h-4" />
          <Icon v-else name="heroicons:moon" class="w-4 h-4" />
        </button>
        <button @click="toggleMenu" class="text-gray-600 dark:text-zinc-400 p-1 -mr-1" aria-label="Toggle menu">
          <Icon v-if="isMenuOpen" name="heroicons:x-mark" class="w-5 h-5" />
          <Icon v-else name="heroicons:bars-3" class="w-5 h-5" />
        </button>
      </div>
    </header>

    <!-- ── Desktop profile header (hidden on mobile) ──────────────────────── -->
    <header class="hidden md:block border-b border-gray-100 dark:border-zinc-800">
      <div class="max-w-2xl mx-auto px-6 lg:px-8 pt-9 pb-0">

        <!-- Profile block -->
        <div class="flex gap-5 items-start mb-6">
          <img
            src="/assets/photo.jpg"
            alt="Kosuke Ukita"
            class="w-[4.5rem] h-[4.5rem] object-cover rounded shrink-0"
            onerror="this.onerror=null; this.src='https://placehold.co/400x400?text=KU'"
          />
          <div class="space-y-0.5">
            <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-[1rem] leading-tight tracking-tight">{{ profile.name }}</h1>
            <p class="text-xs text-gray-500 dark:text-zinc-400">{{ profile.namejp }}</p>
            <p class="text-xs text-primary font-medium mt-1">{{ profile.role }}</p>
            <p class="text-xs text-gray-600 dark:text-zinc-400 mt-0.5">{{ profile.affiliation }}</p>
            <p class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">{{ profile.place }}</p>
            <div class="flex flex-wrap gap-2.5 mt-2">
              <a
                v-for="social in profile.socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener"
                :title="social.name"
                class="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors"
              ><Icon :name="social.icon" class="w-3.5 h-3.5" /></a>
            </div>
            <a
              :href="`mailto:${profile.email}`"
              class="text-[0.7rem] text-gray-500 dark:text-zinc-400 hover:text-primary font-mono block mt-1 transition-colors"
            >{{ profile.email }}</a>
          </div>
        </div>

        <!-- Horizontal navigation -->
        <nav class="flex gap-6 pb-4 items-center">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="font-mono text-[0.78rem] transition-colors"
            :class="isActive(link.to)
              ? 'text-primary font-semibold'
              : 'text-gray-500 dark:text-zinc-400 hover:text-primary'"
          >{{ link.label }}</NuxtLink>
          <button
            @click="toggleDark"
            class="ml-auto text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors p-1"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Icon v-if="isDark" name="heroicons:sun" class="w-4 h-4" />
            <Icon v-else name="heroicons:moon" class="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>

    <!-- ── Page content ───────────────────────────────────────────────────── -->
    <main>
      <div class="max-w-2xl mx-auto px-5 sm:px-6 lg:px-8 py-9 sm:py-11">
        <NuxtPage />
      </div>
    </main>

    <!-- ── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="border-t border-gray-100 dark:border-zinc-800 py-5 mt-4">
      <div class="max-w-2xl mx-auto px-5 sm:px-6 lg:px-8 text-[0.7rem] text-gray-400 dark:text-zinc-500 font-mono">
        &copy; {{ new Date().getFullYear() }} Kosuke Ukita
      </div>
    </footer>

  </div>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';

.fade-enter-active,
.fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; }
</style>
