export const useHScroll = () => {
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).scrollLeft += e.deltaY + e.deltaX
  }

  return { handleWheel }
}
