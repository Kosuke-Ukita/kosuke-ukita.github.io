// Fade in images when they finish loading to avoid jarring progressive rendering.
// Images marked with data-no-fade are skipped (managed individually by Vue).
export default defineNuxtPlugin(() => {
  const setup = (img: HTMLImageElement) => {
    if ('noFade' in img.dataset) return
    if (img.complete && img.naturalWidth > 0) return

    img.style.opacity = '0'
    const onDone = () => {
      img.style.transition = 'opacity 0.35s ease'
      img.style.opacity = '1'
    }
    img.addEventListener('load', onDone, { once: true })
    img.addEventListener('error', onDone, { once: true })
  }

  document.querySelectorAll<HTMLImageElement>('img').forEach(setup)

  const observer = new MutationObserver(mutations => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (node instanceof HTMLImageElement) {
          setup(node)
        } else if (node instanceof Element) {
          node.querySelectorAll<HTMLImageElement>('img').forEach(setup)
        }
      }
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })
})
