const LINK_ICONS: Record<string, string> = {
  PDF:    'fa6-regular:file-pdf',
  Code:   'fa6-solid:code',
  Page:   'fa7-solid:arrow-up-right-from-square',
  Arxiv:  'academicons:arxiv',
  Cite:   'fa7-solid:quote-right',
  Slides: 'fa7-solid:chalkboard',
  Poster: 'fa6-regular:file-image',
}

export const usePubUtils = () => {
  const highlightAuthor = (authors: string) =>
    authors
      .replace(/Kosuke Ukita/g, '<strong>Kosuke Ukita</strong>')
      .replace(/浮田嵩祐/g, '<strong>浮田嵩祐</strong>')

  const linkIcon = (name: string, fallback?: string): string =>
    LINK_ICONS[name] ?? fallback ?? 'heroicons:link'

  return { highlightAuthor, linkIcon }
}
