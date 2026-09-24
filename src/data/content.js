export const concepts = [
  { id: 'income', title: 'Income', summary: 'Money you receive, such as wages, allowance, or gifts.', studentExample: 'Mona earns 1,200 SAR from weekend work.' },
  { id: 'fixed-expenses', title: 'Fixed expenses', summary: 'Costs that stay the same each month.', studentExample: 'Her transport pass costs 200 SAR every month.' },
  { id: 'variable-expenses', title: 'Variable expenses', summary: 'Costs that can change from month to month.', studentExample: 'Her snack spending changes depending on her schedule.' },
  { id: 'needs', title: 'Needs', summary: 'Essentials required for daily life, health, or study.', studentExample: 'Basic groceries and transport to class come first.' },
  { id: 'wants', title: 'Wants', summary: 'Optional purchases that improve life but can wait.', studentExample: 'A concert ticket is enjoyable but not essential.' },
  { id: 'savings', title: 'Savings', summary: 'Money set aside for goals or unexpected costs.', studentExample: 'Mona saves 300 SAR toward a laptop.' },
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
  { title: 'Impulse buying', explanation: 'Unplanned purchases trade a longer-term priority for a brief feeling of urgency.', scenario: 'A flash sale makes you buy headphones you did not plan for.', consequence: 'Your savings goal is delayed.', action: 'Wait 24 hours and compare the purchase with your priorities.', prevention: 'Remove saved payment details and keep a wish list.' },
  { title: 'Ignoring small expenses', explanation: 'Frequent small costs are easy to overlook but can consume a meaningful share of income.', scenario: 'Daily drinks and snacks go unrecorded.', consequence: 'Small costs become a large monthly total.', action: 'Review recent transactions and add them to the plan.', prevention: 'Record purchases immediately or check spending weekly.' },
  { title: 'Late payments', explanation: 'Missing a due date turns an ordinary bill into a more expensive problem.', scenario: 'A phone bill is forgotten past its due date.', consequence: 'Fees grow and service may be interrupted.', action: 'Pay the bill and contact the provider if help is needed.', prevention: 'Use calendar reminders or automatic payments.' },
  { title: 'Unused subscriptions', explanation: 'Automatic renewals can hide spending on services that no longer provide value.', scenario: 'A streaming service renews even though nobody watches it.', consequence: 'Money leaves the account without providing value.', action: 'Cancel the service and check for a refund policy.', prevention: 'Review subscriptions every month.' },
  { title: 'Spending without a plan', explanation: 'Without category limits, early choices can leave essential later costs unfunded.', scenario: 'Allowance is spent during the first week.', consequence: 'Nothing remains for transport and study costs.', action: 'List income and protect essential categories first.', prevention: 'Make a simple budget before spending begins.' },
]

export const tips = [
  'Check your balance before buying.',
  'Automate a small savings transfer.',
  'Review subscriptions every month.',
  'Compare prices using the total cost.',
  'Celebrate progress without breaking the plan.',
]

export const resources = [
  { id: 'student-budget', title: 'Plan a student budget', description: 'Build a monthly plan from part-time income, allowance, and regular study costs.', topic: 'budget', path: '/budgeting-basics', keywords: ['budget', 'student', 'income', 'expenses'] },
  { id: 'spending-check', title: 'Check needs and wants', description: 'Practice deciding which purchases are essential and which can wait.', topic: 'needs-wants', path: '/needs-vs-wants', keywords: ['needs', 'wants', 'spending', 'choices'] },
  { id: 'goal-steps', title: 'Turn savings into a goal', description: 'Set a target, contribution amount, and realistic timeline for something important.', topic: 'saving', path: '/savings-goals', keywords: ['saving', 'goal', 'target', 'monthly'] },
  { id: 'mistake-review', title: 'Learn from money mistakes', description: 'Explore everyday student scenarios and choose a practical corrective action.', topic: 'money-mistakes', path: '/money-mistakes', keywords: ['mistakes', 'habits', 'students', 'action'] },
]
