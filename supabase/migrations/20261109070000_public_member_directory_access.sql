-- Expose only safe member-directory fields. Email remains private to the account owner.
drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_select_public_directory on public.profiles;
create policy profiles_select_public_directory on public.profiles
for select to anon, authenticated using (true);
revoke select, update on public.profiles from anon, authenticated;
grant select (id, full_name, avatar_url, location) on public.profiles to anon, authenticated;
grant update (full_name, avatar_url, location) on public.profiles to authenticated;
