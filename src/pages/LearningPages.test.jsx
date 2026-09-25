import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../App.jsx'
import { resources } from '../data/content.js'

const renderPage = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

afterEach(cleanup)

describe('interactive learning pages', () => {
  it('links learning resources to registered app routes', () => {
    expect(Object.fromEntries(resources.map(({ id, path }) => [id, path]))).toMatchObject({
      'student-budget': '/learn/budgeting-basics',
      'spending-check': '/learn/needs-vs-wants',
      'goal-steps': '/learn/savings-goals',
      'mistake-review': '/learn/money-mistakes',
    })
  })

  it.each([
    ['/learn/budgeting-basics', /why budgeting matters/i, /how to build a budget/i, /mona plans her month/i],
    ['/learn/needs-vs-wants', /why the difference matters/i, /how to decide/i, /bus pass/i],
    ['/learn/savings-goals', /why savings goals matter/i, /how to build your savings plan/i, /laptop goal example/i],
    ['/learn/expense-planner', /why expense planning matters/i, /how to plan expenses/i, /student month example/i],
    ['/learn/money-mistakes', /why prevention matters/i, /how to prevent money mistakes/i, /student example/i],
  ])('teaches purpose, ordered application, and an example at %s', (path, why, steps, example) => {
    renderPage(path)
    expect(screen.getByRole('heading', { name: why })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: steps })).toBeInTheDocument()
    expect(screen.getByRole('list', { name: /ordered steps/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: example })).toBeInTheDocument()
  })

  it('keeps the savings and expense learning pages as guides, not tools', () => {
    const { unmount } = renderPage('/learn/savings-goals')
    expect(screen.queryByRole('button', { name: /calculate goal/i })).not.toBeInTheDocument()
    unmount()
    renderPage('/learn/expense-planner')
    expect(screen.queryByRole('button', { name: /add expense/i })).not.toBeInTheDocument()
  })

  it('lets students retry, complete all money-mistake scenarios, and restart', async () => {
    const user = userEvent.setup()
    renderPage('/practice/money-mistakes')
    expect(screen.getByText(/scenario 1 of 3/i)).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /flash sale/i })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: /buy it now/i }))
    await user.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/not quite/i)
    await user.click(screen.getByRole('button', { name: /try again/i }))
    await user.click(screen.getByRole('radio', { name: /wait 24 hours/i }))
    await user.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/correct/i)
    await user.click(screen.getByRole('button', { name: /next scenario/i }))
    expect(screen.getByText(/scenario 2 of 3/i)).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: /record the purchases/i }))
    await user.click(screen.getByRole('button', { name: /check answer/i }))
    await user.click(screen.getByRole('button', { name: /next scenario/i }))
    expect(screen.getByText(/scenario 3 of 3/i)).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: /cancel it/i }))
    await user.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByRole('button', { name: /finish practice/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next scenario/i })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /finish practice/i }))
    expect(screen.getByRole('heading', { name: /practice complete/i })).toBeInTheDocument()
    expect(screen.getByText(/completed all 3 scenarios/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /restart practice/i }))
    expect(screen.getByText(/scenario 1 of 3/i)).toBeInTheDocument()
  })

  it('explains a quiz answer and allows a retry', async () => {
    const user = userEvent.setup()
    renderPage('/learn/budgeting-basics')
    expect(screen.getByRole('table', { name: /sample monthly student budget/i })).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText(/which expense is fixed/i), 'Transport pass')
    await user.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/correct.*same amount/i)
    await user.click(screen.getByRole('button', { name: /try again/i }))
    await user.selectOptions(screen.getByLabelText(/which expense is fixed/i), 'Snacks')
    await user.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/not quite.*snacks can change/i)
  })

  it('renders the six canonical budget concepts with student examples', () => {
    renderPage('/learn/budgeting-basics')
    const concepts = screen.getByRole('region', { name: /six building blocks/i })
    for (const name of ['Income', 'Fixed expenses', 'Variable expenses', 'Needs', 'Wants', 'Savings']) {
      expect(within(concepts).getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(within(concepts).getAllByText(/student example:/i)).toHaveLength(6)
    expect(within(concepts).getByText(/mona earns 1,200 sar/i)).toBeInTheDocument()
    expect(within(concepts).getByText(/saves 300 sar toward a laptop/i)).toBeInTheDocument()
  })

  it('classifies needs and wants with reasoning', async () => {
    const user = userEvent.setup()
    renderPage('/learn/needs-vs-wants')
    await user.click(screen.getByRole('button', { name: /basic groceries.*need/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/correct.*essential food/i)
    await user.click(screen.getByRole('button', { name: /streaming subscription.*need/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/not quite.*optional/i)
    expect(screen.getByText(/can it wait/i)).toBeInTheDocument()
  })

  it('opens a keyboard-accessible money mistake accordion', async () => {
    const user = userEvent.setup()
    renderPage('/learn/money-mistakes')
    const trigger = screen.getByRole('button', { name: /impulse buying/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/corrective action/i)).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: /common money mistakes/i })).getAllByRole('button')).toHaveLength(5)
  })

  it('explains every money mistake', async () => {
    const user = userEvent.setup()
    renderPage('/learn/money-mistakes')
    const accordion = screen.getByRole('region', { name: /common money mistakes/i })
    for (const trigger of within(accordion).getAllByRole('button')) {
      await user.click(trigger)
      expect(within(accordion).getByText('Explanation:')).toBeInTheDocument()
    }
  })

  it('filters searchable infographic cards and resets a real empty state', async () => {
    const user = userEvent.setup()
    renderPage('/resources/infographics')
    expect(screen.getAllByRole('img')).toHaveLength(4)
    expect(screen.getByText(/50% needs, 30% wants, and 20% savings/i)).toBeInTheDocument()
    const all = screen.getByRole('button', { name: /all topics/i })
    const saving = screen.getByRole('button', { name: /saving challenges/i })
    expect(all).toHaveAttribute('aria-pressed', 'true')
    expect(saving).toHaveAttribute('aria-pressed', 'false')
    await user.click(saving)
    expect(all).toHaveAttribute('aria-pressed', 'false')
    expect(saving).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('img')).toHaveLength(1)
    await user.type(screen.getByRole('searchbox', { name: /search infographics/i }), 'unfindable')
    expect(screen.getByText(/no infographics match/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /reset gallery/i }))
    expect(screen.getAllByRole('img')).toHaveLength(4)
  })
})
