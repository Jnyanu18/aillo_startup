# AILO

Marketing site + lead capture + admin dashboard for **AILO**, an AI & technology consulting agency for SMEs.

Built with **TanStack Start** (React 19 + Vite) on the front, **Supabase** (Postgres + auth) on the back, and direct SMTP (via the domain's own mailbox) for lead notification emails.

## What's inside

- **`/`** — single-page dark marketing site with all 9 numbered consulting-deck sections.
- **`/style-guide`** — every design token, primitive, and chrome element in isolation.
- **`/auth`** — admin sign-in (no public sign-up).
- **`/admin`** — admin home, with a link to:
  - **`/admin/testimonials`** — CRUD over the homepage success stories.
- **`/sitemap.xml`** + **`/robots.txt`** — basic SEO.

## Data

Two Postgres tables (managed via Supabase migrations in `supabase/migrations/`):

- `testimonials` — public SELECT for published rows; admin-only writes.
- `user_roles` + `app_role` enum + `has_role()` security-definer fn — admin gate.

RLS is on for every table; grants and policies live in the migrations.

Note: consultation requests from the lead form aren't stored in the database today — `submitLead` (`src/lib/leads.functions.ts`) only sends a notification email. There's a `leads` table in the migrations that isn't currently written to; add the insert back in `submitLead` if you want a durable record beyond your inbox.

## Creating the first admin

There's no public sign-up.

1. Create a user with email + password in the Supabase dashboard (Authentication → Users).
2. Run this SQL against the database (SQL Editor, or `supabase db` locally):

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

Environment variables (never commit secrets — see `.env.example`):

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (browser)
- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `MAIL_USER`, `MAIL_PASSWORD`, `MAIL_SMTP_HOST`, `MAIL_SMTP_PORT`, `LEAD_NOTIFY_TO` (lead notification email, sent directly via the mailbox's own SMTP)

## Deploy

Production (`accelerationlogics.com`) is served by Vercel, project `aillo-startup`. Nitro auto-detects the Vercel build environment and switches to the `vercel` preset there; `cloudflare-module` in `vite.config.ts` is only the fallback for a self-managed Cloudflare deploy.

Pushing to `main` on GitHub auto-deploys to production via Vercel's Git integration — no manual step needed.

## To-do before launch

- ☐ Decide whether consultation requests should also be persisted to the `leads` table (see the note under **Data** above), not just emailed.
- ☐ Replace the seeded testimonials in `/admin/testimonials` with real client outcomes.
