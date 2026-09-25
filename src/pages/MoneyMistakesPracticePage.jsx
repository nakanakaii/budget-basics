import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'

const scenarios = [
  { prompt: 'A flash sale offers headphones you did not plan to buy. What is the best action?', options: ['Buy it now before the sale ends', 'Wait 24 hours and compare it with your priorities', 'Borrow money for it'], answer: 1, explanation: 'A pause removes urgency and gives you time to compare the purchase with your budget and goals.' },
  { prompt: 'Several small snack purchases have made your balance unexpectedly low. What should you do?', options: ['Ignore them because each one was cheap', 'Record the purchases and review their monthly total', 'Stop checking your balance'], answer: 1, explanation: 'Recording small costs reveals their combined impact and helps you set a realistic category limit.' },
  { prompt: 'A subscription you no longer use will renew tomorrow. What is the best action?', options: ['Cancel it and review your other subscriptions', 'Let it renew just in case', 'Open another subscription'], answer: 0, explanation: 'Canceling an unused renewal protects money for current priorities; a monthly review prevents repeats.' },
]

export default function MoneyMistakesPracticePage() {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState(null)
  const [checked, setChecked] = useState(false)
  const [completed, setCompleted] = useState(false)
  const scenario = scenarios[index]
  const correct = choice === scenario.answer
  const reset = () => { setChoice(null); setChecked(false) }
  const next = () => { setIndex(index + 1); reset() }
  const restart = () => { setIndex(0); setCompleted(false); reset() }
  return <><PageHero eyebrow="Practice activity" title="Choose the better money move"><p>Apply the prevention habits from the guide to realistic student decisions.</p></PageHero>{completed ? <section className="learning-panel" aria-labelledby="complete-title"><h2 id="complete-title">Practice complete</h2><p>You completed all 3 scenarios. Use these prevention habits in your next spending decision.</p><button className="primary-button" type="button" onClick={restart}>Restart practice</button></section> : <section className="learning-panel" aria-labelledby="scenario-title"><p className="eyebrow">Scenario {index + 1} of {scenarios.length}</p><fieldset className="choice-fieldset" aria-describedby={checked ? 'scenario-feedback' : undefined}><legend id="scenario-title">{scenario.prompt}</legend><div className="choice-grid">{scenario.options.map((option, optionIndex) => <label key={option} className={choice === optionIndex ? 'selected' : ''}><input type="radio" name="money-mistake-choice" checked={choice === optionIndex} onChange={() => { setChoice(optionIndex); setChecked(false) }} /> <span>{option}</span></label>)}</div></fieldset>{!checked && <button className="primary-button" type="button" disabled={choice === null} onClick={() => setChecked(true)}>Check answer</button>}{checked && <><p id="scenario-feedback" role="status"><strong>{correct ? 'Correct.' : 'Not quite.'}</strong> {scenario.explanation}</p>{correct ? <button className="primary-button" type="button" onClick={index === scenarios.length - 1 ? () => setCompleted(true) : next}>{index === scenarios.length - 1 ? 'Finish practice' : 'Next scenario'}</button> : <button className="secondary-button" type="button" onClick={reset}>Try again</button>}</>}</section>}</>
}
