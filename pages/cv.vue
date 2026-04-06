<script setup lang="ts">
import { profile } from '~/data/profile'
import { publications } from '~/data/publications'
import { awards } from '~/data/awards'
import { grants } from '~/data/grants'
import { education } from '~/data/education'
import { experience } from '~/data/experience'
import { others } from '~/data/others'

const highlightAuthor = (authors: string) => {
  return authors
    .replace(/Kosuke Ukita/g, `<span class="underline">Kosuke Ukita</span>`)
    .replace(/浮田嵩祐/g, `<span class="underline">浮田嵩祐</span>`);
}
</script>

<template>
  <div class="min-h-screen bg-white text-slate-800 font-sans selection:bg-primary/10">
    <main class="max-w-4xl mx-auto px-6 py-12 space-y-16">

    <h3 class="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
      <Icon name="heroicons:document-text" class="text-primary" /> CV
      <a href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer" class="ml-auto flex items-center gap-1 text-sm font-medium text-slate-500 border border-slate-300 px-3 py-1 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition bg-white">
        <Icon name="heroicons:document-text" />PDF
      </a>
    </h3>
    
    <header class="flex flex-col sm:flex-row gap-8 items-start border-b-2 border-slate-100 pb-2">
      <div class="w-32 h-32 rounded-lg overflow-hidden shadow-xl shrink-0">
         <img src="/assets/photo.jpg" alt="Profile" class="w-full h-full object-cover" 
              onerror="this.onerror=null; this.src='https://placehold.co/300x400?text=Photo'"/>
      </div>

      <div class="flex-1 space-y-2">
        <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
          {{ profile.name }}
        </h1>
        
        <div class="text-slate-500 space-y-1">
          <p class="text-base font-bold text-primary"> {{ profile.grade }} </p>
          <p class="text-slate-500 flex items-center gap-2"><Icon name="heroicons:building-library" /> {{ profile.affiliation }} </p>
          <p class="text-sm">Department of Creative Informatics, Graduate School of Computer Science and Systems Engineering</p>
          <!-- <p class="text-sm">Gender: Male</p> -->
          <!-- <p class="text-sm">Nationality: Japanese</p> -->
        </div>

        <div class="flex flex-wrap gap-4 text-sm text-slate-500 py-2">
          <span class="flex items-center gap-1">
            <Icon name="heroicons:envelope" /> {{ profile.email }}
          </span>
          <a :href="profile.socials.find(s => s.name === 'GitHub')?.url" target="_blank" class="flex items-center gap-1 hover:text-primary"><Icon name="uil:github" /></a>
          <a :href="profile.socials.find(s => s.name === 'Google Scholar')?.url" target="_blank" class="flex items-center gap-1 hover:text-primary"><Icon name="simple-icons:googlescholar" /></a>
          <a :href="profile.socials.find(s => s.name === 'LinkedIn')?.url" target="_blank" class="flex items-center gap-1 hover:text-primary"><Icon name="simple-icons:linkedin" /></a>
        </div>
      </div>
    </header>

      <section id="education" class="scroll-mt-24">
        <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4"><Icon name="heroicons:academic-cap" class="text-primary" />Education</h3>
        
        <div class="space-y-4 border-l-2 border-slate-100 ml-3 pl-4 relative">
          <div v-for="(edu, index) in education" :key="index" class="relative">
            <span class="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-none bg-primary shadow-sm"></span>
            
            <div class="flex justify-between">
              <h4 class="text-md font-bold text-slate-900">{{ edu.degree }}</h4>
              <p class="text-sm text-slate-400 mt-1">| {{ edu.year }}</p>
            </div>
            <p class="text-slate-500">{{ edu.school }}</p>
            <p v-if="edu.depart" class="text-sm text-slate-500">{{ edu.depart }}</p>
            <p v-if="edu.thesis" class="text-xs text-slate-500 bg-slate-100 inline-block p-1 my-0 rounded">{{ edu.thesis }}, </p>
            <p v-if="edu.description" class="text-xs text-slate-500 bg-slate-100 inline-block p-1 my-0 rounded">{{ edu.description }}</p>
          </div>
        </div>
      </section>

      <section id="experience" class="scroll-mt-24">
        <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4"><Icon name="heroicons:shopping-bag" class="text-primary" />Work Experience</h3>
        
        <div class="space-y-4 border-l-2 border-slate-100 ml-3 pl-4 relative">
          <div v-for="(exp, index) in experience" :key="index" class="relative">
            <span class="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-white shadow-sm"></span>
            
            <div class="flex justify-between">
              <h4 class="text-lg font-bold text-slate-900">{{ exp.name }}</h4>
              <p class="text-sm text-slate-400 mt-1">| {{ exp.year }}</p>
            </div>
            <div v-for="(d, i) in exp.descriptions" :key="i">
              <p class="text-sm text-slate-500">{{ d }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="publications" class="scroll-mt-24">
        <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4"><Icon name="heroicons:book-open" class="text-primary" /> Publications </h3>
        
        <div class="space-y-2 ml-0 pl-2 relative">
          <!-- <article v-for="(paper, index) in publications" :key="index" class="flex flex-col group px-6 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"> -->
          <article v-for="(paper, index) in publications" :key="index" class="relative group border-l-2 border-primary/50 px-3 py-2 rounded-md hover:shadow-md transition-all duration-300">
            <p class="absolute -left-[32px] text-sm text-primary/90 font-bold">[{{ index+1 }}]</p>
            <h4 class="text-md font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">{{ paper.title }}</h4>
            
            <div class="text-slate-500 text-sm"><span v-html="highlightAuthor(paper.authors)"></span></div>
            <div class="text-xs font-semibold text-slate-900 italic">{{ paper.venue }}</div>

            <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500 border-t border-slate-100 pt-1 mb-1">
              <span class="text-xs flex items-center gap-1"><Icon name="heroicons:calendar" class="w-4 h-4 text-slate-400" />{{ paper.date }}</span>
              <span class="text-xs flex items-center gap-1" v-if="paper.location"><Icon name="heroicons:map-pin" class="w-4 h-4 text-slate-400" />{{ paper.location }}</span>
            </div>

            <div class="flex justify-between">
              <div class="flex flex-wrap items-center gap-1 mt-1text-slate-500">
                <a v-for="link in paper.links" :key="link.name" :href="link.url" class="flex items-center gap-1 text-xs font-bold text-slate-700 border border-slate-300 px-2 py-1 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition bg-slate-50">
                  <Icon :name="link.icon" class="w-4 h-4" />{{ link.name }}
                </a>
              </div>
              <div class="flex gap-1 shrink-0 self-start">
                <span v-if="paper.type" class="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-primary/5 text-primary border border-primary/10 whitespace-nowrap">{{ paper.type }}</span>
                <span v-if="paper.note" class="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100 whitespace-nowrap">{{ paper.note }}</span>
              </div>
            </div>

          </article>
        </div>
      </section>
      
      <section id="grants" class="scroll-mt-24">
        <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Icon name="heroicons:currency-dollar" class="text-primary" /> Grants
        </h3>
        
        <div class="space-y-4">
          <div v-for="(grant, index) in grants" :key="index" class="p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition flex items-center gap-4">            
            <div>
              <a :href="grant.url" target="_blank" rel="noopener noreferrer" class="block">
                <p class="font-bold text-slate-900 text-sm leading-tight underline hover:text-primary">{{ grant.name }}</p>
              </a>
              <div class="flex flex-wrap items-center gap-x-2 text-sm text-slate-600 mt-1">
                <span>{{ grant.organization }}</span>
                <span class="text-xs text-slate-400 bg-slate-50 inline-block p-1 my-0 rounded">{{ grant.description }}</span>
                <span class="text-slate-300 hidden sm:inline">|</span>
                <span class="text-slate-500 text-sm">{{ grant.year }}</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section id="awards" class="scroll-mt-24">
        <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Icon name="heroicons:trophy" class="text-primary" /> Awards
        </h3>
        
        <div class="space-y-4">
          <div v-for="(award, index) in awards" :key="index" class="p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition flex items-center gap-4">            
            <div>
              <a :href="award.url" target="_blank" rel="noopener noreferrer" class="block">
                <p class="font-bold text-slate-900 text-sm leading-tight underline hover:text-primary">{{ award.title }}</p>
              </a>
              <div class="flex flex-wrap items-center gap-x-2 text-sm text-slate-600 mt-1">
                <span>{{ award.organization }}</span>
                <span class="text-slate-300 hidden sm:inline">|</span>
                <span class="text-slate-500 text-sm">{{ award.year }}</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section id="others" class="scroll-mt-24">
        <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Icon name="heroicons:cpu-chip" class="text-primary" /> Others
        </h3>
        
        <div class="grid sm:grid-cols-2 gap-6">
          <div v-for="(otherGroup, index) in others" :key="index" class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <h4 class="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
              {{ otherGroup.category }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="item in otherGroup.items" :key="item" 
                    class="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>
