create table if not exists public.folders (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at_ms bigint not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists folders_user_id_idx on public.folders (user_id);
create index if not exists folders_user_id_name_idx on public.folders (user_id, name);

alter table public.folders enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'folders'
      and policyname = 'folders_select_own'
  ) then
    create policy folders_select_own
      on public.folders
      for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'folders'
      and policyname = 'folders_insert_own'
  ) then
    create policy folders_insert_own
      on public.folders
      for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'folders'
      and policyname = 'folders_update_own'
  ) then
    create policy folders_update_own
      on public.folders
      for update
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'folders'
      and policyname = 'folders_delete_own'
  ) then
    create policy folders_delete_own
      on public.folders
      for delete
      using (auth.uid() = user_id);
  end if;
end $$;

alter table public.sessions
  add column if not exists folder_id text,
  add column if not exists is_pinned boolean not null default false;

create index if not exists sessions_user_id_is_pinned_idx on public.sessions (user_id, is_pinned);
create index if not exists sessions_user_id_folder_id_idx on public.sessions (user_id, folder_id);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'sessions_folder_id_fkey'
  ) then
    alter table public.sessions
      add constraint sessions_folder_id_fkey
      foreign key (folder_id)
      references public.folders(id)
      on delete set null;
  end if;
end $$;
