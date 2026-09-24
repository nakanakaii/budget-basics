import { useState } from 'react'
import BudgetChart from '../components/BudgetChart.jsx'
import MoneyField from '../components/MoneyField.jsx'
import PageHero from '../components/PageHero.jsx'
import { splitBudget } from '../lib/finance.js'
import { budgetSchema } from '../lib/validation.js'
const currency = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' })
export default function BudgetCalculatorPage() {
  const [income, setIncome] = useState(''), [result, setResult] = useState(null), [error, setError] = useState('')
  const calculate = (event) => { event.preventDefault(); const value = income.trim() === '' ? NaN : Number(income); const values = Number.isFinite(value) && value >= 0 ? splitBudget(value) : { income: value, needs: value, wants: value, savings: value }; const parsed = budgetSchema.safeParse(values); if (!parsed.success) { setError(parsed.error.issues[0].message); setResult(null) } else { setError(''); setResult(parsed.data) } }
  const parts = result && [{ label: 'Needs', percent: 50, value: result.needs }, { label: 'Wants', percent: 30, value: result.wants }, { label: 'Savings', percent: 20, value: result.savings }]
  return <><PageHero eyebrow="Budget calculator" title="The 50/30/20 guideline"><p>Use 50% of monthly income for needs, 30% for wants, and 20% for savings. It is a flexible starting point, not a rule.</p></PageHero><section className="calculator-layout"><form className="tool-card" onSubmit={calculate} noValidate><h2>Try your income</h2><MoneyField id="budget-income" label="Monthly income" type="text" value={income} onChange={(e) => { setIncome(e.target.value); setResult(null); setError('') }} error={error} /><button className="primary-button">Calculate budget</button></form>{result && <div className="tool-card results" aria-live="polite"><h2>Your monthly estimate</h2><p>Monthly income: <strong>{currency.format(result.income)}</strong></p><BudgetChart parts={parts} /><ul>{parts.map(({ label, percent, value }) => <li key={label}><span>{label} ({percent}%)</span><strong>{currency.format(value)}</strong></li>)}</ul></div>}</section><p className="disclaimer">These estimates are for educational purposes only and are not financial advice. Your needs and priorities may require a different budget.</p></>
}
