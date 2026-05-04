# Roadmap — future chapters

Stuff to add once the core chapters (01–07) feel solid. Parked here so it doesn't clutter the main repo until it's time.

The progression below deliberately separates React from Next.js. Modern tutorials usually teach them together, which blurs where one ends and the other begins. We'll learn React in isolation first, then add Next.js on top.

---

## Chapter 08 — React basics (in the browser)

Goal: write and understand a small React app running in a real browser, using TypeScript. No framework yet.

**Stack:** [Vite](https://vitejs.dev) + React + TS. Vite is the minimum viable React setup — one command creates a working project, no opinions beyond "this is how you build for the browser".

**Setup:** `npm create vite@latest my-app -- --template react-ts`

**Concepts:**

- **JSX** — it's syntax sugar for function calls (`<div>` → `React.createElement("div")`). Not HTML. Python analogue: think of it as an f-string for UI, but strictly typed.
- **Components = functions that return JSX** — props are like keyword arguments, `children` is like a block body.
- **`useState`** — component-scoped mutable variable that triggers a re-render when changed. This is a new mental model (no direct Python analogue); worth dwelling on.
- **`useEffect`** — "run this side-effect when these inputs change." Fetching, subscribing, timers.
- **Lists and keys, event handlers, conditional rendering** — the 80% of React you use daily.
- **Controlled inputs** — form state lives in React, not in the DOM.

**Exercise:** a TODO app. Classic, and it hits every concept above. Add/remove/toggle items, persist to `localStorage`.

**Out of scope (on purpose):** Redux/Zustand, Context, refs, Tailwind, styling libraries, animations.

## Chapter 09 — Next.js (React + a real framework)

Goal: understand what Next.js adds on top of React, and the single most important mental model: **Server Components vs Client Components**.

**Stack:** Next.js App Router + TS. `npx create-next-app@latest --typescript`.

**Concepts:**

- **File-based routing** — `app/about/page.tsx` becomes the `/about` route. No router config file.
- **Server Components vs Client Components (THE key idea)**:
  - Default is **server**: runs in Node, can `await` directly in the component body, can hit DBs/env vars, ships zero JS to the browser.
  - `"use client"` at the top of a file opts into the **browser**: hooks (`useState`, `useEffect`) work here, but you can't reach server-only resources.
  - This split is what makes Next.js worth learning. Get it right and everything else falls into place.
- **Data fetching** — in a server component, `async function Page()` can `await fetch(...)` directly. Feels like writing a backend route that happens to return JSX.
- **Server Actions** — submit a form, run a function on the server, no separate API route needed. Chapter 06 territory, wired to a button.
- **Deployment** — `next build && next start` locally, or one-click deploy to Vercel.

**Exercise:** a tiny app that fetches JSON in a server component (e.g. GitHub repo info from chapter 06) and renders it with a client-side interactive element (a "refresh" button or filter input).

**Out of scope:** middleware, ISR/streaming, auth libraries, database integration.

## Possibly later: Chapter 10 — AI SDK in TS

Originally deferred from the main roadmap. Once chapters 01–09 are done, the actual goal:

- `@anthropic-ai/sdk` — basic completion, tool use, streaming
- Working with env vars for API keys (`node --env-file=.env`)
- Maybe a small CLI or a Next.js chat UI that wraps the API

---

## Order

- Finish 01–07 first. They're non-negotiable — every Next.js concept leans on them.
- Ch 08 before ch 09. Resist the temptation to skip straight to Next.js; you'll understand the framework's tradeoffs better if you've felt plain React first.
- Ch 10 whenever you feel fluent. It's a capstone, not a prerequisite for anything.
