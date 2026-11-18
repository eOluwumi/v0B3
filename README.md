# B3 — Digital Barter Platform (Barterverse)

**#BringBackBarter**

A digital marketplace concept for **cashless, peer-to-peer value exchange**, starting in south-western Nigeria with longer-term ambition for national and broader African adoption.

B3 modernises traditional barter practices with contemporary web technology while remaining grounded in the African philosophy of *Ubuntu* — “I am because we are.”

> **Status**: Active early-stage prototype / interactive demo. Core UI flows for authentication, listings, trades, messaging, and dashboards are implemented. Google sign-in uses Supabase OAuth when configured. Listings, trades, and messaging are still prototype/demo flows and are not production marketplace records. Not a production-ready product.

**Live demo**: [barternaija.com.ng](https://www.barternaija.com.ng)

---

## Vision

- **Cashless by design** — users list goods or services and propose/accept trades without requiring cash settlement.
- **Community-first** — built for individuals, households, and local communities rather than large commercial sellers.
- **Culturally rooted** — intentionally framed around Ubuntu and the revival of barter traditions (#BringBackBarter).
- **Regionally grounded, scalable ambition** — initial focus on south-western Nigeria, with product thinking oriented toward national scale.

---

## Current Prototype Features

| Area | Status |
|------|--------|
| Authentication (sign-in and verification) | ✅ Supabase OAuth when configured |
| Item / listing creation & management | ✅ UI implemented |
| Trade proposal & management flows | ✅ UI implemented |
| User-to-user messaging | ✅ UI implemented |
| User dashboard | ✅ Implemented |
| Light / dark theming | ✅ Implemented |
| Responsive UI | ✅ Implemented |

Matching intelligence, real backend persistence, settlement alternatives, moderation, and production hardening remain under active development.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript / TSX
- **UI**: React 19, Tailwind CSS, Radix UI / shadcn-style components
- **Auth & data (current)**: Supabase OAuth for sign-in; listing, trade, and messaging flows remain demo/local-state
- **Deployment**: Vercel (originated from / synced with v0.dev)
- **Package manager**: pnpm (lockfile present)

---

## Repository Structure (high-level)

```
app/
  page.tsx                 # Landing / marketing page
  about/
  how-it-works/
  auth/                    # Sign-in, sign-up, verify
  dashboard/               # Listings, trades, messages, overview
components/                # UI + providers (mock Supabase, theme, etc.)
hooks/
lib/
types/
styles/
public/
```

---

## Getting Started (Local Development)

```bash
# Clone
git clone https://github.com/eOluwumi/v0B3.git
cd v0B3

# Install dependencies (pnpm recommended)
pnpm install
# or: npm install / yarn

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

**Notes**
- Supabase URL and publishable/anon key environment variables are needed to use Google sign-in.
- Listing, trade, and messaging flows remain local/demo state; do not use them for real exchanges.

---

## Important Notes

- This is an **early-stage concept and interactive prototype**. Do not treat any UI metrics or “user counts” as verified production figures.
- Core product logic, real data persistence, trust & safety, and operational concerns are still evolving.
- The repository is public for transparency and collaboration discussions.

---

## Related Work

The maintainer’s primary research focus is in **AI × Cybersecurity**, particularly preservation-first malware analysis and intelligent detection systems:

- [Preservation-First-Malware-Detection](https://github.com/eOluwumi/Preservation-First-Malware-Detection)

B3 is a separate, product-oriented initiative exploring practical digital systems for community value exchange.

---

## Licence & Collaboration

Currently personal / exploratory.  
For collaboration, usage discussions, or feedback, reach out to the maintainer.

---

**Maintainer**: [Enoch Oluwumi](https://github.com/eOluwumi)  
**Contact**: enoch@barternaija.com.ng  
**Role context**: Virtual Associate Lecturer (Introduction to Cybersecurity & Systems Security), Federal University of Agriculture, Abeokuta
