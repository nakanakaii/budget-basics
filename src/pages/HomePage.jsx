import { ArrowRight, Lightbulb, PiggyBank, Scale, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'
import LocalClock from '../components/LocalClock.jsx'
import PageHero from '../components/PageHero.jsx'
import TipTicker from '../components/TipTicker.jsx'
import { tips } from '../data/content.js'

const actions = [
  ['Build a budget', '/budgeting-basics', WalletCards],
  ['Sort needs and wants', '/needs-vs-wants', Scale],
  ['Set a savings goal', '/savings-goals', PiggyBank],
  ['Plan my expenses', '/expense-planner', Lightbulb],
]

function getVisits() {
  const visits = Number(sessionStorage.getItem('budgetBasicsVisits') || 0) + 1
  sessionStorage.setItem('budgetBasicsVisits', visits)
  return visits
}

export default function HomePage() {
  const visits = getVisits()
  return (
    <>
      <PageHero eyebrow="Money confidence starts here" title="Make your money work for you">
        <p className="hero-copy">Welcome to BudgetBasics — clear, judgment-free lessons that help you plan spending, save toward goals, and make thoughtful choices.</p>
        <LocalClock />
        <p className="visit-count">Session-only demonstration visit count: {visits}</p>
      </PageHero>
      <section aria-labelledby="start-heading"><h2 id="start-heading">Choose your next step</h2><div className="action-grid">{actions.map(([label, path, Icon]) => <Link data-cta="true" className="action-card" key={path} to={path}><Icon aria-hidden="true" /><span>{label}</span><ArrowRight aria-hidden="true" /></Link>)}</div></section>
      <section className="split-section">
        <div><p className="eyebrow">Small habits, big impact</p><h2>Featured tips</h2><ul className="tips-list">{tips.slice(0, 3).map((tip) => <li key={tip}>{tip}</li>)}</ul></div>
        <div className="facts"><p className="eyebrow">Worth knowing</p><h2>Quick facts</h2><dl><div><dt>50%</dt><dd>A common guide for needs</dd></div><div><dt>20%</dt><dd>A common guide for saving</dd></div><div><dt>24 hrs</dt><dd>A useful pause before optional purchases</dd></div></dl></div>
      </section>
      <TipTicker />
      <aside className="disclaimer"><strong>Educational disclaimer:</strong> BudgetBasics is for educational purposes only and is not personal financial advice. <Link to="/privacy">Read our privacy notice</Link> or browse the <Link to="/sitemap">sitemap</Link>.</aside>
    </>
  )
}
