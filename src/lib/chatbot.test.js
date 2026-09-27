import { describe, expect, it } from "vitest";
import { replyTo } from "./chatbot.js";

describe("replyTo", () => {
  it("recognizes saving questions", () => {
    expect(replyTo("How much should I save?").topic).toBe("saving");
  });

  it("safely falls back for unsupported questions", () => {
    expect(replyTo("How do I build a rocket?").topic).toBe("fallback");
  });

  it.each([
    ["What are personal finance fundamentals?", "fundamentals"],
    ["How do income and expenses differ?", "income-expenses"],
    ["How can I set a savings goal?", "saving-goals"],
    ["Explain the 50/30/20 rule", "50-30-20"],
    ["What are common money mistakes?", "money-mistakes"],
    ["What money habits help students?", "student-habits"],
    ["Is bus fare a need or want?", "needs-wants"],
    ["How much should I save?", "saving"],
    ["How do I make a budget?", "budgeting"],
  ])('routes "%s" to %s', (question, topic) => {
    expect(replyTo(question).topic).toBe(topic);
  });
});
