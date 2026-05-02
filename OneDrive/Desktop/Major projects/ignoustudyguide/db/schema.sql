create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text not null unique,
  phone text,
  enrollment_number text unique,
  programme text,
  password_hash text not null,
  role text not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists scrape_cache (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  cache_key text not null,
  payload jsonb not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, cache_key)
);

create index if not exists scrape_cache_lookup_idx
  on scrape_cache (kind, cache_key, expires_at);

create table if not exists marketplace_materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  title text not null,
  description text,
  material_type text not null check (material_type in ('assignment', 'notes', 'book', 'paper', 'other')),
  programme text,
  course_code text,
  semester text,
  price_paise integer not null default 0,
  currency text not null default 'INR',
  file_url text not null,
  preview_url text,
  seller_name text,
  seller_email text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists marketplace_materials_public_idx
  on marketplace_materials (status, material_type, created_at desc);

create unique index if not exists marketplace_materials_file_unique_idx
  on marketplace_materials (material_type, file_url);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  material_id uuid references marketplace_materials(id) on delete set null,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  amount_paise integer not null,
  currency text not null default 'INR',
  status text not null default 'created',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists admin_visits (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

alter table marketplace_materials add column if not exists semester text;
