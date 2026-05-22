<script setup lang="ts">
import { profile } from '~/data/profile'
useHead({ title: 'Contact' })
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 tracking-tight">Contact</h1>

    <div class="space-y-10 text-sm text-gray-700 dark:text-zinc-300 max-w-prose">

      <!-- Email -->
      <div>
        <h2 class="section-title">Email</h2>
        <div class="space-y-0.5 leading-relaxed">
          <p>- <a :href="`mailto:${profile.email}`" class="font-mono hover:underline underline-offset-2 break-all">{{ profile.email }}</a></p>
          <p>- <a :href="`mailto:${profile.email}`" class="font-mono hover:underline underline-offset-2 break-all">{{ profile.email_ }}</a></p>
        </div>
      </div>

      <!-- Office -->
      <div>
        <h2 class="section-title">Office</h2>
        <div class="space-y-0.5 leading-relaxed">
          <p>Room S302, Research Building</p>
          <p>
            <a href="http://www.alp.ai.kyutech.ac.jp/tsuyoshi/index.html" target="_blank" rel="noopener" class="hover:underline underline-offset-2">Okita Laboratory</a>
          </p>
          <p>
            <a href="https://www.iizuka.kyutech.ac.jp/en/" target="_blank" rel="noopener" class="hover:underline underline-offset-2">Kyushu Institute of Technology</a>
          </p>
          <p class="font-mono text-xs text-gray-500 dark:text-zinc-400 pt-1">
            680-4 Kawazu, Iizuka-shi, Fukuoka 820-8502, Japan
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
