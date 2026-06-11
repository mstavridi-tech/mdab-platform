-- Run this once in Supabase: SQL Editor → New query → paste → Run
-- Creates the table that stores which lessons each member has completed.

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "select own progress" on public.lesson_progress
  for select using (auth.uid() = user_id);

create policy "insert own progress" on public.lesson_progress
  for insert with check (auth.uid() = user_id);

create policy "delete own progress" on public.lesson_progress
  for delete using (auth.uid() = user_id);
