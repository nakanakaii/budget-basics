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
      'student-budget': '/budgeting-basics',
      'spending-check': '/needs-vs-wants',
      'goal-steps': '/savings-goals',
      'mistake-review': '/money-mistakes',
    })
  })

  it('explains a quiz answer and allows a retry', async () => {
    const user = userEvent.setup()
    renderPage('/budgeting-basics')
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
    renderPage('/budgeting-basics')
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
    renderPage('/needs-vs-wants')
    await user.click(screen.getByRole('button', { name: /basic groceries.*need/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/correct.*essential food/i)
    await user.click(screen.getByRole('button', { name: /streaming subscription.*need/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/not quite.*optional/i)
    expect(screen.getByText(/can it wait/i)).toBeInTheDocument()
  })

  it('opens a keyboard-accessible money mistake accordion', async () => {
    const user = userEvent.setup()
    renderPage('/money-mistakes')
    const trigger = screen.getByRole('button', { name: /impulse buying/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/corrective action/i)).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: /common money mistakes/i })).getAllByRole('button')).toHaveLength(5)
  })

  it('explains every money mistake', async () => {
    const user = userEvent.setup()
    renderPage('/money-mistakes')
    const accordion = screen.getByRole('region', { name: /common money mistakes/i })
    for (const trigger of within(accordion).getAllByRole('button')) {
      await user.click(trigger)
      expect(within(accordion).getByText('Explanation:')).toBeInTheDocument()
    }
  })

  it('filters searchable infographic cards and resets a real empty state', async () => {
    const user = userEvent.setup()
    renderPage('/infographics')
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
