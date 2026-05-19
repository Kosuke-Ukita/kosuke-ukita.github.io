<script setup lang="ts">
useHead({ title: 'Biography' })
</script>

<template>
  <div>
    <NuxtLink to="/jp/biography" class="font-mono text-[0.72rem] text-primary hover:underline underline-offset-2">
      Japanese →
    </NuxtLink>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 mt-8 tracking-tight">Biography</h1>
    
    <h2 class="section-title">English</h2>
    <div class="space-y-1 text-sm text-gray-700 dark:text-zinc-300 leading-relaxed max-w-prose mb-16">
      <p>
        <a href="https://kosuke-ukita.github.io/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Kosuke Ukita</a>
        is a first-year Ph.D. student at the
        <a href="https://www.iizuka.kyutech.ac.jp/en/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Graduate School of Computer Science and Systems Engineering, Kyushu Institute of Technology</a>, 
        where they conduct research in the
        <a href="http://www.alp.ai.kyutech.ac.jp/tsuyoshi/index.html" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Okita Laboratory</a>.
      </p>
      <p>
        Supported by the 
        <a href="https://www.ccr.kyutech.ac.jp/dc_support/spring" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Support for Pioneering Research in Innovative Doctoral Courses (SPRING)</a>
        program, they conduct research on deep learning and generative modeling, with a focus on enhancing the efficiency of Flow Matching and Diffusion Models, as well as exploring the theoretical foundations of representation learning.
      </p>
      <p>
        Their recent achievements include a
        <a href="https://virtual.aistats.org/virtual/2026/spotlight/13338" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Spotlight presentation (top 3% of submissions)</a>
        at
        <a href="https://virtual.aistats.org/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">AISTATS 2026</a>
        and an Oral presentation at
        <a href="https://www.pakdd2026.org/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">PAKDD 2026</a>,
        where they received the
        <a href="https://www.pakdd2026.org/awardees#:~:text=Kosuke%20Ukita%20(Kyushu%20Institue%20of%20Technology)" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">2026 PAKDD Student Travel Award</a>.
      </p>
      
    </div>

    <!-- Placeholder note -->
    <p class="mt-10 text-[0.7rem] text-gray-300 dark:text-zinc-600 font-mono italic">
      * hogehoge.
    </p>
  </div>
</template>
