import { z } from "zod";

const money = (label) =>
  z
    .number({ error: `${label} must be a number` })
    .min(0, `${label} must be zero or more`);
const required = (label) => z.string().trim().min(1, `${label} is required`);

export const budgetSchema = z.object({
  income: money("Income"),
  needs: money("Needs"),
  wants: money("Wants"),
  savings: money("Savings"),
});

export const savingsGoalSchema = z.object({
  target: money("Target").positive("Target must be greater than zero"),
  current: money("Current savings"),
  monthly: money("Monthly contribution"),
});

export const plannerEntrySchema = z.object({
  type: z.enum(["income", "expense"], { error: "Choose income or expense" }),
  category: required("Category"),
  amount: money("Amount").positive("Amount must be greater than zero"),
});

export const sampleIncomeSchema = z.object({
  label: required("Income label"),
  amount: money("Amount"),
});

export const feedbackSchema = z.object({
  name: required("Name"),
  email: z.email("Enter a valid email address"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comments: required("Comments").max(
    1000,
    "Comments must be 1000 characters or fewer",
  ),
});

export const contactSchema = z.object({
  name: required("Name"),
  email: z.email("Enter a valid email address"),
  message: required("Message").max(
    2000,
    "Message must be 2000 characters or fewer",
  ),
});
