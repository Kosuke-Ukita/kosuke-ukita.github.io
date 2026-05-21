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
        <a
          :href="`mailto:${profile.email}`"
          class="font-mono text-primary hover:underline underline-offset-2 break-all"
        >{{ profile.email }}</a>
      </div>

      <!-- Online -->
      <div>
        <h2 class="section-title">Online</h2>
        <ul class="space-y-1.5">
          <li>
            <a
              href="https://www.linkedin.com/in/ukita000"
              target="_blank"
              rel="noopener"
              class="font-mono text-primary hover:underline underline-offset-2"
            >LinkedIn</a>
            <span class="text-gray-400 dark:text-zinc-500 font-mono text-xs ml-2">linkedin.com/in/ukita000</span>
          </li>
        </ul>
      </div>

      <!-- Office -->
      <div>
        <h2 class="section-title">Office</h2>
        <div class="space-y-0.5 leading-relaxed">
          <p>研究棟 S302号室</p>
          <p>
            <a
              href="http://www.alp.ai.kyutech.ac.jp/tsuyoshi/index.html"
              target="_blank"
              rel="noopener"
              class="text-primary hover:underline underline-offset-2"
            >大北研究室</a>
          </p>
          <p>
            <a
              href="https://www.iizuka.kyutech.ac.jp/"
              target="_blank"
              rel="noopener"
              class="text-primary hover:underline underline-offset-2"
            >九州工業大学大学院 情報工学府</a>
          </p>
          <p class="font-mono text-xs text-gray-500 dark:text-zinc-400 pt-1">
            〒820-8502 福岡県飯塚市川津680-4
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
