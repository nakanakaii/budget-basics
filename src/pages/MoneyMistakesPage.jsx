import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { moneyMistakes } from '../data/content.js'

export default function MoneyMistakesPage() {
  const [open, setOpen] = useState(null)
  return <><PageHero eyebrow="Learning module" title="Five common money mistakes"><p>Recognize the pattern, understand its cost, and use one practical step to prevent it next time.</p></PageHero><section className="accordion" aria-label="Common money mistakes">{moneyMistakes.map(({ title, explanation, scenario, consequence, action, prevention }, index) => { const expanded = open === index; const panel = `mistake-${index}`; return <article key={title}><h2><button type="button" aria-expanded={expanded} aria-controls={panel} onClick={() => setOpen(expanded ? null : index)}><span>{title}</span><span aria-hidden="true">{expanded ? '−' : '+'}</span></button></h2>{expanded && <div id={panel} className="accordion-panel"><p><strong>Explanation:</strong> {explanation}</p><p><strong>Scenario:</strong> {scenario}</p><p><strong>Consequence:</strong> {consequence}</p><p><strong>Corrective action:</strong> {action}</p><p><strong>Prevention:</strong> {prevention}</p></div>}</article>})}</section></>
}
