# BudgetBasics

BudgetBasics is a student-friendly, frontend-only personal finance learning website. It combines short learning modules with a 50/30/20 calculator, savings goal estimator, temporary expense planner, resource search, and rule-based chatbot.

## Quick start

Requirements: [Bun](https://bun.sh/) 1.3 or newer and a modern browser.

```sh
bun install
bun run dev
```

Open the local URL printed by Vite. No account, API key, database, or backend service is required.

## Quality checks

```sh
bun run test
bun run lint
bun run build
```

Use `bun run test`, not `bun test`: the package script starts Vitest with the configured jsdom test environment.

## Main modules

- Budgeting concepts and knowledge check
- Needs versus wants activity
- 50/30/20 budget calculator
- Savings goal timeline estimator
- Temporary income and expense planner
- Money mistake scenarios and searchable infographics
- Resource search and rule-based finance chatbot
- About, feedback, contact, privacy, and sitemap pages

All calculator and planner information remains in browser memory. Feedback and contact forms validate locally and do not transmit data.

## Project structure

```text
public/                 Static assets
src/components/         Shared interface components
src/data/               Navigation and learning content
src/lib/                Finance, search, chatbot, and validation logic
src/pages/              Route-level learning and tool pages
src/store/              Zustand expense planner state
src/test/               Test setup
documentation/          Report, test evidence, demo, deployment, and DOCX guide
```

## Documentation

- [Project report](documentation/PROJECT_REPORT.md)
- [Test cases and recorded results](documentation/test-cases.txt)
- [Test data](documentation/test-data.json)
- [Demo checklist](documentation/DEMO_CHECKLIST.md)
- [Video walkthrough script](documentation/VIDEO_WALKTHROUGH_SCRIPT.md)
- [Deployment guide](documentation/DEPLOYMENT.md)
- `documentation/ReadMe.docx` for a polished Word installation guide

## Deployment

Run `bun run build` and publish the generated `dist/` directory to a static host. Configure the host to rewrite unknown paths to `index.html` so React Router routes work when opened directly. See the deployment guide for examples.

## Assumptions and limitations

- Currency examples use Saudi riyals (SAR), while calculations operate on plain numeric values.
- The 50/30/20 split is an educational guideline, not personal financial advice.
- Planner data is temporary and resets when the page reloads.
- The chatbot uses local keywords and prepared responses; it is not generative AI.
- No Lighthouse audit or MP4 recording is claimed. Recording the supplied walkthrough remains a manual submission step.

## AI tools acknowledgment

AI-assisted coding and documentation tools supported development and review. The project team remains responsible for checking the implementation, test results, content accuracy, and final submission.
