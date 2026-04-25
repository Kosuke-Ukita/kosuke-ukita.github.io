<script setup lang="ts">
useHead({ title: 'Biography' })
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-8 tracking-tight">Biography</h1>
    
    <h2 class="section-title">Japanese</h2>
    <div class="space-y-1 text-sm text-gray-700 dark:text-zinc-300 leading-relaxed max-w-prose mb-8">
      <p>
        <a href="https://kosuke-ukita.github.io/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">浮田 嵩祐</a>
        は現在，
        <a href="https://www.iizuka.kyutech.ac.jp/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">九州工業大学大学院情報工学府</a>
        の博士後期課程（D1）に在籍し，
        <a href="http://www.alp.ai.kyutech.ac.jp/tsuyoshi/index.html" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">大北研究室</a>
        にて深層学習および生成モデルの研究に従事している．
      </p>
      <p>
        <a href="https://www.ccr.kyutech.ac.jp/dc_support/spring/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">次世代研究者挑戦的研究プログラム（SPRING）</a>
        の支援を受け，主にFlow MatchingやDiffusion Modelsの計算効率化，推論の高速化，および表現学習の理論的基盤に関心を持つ．
        最近の成果として，認識性能と生成品質の両立を目的としたセンサ基盤モデルを提案し，AISTATS 2026でのSpotlight発表（採択率上位3%）や，
        Flow Matchingの推論速度半減を達成し，PAKDD 2026でのOral発表（2026 PAKDD Student Travel Award受賞）を行う．
      </p>
    </div>

    <h2 class="section-title">English</h2>
    <div class="space-y-1 text-sm text-gray-700 dark:text-zinc-300 leading-relaxed max-w-prose mb-8">
      <p>
        <a href="https://kosuke-ukita.github.io/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Kosuke Ukita</a>
        is a first-year Ph.D. student at the
        <a href="https://www.iizuka.kyutech.ac.jp/en/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Graduate School of Computer Science and Systems Engineering, Kyushu Institute of Technology</a>, 
        where they conduct research in the
        <a href="http://www.alp.ai.kyutech.ac.jp/tsuyoshi/index.html" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Okita Laboratory</a>.
      </p>
      <p>
        Supported by the 
        <a href="https://www.ccr.kyutech.ac.jp/dc_support/spring/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Support for Pioneering Research in Innovative Doctoral Courses (SPRING)</a>
        program, they conduct research on deep learning and generative modeling, with a focus on enhancing the efficiency of Flow Matching and Diffusion Models, as well as exploring the theoretical foundations of representation learning.
        Their recent achievements include a Spotlight presentation (top 3% of submissions) at AISTATS 2026 and an Oral presentation at PAKDD 2026, where they received the 2026 PAKDD Student Travel Award.
      </p>

      
    </div>

    <!-- Placeholder note -->
    <p class="mt-10 text-[0.7rem] text-gray-300 dark:text-zinc-600 font-mono italic">
      * hogehoge.
    </p>
  </div>
</template>
