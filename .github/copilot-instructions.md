## Copilot Instructions for AI Coding Agents

Purpose: Help an AI make small, verifiable edits in this Next.js marketplace monorepo. Keep changes minimal, include the required assistant token, and follow repository conventions.

Key facts

High-signal places to read

Commands & workflow notes (PowerShell)
  ```powershell
  npm install
  npm run dev
  ```
  ```powershell
  cd prisma
  npx prisma generate
  npx prisma migrate dev --name <desc>
  node ../prisma/seed.ts  # or: npx ts-node prisma/seed.ts
  ```
  ```powershell
  powershell -ExecutionPolicy Bypass -File tools/enforce-rules.ps1
  ```

Project conventions (follow exactly)

Integration patterns and examples

Quick example — adding a DB model
1. Edit `schema.prisma` in the correct `prisma/` folder.
2. From that folder: `npx prisma migrate dev --name add_<x>` then `npx prisma generate`.
3. Update server helpers (e.g., `src/lib/prisma.ts` or `monjaz120/src/lib/prisma.ts`).
4. Add a minimal UI under `src/app/<feature>/` and run `npm run dev`.

Notes for AI edits

If you'd like, I can: expand CI/runbook examples, add deploy steps, or translate this file to Arabic. Tell me which.

// ASSISTANT_FINAL: true

---

CI, deploy & tests (examples)
- CI enforcement: the repo includes `tools/enforce-rules.ps1` used by CI to check formatting, markers, and simple rules. Run locally to reproduce failures:
  ```powershell
  powershell -ExecutionPolicy Bypass -File tools/enforce-rules.ps1
  ```
- Recommended CI steps for changes that modify DB schema or seeds:
  1. Run Prisma generation inside the target `prisma/` folder: `cd prisma; npx prisma generate`.
  2. Run `npx prisma migrate dev --name <desc>` and `node ../prisma/seed.ts` to ensure seeds apply.
  3. Run `npm run build` and any project tests (there are no automated tests by default; add test commands to `package.json` if you add tests).
- Deploy hints: this is a Next.js App Router project — typical hosts are Vercel or any Node server that supports Next. Ensure environment variables (DB_URL, AWS keys for uploads, Firebase config) are set in the host environment; do not commit them.

Small code examples (patterns observed in repo)
- API route (Next App Router): implement a POST handler at `src/app/api/example/route.ts`:

  ```ts
  // src/app/api/example/route.ts
  import { NextResponse } from 'next/server'

  export async function POST(req: Request) {
    const body = await req.json()
    // use server helpers from src/lib/
    return NextResponse.json({ ok: true, data: body })
  }
  ```

- Signed upload URL (pattern): copy structure from `src/app/api/uploads/` and use `@aws-sdk/s3-request-presigner` and `@aws-sdk/client-s3` to generate presigned URLs.

- Prisma helper usage: update `src/lib/prisma.ts` (or `monjaz120/src/lib/prisma.ts`) to expose a Prisma client instance used by server routes.

Testing locally (quick)
- Start dev server:
  ```powershell
  npm install
  npm run dev
  ```
- To validate DB-related changes run inside the matching `prisma/` folder:
  ```powershell
  cd prisma
  npx prisma generate
  npx prisma migrate dev --name test
  node ../prisma/seed.ts
  ```

If you'd like, I can add a `CONTRIBUTING.md` with these steps and a short checklist for AI edits (marker, tests, local CI run). // ASSISTANT_FINAL: true
## Copilot Instructions for AI Coding Agents
This repository is a Next.js marketplace monorepo. Keep guidance concise and actionable — aim to make small, verifiable edits and preserve repository conventions (especially the ASSISTANT_FINAL marker).
## Copilot Instructions for AI Coding Agents

This is a Next.js marketplace monorepo with two sibling applications that share many utilities. Keep edits small, verifiable, and add the required assistant marker to any file you change.

Key facts
- Monorepo shape: root app at `src/app/` (primary) and a second app at `monjaz120/src/app/`.
- Tech stack: Next.js App Router (server + client components), TypeScript, Prisma, Tailwind CSS.
- Shared helpers: `src/lib/` and `monjaz120/src/lib/`.

Where to look first
- App shell: `src/app/layout.tsx`, `src/app/_app.tsx`, `src/app/page.tsx` (mirrored under `monjaz120/src/app/`).
- API routes (server logic): `src/app/api/**/route.ts` files.
- Prisma / DB: `prisma/` and `monjaz120/prisma/` — check `schema.prisma`, `seed.ts`, and `*_fallback.json` files.
- Fallback & seed data: `data/`, `prisma/*_fallback.json`, and `tools/sync_fallback_to_db.js`.

Essential commands (PowerShell examples)
- Install & run (root):
```powershell
npm install
npm run dev
```
- Prisma (run commands in the prisma folder for the app you change):
```powershell
# from repo root or inside the target app folder
cd prisma
npx prisma generate
npx prisma migrate dev --name add_xxx
# run seed (JS/TS variants present)
node ../prisma/seed.ts  # or: npx ts-node prisma/seed.ts
```
- Enforcement (run locally to mirror CI):
```powershell
powershell -ExecutionPolicy Bypass -File tools/enforce-rules.ps1
# or: npm run enforce  # add this script to package.json to match CI
```

Project conventions (do this exactly)
- ASSISTANT_FINAL: Append the exact single-line token `// ASSISTANT_FINAL: true` to every file created or modified by an AI assistant. CI enforces this.
- TypeScript-first: prefer `.ts`/`.tsx` under `src/`. Existing `.js` files (e.g., `src/firebase.js`) are exceptions for client SDK config.
- Component placement: feature components → `src/app/<feature>/components/`; global/shared components → `components/` or `src/components/`.
- API pattern: implement server APIs as Next App Router `route.ts` files under `src/app/api/`. Put server-only helpers in `src/lib/`.

Integration notes & examples
- Two Prisma locations — always run migrations and `prisma generate` in the prisma folder that corresponds to the app you're changing (`prisma/` or `monjaz120/prisma/`).
- Firebase: client config lives at `src/firebase.js`; do not commit secrets—use env vars instead.
- Uploads: S3 signed-URL flow and `@aws-sdk/*` usage live under `src/app/api/uploads/` — follow that pattern for new upload endpoints.
- Seed & fallback: use `tools/sync_fallback_to_db.js` for bulk-importing JSON fallbacks when updating initial data.

Quick example — adding a DB model
1. Edit `schema.prisma` in the correct prisma folder.
2. From that folder: `npx prisma migrate dev --name add_xxx` then `npx prisma generate`.
3. Update server code that uses Prisma (e.g., `src/lib/prisma.ts` or `monjaz120/src/lib/prisma.ts`).
4. Add minimal UI under `src/app/<feature>/` and run `npm run dev` to sanity-check.

Files that are high-signal for common tasks
- `src/app/`, `monjaz120/src/app/`
- `src/lib/prisma.ts`, `monjaz120/src/lib/prisma.ts`
- `prisma/`, `monjaz120/prisma/`, `prisma/*_fallback.json`
- `tools/enforce-rules.ps1`, `tools/sync_fallback_to_db.js`
- `src/firebase.js`, `src/app/api/uploads/`

If any section should be expanded (CI, tests, deployment, or migrations), tell me which and I will extend this file with step-by-step examples.

// ASSISTANT_FINAL: true