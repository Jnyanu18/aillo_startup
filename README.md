# AILO

Marketing site + lead capture + admin dashboard for **AILO**, an AI & technology consulting agency for SMEs.

Built on **Lovable's stack**: TanStack Start (React 19 + Vite) on the front, Lovable Cloud (Postgres + auth + serverless functions) on the back, Lovable Emails for transactional mail.

## What's inside

- **`/`** — single-page dark marketing site with all 9 numbered consulting-deck sections.
- **`/style-guide`** — every design token, primitive, and chrome element in isolation.
- **`/auth`** — admin sign-in (no public sign-up).
- **`/admin`** — admin home, with links to:
  - **`/admin/leads`** — sortable/filterable table of consultation requests, with "mark as contacted" toggle.
  - **`/admin/testimonials`** — CRUD over the homepage success stories (Section 08).
- **`/sitemap.xml`** + **`/robots.txt`** — basic SEO.

## Data

Three Postgres tables (managed via Lovable Cloud migrations):

- `leads` — public INSERT, admin-only SELECT/UPDATE/DELETE.
- `testimonials` — public SELECT for published rows; admin-only writes.
- `user_roles` + `app_role` enum + `has_role()` security-definer fn — admin gate.

RLS is on for every table; grants and policies live in the migrations.

## Creating the first admin

Lovable Cloud manages auth — there is no public sign-up.

1. Open **Cloud → Users** in the Lovable editor and create a user with email + password.
2. Run this SQL in **Cloud → Database**:

   ```sql
   INSERT INTO public.user_roles (user_id, role)
   SELECT id, 'admin' FROM auth.users WHERE email = 'you@yourcompany.com';
   ```

3. Sign in at `/auth`.

## Local development

```bash
bun install
bun dev          # → http://localhost:8080
```

Environment variables (auto-managed by Lovable Cloud — never commit secrets):

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (browser)
- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only)

## Deploy

Use the **Publish** button in the Lovable editor. Frontend changes require an explicit publish; backend changes (migrations, server functions) deploy automatically.

## To-do before launch

The brochure copy ships with **placeholders** that need to be swapped:

- ☐ Replace the seeded testimonials in `/admin/testimonials` with real client outcomes.
- ☐ Update the phone number in `src/components/site-footer.tsx` and the final CTA in `src/routes/index.tsx`.
- ☐ Set up an email domain (Lovable Emails) so lead notification + confirmation emails actually send. Today, the lead is saved to the DB and a `// TODO` is left in `submitLead` — wire `sendTransactionalEmail` once the domain is verified.
- ☐ If you have a real AILO logo asset, swap the wordmark in `src/components/site-nav.tsx` and `src/components/site-footer.tsx`.
