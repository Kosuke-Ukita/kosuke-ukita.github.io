<script setup lang="ts">
useHead({ title: 'Biography' })
</script>

<template>
  <div>
    <NuxtLink to="/biography" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">
      English →
    </NuxtLink>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 mt-8 tracking-tight">Biography</h1>
    
    <h2 class="section-title">Japanese</h2>
    <div class="space-y-1 text-sm text-gray-700 dark:text-zinc-300 leading-relaxed max-w-prose mb-16">
      <p>
        <a href="https://kosuke-ukita.github.io/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">浮田 嵩祐</a>
        は現在，
        <a href="https://www.iizuka.kyutech.ac.jp/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">九州工業大学大学院情報工学府</a>
        の博士後期課程（D1）に在籍し，
        <a href="http://www.alp.ai.kyutech.ac.jp/tsuyoshi/index.html" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">大北研究室</a>
        にて深層学習および生成モデルの研究に従事している．
      </p>
      <p>
        <a href="https://www.ccr.kyutech.ac.jp/dc_support/spring" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">次世代研究者挑戦的研究プログラム（SPRING）</a>
        の支援を受け，主にFlow MatchingやDiffusion Modelsの計算効率化，推論の高速化，および表現学習の基盤理論に関心を持つ．
      </p>
      <p>
        最近の成果として，認識性能と生成品質の両立を目的としたセンサ基盤モデルを提案し，
        <a href="https://virtual.aistats.org/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">AISTATS 2026</a>
        での
        <a href="https://virtual.aistats.org/virtual/2026/spotlight/13338" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Spotlight発表（採択率上位3%）</a>
        や，Flow Matchingの推論速度半減を達成し，
        <a href="https://www.pakdd2026.org/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">PAKDD 2026</a>
        でのOral発表（
        <a href="https://www.pakdd2026.org/awardees#:~:text=Kosuke%20Ukita%20(Kyushu%20Institue%20of%20Technology)" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Student Travel Award受賞</a>
        ）を行う．
      </p>
    </div>

    <!-- Placeholder note -->
    <p class="mt-10 text-[0.7rem] text-gray-300 dark:text-zinc-600 font-mono italic">
      * hogehoge.
    </p>
  </div>
</template>
