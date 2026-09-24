export const concepts = [
  { id: 'income', title: 'Income', summary: 'Money you receive from work, allowance, gifts, or a small business.', studentExample: 'Mona earns 600 SAR from a weekend job.' },
  { id: 'expenses', title: 'Expenses', summary: 'Money you spend on needs and wants.', studentExample: 'Mona spends 80 SAR on transport and 40 SAR on snacks.' },
  { id: 'budget', title: 'Budget', summary: 'A plan that gives each part of your income a purpose.', studentExample: 'Mona plans her 600 SAR before the month begins.' },
  { id: 'needs-wants', title: 'Needs and wants', summary: 'Needs are essential; wants are optional improvements.', studentExample: 'A bus pass is a need; a second pair of headphones is a want.' },
  { id: 'saving', title: 'Saving', summary: 'Money kept for a goal or unexpected cost.', studentExample: 'Mona saves 60 SAR each month for a laptop.' },
  { id: 'goals', title: 'Financial goals', summary: 'Specific money targets with an amount and deadline.', studentExample: 'Save 600 SAR for a course in ten months.' },
]

export const quiz = [
  { question: 'Which item is usually a need for a student commuting to class?', options: ['Bus fare', 'Gaming skin', 'Concert ticket'], answer: 'Bus fare' },
  { question: 'What does a budget do?', options: ['Plans income', 'Creates free money', 'Removes every want'], answer: 'Plans income' },
  { question: 'Under 50/30/20, what share is suggested for savings?', options: ['20%', '30%', '50%'], answer: '20%' },
]

export const needsAndWants = [
  { item: 'Basic groceries', kind: 'need', reasoning: 'They provide essential food.' },
  { item: 'School transport', kind: 'need', reasoning: 'It enables attendance when no free option is available.' },
  { item: 'Streaming subscription', kind: 'want', reasoning: 'Entertainment is optional and can be paused.' },
  { item: 'Latest phone upgrade', kind: 'want', reasoning: 'A working current phone already meets the basic need.' },
]

export const moneyMistakes = [
  { title: 'Spending before planning', scenario: 'Allowance arrives and is spent in the first week.', consequence: 'No money remains for transport.', action: 'Set category limits on payday.', tip: 'Plan before the first purchase.' },
  { title: 'Ignoring small purchases', scenario: 'Daily drinks are never recorded.', consequence: 'The monthly total is surprising.', action: 'Record purchases immediately.', tip: 'Small costs still count.' },
  { title: 'Saving only leftovers', scenario: 'Saving waits until month end.', consequence: 'Nothing is usually left.', action: 'Move savings first.', tip: 'Treat saving like a bill.' },
  { title: 'Buying under pressure', scenario: 'A limited-time offer triggers a quick purchase.', consequence: 'A higher-priority goal is delayed.', action: 'Wait 24 hours before optional purchases.', tip: 'Urgency is often marketing.' },
  { title: 'No emergency buffer', scenario: 'A device repair appears unexpectedly.', consequence: 'Money must be borrowed.', action: 'Build a small emergency fund.', tip: 'Start small and contribute regularly.' },
]

export const tips = [
  'Check your balance before buying.',
  'Automate a small savings transfer.',
  'Review subscriptions every month.',
  'Compare prices using the total cost.',
  'Celebrate progress without breaking the plan.',
]

export const resources = [
  { id: 'student-budget', title: 'Plan a student budget', description: 'Build a monthly plan from part-time income, allowance, and regular study costs.', topic: 'budget', path: '/learn/student-budget', keywords: ['budget', 'student', 'income', 'expenses'] },
  { id: 'spending-check', title: 'Check needs and wants', description: 'Practice deciding which purchases are essential and which can wait.', topic: 'needs-wants', path: '/learn/needs-and-wants', keywords: ['needs', 'wants', 'spending', 'choices'] },
  { id: 'goal-steps', title: 'Turn savings into a goal', description: 'Set a target, contribution amount, and realistic timeline for something important.', topic: 'saving', path: '/learn/savings-goals', keywords: ['saving', 'goal', 'target', 'monthly'] },
  { id: 'mistake-review', title: 'Learn from money mistakes', description: 'Explore everyday student scenarios and choose a practical corrective action.', topic: 'money-mistakes', path: '/learn/money-mistakes', keywords: ['mistakes', 'habits', 'students', 'action'] },
]
