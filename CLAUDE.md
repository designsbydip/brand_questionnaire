# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A multi-page intake questionnaire web app (28 pages across 15 parts) that collects brand strategy inputs from a client for the Gaudi website project. It is an internal agency tool — not a Gaudi product. Responses are stored in PostgreSQL and viewable via a password-protected admin dashboard.

## Commands

```bash
npm run dev          # start dev server (localhost:3000)
npm run build        # production build
npm run db:studio    # open Prisma Studio DB GUI
```

There is no lint or test script. TypeScript type-checking: `npx tsc --noEmit`.

After any Prisma schema change run:
```bash
npx prisma migrate dev --name <migration-name>
npx prisma generate
```

## Required Environment Variables

`.env.local` needs:
```
DATABASE_URL=postgresql://...          # Supabase PostgreSQL connection string
NEXT_PUBLIC_SUPABASE_URL=...           # Supabase project URL (public)
NEXT_PUBLIC_SUPABASE_ANON_KEY=...      # Supabase anon key (public)
```

## Architecture

### Authentication

All auth is handled by Supabase. `middleware.ts` enforces route protection on `/admin/*`, `/form/*`, and `/login`:
- Client form routes redirect to `/login` if not authenticated.
- Admin routes require an authenticated user with email `admin@gaudi.internal`; others are redirected to `/login`.
- Admin login redirects to `/admin` if already authenticated as admin.

Supabase clients: `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (SSR, uses `cookies()`).

### Form flow

All form pages live under `app/form/[part-page]/page.tsx` (e.g. `1-1`, `2-3`, `15-1`). The complete ordered list of 28 pages and their metadata is the `FORM_PAGES` array in `lib/types.ts` — this is the single source of truth for navigation order, part titles, and page titles. Use `getNextRoute` / `getPrevRoute` from that file for navigation.

`app/form/layout.tsx` is a server component that:
1. Verifies the Supabase session (redirects to `/login` if none).
2. Loads the user's existing `GaudiResponse` from the database.
3. Wraps children in `<FormProvider initialData={...}>` to hydrate client-side state from the DB on first load.

### State management

`context/FormContext.tsx` holds a flat `Record<string, unknown>` for all form data. It uses `useReducer` and persists to `localStorage` under keys `gaudi_form_data` / `gaudi_response_id`.

`hooks/useFormPage.ts` is the standard hook used by every form page. It wires up `react-hook-form` with a Zod schema, hydrates from context on mount, and exposes `onSaveFields` which both updates context and calls `POST /api/auto-save`.

Completion percentage is computed from a hardcoded `REQUIRED_FIELDS` list in `FormContext.tsx`.

### API routes

| Route | Purpose |
|---|---|
| `POST /api/auto-save` | Create or update a `GaudiResponse` draft (called on every page navigation) |
| `GET/POST /api/responses` | Submit final response |
| `GET /api/responses/[id]` | Retrieve a response |
| `POST /api/admin/login` | Sign in via Supabase email+password |
| `GET/PUT/DELETE /api/admin/responses/[id]` | Admin CRUD on responses |
| `GET /api/admin/export` | Export responses as CSV or JSON |

Admin API routes verify the caller by calling `supabase.auth.getUser()` server-side and checking that `user.email === "admin@gaudi.internal"`.

### Database

Three Prisma models in `prisma/schema.prisma`:
- `GaudiResponse` — flat model with every form field (all optional except metadata); one record per Supabase `userId`
- `AdminUser` — admin credentials (hashed with bcrypt, legacy; not used by current Supabase auth flow)
- `DraftResponse` — legacy draft storage (not actively used by current auto-save flow)

Prisma client is a singleton in `lib/db.ts` to avoid connection pooling issues in dev.

### Component structure

- `components/form/` — reusable input components (`TextInput`, `TextareaInput`, `CheckboxInput`, `RadioInput`, `SliderInput`, `NumberInput`, `DateInput`, `SelectInput`, `ColorPickerInput`, `DynamicInput`, `SortableRankInput`) plus layout primitives (`FormLayout`, `FormNavigator`, `FormStepper`)
- `components/ui/` — shadcn/ui primitives (do not edit these directly)
- `lib/validation.ts` — Zod schemas per part (Part1Schema … Part15Schema)
- `lib/types.ts` — TypeScript interfaces per part, `FullFormData`, and the `FORM_PAGES` navigation array
- `lib/exportHelpers.ts` — CSV/JSON export logic and `calculateCompletionPercentage`

### Adding a new form page

1. Add an entry to `FORM_PAGES` in `lib/types.ts` with the correct `totalPageNumber`.
2. Create `app/form/<route>/page.tsx` using `useFormPage` with the relevant Zod schema.
3. Add any new fields to the Prisma schema and run a migration.
