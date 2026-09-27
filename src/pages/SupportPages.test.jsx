import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App.jsx";

const renderPage = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("discovery and support pages", () => {
  it("filters, sorts, clears, and resets resource search", async () => {
    const user = userEvent.setup();
    renderPage("/resources/search");

    expect(
      screen.getAllByRole("article").map((item) => item.textContent),
    ).toEqual([
      expect.stringContaining("Check needs and wants"),
      expect.stringContaining("Learn from money mistakes"),
      expect.stringContaining("Plan a student budget"),
      expect.stringContaining("Turn savings into a goal"),
    ]);
    await user.selectOptions(screen.getByLabelText(/topic/i), "saving");
    expect(
      screen.getByRole("link", { name: /turn savings into a goal/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /plan a student budget/i }),
    ).not.toBeInTheDocument();
    await user.type(screen.getByRole("searchbox"), "impossible query");
    expect(screen.getByText(/no resources match/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /reset search/i }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByLabelText(/topic/i)).toHaveValue("all");
  });

  it("answers suggestions and typed questions with a safe fallback", async () => {
    const user = userEvent.setup();
    renderPage("/chatbot");

    expect(
      screen.getByText(
        "This chatbot is for educational purposes only and does not provide professional financial advice.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/rule-based and runs locally/i),
    ).toBeInTheDocument();
    for (const prompt of [
      "What is a need?",
      "How much should I save?",
      "How do I avoid overspending?",
    ]) {
      expect(screen.getByRole("button", { name: prompt })).toBeInTheDocument();
    }
    await user.click(screen.getByRole("button", { name: "What is a need?" }));
    expect(
      await screen.findByText(/supports basic living, study, or safety/i),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^helpful$/i }));
    expect(screen.getByRole("status")).toHaveTextContent(
      /thanks for your feedback/i,
    );
    await user.type(
      screen.getByRole("textbox", { name: /ask a money question/i }),
      "How do I make a budget?",
    );
    await user.click(screen.getByRole("button", { name: "Ask" }));
    expect(await screen.findByText(/cover needs first/i)).toBeInTheDocument();
    await user.type(
      screen.getByRole("textbox", { name: /ask a money question/i }),
      "What color is the moon?",
    );
    await user.click(screen.getByRole("button", { name: "Ask" }));
    expect(
      await screen.findByText(
        /I can help with budgeting, saving, needs and wants/i,
      ),
    ).toBeInTheDocument();
  });

  it("serializes rapid chatbot submissions and re-enables its controls", () => {
    vi.useFakeTimers();
    renderPage("/chatbot");
    const input = screen.getByRole("textbox", {
      name: /ask a money question/i,
    });
    const form = input.closest("form");
    fireEvent.change(input, { target: { value: "What is a need?" } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: "How much should I save?" } });
    fireEvent.submit(form);

    expect(screen.getAllByText(/You:/)).toHaveLength(1);
    expect(input).toBeDisabled();
    expect(screen.getByRole("button", { name: "Ask" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "What is a need?" }),
    ).toBeDisabled();
    act(() => vi.advanceTimersByTime(100));
    expect(
      screen.getByText(/supports basic living, study, or safety/i),
    ).toBeInTheDocument();
    expect(input).toBeEnabled();
    expect(screen.getByRole("button", { name: "Ask" })).toBeEnabled();
  });

  it.each([
    ["/feedback", ["Name", "Email", "Rating", "Comments"]],
    ["/contact", ["Name", "Email", "Message"]],
  ])(
    "validates and locally completes %s without submitting",
    async (path, fields) => {
      const user = userEvent.setup();
      renderPage(path);
      const form = screen.getByRole("form");
      let submitted = false;
      form.addEventListener("submit", () => {
        submitted = true;
      });
      await user.click(
        screen.getByRole("button", { name: /send feedback|send message/i }),
      );
      expect(submitted).toBe(true);
      expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);

      await user.type(screen.getByLabelText("Name"), "Student");
      await user.type(screen.getByLabelText("Email"), "student@example.com");
      if (path === "/feedback") {
        await user.selectOptions(screen.getByLabelText("Rating"), "5");
        await user.type(screen.getByLabelText("Comments"), "Helpful lessons");
      } else {
        await user.type(screen.getByLabelText("Message"), "Hello there");
      }
      await user.click(
        screen.getByRole("button", { name: /send feedback|send message/i }),
      );
      expect(
        await screen.findByText(
          /^(thank you|thanks).*not transmitted or saved/i,
        ),
      ).toBeInTheDocument();
      for (const field of fields)
        expect(screen.getByLabelText(field)).toHaveValue(
          field === "Rating" ? "" : "",
        );
      await waitFor(() =>
        expect(screen.queryAllByRole("alert")).toHaveLength(0),
      );
    },
  );

  it.each([
    ["/feedback", "Comments", /send feedback/i],
    ["/contact", "Message", /send message/i],
  ])(
    "clears stale success when %s is edited and resubmitted invalid",
    async (path, finalField, submitName) => {
      const user = userEvent.setup();
      renderPage(path);
      await user.type(screen.getByLabelText("Name"), "Student");
      await user.type(screen.getByLabelText("Email"), "student@example.com");
      if (path === "/feedback")
        await user.selectOptions(screen.getByLabelText("Rating"), "5");
      await user.type(screen.getByLabelText(finalField), "Helpful message");
      await user.click(screen.getByRole("button", { name: submitName }));
      expect(
        await screen.findByText(
          /^(thank you|thanks).*not transmitted or saved/i,
        ),
      ).toBeInTheDocument();

      await user.type(screen.getByLabelText("Name"), "Changed");
      expect(
        screen.queryByText(/^(thank you|thanks).*not transmitted or saved/i),
      ).not.toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: submitName }));
      expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
      expect(
        screen.queryByText(/^(thank you|thanks).*not transmitted or saved/i),
      ).not.toBeInTheDocument();
    },
  );

  it("uses only editable creator and contact placeholders", () => {
    renderPage("/about");
    expect(
      screen.getByText(/editable creator placeholder/i),
    ).toBeInTheDocument();
    cleanup();
    renderPage("/contact");
    expect(screen.getByText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/external link/i)).toBeInTheDocument();
  });
});
