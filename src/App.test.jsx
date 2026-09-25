import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode } from 'react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.jsx'
import LocalClock from './components/LocalClock.jsx'

function LocationProbe() {
  return <output data-testid="location">{useLocation().pathname}</output>
}

const renderApp = (path = '/') => render(
  <MemoryRouter initialEntries={[path]}>
    <App />
    <LocationProbe />
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

  it('renders canonical navigation in the required order', () => {
    renderApp()
    const navigation = screen.getByRole('navigation', { name: /primary/i })

    expect(Array.from(navigation.children, (item) => item.matches('a') ? item.textContent : item.querySelector(':scope > button').textContent)).toEqual([
      'Home', 'Learn Budgeting', 'Practice Planning', 'Explore Resources',
      'Budget Calculator', 'AI Assistant', 'About', 'Feedback', 'Contact',
    ])
    expect(navigation.querySelector('a[href="/budget-calculator"]')).toHaveTextContent('Budget Calculator')
    for (const label of ['Learn Budgeting', 'Practice Planning', 'Explore Resources']) {
      const trigger = screen.getByRole('button', { name: label })
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).toHaveAttribute('aria-controls')
    }
  })

  it('lists the required children in each navigation group', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: 'Learn Budgeting' }))
    const learn = document.getElementById(screen.getByRole('button', { name: 'Learn Budgeting' }).getAttribute('aria-controls'))
    expect(Array.from(learn.querySelectorAll('a'), (link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Budgeting Basics', '/learn/budgeting-basics'], ['Needs vs. Wants', '/learn/needs-vs-wants'],
      ['Savings Goals', '/learn/savings-goals'], ['Expense Planner', '/learn/expense-planner'], ['Money Mistakes', '/learn/money-mistakes'],
    ])

    await user.click(screen.getByRole('button', { name: 'Practice Planning' }))
    const practice = document.getElementById(screen.getByRole('button', { name: 'Practice Planning' }).getAttribute('aria-controls'))
    expect(Array.from(practice.querySelectorAll('a'), (link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Savings Goals', '/practice/savings-goals'], ['Expense Planner', '/practice/expense-planner'], ['Money Mistakes', '/practice/money-mistakes'],
    ])

    await user.click(screen.getByRole('button', { name: 'Explore Resources' }))
    const explore = document.getElementById(screen.getByRole('button', { name: 'Explore Resources' }).getAttribute('aria-controls'))
    expect(Array.from(explore.querySelectorAll('a'), (link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Infographics & Gallery', '/resources/infographics'], ['Search, Sort & Filters', '/resources/search'],
    ])
  })

  it('keeps only one navigation group open and closes it with Escape', async () => {
    const user = userEvent.setup()
    renderApp()
    const learn = screen.getByRole('button', { name: 'Learn Budgeting' })
    const practice = screen.getByRole('button', { name: 'Practice Planning' })

    await user.click(learn)
    expect(learn).toHaveAttribute('aria-expanded', 'true')
    await user.click(practice)
    expect(learn).toHaveAttribute('aria-expanded', 'false')
    expect(practice).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(practice).toHaveAttribute('aria-expanded', 'false')
  })

  it.each([
    ['/learn/budgeting-basics', 'Learn Budgeting'],
    ['/practice/savings-goals', 'Practice Planning'],
    ['/resources/infographics', 'Explore Resources'],
  ])('marks the parent group active for %s', (path, group) => {
    renderApp(path)

    const navigation = screen.getByRole('navigation', { name: /primary/i })
    expect(navigation.querySelector(`a[href="${path}"]`)).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: group })).toHaveAttribute('data-active', 'true')
  })

  it('closes an open group after a child route change and closes the mobile menu', async () => {
    const user = userEvent.setup()
    renderApp()
    const menu = screen.getByRole('button', { name: /navigation menu/i })
    const group = screen.getByRole('button', { name: 'Learn Budgeting' })
    await user.click(menu)
    await user.click(group)
    await user.click(screen.getByRole('navigation', { name: /primary/i }).querySelector('a[href="/learn/budgeting-basics"]'))

    expect(group).toHaveAttribute('aria-expanded', 'false')
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes open navigation groups when clicking outside the header', async () => {
    const user = userEvent.setup()
    renderApp()
    const group = screen.getByRole('button', { name: 'Explore Resources' })
    await user.click(group)
    await user.click(screen.getByRole('main'))
    expect(group).toHaveAttribute('aria-expanded', 'false')
  })

  it.each([
    ['/sitemap', /sitemap/i],
    ['/privacy', /privacy notice/i],
  ])('renders %s', (path, heading) => {
    renderApp(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('lists every application destination on the sitemap', () => {
    renderApp('/sitemap')
    const sitemap = screen.getByRole('main')
    const paths = Array.from(sitemap.querySelectorAll('a'), (link) => link.getAttribute('href'))
    expect(paths).toEqual(expect.arrayContaining([
      '/', '/learn/budgeting-basics', '/learn/needs-vs-wants', '/learn/savings-goals', '/learn/expense-planner',
      '/learn/money-mistakes', '/practice/savings-goals', '/practice/expense-planner', '/practice/money-mistakes',
      '/resources/infographics', '/resources/search', '/budget-calculator', '/chatbot', '/about', '/feedback',
      '/contact', '/sitemap', '/privacy',
    ]))
  })

  it.each([
    ['/budgeting-basics', '/learn/budgeting-basics'],
    ['/needs-vs-wants', '/learn/needs-vs-wants'],
    ['/savings-goals', '/practice/savings-goals'],
    ['/expense-planner', '/practice/expense-planner'],
    ['/money-mistakes', '/learn/money-mistakes'],
    ['/infographics', '/resources/infographics'],
    ['/search', '/resources/search'],
    ['/50-30-20', '/budget-calculator'],
  ])('redirects legacy route %s to %s', (legacy, canonical) => {
    renderApp(legacy)
    expect(screen.getByTestId('location')).toHaveTextContent(canonical)
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
