import { tips } from "../data/content.js";

export default function TipTicker() {
  return (
    <aside className="ticker" aria-label="Money tip ticker">
      <strong>Money buzz:</strong>
      <div className="ticker-window">
        <span>{tips.join("  •  ")}</span>
      </div>
    </aside>
  );
}
