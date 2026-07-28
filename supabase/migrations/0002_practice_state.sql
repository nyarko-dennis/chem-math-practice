-- Cross-device sync for the chem-math-practice app.
--
-- Replaces the throwaway practice_sessions table with a single snapshot row per
-- user: a JSON backup of that user's localStorage practice state (progress +
-- spaced-repetition stats + streak). Namespaced `practice_` and RLS-scoped so it
-- safely shares a project with another app.

drop table if exists public.practice_sessions;

create table if not exists public.practice_state (
  user_id    uuid        primary key default auth.uid() references auth.users (id) on delete cascade,
  state      jsonb       not null,
  updated_at timestamptz not null default now()
);

comment on table public.practice_state is
  'One JSON snapshot row per user (chem-math-practice app).';

alter table public.practice_state enable row level security;

-- A user may only read and write their own snapshot row.
drop policy if exists practice_state_select_own on public.practice_state;
create policy practice_state_select_own
  on public.practice_state for select
  to authenticated using (auth.uid() = user_id);

drop policy if exists practice_state_insert_own on public.practice_state;
create policy practice_state_insert_own
  on public.practice_state for insert
  to authenticated with check (auth.uid() = user_id);

drop policy if exists practice_state_update_own on public.practice_state;
create policy practice_state_update_own
  on public.practice_state for update
  to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
