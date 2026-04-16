-- SwiftScribe Supabase Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create emails table
create table public.emails (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    sender text not null,
    sender_email text not null,
    subject text not null,
    preview text,
    body text,
    timestamp timestamptz default now(),
    priority text check (priority in ('low', 'medium', 'high', 'urgent')) default 'medium',
    category text check (category in ('general', 'technical', 'billing', 'sales', 'complaint')) default 'general',
    status text check (status in ('unread', 'read', 'responded', 'archived')) default 'unread',
    is_starred boolean default false,
    ai_summary text,
    confidence_score numeric
);

-- 2. Create knowledge base articles table
create table public.knowledge_articles (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    content text not null,
    category text default 'General',
    tags text[] default '{}',
    author text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    is_active boolean default true,
    views integer default 0
);

-- 3. Create user settings table
create table public.user_settings (
    user_id uuid references auth.users(id) on delete cascade primary key,
    display_name text,
    email_notifications boolean default true,
    theme text default 'system',
    ai_auto_summary boolean default true
);

-- Turn on Row Level Security
alter table public.emails enable row level security;
alter table public.knowledge_articles enable row level security;
alter table public.user_settings enable row level security;

-- Create Policies so users can only view and edit their own data
create policy "Users can view own emails" on emails for select using (auth.uid() = user_id);
create policy "Users can insert own emails" on emails for insert with check (auth.uid() = user_id);
create policy "Users can update own emails" on emails for update using (auth.uid() = user_id);
create policy "Users can delete own emails" on emails for delete using (auth.uid() = user_id);

create policy "Users can view own articles" on knowledge_articles for select using (auth.uid() = user_id);
create policy "Users can insert own articles" on knowledge_articles for insert with check (auth.uid() = user_id);
create policy "Users can update own articles" on knowledge_articles for update using (auth.uid() = user_id);
create policy "Users can delete own articles" on knowledge_articles for delete using (auth.uid() = user_id);

create policy "Users can view own settings" on user_settings for select using (auth.uid() = user_id);
create policy "Users can insert own settings" on user_settings for insert with check (auth.uid() = user_id);
create policy "Users can update own settings" on user_settings for update using (auth.uid() = user_id);
