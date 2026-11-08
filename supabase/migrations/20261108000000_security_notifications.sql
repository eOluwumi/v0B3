-- Harden swap state transitions and add persistent in-app notifications.
-- Apply after 20261028000000_initial_schema.sql.

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('trade_proposed', 'trade_updated', 'message_received', 'system')),
  title text not null,
  body text not null,
  entity_type text,
  entity_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_created_idx
  on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;

drop policy if exists "Users can read their own notifications" on public.notifications;
create policy "Users can read their own notifications"
  on public.notifications for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Users can mark their own notifications read" on public.notifications;
create policy "Users can mark their own notifications read"
  on public.notifications for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- A participant can only change the status through the permitted state machine.
-- Completion is automatic only after both participants independently confirm.
create or replace function public.guard_trade_update()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  actor uuid := auth.uid();
begin
  if new.proposer_id is distinct from old.proposer_id
    or new.recipient_id is distinct from old.recipient_id
    or new.offering_listing_id is distinct from old.offering_listing_id
    or new.requested_listing_id is distinct from old.requested_listing_id then
    raise exception 'Trade participants and listings cannot be changed';
  end if;

  if actor is null or actor not in (old.proposer_id, old.recipient_id) then
    raise exception 'Only trade participants can update this trade';
  end if;

  if new.proposer_confirmed_at is distinct from old.proposer_confirmed_at then
    if actor <> old.proposer_id or old.proposer_confirmed_at is not null or new.proposer_confirmed_at is null then
      raise exception 'Only the proposer can confirm completion once';
    end if;
  end if;

  if new.recipient_confirmed_at is distinct from old.recipient_confirmed_at then
    if actor <> old.recipient_id or old.recipient_confirmed_at is not null or new.recipient_confirmed_at is null then
      raise exception 'Only the recipient can confirm completion once';
    end if;
  end if;

  if new.status is distinct from old.status then
    if old.status = 'pending' and actor = old.recipient_id and new.status in ('accepted', 'rejected') then
      null;
    elsif old.status = 'pending' and actor = old.proposer_id and new.status = 'cancelled' then
      null;
    else
      raise exception 'Invalid trade status transition';
    end if;
  end if;

  if old.status = 'accepted'
    and new.proposer_confirmed_at is not null
    and new.recipient_confirmed_at is not null then
    new.status := 'completed';
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists guard_trade_update_trigger on public.trades;
create trigger guard_trade_update_trigger
  before update on public.trades
  for each row execute function public.guard_trade_update();

-- Messages can only be read by people participating in the associated swap.
drop policy if exists "Trade participants can read messages" on public.messages;
create policy "Trade participants can read messages"
  on public.messages for select to authenticated
  using (
    exists (
      select 1 from public.trades t
      where t.id = trade_id
        and (t.proposer_id = (select auth.uid()) or t.recipient_id = (select auth.uid()))
    )
  );

drop policy if exists "Participants can send messages in their trades" on public.messages;
create policy "Participants can send messages in their trades"
  on public.messages for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and exists (
      select 1 from public.trades t
      where t.id = trade_id
        and (
          (t.proposer_id = (select auth.uid()) and t.recipient_id = recipient_id)
          or (t.recipient_id = (select auth.uid()) and t.proposer_id = recipient_id)
        )
    )
  );

create or replace function public.notify_trade_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.notifications (user_id, type, title, body, entity_type, entity_id)
    values (new.recipient_id, 'trade_proposed', 'New swap proposal', 'Someone has proposed an item-for-item exchange with you.', 'trade', new.id);
  elsif new.status is distinct from old.status then
    insert into public.notifications (user_id, type, title, body, entity_type, entity_id)
    values (
      case when auth.uid() = new.recipient_id then new.proposer_id else new.recipient_id end,
      'trade_updated',
      'Swap proposal updated',
      'A swap proposal you are involved in is now ' || new.status || '.',
      'trade',
      new.id
    );
  end if;
  return new;
end;
$$;

drop trigger if exists notify_trade_change_trigger on public.trades;
create trigger notify_trade_change_trigger
  after insert or update of status on public.trades
  for each row execute function public.notify_trade_change();

create or replace function public.notify_new_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notifications (user_id, type, title, body, entity_type, entity_id)
  values (new.recipient_id, 'message_received', 'New message', 'You have a new message about a swap.', 'trade', new.trade_id);
  return new;
end;
$$;

drop trigger if exists notify_new_message_trigger on public.messages;
create trigger notify_new_message_trigger
  after insert on public.messages
  for each row execute function public.notify_new_message();
