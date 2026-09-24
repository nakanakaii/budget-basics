const normalize = (value) => value.toLowerCase().trim().replace(/\s+/g, ' ')

export const searchContent = (entries, query = '', topic = 'all', sort = 'title') => {
  const term = normalize(query)

  return entries
    .filter((entry) => topic === 'all' || entry.topic === topic)
    .filter((entry) => !term || normalize([entry.title, entry.summary, entry.description, ...(entry.keywords ?? [])].filter(Boolean).join(' ')).includes(term))
    .toSorted((a, b) => sort === 'title' ? a.title.localeCompare(b.title) || a.id?.localeCompare(b.id) || 0 : 0)
}
