-- B3 / Barter Nigeria initial Supabase schema
-- Apply this file in the Supabase SQL Editor or through the Supabase CLI.
-- Row Level Security is enabled on every application table.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text,
  avatar_url text,
  location text,
  phone_verified boolean not null default false,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  )
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (length(trim(title)) between 3 and 120),
  description text not null check (length(trim(description)) between 5 and 5000),
  offering_category text not null,
  offering_description text not null,
  seeking_category text not null,
  seeking_description text not null,
  location text not null,
  image_url text,
  status text not null default 'active'
    check (status in ('active', 'pending', 'completed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists listings_status_created_at_idx
  on public.listings (status, created_at desc);
create index if not exists listings_user_id_idx on public.listings (user_id);

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  proposer_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  offering_listing_id uuid not null references public.listings(id),
  requested_listing_id uuid not null references public.listings(id),
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'completed', 'rejected', 'cancelled')),
  proposer_confirmed_at timestamptz,
  recipient_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trades_distinct_participants check (proposer_id <> recipient_id)
);

create index if not exists trades_proposer_idx on public.trades (proposer_id, created_at desc);
create index if not exists trades_recipient_idx on public.trades (recipient_id, created_at desc);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid not null references public.trades(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (length(trim(body)) between 1 and 5000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_trade_created_idx on public.messages (trade_id, created_at);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid not null references public.trades(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  reviewee_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text check (comment is null or length(comment) <= 2000),
  created_at timestamptz not null default now(),
  constraint reviews_one_per_user_per_trade unique (trade_id, reviewer_id),
  constraint reviews_distinct_users check (reviewer_id <> reviewee_id)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reported_user_id uuid references public.profiles(id) on delete set null,
  listing_id uuid references public.listings(id) on delete set null,
  trade_id uuid references public.trades(id) on delete set null,
  reason text not null,
  details text check (details is null or length(details) <= 5000),
  status text not null default 'open'
    check (status in ('open', 'under_review', 'resolved', 'dismissed')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.trades enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;
alter table public.reports enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists "Anyone can view active listings" on public.listings;
create policy "Anyone can view active listings"
  on public.listings for select
  using (status = 'active' or user_id = (select auth.uid()));

drop policy if exists "Authenticated users can create their own listings" on public.listings;
create policy "Authenticated users can create their own listings"
  on public.listings for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "Owners can update their listings" on public.listings;
create policy "Owners can update their listings"
  on public.listings for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "Owners can delete their listings" on public.listings;
create policy "Owners can delete their listings"
  on public.listings for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Trade participants can read trades" on public.trades;
create policy "Trade participants can read trades"
  on public.trades for select to authenticated
  using (proposer_id = (select auth.uid()) or recipient_id = (select auth.uid()));

drop policy if exists "Users can propose trades as themselves" on public.trades;
create policy "Users can propose trades as themselves"
  on public.trades for insert to authenticated
  with check (
    proposer_id = (select auth.uid())
    and proposer_id <> recipient_id
    and exists (
      select 1 from public.listings l
      where l.id = offering_listing_id and l.user_id = (select auth.uid())
    )
    and exists (
      select 1 from public.listings l
      where l.id = requested_listing_id and l.user_id = recipient_id and l.status = 'active'
    )
  );

drop policy if exists "Trade participants can update trades" on public.trades;
create policy "Trade participants can update trades"
  on public.trades for update to authenticated
  using (proposer_id = (select auth.uid()) or recipient_id = (select auth.uid()))
  with check (proposer_id = (select auth.uid()) or recipient_id = (select auth.uid()));

drop policy if exists "Trade participants can read messages" on public.messages;
create policy "Trade participants can read messages"
  on public.messages for select to authenticated
  using (
    sender_id = (select auth.uid())
    or recipient_id = (select auth.uid())
  );

drop policy if exists "Participants can send messages in their trades" on public.messages;
create policy "Participants can send messages in their trades"
  on public.messages for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and exists (
      select 1 from public.trades t
      where t.id = trade_id
        and (t.proposer_id = (select auth.uid()) or t.recipient_id = (select auth.uid()))
        and (t.proposer_id = recipient_id or t.recipient_id = recipient_id)
    )
  );

drop policy if exists "Users can read reviews about themselves and reviews they wrote" on public.reviews;
create policy "Users can read reviews about themselves and reviews they wrote"
  on public.reviews for select to authenticated
  using (reviewer_id = (select auth.uid()) or reviewee_id = (select auth.uid()));

drop policy if exists "Trade participants can submit reviews after completion" on public.reviews;
create policy "Trade participants can submit reviews after completion"
  on public.reviews for insert to authenticated
  with check (
    reviewer_id = (select auth.uid())
    and exists (
      select 1 from public.trades t
      where t.id = trade_id
        and t.status = 'completed'
        and ((t.proposer_id = reviewer_id and t.recipient_id = reviewee_id)
          or (t.recipient_id = reviewer_id and t.proposer_id = reviewee_id))
    )
  );

drop policy if exists "Users can create reports" on public.reports;
create policy "Users can create reports"
  on public.reports for insert to authenticated
  with check (reporter_id = (select auth.uid()));

drop policy if exists "Reporters can read their own reports" on public.reports;
create policy "Reporters can read their own reports"
  on public.reports for select to authenticated
  using (reporter_id = (select auth.uid()));

-- Listing images are public for marketplace display. Uploads are restricted
-- to the authenticated owner path: listings/<auth-user-id>/<filename>.
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

drop policy if exists "Anyone can view listing images" on storage.objects;
create policy "Anyone can view listing images"
  on storage.objects for select
  using (bucket_id = 'listing-images');

drop policy if exists "Users can upload images into their own folder" on storage.objects;
create policy "Users can upload images into their own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = 'listings'
    and (storage.foldername(name))[2] = (select auth.uid())::text
  );

drop policy if exists "Users can update images in their own folder" on storage.objects;
create policy "Users can update images in their own folder"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = 'listings'
    and (storage.foldername(name))[2] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = 'listings'
    and (storage.foldername(name))[2] = (select auth.uid())::text
  );

drop policy if exists "Users can delete images in their own folder" on storage.objects;
create policy "Users can delete images in their own folder"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = 'listings'
    and (storage.foldername(name))[2] = (select auth.uid())::text
  );
