-- Restrict client inserts to user-controlled business fields; server defaults own lifecycle metadata.
revoke insert on public.trades from authenticated;
grant insert (proposer_id, recipient_id, offering_listing_id, requested_listing_id) on public.trades to authenticated;

revoke insert on public.messages from authenticated;
grant insert (trade_id, sender_id, recipient_id, body) on public.messages to authenticated;

revoke insert on public.reports from authenticated;
grant insert (reporter_id, reported_user_id, listing_id, trade_id, reason, details) on public.reports to authenticated;

create or replace function public.guard_trade_transition()
returns trigger
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare v_uid uuid := auth.uid();
begin
  if new.proposer_id is distinct from old.proposer_id
     or new.recipient_id is distinct from old.recipient_id
     or new.offering_listing_id is distinct from old.offering_listing_id
     or new.requested_listing_id is distinct from old.requested_listing_id then
    raise exception 'Trade participants and listings are immutable';
  end if;

  if new.proposer_confirmed_at is distinct from old.proposer_confirmed_at then
    if v_uid is distinct from old.proposer_id or old.proposer_confirmed_at is not null or new.proposer_confirmed_at is null then
      raise exception 'Only the proposer can confirm their own completion';
    end if;
  end if;

  if new.recipient_confirmed_at is distinct from old.recipient_confirmed_at then
    if v_uid is distinct from old.recipient_id or old.recipient_confirmed_at is not null or new.recipient_confirmed_at is null then
      raise exception 'Only the recipient can confirm their own completion';
    end if;
  end if;

  if new.status is distinct from old.status then
    if old.status = 'pending' and new.status in ('accepted','rejected') then
      if v_uid is distinct from old.recipient_id then raise exception 'Only the recipient can accept or reject'; end if;
    elsif old.status in ('pending','accepted') and new.status = 'cancelled' then
      if v_uid is distinct from old.proposer_id then raise exception 'Only the proposer can cancel'; end if;
    elsif old.status = 'accepted' and new.status = 'completed' then
      if v_uid not in (old.proposer_id,old.recipient_id)
         or new.proposer_confirmed_at is null
         or new.recipient_confirmed_at is null then
        raise exception 'Both participants must confirm completion';
      end if;
    else
      raise exception 'Invalid trade status transition';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.guard_trade_transition() from public, anon, authenticated;
drop trigger if exists trades_guard_transition on public.trades;
create trigger trades_guard_transition before update on public.trades
for each row execute function public.guard_trade_transition();
