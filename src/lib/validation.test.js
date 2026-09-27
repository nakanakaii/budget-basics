import { describe, expect, it } from "vitest";
import {
  budgetSchema,
  contactSchema,
  feedbackSchema,
  plannerEntrySchema,
  sampleIncomeSchema,
  savingsGoalSchema,
} from "./validation.js";

describe("validation schemas", () => {
  it("accepts valid data", () => {
    expect(
      budgetSchema.parse({
        income: 1000,
        needs: 500,
        wants: 300,
        savings: 200,
      }),
    ).toBeTruthy();
    expect(
      savingsGoalSchema.parse({ target: 1000, current: 250, monthly: 200 }),
    ).toBeTruthy();
    expect(
      plannerEntrySchema.parse({
        type: "expense",
        category: "Food",
        amount: 20,
      }),
    ).toBeTruthy();
    expect(
      sampleIncomeSchema.parse({ label: "Part-time job", amount: 500 }),
    ).toBeTruthy();
    expect(
      feedbackSchema.parse({
        name: "Student",
        email: "student@example.com",
        rating: 5,
        comments: "Very useful lesson.",
      }),
    ).toBeTruthy();
    expect(
      contactSchema.parse({
        name: "Student",
        email: "student@example.com",
        message: "Please help with my budget.",
      }),
    ).toBeTruthy();
  });

  it("returns clear messages for invalid data", () => {
    expect(
      budgetSchema.safeParse({ income: -1, needs: 0, wants: 0, savings: 0 })
        .error.issues[0].message,
    ).toBe("Income must be zero or more");
    expect(
      contactSchema
        .safeParse({ name: "", email: "bad", message: "" })
        .error.issues.map(({ message }) => message),
    ).toContain("Enter a valid email address");
  });
});
