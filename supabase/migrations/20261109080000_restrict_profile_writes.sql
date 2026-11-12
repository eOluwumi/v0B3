-- Profiles are created by the auth.users trigger; clients may only update safe profile fields.
revoke insert, delete on public.profiles from anon, authenticated;
