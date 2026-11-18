revoke update on table public.messages from authenticated;
grant update (read_at) on table public.messages to authenticated;

revoke update on table public.profiles from authenticated;
grant update (full_name, avatar_url, location) on table public.profiles to authenticated;
