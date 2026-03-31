# CURRENT TASK: Milestone 1 — Homepage + Overall Layout/Styling

## Objective
Build a polished, production-quality homepage with shared layout components (header, footer, navigation). This is the foundation the client reviews before Milestone 2 begins.

## What to Build

### 1. Next.js Project Setup
- Initialize Next.js 14 with App Router, TypeScript, Tailwind CSS
- Configure Google Fonts (Merriweather + Inter) via `next/font/google`
- Set up Tailwind config with the locked color palette and font families
- Create shared layout (`app/layout.tsx`) with metadata, fonts, and global styles

### 2. Shared Components
**Header (sticky)**
- Logo top-left: "Hammock Property Inspections" (text-based, Merriweather, navy + teal accent)
- Nav links: Home, Services, Pricing, About, Contact
- Top-right CTA button: "Request an Inspection" (navy bg, white text)
- Sticky on scroll with subtle border-bottom
- Mobile: hamburger menu with slide-in or full-screen overlay

**Footer**
- Logo + "Florida's Space Coast"
- Nav links: Home, Services, Pricing, About, Contact, Privacy Policy
- Copyright: © 2026 Hammock Property Inspections, LLC. All rights reserved.
- Dark navy background (#1a3250 or similar dark shade)

### 3. Homepage Sections (in order)
Build these sections following the approved wireframe layout in `references/wireframe.html`. Use exact copy from `PROJECT-BRIEF.md`.

**Hero**
- Headline: "Professional Home Inspections on Florida's Space Coast"
- Subheadline: "Clear, thorough inspections with straightforward reporting, transparent pricing, and modern tools — including drone-assisted roof inspections."
- Two buttons: "Request an Inspection" (primary) + "View Pricing" (secondary/outline)
- Trust bullets (2x2 grid): Licensed & insured, FAA certified drone pilot, Civil engineering background, 30+ years experience
- Right side: image placeholder (clean gradient with dashed border, not ugly gray boxes)
- Layout: 2-column on desktop, stacked on mobile

**Trust Bar**
- Navy background, horizontal strip
- Items: Licensed · Insured · Drone-equipped · Clear reports · Professional service
- Each with a simple icon

**Services Overview**
- Section label: "Services"
- Heading: "Comprehensive inspections with clarity where it matters most"
- Body text from brief
- 6 service cards (NOT 7 — Drone Roof Observation is OMITTED per client request):
  1. Full Home Inspection
  2. 4-Point Inspection
  3. Wind Mitigation Inspection — description: "Documentation of wind-resistant features that may help support insurance credits."
  4. Pre-Listing Inspection
  5. Homeowner Inspection
  6. Pool & Spa Inspection
- Cards: white bg, subtle shadow, icon + title + 1-line description
- Hover: lift effect

**Why Choose Us**
- Section label: "Why Hammock"
- Heading: "Why clients choose Hammock Property Inspections"
- Subtext: "No jargon. No unnecessary alarm. Just clear, professional reporting."
- 4 items in 2x2 grid: Clear reports, Drone-assisted inspections, Engineering mindset, 30+ years experience
- Each with icon, title, description

**Pricing Preview**
- Section label: "Pricing"
- Heading: "Simple, transparent pricing"
- Subtext: "No guesswork. No need to call just to get a starting price."
- Pricing table with 7 rows (up to 1800sf through over 3000sf — see PROJECT-BRIEF.md for exact prices)
- Below the price rows: "We'll confirm pricing before the inspection — no surprises."
- CTA button: "See Full Pricing"

**Process (How It Works)**
- Section label: "How It Works"
- Heading: "A straightforward process"
- 3 steps with numbered circles: Request → Inspect → Report
- Centered layout

**Service Area**
- Section label: "Service Area"
- Heading: "Serving Florida's Space Coast with professionalism and clarity"
- Tag/badge: "Brevard County and surrounding Space Coast communities"

**Final CTA**
- Navy background
- Heading: "Need an inspection? Let's make this easy."
- Two buttons: "Request an Inspection" (white) + "Call Now" (outline white)

### 4. Polish Requirements
- Scroll-triggered fade-in/slide-up animations on each section (Intersection Observer, subtle — not flashy)
- Staggered reveals on card grids (50-100ms delay between cards)
- Smooth hover states on all interactive elements (buttons, cards, nav links)
- Consistent spacing rhythm — generous vertical padding between sections
- Responsive at all breakpoints: 375px (phone), 768px (tablet), 1024px (laptop), 1280px (desktop)
- Mobile sticky CTA button or bar at bottom (for "Request an Inspection" or "Call")
- Respect prefers-reduced-motion

## What NOT to Build (Milestone 2)
- Services page
- Pricing page (full)
- About page
- Contact page / form
- Contact form backend (submission storage, email notifications)
- CAPTCHA integration
- SEO metadata beyond homepage
- Deployment to production
- Analytics

## Placeholder Pages
For nav links that go to Milestone 2 pages (Services, Pricing, About, Contact), create minimal placeholder pages with just a heading and "Coming soon" so the nav doesn't 404. These will be replaced in Milestone 2.

## Definition of Done
- Homepage renders all sections with real copy (no Lorem Ipsum)
- Header is sticky with working nav (links to anchors on homepage for now, placeholders for other pages)
- Footer renders with all links
- Mobile layout is clean at 375px — no overflow, no cramped text, readable
- Animations are smooth and respect reduced-motion
- `next build` passes with zero errors
- Looks polished enough to screenshot and present to client for Milestone 1 approval

## Reference
- Layout/structure: `references/wireframe.html`
- All copy/content: `PROJECT-BRIEF.md`
- Project rules: `CLAUDE.md`
