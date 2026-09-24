import { createStore } from 'zustand/vanilla'
import { create } from 'zustand'

const totals = (entries) => {
  const totalIncome = entries.filter(({ type }) => type === 'income').reduce((sum, { amount }) => sum + amount, 0)
  const totalExpenses = entries.filter(({ type }) => type === 'expense').reduce((sum, { amount }) => sum + amount, 0)
  return { entries, totalIncome, totalExpenses, balance: totalIncome - totalExpenses }
}

const createPlannerState = () => {
  let nextId = 1
  return (set, get) => ({
    ...totals([]),
    add: (entry) => {
      const saved = { ...entry, id: `entry-${nextId++}` }
      set(totals([...get().entries, saved]))
      return saved
    },
    update: (id, changes) => {
      let updated
      const entries = get().entries.map((entry) => {
        if (entry.id !== id) return entry
        updated = { ...entry, ...changes, id }
        return updated
      })
      set(totals(entries))
      return updated
    },
    remove: (id) => {
      set(totals(get().entries.filter((entry) => entry.id !== id)))
    },
    reset: () => {
      nextId = 1
      set(totals([]))
    },
  })
}

export const createPlannerStore = () => {
  const store = createStore(createPlannerState())

  return Object.assign(store, {
    add: (...args) => store.getState().add(...args),
    update: (...args) => store.getState().update(...args),
    remove: (...args) => store.getState().remove(...args),
    reset: (...args) => store.getState().reset(...args),
  })
}

export const plannerStore = createPlannerStore()
export const usePlannerStore = create(createPlannerState())
