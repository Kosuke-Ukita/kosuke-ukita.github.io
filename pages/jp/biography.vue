<script setup lang="ts">
useHead({ title: 'Biography' })
</script>

<template>
  <div>
    <h1 class="font-mono font-semibold text-gray-900 dark:text-zinc-100 text-xl mb-12 tracking-tight">Biography</h1>
    
    <h2 class="section-title">Short</h2>
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

    <h2 class="section-title">Extended</h2>
    <div class="space-y-4 text-sm text-gray-700 dark:text-zinc-300 leading-relaxed max-w-prose mb-16">
      <p>
        <a href="https://kosuke-ukita.github.io/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">浮田 嵩祐</a>
        は香川県出身．
        <a href="https://www.kagawa-edu.jp/kanich02/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">香川県立観音寺第一高等学校</a>
        理数科では成績上位を維持しつつ，
        <a href="https://statedu.jp/cse/sports08.htm#:~:text=%E5%A4%A7%E5%A1%9A%E5%8A%9F%E5%A4%AA%E9%83%8E%E3%83%BB-,%E6%B5%AE%E7%94%B0%E5%B5%A9%E7%A5%90,-%E3%83%BB%E9%96%A2%E3%81%8F%E3%82%8B%E3%81%BF%E3%83%BB%E7%9F%B3%E4%BA%95" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">スポーツデータ解析コンペティションで最優秀賞</a>
        を受賞するなど，高校在籍時からデータ活用への関心を示していた．また，
        <a href="https://sshkaigai2018.blogspot.com/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">アメリカ・カリフォルニア州への研究旅行</a>
        に参加し，海外の研究・教育環境に触れた経験は，国際的な研究者を志す契機となった．
      </p>
      <p>
        2020年に
        <a href="https://www.kyutech.ac.jp/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">九州工業大学</a>
        情報工学部 知能情報工学科へ入学．在学中は深層学習，特に生成モデルの医用画像応用に取り組み，卒業論文では表現条件付き潜在拡散モデルを用いた脳CT画像における血腫分類を提案した．同期間に大北研究室の研究活動へ参加し，センサデータを対象とした自己教師あり学習の研究（
        <a href="https://dl.acm.org/doi/10.1145/3594739.3610745" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">UbiComp/ISWC 2023</a>
        ）にも貢献している．
      </p>
      <p>
        2024年，同大学大学院 情報工学府 博士前期課程（修士課程）に進学．修士研究では，ウェアラブルセンサデータを主な対象として研究領域を広げた．生成モデルの表現学習への応用を軸に据え，拡散モデルを用いた人間行動認識（HAR）の分析（
        <a href="https://dl.acm.org/doi/10.1145/3675094.3678439" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">UbiComp 2024</a>
        ）を経て，Flow Matchingによる共同学習でセンサ基盤モデルを構築する研究へと発展させた．
      </p>
      <p>
        研究の中心にあるのは，「生成モデルでの表現学習とその学習ダイナミクスの解明」である．拡散モデルやFlow Matchingを単なるデータ生成ツールとして捉えるのではなく，そのスコア関数や確率フローが持つ幾何学的・情報論的な構造に着目し，表現学習の基盤理論として解釈することを試みている．この観点から，計算コストの削減と表現品質の向上を同時に達成するための手法開発に取り組んでいる．
      </p>
      <p>
        2026年，同大学大学院 博士後期課程に進学．進学後まもなく，修士課程での研究成果が
        <a href="https://virtual.aistats.org/virtual/2026/spotlight/13338" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">AISTATS 2026</a>
        においてSpotlight（採択率上位3%）として発表された．また，
        <a href="https://www.ccr.kyutech.ac.jp/dc_support/spring" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">次世代研究者挑戦的研究プログラム（SPRING）</a>
        の支援を受け，Flow Matchingの推論効率化をさらに推進し，Unified Path CFGを提案する論文を
        <a href="https://www.pakdd2026.org/" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">PAKDD 2026</a>
        にてOral発表し，
        <a href="https://www.pakdd2026.org/awardees#:~:text=Kosuke%20Ukita%20(Kyushu%20Institue%20of%20Technology)" target="_blank" rel="noopener" class="text-primary hover:underline underline-offset-2">Student Travel Awardを受賞</a>
        した．
      </p>
      <p>
        現在は，Flow Matchingの理論的基盤の深化と，深層学習における学習ダイナミクスの解明にも強い関心を持つ．特に，Grokking（収束後に汎化性能が突然向上する現象）に代表されるような，ニューラルネットワーク内部で起きる理解への相転移等の学習ダイナミクスに着目している．条件付き生成プロセスを学習の観察・制御手段として活用することで，こうした急激な構造変化がいつ・なぜ起きるのかを定量的に捉えることを目指している．生成モデルと学習理論の交差点に，未解明の豊かな問いが眠っていると考えている．
      </p>
      <p>
        研究以外では，新しいアルゴリズムの実装や数学的証明の追跡を趣味として楽しんでいる．AI開発を取り巻く環境が急速に変化し，コードを自ら書く機会は以前より減りつつあるが，感覚を研ぎ澄ませるために，GitHubで高く評価されているプロジェクトのコードを文学作品を読むように丁寧に読み込むことを習慣としている．優れたコードには，論文と同様に著者の思想と設計哲学が宿ると感じている．
      </p>
    </div>

    <!-- Placeholder note -->
    <p class="mt-10 text-[0.7rem] text-gray-300 dark:text-zinc-600 font-mono italic">
      * bio
    </p>
  </div>
</template>
