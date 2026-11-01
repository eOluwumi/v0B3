# B3 — Digital Barter Platform (Barterverse)

**#BringBackBarter**

A market-oriented digital marketplace concept for **cashless peer-to-peer trading**, initially targeting south-western Nigeria with longer-term ambition to scale nationally across Nigeria and the wider African context.

The platform draws on the African philosophy of *Ubuntu* (“I am because we are”) and aims to modernise traditional barter practices with contemporary web technology.

> **Status**: Active development / early prototype. Core flows for authentication, listings, trades, messaging and dashboards are present. Not a production-ready product.

---

## Concept

- **Cashless value exchange** — users list items or services and propose or accept trades without mandatory cash settlement.
- **Peer-to-peer focus** — designed for individuals and small communities rather than large commercial marketplaces.
- **Regional starting point** — south-western Nigeria as the initial target market, with national scaling ambition.
- **Cultural framing** — emphasises Ubuntu, community, and the revival of barter traditions (#BringBackBarter).

---

## Current Features (Prototype)

- User authentication (sign-up, sign-in, verification flows)
- Item / listing creation and management
- Trade proposal and management flows
- Messaging between users
- User dashboard
- Theming (light / dark)
- Responsive UI built with Next.js and modern component library

---

## Tech Stack (observed)

- **Framework**: Next.js (App Router)
- **UI**: React, Tailwind CSS, shadcn/ui-style components
- **Backend / Auth / Data**: Supabase integration present
- **Deployment**: Vercel (synced from v0.dev)
- **Language**: TypeScript / TSX

---

## Repository Structure (high-level)

```
app/
  page.tsx              # Landing / marketing page
  about/
  how-it-works/
  auth/                 # Sign-in, sign-up, verify
  dashboard/            # Listings, trades, messages, overview
components/             # UI and providers (Supabase, theme, etc.)
```

---

## Important Notes

- This is an **early-stage concept and prototype**. Functionality, matching logic, payment/settlement alternatives, moderation, and production hardening are still under development.
- Do not treat any live deployment metrics or “user counts” shown in the UI as verified production figures.
- The repository was previously reported as private in some metadata; it is now public.

---

## Related Research Context

The maintainer’s broader research background is in cybersecurity, malware detection systems, and applied machine learning. This platform project is a practical product-oriented effort separate from the academic malware-detection line of work.

Ongoing related research repository: [Preservation-First-Malware-Detection](https://github.com/eOluwumi/Preservation-First-Malware-Detection)

---

## Licence & Contribution

Currently personal / exploratory. Contact the repository owner for collaboration or usage discussions.

---

**Maintainer**: [eOluwumi](https://github.com/eOluwumi)  
**Contact**: enoch@barternaija.com.ng
