create or replace function public.respond_to_trade(p_trade_id uuid, p_action text)
returns public.trades language plpgsql security invoker set search_path = public, pg_temp
as $$
declare v_trade public.trades; v_uid uuid := auth.uid(); v_status text;
begin
  if v_uid is null then raise exception 'Authentication required'; end if;
  select * into v_trade from public.trades where id = p_trade_id for update;
  if not found then raise exception 'Trade not found'; end if;
  if p_action in ('accept','reject') then
    if v_trade.recipient_id <> v_uid or v_trade.status <> 'pending' then raise exception 'Only the recipient can accept or reject a pending trade'; end if;
    v_status := case when p_action = 'reject' then 'rejected' else 'accepted' end;
    update public.trades set status = v_status where id = p_trade_id returning * into v_trade;
  elsif p_action = 'cancel' then
    if v_trade.proposer_id <> v_uid or v_trade.status not in ('pending','accepted') then raise exception 'Only the proposer can cancel this trade'; end if;
    update public.trades set status = 'cancelled' where id = p_trade_id returning * into v_trade;
  else raise exception 'Unsupported trade action'; end if;
  return v_trade;
end;
$$;
revoke all on function public.respond_to_trade(uuid,text) from public, anon;
grant execute on function public.respond_to_trade(uuid,text) to authenticated;
