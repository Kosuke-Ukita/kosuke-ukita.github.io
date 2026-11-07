import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // content/biography/{en,jp}.md
    biography: defineCollection({
      type: 'page',
      source: 'biography/*.md',
    }),
    // content/news/YYYY-MM-DD.md
    news: defineCollection({
      type: 'page',
      source: 'news/*.md',
      schema: z.object({
        date: z.string(),
        content: z.string(),
        contentjp: z.string(),
      }),
    }),
  },
})
