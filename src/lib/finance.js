const money = (value, label) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new TypeError(`${label} must be a finite number`)
  if (value < 0) throw new RangeError(`${label} must be zero or more`)
  return value
}

export const splitBudget = (income) => {
  money(income, 'Income')
  return { income, needs: income * 0.5, wants: income * 0.3, savings: income * 0.2 }
}

export const savingsGoal = ({ target, current, monthly }) => {
  money(target, 'Target')
  money(current, 'Current savings')
  money(monthly, 'Monthly contribution')
  const remaining = Math.max(target - current, 0)
  const complete = remaining === 0

  return {
    target,
    current,
    monthly,
    remaining,
    months: complete ? 0 : monthly > 0 ? Math.ceil(remaining / monthly) : null,
    progress: target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 100,
    complete,
  }
}

export const expenseSummary = (income, expenses) => {
  money(income, 'Income')
  if (!Array.isArray(expenses)) throw new TypeError('Expenses must be an array')
  const amounts = expenses.map((expense) => money(typeof expense === 'number' ? expense : expense?.amount, 'Expense'))
  const total = amounts.reduce((sum, amount) => sum + amount, 0)
  const remaining = income - total

  return { total, remaining, overspent: remaining < 0 }
}
