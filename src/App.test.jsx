import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.jsx'
import LocalClock from './components/LocalClock.jsx'

const renderApp = (path = '/') => render(
  <MemoryRouter initialEntries={[path]}>
    <App />
  </MemoryRouter>,
)

describe('BudgetBasics app shell', () => {
  beforeEach(() => {
    sessionStorage.clear()
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true })
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders the complete home page', () => {
    renderApp()

    expect(screen.getAllByLabelText(/budgetbasics home/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { level: 1, name: /build a budget/i })).toBeInTheDocument()
    expect(screen.getByText(/local time/i)).toBeInTheDocument()
    expect(screen.getByText(/session-only demonstration visit count: 1/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /featured tips/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /quick facts/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/money tip ticker/i)).toBeInTheDocument()
    expect(screen.getByText(/educational purposes only/i)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /privacy/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /sitemap/i }).length).toBeGreaterThan(0)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getAllByRole('link').filter((link) => link.dataset.cta)).toHaveLength(4)
  })

  it('offers an accessible mobile menu that closes after navigation', async () => {
    const user = userEvent.setup()
    renderApp()

    const toggle = screen.getByRole('button', { name: /navigation menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getByRole('navigation', { name: /primary/i }).querySelector('a[href="/about"]'))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('lists all twelve primary destinations and marks the active link', () => {
    renderApp('/budgeting-basics')

    const navigation = screen.getByRole('navigation', { name: /primary/i })
    expect(navigation.querySelectorAll('a')).toHaveLength(12)
    expect(navigation.querySelector('a[href="/budgeting-basics"]')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('heading', { name: /budgeting basics/i })).toBeInTheDocument()
  })

  it.each([
    ['/sitemap', /sitemap/i],
    ['/privacy', /privacy notice/i],
  ])('renders %s', (path, heading) => {
    renderApp(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('renders an honest not-found page for unknown routes', () => {
    renderApp('/missing-page')
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument()
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument()
  })

  it('shows a safe back-to-top control after scrolling', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    renderApp()
    window.scrollY = 500
    fireEvent.scroll(window)
    await userEvent.click(screen.getByRole('button', { name: /back to top/i }))
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('uses instant back-to-top scrolling when reduced motion is preferred', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    renderApp()
    window.scrollY = 500
    fireEvent.scroll(window)
    await userEvent.click(screen.getByRole('button', { name: /back to top/i }))
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('closes the mobile menu when a non-primary link changes location', async () => {
    const user = userEvent.setup()
    renderApp('/privacy')
    const toggle = screen.getByRole('button', { name: /navigation menu/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('navigation', { name: /legal/i }).querySelector('a[href="/sitemap"]'))
    expect(screen.getByRole('heading', { level: 1, name: /sitemap/i })).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('increments the session-only demonstration count once in StrictMode', () => {
    render(
      <StrictMode>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </StrictMode>,
    )

    expect(screen.getByText(/session-only demonstration visit count: 1/i)).toBeInTheDocument()
    expect(sessionStorage.getItem('budgetBasicsVisits')).toBe('1')
  })

  it('updates local time and clears its timer on unmount', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-24T09:00:00Z'))
    const clearInterval = vi.spyOn(window, 'clearInterval')
    const { unmount } = render(<LocalClock />)
    const initial = screen.getByRole('time').textContent

    act(() => {
      vi.setSystemTime(new Date('2026-09-24T09:01:00Z'))
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByRole('time').textContent).not.toBe(initial)
    unmount()
    expect(clearInterval).toHaveBeenCalled()
  })
})
