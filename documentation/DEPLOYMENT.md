# Static Deployment Guide

BudgetBasics builds to static HTML, CSS, JavaScript, and SVG files. It needs no server runtime after the build, but the host must support a single-page application rewrite.

## Build and verify

```sh
bun install --frozen-lockfile
bun run test
bun run lint
bun run build
bun run preview
```

Publish only `dist/`. Configure the host so a request such as `/practice/savings-goals` returns `/index.html` when no physical file matches. Static assets must continue to be served normally.

## Common hosts

- Netlify: build with `bun run build`, publish `dist`, and configure `/* /index.html 200`.
- Vercel: set output to `dist` and add an application-route fallback rewrite to `/index.html`.
- Cloudflare Pages: output `dist` and enable SPA fallback for unmatched paths.
- GitHub Pages: it lacks a general rewrite; use an SPA fallback strategy or change to hash routing before selecting it. That change is not included.

## Post-deployment checks

1. Open the home page over HTTPS.
2. Open `/learn/budgeting-basics`, `/practice/savings-goals`, `/practice/expense-planner`, `/resources/infographics`, and `/budget-calculator` directly.
3. Refresh each route and confirm no 404.
4. Run calculator and planner cases from `test-cases.txt`.
5. Test keyboard navigation and a narrow viewport.
6. Confirm feedback/contact forms still state that nothing is sent.
7. Inspect the browser console and verify assets load.

## Security, privacy, and rollback

Enable HTTPS, compression, and standard security headers through the host. If form delivery, analytics, persistence, or authentication is later added, update the privacy notice and perform a security review. Keep the previous successful static release available; restore it if a check fails, then fix, rerun all quality commands, and redeploy.
