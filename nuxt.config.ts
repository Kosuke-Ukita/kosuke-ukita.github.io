// nuxt.config.ts
import yaml from '@modyfi/vite-plugin-yaml'

export default defineNuxtConfig({
  vite: {
    plugins: [yaml()],
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
    '@nuxt/content'
  ],
  content: {
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex']
    }
  },

  site: {
    url: 'https://Kosuke-ukita.github.io',
    name: 'Kosuke Ukita',
  },

  app: {
    baseURL: '/',
    head: {
      title: 'Kosuke Ukita',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal website of Kosuke Ukita, PhD student at Kyushu Institute of Technology.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-01'
})
