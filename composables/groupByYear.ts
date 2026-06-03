export const groupByYear = <T>(
  items: T[],
  getYear: (item: T) => string
): { year: string; items: T[] }[] => {
  const map: Record<string, T[]> = {}
  for (const item of items) {
    const year = getYear(item)
    if (!map[year]) map[year] = []
    map[year].push(item)
  }
  return Object.entries(map)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }))
}
