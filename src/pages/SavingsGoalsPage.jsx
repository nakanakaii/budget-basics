import { useState } from "react";
import MoneyField from "../components/MoneyField.jsx";
import PageHero from "../components/PageHero.jsx";
import { savingsGoal } from "../lib/finance.js";
import { savingsGoalSchema } from "../lib/validation.js";
const currency = new Intl.NumberFormat("en-SA", {
  style: "currency",
  currency: "YER",
});
export default function SavingsGoalsPage() {
  const [form, setForm] = useState({
      name: "",
      target: "",
      current: "",
      monthly: "",
    }),
    [errors, setErrors] = useState({}),
    [result, setResult] = useState(null);
  const change = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    setResult(null);
    setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const calculate = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(
      ["target", "current", "monthly"].map((key) => [
        key,
        form[key].trim() === "" ? NaN : Number(form[key]),
      ]),
    );
    const parsed = savingsGoalSchema.safeParse(values);
    const next = {};
    if (!form.name.trim()) next.name = "Goal name is required";
    if (!parsed.success)
      parsed.error.issues.forEach((issue) => {
        next[issue.path[0]] ??= issue.message;
      });
    setErrors(next);
    if (Object.keys(next).length) setResult(null);
    else setResult({ name: form.name.trim(), ...savingsGoal(parsed.data) });
  };
  return (
    <>
      <PageHero
        eyebrow="Savings calculator"
        title="Turn a savings goal into a plan"
      >
        <p>
          See what is left, how long it may take, and celebrate the progress you
          have already made.
        </p>
      </PageHero>
      <section className="calculator-layout">
        <form className="tool-card form-grid" onSubmit={calculate} noValidate>
          <h2>Set your goal</h2>
          <label className="field" htmlFor="goal-name">
            <span>Goal name</span>
            <input id="goal-name" value={form.name} onChange={change("name")} />
            {errors.name && <small role="alert">{errors.name}</small>}
          </label>
          {["target", "current", "monthly"].map((key) => (
            <MoneyField
              key={key}
              id={`goal-${key}`}
              label={
                {
                  target: "Target amount",
                  current: "Current savings",
                  monthly: "Monthly contribution",
                }[key]
              }
              type="text"
              value={form[key]}
              onChange={change(key)}
              error={errors[key]}
            />
          ))}
          <button className="primary-button">Calculate goal</button>
        </form>
        {result && (
          <div className="tool-card results" aria-live="polite">
            <h2>{result.name}</h2>
            <p>
              <strong>{currency.format(result.remaining)} remaining</strong>
            </p>
            <p>{result.progress}% complete</p>
            <progress
              className="goal-progress"
              max="100"
              value={result.progress}
            >
              {result.progress}%
            </progress>
            {result.complete ? (
              <p className="success-message">
                Goal reached — brilliant work! Keep the habit going.
              </p>
            ) : result.months === null ? (
              <p>
                Time cannot be calculated until you add a monthly contribution.
              </p>
            ) : (
              <p>
                <strong>{result.months} months</strong> at{" "}
                {currency.format(result.monthly)} per month. Keep going — every
                contribution moves you closer.
              </p>
            )}
          </div>
        )}
      </section>
      <section className="learning-panel" aria-labelledby="savings-check-title">
        <p className="eyebrow">Practice question</p>
        <h2 id="savings-check-title">Can you calculate the gap?</h2>
        <p>If a goal is 120,000 YER, current savings are 30,000 YER, and the monthly contribution is 15,000 YER, how much remains?</p>
        <details><summary>Show the answer</summary><p>90,000 YER remains, so the goal takes 6 months at 15,000 YER per month.</p></details>
      </section>
      <p className="disclaimer">
        These estimates are for educational purposes only and are not financial
        advice. Actual timing can change.
      </p>
    </>
  );
}
