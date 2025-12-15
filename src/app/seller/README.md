# Seller dashboard — quick guide

This small guide explains the seller dashboard components and how to test them locally.

Endpoints used by the dashboard (client-side fetch):

- `GET /api/auth/me` — returns `{ user }` used to confirm role and id.
- `GET /api/vendor/dashboard` — optional vendor summary (rating, revenue, counts).
- `GET /api/seller/services` — expected response: `{ services: [ { id|_id, title, price, images, rating, active } ] }`.
- `GET /api/seller/orders` — expected response: `{ orders: [ { id|_id, buyerName, total, status, createdAt } ] }`.
- `DELETE /api/seller/services/:id` — delete a service (used by dashboard delete action).
- `PATCH /api/seller/services/:id` — update service fields (body example: `{ active: true }`).
- Upload endpoints (used by UploadWidget inside ServiceModal):
  - `POST /api/uploads/signed-url` — request signed URL for upload. Expect `{ ok: true, url, key }`.
  - `PUT` to the signed URL — client uploads binary data.
  - `POST /api/uploads/complete` — notify server of completed upload (body `{ key, filename, size, mime }`).

Local testing

1. Start dev server:

```powershell
npm install
npm run dev
```

2. Create or use an account with role `seller` or `vendor`. The dashboard page checks `user.role` returned from `/api/auth/me`.

3. Open: `http://localhost:3000/seller/dashboard`

Notes
- The UI is client-side and expects the endpoints above. If your API shape differs, update the fetch handlers in `src/app/seller/dashboard/page.tsx`.
- Uploads will include `x-user-id` and `x-service-id` headers when present.
- If you want the upload widget to appear elsewhere, move `UploadWidget` from `src/components/seller/UploadWidget.tsx`.

If you want, I can add small mocks for local dev so uploads and deletes work without backend changes.

-- quick assistant
