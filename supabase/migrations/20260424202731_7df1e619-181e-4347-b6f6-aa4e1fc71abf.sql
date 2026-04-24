
-- Profiles table (basic per-user info)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated-at trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Learn concept progress
create table public.concept_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  concept_id text not null,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'needs_review')),
  was_correct_first_try boolean,
  attempts int not null default 0,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, concept_id)
);

alter table public.concept_progress enable row level security;

create policy "Users can view their own concept progress"
  on public.concept_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own concept progress"
  on public.concept_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own concept progress"
  on public.concept_progress for update
  using (auth.uid() = user_id);

create policy "Users can delete their own concept progress"
  on public.concept_progress for delete
  using (auth.uid() = user_id);

create trigger concept_progress_set_updated_at
  before update on public.concept_progress
  for each row execute function public.set_updated_at();

create index concept_progress_user_id_idx on public.concept_progress (user_id);

-- Practice exam attempts
create table public.practice_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  score int not null,
  total int not null,
  weak_categories text[] not null default '{}',
  question_ids text[] not null default '{}',
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.practice_attempts enable row level security;

create policy "Users can view their own practice attempts"
  on public.practice_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own practice attempts"
  on public.practice_attempts for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own practice attempts"
  on public.practice_attempts for delete
  using (auth.uid() = user_id);

create index practice_attempts_user_id_idx on public.practice_attempts (user_id, created_at desc);
