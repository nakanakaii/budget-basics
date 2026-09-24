export const splitBudget = (income) => ({
  income,
  needs: income * 0.5,
  wants: income * 0.3,
  savings: income * 0.2,
})

export const savingsGoal = ({ target, current, monthly }) => {
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
  const total = expenses.reduce((sum, expense) => sum + expense, 0)
  const remaining = income - total

  return { total, remaining, overspent: remaining < 0 }
}
