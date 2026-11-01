# BarterNaija — Public Prototype

This repository contains the public-facing BarterNaija prototype, built with Next.js.

## Release status

This release is a **prototype preview**, not a production marketplace. The existing interface is preserved. Some dashboard content, activity figures, listings, conversations, and trade interactions may be illustrative, mocked, or simulated. Do not use this release to complete real exchanges or payments.

A persistent prototype notice is displayed throughout the application so visitors understand these limitations.

## Deploying to Vercel

1. Import this repository into Vercel.
2. Select the `release/public-prototype` branch for the initial preview deployment.
3. The repository uses pnpm. Its Vercel install command permits lockfile reconciliation during installation while the dependency manifest is being standardised.
4. Deploy a preview first and verify the homepage, navigation, browse flow, signup/sign-in screens, and responsive layout.
5. Add `barternaija.com.ng` to the Vercel project only after the preview passes acceptance checks.
6. Use the exact DNS records Vercel displays. Do not change registrar nameservers or delete existing DNS records until the DNS migration plan is confirmed.

## Environment variables

The Supabase provider is optional for this prototype. If you configure the backend, set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Only use the public/publishable key in browser-exposed variables. Never expose a Supabase service-role key in frontend code or any `NEXT_PUBLIC_*` variable.

## Backend roadmap

The `feat/real-supabase-backend` work is retained as the starting point for a later functional release. It is not certified as production-ready. Before enabling real marketplace transactions, complete and test:

- Supabase schema and application-query alignment
- Real listing, trade, and messaging workflows
- Authentication, email confirmation, and recovery
- Row Level Security and storage policies
- Abuse prevention, validation, and operational monitoring
- End-to-end acceptance tests

## Local development

```bash
pnpm install
pnpm dev
```
