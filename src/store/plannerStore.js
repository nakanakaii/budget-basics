let entries = []
let nextId = 1

const state = () => {
  const totalIncome = entries.filter(({ type }) => type === 'income').reduce((sum, { amount }) => sum + amount, 0)
  const totalExpenses = entries.filter(({ type }) => type === 'expense').reduce((sum, { amount }) => sum + amount, 0)
  return { entries: [...entries], totalIncome, totalExpenses, balance: totalIncome - totalExpenses }
}

export const plannerStore = {
  add(entry) {
    const saved = { ...entry, id: `entry-${nextId++}` }
    entries = [...entries, saved]
    return saved
  },
  update(id, changes) {
    let updated
    entries = entries.map((entry) => {
      if (entry.id !== id) return entry
      updated = { ...entry, ...changes, id }
      return updated
    })
    return updated
  },
  remove(id) {
    entries = entries.filter((entry) => entry.id !== id)
  },
  reset() {
    entries = []
    nextId = 1
  },
  getState: state,
}
