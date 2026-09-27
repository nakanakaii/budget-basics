import { useState } from "react";
import { needsAndWants } from "../data/content.js";

export default function NeedsWantsActivity() {
  const [feedback, setFeedback] = useState("");
  const choose = (entry, choice) =>
    setFeedback(
      `${choice === entry.kind ? "Correct" : "Not quite"} — ${entry.item} is a ${entry.kind}: ${entry.reasoning}`,
    );
  return (
    <section aria-labelledby="sort-title">
      <p className="eyebrow">Try it</p>
      <h2 id="sort-title">Classify each purchase</h2>
      <div className="activity-grid">
        {needsAndWants.map((entry) => (
          <article className="activity-card" key={entry.item}>
            <h3>{entry.item}</h3>
            <div>
              <button
                type="button"
                onClick={() => choose(entry, "need")}
                aria-label={`${entry.item}: Need`}
              >
                Need
              </button>
              <button
                type="button"
                onClick={() => choose(entry, "want")}
                aria-label={`${entry.item}: Want`}
              >
                Want
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </section>
  );
}
