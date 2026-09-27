export const navigationItems = [
  { label: "Home", path: "/" },
  {
    label: "Learn Budgeting",
    children: [
      { label: "Budgeting Basics", path: "/learn/budgeting-basics" },
      { label: "Needs vs. Wants", path: "/learn/needs-vs-wants" },
      { label: "Savings Goals", path: "/learn/savings-goals" },
      { label: "Expense Planner", path: "/learn/expense-planner" },
      { label: "Money Mistakes", path: "/learn/money-mistakes" },
    ],
  },
  {
    label: "Practice Planning",
    children: [
      { label: "Savings Goals", path: "/practice/savings-goals" },
      { label: "Expense Planner", path: "/practice/expense-planner" },
      { label: "Money Mistakes", path: "/practice/money-mistakes" },
    ],
  },
  {
    label: "Explore Resources",
    children: [
      { label: "Infographics & Gallery", path: "/resources/infographics" },
      { label: "Search, Sort & Filters", path: "/resources/search" },
    ],
  },
  { label: "Budget Calculator", path: "/budget-calculator" },
  { label: "AI Assistant", path: "/chatbot" },
  { label: "About", path: "/about" },
  { label: "Feedback", path: "/feedback" },
  { label: "Contact", path: "/contact" },
];

const allLinks = navigationItems.flatMap((item) => item.children ?? [item]);
export const primaryLinks = Array.from(
  new Map(
    allLinks
      .filter(({ path }) => path !== "/resources/search")
      .map(({ label, path }) => [path, [label, path]]),
  ).values(),
);
