# Migrate Prisma & Sync fallback data (instructions)

Follow these steps locally to enable DB-backed persistence and sync any fallback JSON into the database.

1) Set your DATABASE_URL environment variable (example for local Postgres):

PowerShell example:

```powershell
$env:DATABASE_URL = "postgresql://user:password@localhost:5432/yourdb?schema=public"
# or set it in a .env file at project root: DATABASE_URL="postgresql://..."
```

2) Run Prisma migrate and generate:

```powershell
npx prisma migrate dev --name add-requests-incidents
npx prisma generate
```

3) (Optional) Seed if you have a seed script:

```powershell
node prisma/seed_requests.js
```

4) Run the sync script to move fallback JSON into DB:

```powershell
node tools/sync_fallback_to_db.js
```

5) Start the dev server:

```powershell
npm run dev
```

Notes:
- If you added a Chat model to `prisma/schema.prisma`, run migration then the sync script which will upsert chat messages.
- The sync script attempts to upsert by `id` and clears the fallback files on success.
- If you prefer, run the sync script before starting the server to avoid serving duplicate fallback content.

*** End of instructions
