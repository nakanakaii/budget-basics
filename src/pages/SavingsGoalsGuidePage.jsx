import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";

export default function SavingsGoalsGuidePage() {
  return (
    <>
      <PageHero eyebrow="Learning guide" title="Savings Goals">
        <p>
          A savings goal turns something you want in the future into a specific
          amount and a realistic contribution plan.
        </p>
      </PageHero>
      <section className="example-split">
        <div>
          <h2>Why savings goals matter</h2>
          <p>
            A clear target makes progress visible, helps you resist unplanned
            spending, and lets you adjust before a deadline is missed.
          </p>
        </div>
        <div>
          <h2>How to build your savings plan</h2>
          <ol aria-label="Ordered steps">
            <li>Choose one specific goal and name it.</li>
            <li>
              Write down the target amount and what you have already saved.
            </li>
            <li>Choose a contribution you can repeat each month.</li>
            <li>
              Calculate the remaining amount: target minus current savings.
            </li>
            <li>
              Estimate the months needed: remaining amount divided by the
              monthly contribution, rounded up.
            </li>
            <li>
              Review progress monthly and adjust the contribution or deadline
              when life changes.
            </li>
          </ol>
        </div>
      </section>
      <section className="learning-panel">
        <h2>Laptop goal example</h2>
        <p>
          Omar wants a 300,000 YER laptop and already has 60,000 YER. He has
          240,000 YER remaining. Saving 40,000 YER each month means he needs 6
          months.
        </p>
        <p>
          <strong>Try it:</strong> Write one goal, its target, your current
          savings, and one affordable monthly contribution. Then review it on
          the same date each month.
        </p>
        <Link className="primary-button" to="/practice/savings-goals">
          Practice with the savings calculator
        </Link>
      </section>
    </>
  );
}
