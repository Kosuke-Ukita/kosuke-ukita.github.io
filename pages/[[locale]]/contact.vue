<script setup lang="ts">
import { profile } from '~/assets/data'

useHead({ title: 'Contact' })

const { isJp } = useLocale()
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 tracking-tight">Contact</h1>

    <div class="space-y-10 text-sm text-gray-700 dark:text-zinc-300 max-w-prose">

      <div>
        <h2 class="section-title">Email</h2>
        <div class="space-y-0.5 leading-relaxed">
          <p>- <a :href="`mailto:${profile.email}`" class="font-mono hover:underline underline-offset-2 break-all">{{ profile.email }}</a></p>
          <p>- <a :href="`mailto:${profile.email_}`" class="font-mono hover:underline underline-offset-2 break-all">{{ profile.email_ }}</a></p>
        </div>
      </div>

      <div>
        <h2 class="section-title">Office</h2>
        <template v-if="isJp">
          <div class="space-y-0.5 leading-relaxed">
            <p class="font-mono text-xs text-gray-500 dark:text-zinc-400">〒820-8502 福岡県飯塚市川津680-4</p>
            <p><a href="https://www.iizuka.kyutech.ac.jp/" target="_blank" rel="noopener" class="hover:underline underline-offset-2">九州工業大学大学院 情報工学府</a></p>
            <p><a href="http://www.alp.ai.kyutech.ac.jp/tsuyoshi/index.html" target="_blank" rel="noopener" class="hover:underline underline-offset-2">大北研究室</a></p>
            <p>研究棟 S302号室</p>
          </div>
        </template>
        <template v-else>
          <div class="space-y-0.5 leading-relaxed">
            <p>Room S302, Research Building</p>
            <p><a href="http://www.alp.ai.kyutech.ac.jp/tsuyoshi/index.html" target="_blank" rel="noopener" class="hover:underline underline-offset-2">Okita Laboratory</a></p>
            <p><a href="https://www.iizuka.kyutech.ac.jp/en/" target="_blank" rel="noopener" class="hover:underline underline-offset-2">Kyushu Institute of Technology</a></p>
            <p class="font-mono text-xs text-gray-500 dark:text-zinc-400 pt-1">680-4 Kawazu, Iizuka-shi, Fukuoka 820-8502, Japan</p>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>
