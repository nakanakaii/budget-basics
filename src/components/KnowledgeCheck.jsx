import { useState } from "react";

export default function KnowledgeCheck() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const check = (event) => {
    event.preventDefault();
    setFeedback(
      answer === "Transport pass"
        ? "Correct — a monthly transport pass usually costs the same amount, making it a fixed expense."
        : "Not quite — snacks can change from week to week, while a monthly transport pass is fixed.",
    );
  };
  return (
    <section className="learning-panel" aria-labelledby="check-title">
      <p className="eyebrow">Knowledge check</p>
      <h2 id="check-title">Spot the fixed expense</h2>
      <form onSubmit={check}>
        <label htmlFor="fixed-expense">Which expense is fixed?</label>
        <select
          id="fixed-expense"
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
            setFeedback("");
          }}
          required
        >
          <option value="">Choose an answer</option>
          <option>Transport pass</option>
          <option>Snacks</option>
          <option>Entertainment</option>
        </select>
        <button className="primary-button" type="submit">
          Check answer
        </button>
      </form>
      {feedback && (
        <div className="feedback" role="status">
          <p>{feedback}</p>
          <button
            type="button"
            onClick={() => {
              setAnswer("");
              setFeedback("");
            }}
          >
            Try again
          </button>
        </div>
      )}
    </section>
  );
}
