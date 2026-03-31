# Hammock Property Inspections — Website Build

## Client
Hammock Property Inspections, LLC
Website: hammockpropertyinspections.com
Location: Florida's Space Coast (Brevard County)
Industry: Residential home inspections

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Fonts: Merriweather (headings) + Inter (body)
- Deployed on Vercel (client's own account)
- Contact form backend TBD in Milestone 2

## Project Structure
```
/hammock-inspections/
├── CLAUDE.md              ← You are here
├── CURRENT-TASK.md        ← Current milestone scope — read this before every task
├── PROJECT-BRIEF.md       ← Full client handoff doc — the source of truth for all copy, colors, structure
├── references/
│   └── wireframe.html     ← Client-approved homepage wireframe — use as layout foundation
└── src/                   ← Next.js app
```

## Design System (LOCKED — do not deviate)
These are client-approved. Do not change without explicit instruction.

### Colors
- Primary (Navy): #1F3A5F
- Background (Warm Neutral): #F3F0E8
- Accent (Muted Teal): #4F7C82
- Text (Charcoal): #333333
- White: #FFFFFF

### Typography
- Headings: Merriweather (serif) — weights 400, 700, 900
- Body: Inter (sans-serif) — weights 400, 500, 600

### Style Direction
- Clean, minimal, professional
- Calm and trustworthy
- No clutter, no gimmicks
- Lots of whitespace — avoid heavy blocks
- Rounded corners on buttons (medium radius ~8px)

## Rules

### Read First
1. Read `CURRENT-TASK.md` before starting any work
2. Read `PROJECT-BRIEF.md` for all copy, pricing, and page structure
3. Reference `references/wireframe.html` for approved layout and section order
4. Do not invent copy — use the exact text from PROJECT-BRIEF.md

### Build Rules
- Mobile-first responsive (test at 375px, 768px, 1024px, 1280px)
- Semantic HTML (header, nav, main, section, footer)
- One h1 per page, logical heading hierarchy
- All images lazy-loaded with alt text
- Touch targets 44px minimum on mobile
- Sticky header with CTA button
- CTA repeats every 2-3 sections
- No placeholder text — all copy comes from PROJECT-BRIEF.md
- No stock photo placeholders — use clean gradient/illustration placeholders for now, client will provide real photos later
- Respect `prefers-reduced-motion` for all animations
- Scroll-triggered reveal animations on sections (subtle, professional — no bouncing or spinning)

### What NOT to Do
- Do not add pages beyond what's in CURRENT-TASK.md scope
- Do not install unnecessary dependencies — keep it lean
- Do not use AI-slop patterns: purple gradients, centered-everything layouts, generic stock imagery
- Do not use Lorem Ipsum anywhere
- Do not create separate CSS files — Tailwind utilities + minimal globals only
- Do not overbuild — this is a 5-page service site, not a SaaS platform

### Milestone Awareness
This is a 2-milestone project. Only build what's scoped in CURRENT-TASK.md.

- **Milestone 1**: Homepage + overall layout/styling (header, footer, shared layout, homepage)
- **Milestone 2**: Remaining pages (Services, Pricing, About, Contact), contact form with submission storage + email, mobile polish, revisions, deployment

Do not start Milestone 2 work during Milestone 1. The client reviews and approves between milestones.

### Git
- Commit after each meaningful working change
- Format: `feat: description` / `fix: description` / `style: description`
- Commit working states before risky changes
