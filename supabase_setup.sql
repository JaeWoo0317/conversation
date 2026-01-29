-- Run this in the Supabase SQL Editor

-- Create the table to store analysis results
create table reflections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  conversation text not null,
  mode text not null,
  goal text not null,
  result jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table reflections enable row level security;

-- Policy: Users can view their own data
create policy "Users can view their own data" on reflections
  for select using (auth.uid() = user_id);

-- Policy: Users can insert their own data
create policy "Users can insert their own data" on reflections
  for insert with check (auth.uid() = user_id);
