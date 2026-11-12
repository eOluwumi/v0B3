-- Keep PostgREST INSERT compatible while enforcing server-owned lifecycle fields in triggers.
grant insert on public.trades, public.messages, public.reports to authenticated;

create or replace function public.guard_trade_insert()
returns trigger language plpgsql security invoker set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null or new.proposer_id is distinct from auth.uid() then
    raise exception 'Only the authenticated proposer can create a trade';
  end if;
  if new.status <> 'pending' or new.proposer_confirmed_at is not null or new.recipient_confirmed_at is not null then
    raise exception 'New trades must begin pending and unconfirmed';
  end if;
  return new;
end;
$$;
revoke all on function public.guard_trade_insert() from public, anon, authenticated;
drop trigger if exists trades_guard_insert on public.trades;
create trigger trades_guard_insert before insert on public.trades
for each row execute function public.guard_trade_insert();

create or replace function public.guard_message_insert()
returns trigger language plpgsql security invoker set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null or new.sender_id is distinct from auth.uid() or new.read_at is not null then
    raise exception 'Messages must be sent by the signed-in sender and start unread';
  end if;
  return new;
end;
$$;
revoke all on function public.guard_message_insert() from public, anon, authenticated;
drop trigger if exists messages_guard_insert on public.messages;
create trigger messages_guard_insert before insert on public.messages
for each row execute function public.guard_message_insert();

create or replace function public.guard_report_insert()
returns trigger language plpgsql security invoker set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null or new.reporter_id is distinct from auth.uid() or new.status <> 'open' then
    raise exception 'Reports must be submitted by the signed-in reporter and start open';
  end if;
  return new;
end;
$$;
revoke all on function public.guard_report_insert() from public, anon, authenticated;
drop trigger if exists reports_guard_insert on public.reports;
create trigger reports_guard_insert before insert on public.reports
for each row execute function public.guard_report_insert();
