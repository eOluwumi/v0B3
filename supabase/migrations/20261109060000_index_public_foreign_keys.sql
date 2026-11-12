-- Index foreign-key columns used in joins and cascading operations.
create index if not exists messages_sender_id_idx on public.messages(sender_id);
create index if not exists messages_recipient_id_idx on public.messages(recipient_id);
create index if not exists reports_listing_id_idx on public.reports(listing_id);
create index if not exists reports_reported_user_id_idx on public.reports(reported_user_id);
create index if not exists reports_reporter_id_idx on public.reports(reporter_id);
create index if not exists reports_trade_id_idx on public.reports(trade_id);
create index if not exists reviews_reviewer_id_idx on public.reviews(reviewer_id);
create index if not exists trades_offering_listing_id_idx on public.trades(offering_listing_id);
create index if not exists trades_requested_listing_id_idx on public.trades(requested_listing_id);
