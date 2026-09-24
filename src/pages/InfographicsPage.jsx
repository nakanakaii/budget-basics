import { useState } from 'react'
import InfographicArt from '../components/InfographicArt.jsx'
import PageHero from '../components/PageHero.jsx'
import infographics from '../data/infographics.json'

const filters = [['all', 'All topics'], ['needs-vs-wants', 'Needs vs wants'], ['50-30-20', '50/30/20'], ['budget-cycle', 'Budget cycle'], ['saving-challenges', 'Saving challenges']]
export default function InfographicsPage() {
  const [topic, setTopic] = useState('all'); const [query, setQuery] = useState('')
  const shown = infographics.filter((item) => (topic === 'all' || item.topic === topic) && `${item.title} ${item.caption} ${item.steps.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
  const reset = () => { setTopic('all'); setQuery('') }
  return <><PageHero eyebrow="Visual library" title="Money infographics"><p>Explore quick visual reminders for planning, prioritizing, and saving.</p></PageHero><section className="gallery-controls" aria-label="Infographic filters"><label htmlFor="gallery-search">Search infographics</label><input id="gallery-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} /><div>{filters.map(([value, label]) => <button aria-pressed={topic === value} className={topic === value ? 'active' : ''} type="button" key={value} onClick={() => setTopic(value)}>{label}</button>)}</div></section>{shown.length ? <section className="infographic-grid" aria-label="Infographic gallery">{shown.map((item) => <figure key={item.topic}><InfographicArt topic={item.topic} label={`${item.title}: ${item.caption}`} /><figcaption><h2>{item.title}</h2><p>{item.caption}</p><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol></figcaption></figure>)}</section> : <section className="empty-state"><h2>No infographics match your search.</h2><p>Try another term or restore the complete gallery.</p><button type="button" onClick={reset}>Reset gallery</button></section>}</>
}
