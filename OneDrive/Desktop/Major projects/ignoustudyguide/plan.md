# Auto

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:
- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

**Debug requests, questions, and investigations:** answer or investigate first. Do not create a plan upfront — the user needs an answer, not a plan. A plan may become relevant later once the investigation reveals what needs to change.

**For all other tasks**, before writing any code, assess the scope of the actual change (not the prompt length — a one-sentence prompt can describe a large feature). Scale your approach:

- **Trivial** (typo, config tweak, single obvious change): implement directly, no plan needed.
- **Small** (a few files, clear what to do): write 2–3 sentences in `plan.md` describing what and why, then implement. No substeps.
- **Medium** (multiple components, design decisions, edge cases): write a plan in `plan.md` with requirements, affected files, key decisions, verification. Break into 3–5 steps.
- **Large** (new feature, cross-cutting, unclear scope): gather requirements and write a technical spec first (`requirements.md`, `spec.md` in `{@artifacts_path}/`). Then write `plan.md` with concrete steps referencing the spec.

**Skip planning and implement directly when** the task is trivial, or the user explicitly asks to "just do it" / gives a clear direct instruction.

To reflect the actual purpose of the first step, you can rename it to something more relevant (e.g., Planning, Investigation). Do NOT remove meta information like comments for any step.

Rule of thumb for step size: each step = a coherent unit of work (component, endpoint, test suite). Not too granular (single function), not too broad (entire feature). Unit tests are part of each step, not separate.

Update `{@artifacts_path}/plan.md` if it makes sense to have a plan and task has more than 1 big step.

### [x] Step: Update navbar auth buttons
- Fetch `/api/auth/me` on mount in `SlidingNavbar`
- When logged in: show "My Account" link + Logout button (both desktop & mobile)
- When logged out: show Sign In / Get Started buttons as before

### [x] Step: Create My Account page
- New API route `app/api/user/profile/route.ts` — reads session + fetches full user row from DB
- New page `app/myaccount/page.tsx` — shows name, email, phone, enrollment number, programme, role, join date; includes Logout button
- Redirects to `/signin` if not authenticated

### [x] Step: Full admin panel
- `components/admin-navbar.tsx` — sidebar with links (Dashboard, Analytics, Payments, Materials, Users)
- `app/admin/layout.tsx` — wraps all admin pages with sidebar
- `app/admin/page.tsx` — rebuilt dashboard with stats, quick actions, pending alert
- `app/admin/analytics/page.tsx` — visit logs, device breakdown, top pages
- `app/admin/payments/page.tsx` — payment table with revenue totals
- `app/admin/materials/page.tsx` — filter by status, approve/reject inline
- `app/admin/users/page.tsx` — searchable users table
- API routes: `/api/admin/users`, `/api/admin/payments`, `/api/admin/materials` (GET + PATCH), `/api/admin/analytics`

### [x] Step: Fix empty links + mobile responsive + login guard + SEO
- `components/ui/footer.tsx` — all `href="#"` replaced with real routes
- `app/services/page.tsx` — all buttons linked; mobile responsive (2-col grid, hidden descriptions on mobile, smaller text)
- `app/contact/page.tsx` — mobile responsive (smaller padding/text, stacked layout)
- `app/browse/page.tsx` — SEO metadata + Footer added
- `app/materials/materials-client.tsx` — login-first gate on upload form (shows Sign In prompt when logged out)
- `app/layout.tsx` — enhanced global SEO (expanded keywords, en_IN locale, googleBot directives, Google verification)
- `app/contact/page.tsx` + `app/services/page.tsx` — page-level metadata added

### [x] Step: JSON-driven programme pages + DB-driven popular programmes + semester auto-detect
- `lib/programmes.ts` — new utility: reads `programmes_with_courses.json`, finds programme by code (handles BCA→BCA_NEW suffix variants), groups courses by semester, looks up course → semester
- `lib/materials.ts` — added `getDistinctProgrammes(materialType?)`: returns distinct programmes with counts from DB; added `semester` to `MaterialInput` and DB insert
- `db/schema.sql` — added `semester text` column to `marketplace_materials`; added `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` migration at bottom
- `app/api/programmes/route.ts` — new: `?code=BCA` returns programme semesters from JSON; `?courseCode=BCS011` returns semester + programme for auto-fill
- `app/api/materials/programmes/route.ts` — new: returns distinct programmes with assignment/notes counts from DB
- `app/assignments/page.tsx` — replaced hardcoded `popularPrograms` with top programmes from DB (by assignment count); full names looked up from JSON; fallback to hardcoded if DB is empty
- `app/notes/page.tsx` — same as above but for notes
- `app/assignments/[program]/page.tsx` — removed hardcoded `programData`; fetches programme/semester/subject data from `/api/programmes?code=BCA`; loading spinner while fetching; works for all 339 programmes in JSON
- `app/notes/[program]/page.tsx` — same dynamic JSON-driven data for notes
- `app/materials/materials-client.tsx` — added semester auto-detect: when user types course code, calls `/api/programmes?courseCode=CODE` and shows detected semester below the input; semester saved to DB on submit
- `app/api/materials/route.ts` — POST now passes `semester` from request body to `createMaterialListing`

### [x] Step: Programme-aware content + DB-driven assignments & notes
- `components/ui/resourcesuggesion.tsx` — saves `userProgramme` + `userProgrammeCode` to localStorage; fetches real materials from `/api/materials?programme=CODE` for "For you" section; shows change-programme button
- `lib/materials.ts` — added `programme`, `userId` filters to `getMaterialListings`; new `getMaterialCountsByProgramme`; `createMaterialListing` now saves `user_id`
- `app/api/materials/route.ts` — supports `programme` and `mine=true` query params; saves `user_id` from session on POST
- `app/api/materials/counts/route.ts` — new endpoint: returns per-course-code counts for a given programme + type
- `app/assignments/[program]/page.tsx` — fetches DB counts per course code; shows "N in DB" badge on semester headers, "N available" / "No DB entries" on each subject
- `app/assignments/category/[program]/page.tsx` — server component, fetches real DB assignments, displays with download/buy links
- `app/notes/[program]/page.tsx` — same DB-count badges as assignments page
- `app/notes/category/[program]/page.tsx` — server component, fetches real DB notes, displays with download/buy links
- `app/materials/materials-client.tsx` — added "Your approved uploads" section below the upload form; fetches via `?mine=true`
- `components/product.tsx` — reads `userProgrammeCode` from localStorage on mount; fetches programme-filtered assignments from DB; falls back to static data if none found
