-- Restrict profile reads to the signed-in account; public directory queries must not expose email.
drop policy if exists profiles_select_public_directory on public.profiles;
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()));

-- Ensure both message participants exactly match the accepted trade.
drop policy if exists messages_send_as_participant on public.messages;
create policy messages_send_as_participant
  on public.messages
  for insert
  to authenticated
  with check (
    sender_id = (select auth.uid())
    and exists (
      select 1
      from public.trades t
      where t.id = messages.trade_id
        and t.status = 'accepted'
        and (
          (t.proposer_id = messages.sender_id and t.recipient_id = messages.recipient_id)
          or
          (t.recipient_id = messages.sender_id and t.proposer_id = messages.recipient_id)
        )
    )
  );
