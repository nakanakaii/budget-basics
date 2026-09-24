import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../App.jsx'

const renderPage = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

afterEach(cleanup)

describe('interactive learning pages', () => {
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

  it('filters searchable infographic cards and resets a real empty state', async () => {
    const user = userEvent.setup()
    renderPage('/infographics')
    expect(screen.getAllByRole('img')).toHaveLength(4)
    expect(screen.getByText(/50% needs, 30% wants, and 20% savings/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /saving challenges/i }))
    expect(screen.getAllByRole('img')).toHaveLength(1)
    await user.type(screen.getByRole('searchbox', { name: /search infographics/i }), 'unfindable')
    expect(screen.getByText(/no infographics match/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /reset gallery/i }))
    expect(screen.getAllByRole('img')).toHaveLength(4)
  })
})
