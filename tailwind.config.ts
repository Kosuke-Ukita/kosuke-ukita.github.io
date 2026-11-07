// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./content/**/*.md"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      },
      fontFamily: {
        // Japanese fallbacks keep Japanese glyph shapes (e.g. in the CI-generated CV PDF on Linux).
        sans: ['Inter', 'system-ui', '-apple-system', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Noto Sans CJK JP', 'Yu Gothic', 'Meiryo', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Noto Sans CJK JP', 'Yu Gothic', 'Meiryo', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}