import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import App from "../App.jsx";

const renderPage = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

afterEach(cleanup);

describe("budget calculator", () => {
  it("calculates the 50/30/20 amounts for a valid income", async () => {
    const user = userEvent.setup();
    renderPage("/budget-calculator");
    await user.type(screen.getByLabelText(/monthly income/i), "1000");
    await user.click(screen.getByRole("button", { name: /calculate budget/i }));

    expect(screen.getByText("SAR 1,000.00")).toBeInTheDocument();
    expect(screen.getAllByText(/Needs \(50%\)/)).toHaveLength(2);
    expect(screen.getByText("SAR 500.00")).toBeInTheDocument();
    expect(screen.getAllByText(/Wants \(30%\)/)).toHaveLength(2);
    expect(screen.getByText("SAR 300.00")).toBeInTheDocument();
    expect(screen.getAllByText(/Savings \(20%\)/)).toHaveLength(2);
    expect(screen.getByText("SAR 200.00")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /50 30 20 budget chart/i }),
    ).toBeInTheDocument();
  });

  it.each(["", "-1", "not-a-number", "Infinity"])(
    "rejects invalid income %j",
    async (value) => {
      const user = userEvent.setup();
      renderPage("/budget-calculator");
      if (value)
        await user.type(screen.getByLabelText(/monthly income/i), value);
      await user.click(
        screen.getByRole("button", { name: /calculate budget/i }),
      );
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.queryByText(/Needs \(50%\)/)).not.toBeInTheDocument();
    },
  );

  it("clears a calculated budget when income changes", async () => {
    const user = userEvent.setup();
    renderPage("/budget-calculator");
    const income = screen.getByLabelText(/monthly income/i);
    await user.type(income, "1000");
    await user.click(screen.getByRole("button", { name: /calculate budget/i }));
    expect(screen.getByText("SAR 500.00")).toBeInTheDocument();
    await user.type(income, "0");
    expect(screen.queryByText("SAR 500.00")).not.toBeInTheDocument();
  });
});

describe("savings goals calculator", () => {
  const completeForm = async (user, values) => {
    await user.type(screen.getByLabelText(/goal name/i), values.name);
    await user.type(screen.getByLabelText(/^target amount/i), values.target);
    await user.type(screen.getByLabelText(/current savings/i), values.current);
    await user.type(
      screen.getByLabelText(/monthly contribution/i),
      values.monthly,
    );
    await user.click(screen.getByRole("button", { name: /calculate goal/i }));
  };

  it("shows remaining amount, rounded-up months, and progress", async () => {
    const user = userEvent.setup();
    renderPage("/practice/savings-goals");
    await completeForm(user, {
      name: "Laptop",
      target: "1000",
      current: "250",
      monthly: "200",
    });
    expect(
      screen.getByRole("heading", { name: /laptop/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/SAR 750.00 remaining/i)).toBeInTheDocument();
    expect(screen.getByText(/4 months/i)).toBeInTheDocument();
    expect(screen.getByText(/25% complete/i)).toBeInTheDocument();
  });

  it.each([
    ["complete", "1000", "1000"],
    ["overfunded", "1000", "1200"],
  ])(
    "handles a %s goal without negative remaining",
    async (_, target, current) => {
      const user = userEvent.setup();
      renderPage("/practice/savings-goals");
      await completeForm(user, {
        name: "Trip",
        target,
        current,
        monthly: "100",
      });
      expect(screen.getByText(/goal reached/i)).toBeInTheDocument();
      expect(screen.getByText(/SAR 0.00 remaining/i)).toBeInTheDocument();
      expect(screen.queryByText(/SAR -/i)).not.toBeInTheDocument();
    },
  );

  it("explains that timing cannot be calculated with zero contributions", async () => {
    const user = userEvent.setup();
    renderPage("/practice/savings-goals");
    await completeForm(user, {
      name: "Bike",
      target: "500",
      current: "100",
      monthly: "0",
    });
    expect(screen.getByText(/time cannot be calculated/i)).toBeInTheDocument();
    expect(screen.queryByText(/Infinity|NaN/)).not.toBeInTheDocument();
  });

  it("rejects missing and negative savings values", async () => {
    const user = userEvent.setup();
    renderPage("/practice/savings-goals");
    await user.type(screen.getByLabelText(/goal name/i), "Laptop");
    await user.type(screen.getByLabelText(/^target amount/i), "-1");
    await user.click(screen.getByRole("button", { name: /calculate goal/i }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(screen.queryByText(/Infinity|NaN/)).not.toBeInTheDocument();
  });

  it.each(["many", "Infinity"])(
    "rejects non-finite savings value %j",
    async (target) => {
      const user = userEvent.setup();
      renderPage("/practice/savings-goals");
      await completeForm(user, {
        name: "Laptop",
        target,
        current: "0",
        monthly: "100",
      });
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.queryByText(/Infinity|NaN/)).not.toBeInTheDocument();
    },
  );

  it("clears a savings estimate when any goal input changes", async () => {
    const user = userEvent.setup();
    renderPage("/practice/savings-goals");
    await completeForm(user, {
      name: "Laptop",
      target: "1000",
      current: "250",
      monthly: "200",
    });
    expect(screen.getByText(/SAR 750.00 remaining/i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/current savings/i), "0");
    expect(screen.queryByText(/SAR 750.00 remaining/i)).not.toBeInTheDocument();
  });
});
