import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App.jsx'
import { usePlannerStore } from '../store/plannerStore.js'

const renderPage = () => render(<MemoryRouter initialEntries={['/expense-planner']}><App /></MemoryRouter>)

const addExpense = async (user, { date = '2026-09-24', category = 'Food', description = 'Lunch', amount = '50' } = {}) => {
  await user.type(screen.getByLabelText(/^date/i), date)
  await user.selectOptions(screen.getByLabelText(/^category/i), category)
  await user.type(screen.getByLabelText(/^description/i), description)
  await user.type(screen.getByLabelText(/^amount/i), amount)
  await user.click(screen.getByRole('button', { name: /add expense/i }))
}

describe('expense planner', () => {
  beforeEach(() => usePlannerStore.getState().reset())
  afterEach(() => { cleanup(); vi.restoreAllMocks() })

  it('adds, edits, and deletes expenses while updating totals', async () => {
    const user = userEvent.setup()
    renderPage()
    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument()
    await user.type(screen.getByLabelText(/sample monthly income/i), '1000')
    await addExpense(user)
    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByText(/total expenses:/i)).toHaveTextContent(/SAR\s*50.00/i)
    expect(screen.getByText(/remaining:/i)).toHaveTextContent(/SAR\s*950.00/i)

    await user.click(screen.getByRole('button', { name: /edit lunch/i }))
    const amount = screen.getByLabelText(/^amount/i)
    await user.clear(amount)
    await user.type(amount, '75')
    await user.click(screen.getByRole('button', { name: /save expense/i }))
    expect(screen.getByText(/total expenses:/i)).toHaveTextContent(/SAR\s*75.00/i)

    await user.click(screen.getByRole('button', { name: /delete lunch/i }))
    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument()
    expect(screen.getByText(/total expenses:/i)).toHaveTextContent(/SAR\s*0.00/i)
  })

  it('warns when expenses exceed income', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText(/sample monthly income/i), '25')
    await addExpense(user)
    expect(screen.getByRole('alert')).toHaveTextContent(/over budget/i)
    expect(screen.getByText(/remaining:/i)).toHaveTextContent(/-SAR\s*25.00/i)
  })

  it('validates every expense field', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    expect(screen.getAllByRole('alert')).toHaveLength(4)
    for (const label of ['Date', 'Category', 'Description', 'Amount']) {
      const field = screen.getByLabelText(new RegExp(`^${label}`, 'i'))
      expect(field).toHaveAttribute('aria-invalid', 'true')
      expect(field).toHaveAttribute('aria-describedby', `${field.id}-error`)
      expect(document.getElementById(`${field.id}-error`)).toHaveAttribute('role', 'alert')
    }
  })

  it('cancels editing when the edited expense is deleted and allows a fresh add', async () => {
    const user = userEvent.setup()
    renderPage()
    await addExpense(user)
    await user.click(screen.getByRole('button', { name: /edit lunch/i }))
    await user.click(screen.getByRole('button', { name: /delete lunch/i }))
    expect(screen.getByRole('heading', { name: /add an expense/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/^description/i)).toHaveValue('')
    await addExpense(user, { description: 'Dinner', amount: '60' })
    expect(screen.getByText('Dinner')).toBeInTheDocument()
  })

  it.each(['', '-1', 'not-a-number', 'Infinity'])('rejects invalid sample income %j without showing a misleading summary', async (value) => {
    const user = userEvent.setup()
    renderPage()
    const income = screen.getByLabelText(/sample monthly income/i)
    if (value) await user.type(income, value)
    else await user.click(income)
    await user.tab()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.queryByText(/total expenses:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/remaining:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/NaN|Infinity|SAR\s*0\.00/i)).not.toBeInTheDocument()
  })

  it.each(['-1', 'not-a-number', 'Infinity'])('rejects invalid expense amount %j', async (value) => {
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText(/^date/i), '2026-09-24')
    await user.selectOptions(screen.getByLabelText(/^category/i), 'Food')
    await user.type(screen.getByLabelText(/^description/i), 'Lunch')
    await user.type(screen.getByLabelText(/^amount/i), value)
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument()
    expect(screen.queryByText(/NaN|Infinity/)).not.toBeInTheDocument()
  })

  it('resets the temporary plan after confirmation', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderPage()
    await addExpense(user)
    await user.click(screen.getByRole('button', { name: /reset plan/i }))
    expect(window.confirm).toHaveBeenCalled()
    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument()
    expect(screen.getByText(/temporary.*not permanently stored/i)).toBeInTheDocument()
  })
})
