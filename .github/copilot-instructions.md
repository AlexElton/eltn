# Project conventions

- Next.js 16 App Router, React 19, TypeScript strict mode, Tailwind CSS 4.
- Server Components by default; add `"use client"` only when the component needs interactivity or browser APIs.
- Never use `any` — use `unknown` and narrow, or proper types.
- All async code must handle errors; no floating promises.
- Use the `@/*` path alias for imports; avoid long relative `../../` chains.
- Data fetching happens in Server Components with `fetch`; state caching semantics explicitly.
- Prefer small, focused components and pure functions; extract shared logic into `src/lib/`.
- Before finishing any task: run `npm run verify` (typecheck + lint + format check) and fix all errors.
