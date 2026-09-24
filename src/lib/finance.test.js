import { describe, expect, it } from 'vitest'
import { expenseSummary, savingsGoal, splitBudget } from './finance.js'

describe('finance', () => {
  it('splits income using the 50/30/20 rule', () => {
    expect(splitBudget(1000)).toEqual({ income: 1000, needs: 500, wants: 300, savings: 200 })
  })

  it('calculates a savings goal', () => {
    expect(savingsGoal({ target: 1000, current: 250, monthly: 200 })).toEqual({
      target: 1000, current: 250, monthly: 200, remaining: 750, months: 4, progress: 25, complete: false,
    })
  })

  it('caps an overfunded savings goal', () => {
    expect(savingsGoal({ target: 1000, current: 1200, monthly: 0 })).toMatchObject({
      remaining: 0, months: 0, progress: 100, complete: true,
    })
  })

  it('uses null months when an incomplete goal has no monthly contribution', () => {
    expect(savingsGoal({ target: 1000, current: 250, monthly: 0 }).months).toBeNull()
  })

  it('summarizes expenses', () => {
    expect(expenseSummary(1000, [200, 350])).toEqual({ total: 550, remaining: 450, overspent: false })
  })

  it.each([
    ['negative income', () => splitBudget(-1), RangeError, 'Income must be zero or more'],
    ['NaN income', () => splitBudget(Number.NaN), TypeError, 'Income must be a finite number'],
    ['infinite target', () => savingsGoal({ target: Infinity, current: 0, monthly: 0 }), TypeError, 'Target must be a finite number'],
    ['negative contribution', () => savingsGoal({ target: 10, current: 0, monthly: -1 }), RangeError, 'Monthly contribution must be zero or more'],
    ['invalid expense', () => expenseSummary(100, [20, 'bad']), TypeError, 'Expense must be a finite number'],
    ['negative expense', () => expenseSummary(100, [-1]), RangeError, 'Expense must be zero or more'],
  ])('rejects %s', (_case, action, ErrorType, message) => {
    expect(action).toThrow(ErrorType)
    expect(action).toThrow(message)
  })

  it('treats a zero-value goal as complete', () => {
    expect(savingsGoal({ target: 0, current: 0, monthly: 0 })).toMatchObject({
      remaining: 0, months: 0, progress: 100, complete: true,
    })
  })
})
