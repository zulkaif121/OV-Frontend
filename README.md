# OVI Frontend

Enterprise-grade Next.js 15 frontend scaffold for OVI (AI-assisted STR operations).

## Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS v4 + shadcn/ui
- TanStack Query v5
- React Hook Form + Zod
- Zustand
- Supabase Auth (`@supabase/ssr`)
- Playwright

## Environment

Copy `.env.example` and provide values:

```bash
cp .env.example .env.local
```

Required vars:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_VERSION`
- `NEXT_PUBLIC_UI_ONLY_MODE` (`true` to bypass login in development; defaults to `true` when unset)
- `NEXT_PUBLIC_UI_ONLY_ROLE` (default dev role, e.g. `SUPERADMIN`)
- `NEXT_PUBLIC_DEV_LOGIN_EMAIL` (dev-only login prefill)
- `NEXT_PUBLIC_DEV_LOGIN_PASSWORD` (dev-only login prefill)

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test:e2e
```

## shadcn/ui

- Config file: `components.json`
- UI primitives location: `src/shared/components/ui`

## UI-Only Development Mode

To work UI-first without Supabase login:

```bash
NEXT_PUBLIC_UI_ONLY_MODE=true
NEXT_PUBLIC_UI_ONLY_ROLE=SUPERADMIN
```

When UI-only mode is on, `/login`, `/signup`, and `/verify-otp` automatically redirect to the role landing page.

To force real auth in development:

```bash
NEXT_PUBLIC_UI_ONLY_MODE=false
```

Optional per-request role override:

- Open `http://localhost:3000/dashboard?role=OWNER`
- Open `http://localhost:3000/dashboard?role=CLEANER`

## Theme Selection

- Header dropdown supports:
  - `light`
  - `dark`
  - `cyan` (based on `#22d3ee` shades)

- Theme options are centralized in `src/config/theme.ts`:
  - `appThemes`
  - `appThemeOptions`
  - `defaultAppTheme`

- Cyan theme variables live in `src/styles/globals.css` under `.cyan`.
- `activeColorScheme: "teal" | "gold" | "bronze"` still controls optional accent overrides.

## Structure

```text
src/
  app/
  features/
  shared/
  lib/
  config/
  styles/
  middleware.ts
```

Routes are thin wrappers. Feature logic lives in `src/features/<feature>/`.

## E2E Auth Setup

Playwright auth-dependent tests read:

- `E2E_USER_EMAIL`
- `E2E_USER_PASSWORD`

If missing, authenticated tests are skipped.
