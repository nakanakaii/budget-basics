import { beforeEach, describe, expect, it } from "vitest";
import {
  createPlannerStore,
  plannerStore,
  usePlannerStore,
} from "./plannerStore.js";

describe("plannerStore", () => {
  beforeEach(() => plannerStore.reset());

  it("adds entries with stable IDs and reports totals", () => {
    const food = plannerStore.add({
      type: "expense",
      category: "Food",
      amount: 30,
    });
    const income = plannerStore.add({
      type: "income",
      category: "Job",
      amount: 100,
    });

    expect(plannerStore.getState()).toMatchObject({
      totalIncome: 100,
      totalExpenses: 30,
      balance: 70,
    });
    expect(plannerStore.getState().entries.map(({ id }) => id)).toEqual([
      food.id,
      income.id,
    ]);
  });

  it("updates and removes entries without changing an entry ID", () => {
    const entry = plannerStore.add({
      type: "expense",
      category: "Food",
      amount: 30,
    });
    const updated = plannerStore.update(entry.id, { amount: 20 });

    expect(updated.id).toBe(entry.id);
    expect(plannerStore.getState().totalExpenses).toBe(20);
    plannerStore.remove(entry.id);
    expect(plannerStore.getState().entries).toEqual([]);
  });

  it("resets all state including the ID sequence", () => {
    plannerStore.add({ type: "income", category: "Job", amount: 100 });
    plannerStore.reset();

    expect(plannerStore.getState()).toMatchObject({
      entries: [],
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
    });
    expect(
      plannerStore.add({ type: "income", category: "Job", amount: 1 }).id,
    ).toBe("entry-1");
  });

  it("creates isolated Zustand stores", () => {
    const first = createPlannerStore();
    const second = createPlannerStore();
    first.getState().add({ type: "income", category: "Job", amount: 100 });

    expect(first.getState().totalIncome).toBe(100);
    expect(second.getState().totalIncome).toBe(0);
    expect(typeof first.subscribe).toBe("function");
  });

  it("exports a React-compatible Zustand hook", () => {
    usePlannerStore.getState().reset();
    const entry = usePlannerStore
      .getState()
      .add({ type: "income", category: "Job", amount: 75 });

    expect(entry.id).toBe("entry-1");
    expect(usePlannerStore.getState().totalIncome).toBe(75);
  });
});
