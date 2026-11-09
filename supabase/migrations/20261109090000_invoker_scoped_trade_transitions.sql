-- Keep trade transition RPCs invoker-scoped; RLS and narrow column grants enforce access.
drop policy if exists trades_update_participant on public.trades;
create policy trades_update_participant on public.trades
for update to authenticated
using (proposer_id = (select auth.uid()) or recipient_id = (select auth.uid()))
with check (proposer_id = (select auth.uid()) or recipient_id = (select auth.uid()));

grant update (status, proposer_confirmed_at, recipient_confirmed_at) on public.trades to authenticated;

create or replace function public.respond_to_trade(p_trade_id uuid, p_action text)
returns public.trades language plpgsql security invoker set search_path = public, pg_temp
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
returns public.trades language plpgsql security invoker set search_path = public, pg_temp
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
