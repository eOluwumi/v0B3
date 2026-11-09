-- BarterNaija public application schema (2026-11-09)
-- The pre-existing barternaija schema is retained and not exposed to the Data API.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text,
  avatar_url text,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (length(trim(title)) between 3 and 120),
  description text not null check (length(trim(description)) between 5 and 5000),
  offering_category text not null,
  offering_description text not null,
  seeking_category text not null,
  seeking_description text not null,
  location text not null check (location in ('Lagos','Ibadan','Abeokuta')),
  image_url text,
  status text not null default 'active' check (status in ('active','pending','completed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  proposer_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  offering_listing_id uuid not null references public.listings(id),
  requested_listing_id uuid not null references public.listings(id),
  status text not null default 'pending' check (status in ('pending','accepted','completed','rejected','cancelled')),
  proposer_confirmed_at timestamptz,
  recipient_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trades_distinct_participants check (proposer_id <> recipient_id),
  constraint trades_distinct_listings check (offering_listing_id <> requested_listing_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid not null references public.trades(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (length(trim(body)) between 1 and 5000),
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint messages_distinct_participants check (sender_id <> recipient_id)
);

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
  reason text not null check (length(trim(reason)) between 3 and 200),
  details text check (details is null or length(details) <= 5000),
  status text not null default 'open' check (status in ('open','under_review','resolved','dismissed')),
  created_at timestamptz not null default now()
);

create index if not exists listings_status_created_at_idx on public.listings(status, created_at desc);
create index if not exists listings_user_id_idx on public.listings(user_id);
create index if not exists listings_location_idx on public.listings(location);
create index if not exists trades_proposer_idx on public.trades(proposer_id, created_at desc);
create index if not exists trades_recipient_idx on public.trades(recipient_id, created_at desc);
create index if not exists messages_trade_created_idx on public.messages(trade_id, created_at);
create index if not exists messages_recipient_unread_idx on public.messages(recipient_id, created_at desc) where read_at is null;
create index if not exists reviews_reviewee_idx on public.reviews(reviewee_id, created_at desc);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name',''), new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists listings_set_updated_at on public.listings;
create trigger listings_set_updated_at before update on public.listings for each row execute procedure public.set_updated_at();
drop trigger if exists trades_set_updated_at on public.trades;
create trigger trades_set_updated_at before update on public.trades for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.trades enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;
alter table public.reports enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select to authenticated using (id = (select auth.uid()));
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

drop policy if exists listings_read_active_or_owned on public.listings;
create policy listings_read_active_or_owned on public.listings for select to anon, authenticated using (status = 'active' or user_id = (select auth.uid()));
drop policy if exists listings_insert_own on public.listings;
create policy listings_insert_own on public.listings for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists listings_update_own on public.listings;
create policy listings_update_own on public.listings for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists listings_delete_own on public.listings;
create policy listings_delete_own on public.listings for delete to authenticated using (user_id = (select auth.uid()));

drop policy if exists trades_read_participant on public.trades;
create policy trades_read_participant on public.trades for select to authenticated using (proposer_id = (select auth.uid()) or recipient_id = (select auth.uid()));
drop policy if exists trades_create_valid_proposal on public.trades;
create policy trades_create_valid_proposal on public.trades for insert to authenticated with check (
  proposer_id = (select auth.uid()) and proposer_id <> recipient_id
  and exists (select 1 from public.listings l where l.id = offering_listing_id and l.user_id = (select auth.uid()) and l.status = 'active')
  and exists (select 1 from public.listings l where l.id = requested_listing_id and l.user_id = recipient_id and l.status = 'active')
);

drop policy if exists messages_read_participant on public.messages;
create policy messages_read_participant on public.messages for select to authenticated using (
  exists (select 1 from public.trades t where t.id = trade_id and (t.proposer_id = (select auth.uid()) or t.recipient_id = (select auth.uid())))
  and (sender_id = (select auth.uid()) or recipient_id = (select auth.uid()))
);
drop policy if exists messages_send_as_participant on public.messages;
create policy messages_send_as_participant on public.messages for insert to authenticated with check (
  sender_id = (select auth.uid())
  and exists (select 1 from public.trades t where t.id = trade_id and t.status = 'accepted'
    and ((t.proposer_id = sender_id and t.recipient_id = recipient_id) or (t.recipient_id = sender_id and t.proposer_id = recipient_id)))
);
drop policy if exists messages_mark_received on public.messages;
create policy messages_mark_received on public.messages for update to authenticated using (recipient_id = (select auth.uid())) with check (recipient_id = (select auth.uid()));

drop policy if exists reviews_read_signed_in on public.reviews;
create policy reviews_read_signed_in on public.reviews for select to authenticated using (true);
drop policy if exists reviews_create_after_completed_trade on public.reviews;
create policy reviews_create_after_completed_trade on public.reviews for insert to authenticated with check (
  reviewer_id = (select auth.uid())
  and exists (select 1 from public.trades t where t.id = trade_id and t.status = 'completed'
    and ((t.proposer_id = reviewer_id and t.recipient_id = reviewee_id) or (t.recipient_id = reviewer_id and t.proposer_id = reviewee_id)))
);

drop policy if exists reports_create_own on public.reports;
create policy reports_create_own on public.reports for insert to authenticated with check (reporter_id = (select auth.uid()));
drop policy if exists reports_read_own on public.reports;
create policy reports_read_own on public.reports for select to authenticated using (reporter_id = (select auth.uid()));

-- Trade status is changed only through these participant-checked functions.
create or replace function public.respond_to_trade(p_trade_id uuid, p_action text)
returns public.trades language plpgsql security definer set search_path = public, pg_temp
as $$
declare v_trade public.trades; v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'Authentication required'; end if;
  select * into v_trade from public.trades where id = p_trade_id for update;
  if not found then raise exception 'Trade not found'; end if;
  if p_action in ('accept','reject') then
    if v_trade.recipient_id <> v_uid or v_trade.status <> 'pending' then raise exception 'Only the recipient can accept or reject a pending trade'; end if;
    update public.trades set status = p_action where id = p_trade_id returning * into v_trade;
  elsif p_action = 'cancel' then
    if v_trade.proposer_id <> v_uid or v_trade.status not in ('pending','accepted') then raise exception 'Only the proposer can cancel this trade'; end if;
    update public.trades set status = 'cancelled' where id = p_trade_id returning * into v_trade;
  else raise exception 'Unsupported trade action'; end if;
  return v_trade;
end;
$$;
revoke all on function public.respond_to_trade(uuid,text) from public, anon;
grant execute on function public.respond_to_trade(uuid,text) to authenticated;

create or replace function public.confirm_trade_completion(p_trade_id uuid)
returns public.trades language plpgsql security definer set search_path = public, pg_temp
as $$
declare v_trade public.trades; v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'Authentication required'; end if;
  select * into v_trade from public.trades where id = p_trade_id for update;
  if not found or v_trade.status <> 'accepted' then raise exception 'Accepted trade not found'; end if;
  if v_trade.proposer_id = v_uid then
    update public.trades set proposer_confirmed_at = coalesce(proposer_confirmed_at,now()) where id = p_trade_id returning * into v_trade;
  elsif v_trade.recipient_id = v_uid then
    update public.trades set recipient_confirmed_at = coalesce(recipient_confirmed_at,now()) where id = p_trade_id returning * into v_trade;
  else raise exception 'Only trade participants can confirm completion'; end if;
  if v_trade.proposer_confirmed_at is not null and v_trade.recipient_confirmed_at is not null then
    update public.trades set status = 'completed' where id = p_trade_id returning * into v_trade;
  end if;
  return v_trade;
end;
$$;
revoke all on function public.confirm_trade_completion(uuid) from public, anon;
grant execute on function public.confirm_trade_completion(uuid) to authenticated;

-- Least-privilege table grants; listings are the only anonymous-readable table.
revoke all on all tables in schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.listings to anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.listings to authenticated;
grant select, insert on public.trades to authenticated;
grant select, insert on public.messages to authenticated;
grant update (read_at) on public.messages to authenticated;
grant select, insert on public.reviews to authenticated;
grant select, insert on public.reports to authenticated;

insert into storage.buckets (id,name,public) values ('listing-images','listing-images',true)
on conflict (id) do update set public = excluded.public;
drop policy if exists listing_images_public_read on storage.objects;
create policy listing_images_public_read on storage.objects for select using (bucket_id = 'listing-images');
drop policy if exists listing_images_upload_own_folder on storage.objects;
create policy listing_images_upload_own_folder on storage.objects for insert to authenticated with check (
  bucket_id = 'listing-images' and (storage.foldername(name))[1] = 'listings'
  and (storage.foldername(name))[2] = (select auth.uid())::text
);
drop policy if exists listing_images_update_own_folder on storage.objects;
create policy listing_images_update_own_folder on storage.objects for update to authenticated
using (bucket_id = 'listing-images' and (storage.foldername(name))[1] = 'listings' and (storage.foldername(name))[2] = (select auth.uid())::text)
with check (bucket_id = 'listing-images' and (storage.foldername(name))[1] = 'listings' and (storage.foldername(name))[2] = (select auth.uid())::text);
drop policy if exists listing_images_delete_own_folder on storage.objects;
create policy listing_images_delete_own_folder on storage.objects for delete to authenticated using (
  bucket_id = 'listing-images' and (storage.foldername(name))[1] = 'listings'
  and (storage.foldername(name))[2] = (select auth.uid())::text
);

do $$ begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages') then
    alter publication supabase_realtime add table public.messages;
  end if;
end $$;
