const normalize = (value) => value.toLowerCase().trim().replace(/\s+/g, ' ')

export const searchContent = (entries, query = '', topic) => {
  const term = normalize(query)

  return entries
    .filter((entry) => !topic || entry.topic === topic)
    .filter((entry) => !term || normalize([entry.title, entry.summary, ...(entry.keywords ?? [])].filter(Boolean).join(' ')).includes(term))
    .toSorted((a, b) => a.title.localeCompare(b.title))
}
