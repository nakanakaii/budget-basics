import NeedsWantsActivity from '../components/NeedsWantsActivity.jsx'
import PageHero from '../components/PageHero.jsx'

export default function NeedsWantsPage() {
  return <><PageHero eyebrow="Learning module" title="Needs vs Wants"><p>A need is essential for health, safety, study, or basic daily life. A want is optional, even when it feels important.</p></PageHero><section className="example-split"><div><h2>Why the difference matters</h2><p>Knowing the difference helps you protect essential costs and decide which optional purchases can wait when money is limited.</p><h2>Bus pass example</h2><p>A bus pass may be a need when it is the only way to reach class. A new game or phone upgrade is a want when what you have still works.</p></div><aside className="decision-guide" aria-labelledby="guide-title"><h2 id="guide-title">How to decide</h2><ol aria-label="Ordered steps"><li>Ask whether it is necessary for health, safety, study, or work.</li><li>Check that essentials are funded first.</li><li>Can it wait without causing harm?</li><li>Record the choice and review it when your situation changes.</li></ol></aside></section><NeedsWantsActivity /></>
}
