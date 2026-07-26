-- Practice session tracking for the Chem/Math practice app.
--
-- This project's Supabase instance is shared with another app, so everything
-- here is namespaced with a `practice_` prefix and kept in the `public` schema
-- (no project-wide "exposed schema" change required, so the other app is
-- untouched). Row Level Security scopes every row to its owning auth user.
--
-- Identity model (A + B):
--   * Anonymous sign-ins give every visitor a real auth.users row (Option A).
--     Anonymous users carry the `authenticated` role, so the policies below
--     cover them.
--   * That anonymous user can later be upgraded in place to a permanent account
--     via email (Option B) — the uid does not change, so history is preserved.
--
-- Apply with the Supabase CLI (`supabase db push`) or by pasting into the
-- SQL editor of the existing project. See docs/supabase-setup.md.

create table if not exists public.practice_sessions (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  course_id  text        not null,
  type       text        not null check (type in ('quick', 'drill', 'math')),
  correct    integer     not null check (correct >= 0),
  total      integer     not null check (total > 0 and correct <= total),
  created_at timestamptz not null default now()
);

comment on table public.practice_sessions is
  'One row per completed practice session (chem-math-practice app).';

create index if not exists practice_sessions_user_course_idx
  on public.practice_sessions (user_id, course_id, created_at desc);

alter table public.practice_sessions enable row level security;

-- A user (anonymous or permanent) may only read and write their own rows.
drop policy if exists practice_sessions_select_own on public.practice_sessions;
create policy practice_sessions_select_own
  on public.practice_sessions
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists practice_sessions_insert_own on public.practice_sessions;
create policy practice_sessions_insert_own
  on public.practice_sessions
  for insert
  to authenticated
  with check (auth.uid() = user_id);
