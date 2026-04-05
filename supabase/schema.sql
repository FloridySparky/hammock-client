-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Submissions table
create table if not exists submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  address text,
  city text,
  sqft text,
  inspection_type text,
  preferred_date text,
  message text,
  status text default 'new' check (status in ('new', 'read', 'contacted')),
  email_sent boolean default false,
  confirmation_sent boolean default false
);

-- Enable Row Level Security
alter table submissions enable row level security;

-- Policy: Only authenticated users can read submissions
create policy "Authenticated users can read submissions"
  on submissions for select
  to authenticated
  using (true);

-- Policy: Anyone can insert (for the public form)
create policy "Anyone can insert submissions"
  on submissions for insert
  to anon
  with check (true);

-- Policy: Authenticated users can update status
create policy "Authenticated users can update submissions"
  on submissions for update
  to authenticated
  using (true);

-- Index for sorting by date
create index idx_submissions_created_at on submissions(created_at desc);
