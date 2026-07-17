# Trust Governance Solutions — Marketing Site

**Vendor compliance, handled.**

Landing page for Trust Governance Solutions (TGS) — a service that scans a software vendor's stack, fixes compliance gaps, and issues a buyer-ready compliance report with continuous monitoring, so vendors pass enterprise security reviews before they even start.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion (Framer Motion)](https://motion.dev) & [GSAP](https://gsap.com) for scroll and reveal animations
- [Base UI](https://base-ui.com) / shadcn-style primitives
- [Carbon Icons](https://carbondesignsystem.com/elements/icons/library/)

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout, metadata, fonts
│   ├── page.tsx              # Single landing page composition
│   └── globals.css           # Tailwind v4 theme tokens & global styles
├── components/
│   ├── header.tsx            # Sticky nav
│   ├── hero.tsx              # Hero with live-looking compliance dashboard
│   ├── dashboard-preview.tsx # Animated dashboard mock
│   ├── stat-banner.tsx       # Proof-point stats
│   ├── problem-section.tsx   # The pain: buyer security reviews
│   ├── how-it-works.tsx      # Scan → Fix → Attest timeline
│   ├── report-section.tsx    # The compliance report inside a 3D scroll tablet
│   ├── frameworks-band.tsx   # SOC 2 / ISO 27001 / GDPR band
│   ├── cta-section.tsx       # Book a Free Gap Check
│   ├── footer.tsx
│   ├── logo.tsx              # Placeholder TGS mark (final assets pending)
│   ├── motion-primitives/    # Reusable text/group reveal animations
│   └── ui/                   # Button, Card, container scroll animation
└── lib/
    └── utils.ts              # cn() helper
```

## Design Notes

- **Show the product doing the work** — the hero sells with a dashboard, the report section with the actual document rising out of a 3D-tilted tablet.
- **Numbers over adjectives** — every claim carries a figure or timeline (142 controls checked, ~3 weeks, 85% less engineering time).
- **Calm navy-and-teal authority** — white space and order signal the compliance rigor being sold.
- **One page, one action** — every section resolves toward the free gap check.
- **Accessibility** — targets WCAG 2.1 AA: ≥4.5:1 body-text contrast, visible focus states, reduced-motion alternatives, semantic landmarks.

See [`PRODUCT.md`](./PRODUCT.md) for the full product brief and positioning.

## Deployment

Standard Next.js deployment — works out of the box on [Vercel](https://vercel.com) or any Node host:

```bash
npm run build && npm run start
```
