import NeedsWantsActivity from '../components/NeedsWantsActivity.jsx'
import PageHero from '../components/PageHero.jsx'

export default function NeedsWantsPage() {
  return <><PageHero eyebrow="Learning module" title="Needs vs Wants"><p>A need is essential for health, safety, study, or basic daily life. A want is optional, even when it feels important.</p></PageHero><section className="example-split"><div><h2>Real-life choices</h2><p>A bus pass may be a need when it is the only way to reach class. A new game or phone upgrade is a want when what you have still works.</p></div><aside className="decision-guide" aria-labelledby="guide-title"><h2 id="guide-title">Quick decision guide</h2><ol><li>Is it necessary for health, safety, study, or work?</li><li>Does it fit your budget after essentials?</li><li>Can it wait without causing harm?</li></ol></aside></section><NeedsWantsActivity /></>
}
