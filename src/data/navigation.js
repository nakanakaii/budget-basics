export const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Budget Calculator', path: '/50-30-20' },
  { label: 'AI Assistant', path: '/chatbot' },
  { label: 'About', path: '/about' },
  { label: 'Feedback', path: '/feedback' },
  { label: 'Contact', path: '/contact' },
  {
    label: 'Learn Budgeting',
    children: [
      { label: 'Budgeting Basics', path: '/budgeting-basics' },
      { label: 'Needs vs. Wants', path: '/needs-vs-wants' },
      { label: 'Savings Goals', path: '/savings-goals' },
      { label: 'Expense Planner', path: '/expense-planner' },
      { label: 'Money Mistakes', path: '/money-mistakes' },
    ],
  },
  {
    label: 'Practice Planning',
    children: [
      { label: 'Savings Goals', path: '/savings-goals' },
      { label: 'Expense Planner', path: '/expense-planner' },
      { label: 'Money Mistakes', path: '/money-mistakes' },
    ],
  },
  {
    label: 'Explore Resources',
    children: [
      { label: 'Infographics & Gallery', path: '/infographics' },
      { label: 'Search, Sort & Filters', path: '/search' },
    ],
  },
]

const allLinks = navigationItems.flatMap((item) => item.children ?? [item])
export const primaryLinks = Array.from(
  new Map(allLinks.filter(({ path }) => path !== '/search').map(({ label, path }) => [path, [label, path]])).values(),
)
