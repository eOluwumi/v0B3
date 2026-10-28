# B3 / Barter Nigeria

This is a Next.js application originally generated with v0. The backend integration is being restored with Supabase.

## Backend setup

1. Create or open the Supabase project you previously started.
2. In Supabase, open **Project Settings → API** and copy the project URL and publishable/anon key.
3. Copy `.env.example` to `.env.local`, then set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. In Supabase **SQL Editor**, run `supabase/migrations/20261028000000_initial_schema.sql`.
5. In Supabase **Authentication → URL Configuration**, set the Site URL to your deployed app URL and add your local/deployed redirect URLs.
6. In Supabase **Authentication → Providers**, enable Email. Choose whether email confirmation is required and configure SMTP before public launch.
7. In Vercel, add the same two environment variables under the project's Environment Variables, then redeploy.
8. Install dependencies and test locally with `npm install` and `npm run dev`.

## Security notes

- The browser app must use only the Supabase publishable/anon key. Never expose a service-role key in frontend code or `NEXT_PUBLIC_*` variables.
- The migration enables Row Level Security on the application tables and creates a private profile model plus listing, trade, message, review, report, and image-storage policies.
- Public listing images are readable by anyone. Do not upload identity documents or private user information to this bucket.
- Apply and test the migration in a development Supabase project before using it with production data.
- The current UI still contains demo/mock data in some dashboard sections. Those sections must be wired to the new tables before they can be treated as production functionality.
- This migration is a foundation, not a complete launch certification. Test signup, email confirmation, listing CRUD, image upload, access controls, and trade state transitions before public launch.

## Development

```bash
npm install
npm run dev
```
