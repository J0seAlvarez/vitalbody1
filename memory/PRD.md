# PRD — Vital Body Healing Spa & Salon Landing Page

## Original Problem Statement
"Build a landing page: improve this https://vitalbody.net/pluginops-page-874/" — rebuild the dated WordPress landing page for Vital Body Healing Spa & Salon (Ventura, CA) as a modern, award-worthy experience.

## User Personas
- Local wellness seeker looking to book massage/facial/hair appointments
- Returning client who wants quick phone/address/hours info
- First-time visitor evaluating trust and atmosphere before booking

## Core Requirements (static)
- Primary goal: drive appointment bookings + collect enquiry leads (saved to DB)
- Feature services: Massage Therapy, Hair Salon, Facials & Skin Care, Waxing, Body Treatment
- Show contact details: phone (805) 643-6888, email jaweal@yahoo.com, address 309 Borchard Dr. Ventura, hours
- Awwwards-level art direction: kinetic hero (masked line-by-line reveal), editorial marquee, numbered manifesto chapters, parallax, framer-motion reveals, lenis smooth scroll

## Architecture
- Frontend: React + Tailwind + framer-motion + lenis + react-fast-marquee + @phosphor-icons/react
- Backend: FastAPI, POST/GET /api/enquiries
- DB: MongoDB via MONGO_URL/DB_NAME env vars; enquiries collection (uuid string ids)

## Implemented (2026-08-24)
- Full landing page: glass Nav, cinematic Hero (real salon photo, masked line reveal "A Place of Transformation", parallax), slow editorial Marquee, numbered Manifesto (01 Body / 02 Heart / 03 Soul), hover-driven Services showcase with swapping spotlight image, Booking section with enquiry form (name/email/phone/service/date/message) persisted to MongoDB with success state + toast, Footer with giant wordmark, contact, hours, real logo
- Design: Cormorant Garamond + Manrope, warm sand / deep forest / clay palette, grain overlay
- Backend enquiry API (create + list)

## Implemented (2026-08-24, iteration 2)
- Testimonials section: auto-rotating (6s) large editorial quotes with author/service, star row, clickable progress dots — currently SAMPLE quotes (MOCKED, need real client reviews)
- Gallery section: "Step Inside" dark spotlight grid, real salon interior photo + 3 stock spa images (SAMPLE), hover zoom + caption reveals
- Enquiry email alerts: every new enquiry triggers a branded notification email to the owner (jaweal@yahoo.com) via Emergent-managed Resend proxy; verified live (HTTP 202). Email failures never block enquiry saving
- Real hours: Monday–Saturday 9:00 AM–6:00 PM, Sunday Closed (exact open/close times still assumed — only "closed Sundays" confirmed)
- Services show "Call for pricing · (805) 643-6888" per ritual

## Implemented (2026-08-24, iteration 3)
- Interactive Google Maps embed in footer: grayscale-styled map pinned to 309 Borchard Dr, Ventura, with "Find Us / Get Directions" overlay linking to Google Maps

## Notes / Placeholders
- Business hours: open/close times (9–6) still assumed; only Sunday closure confirmed by owner
- Testimonials are sample text — replace with real client reviews
- 3 of 4 gallery images are stock spa photos — swap for real interior shots when available
- No pricing displayed per owner request ("call for price")

## Backlog
- P0: Confirm exact daily hours; replace sample testimonials with real reviews
- P1: Replace stock gallery photos with real salon photography; admin view of enquiries
- P2: Google Maps embed, SEO meta/OG tags, online booking calendar integration

## Next Tasks
1. Collect real testimonials + interior photos from owner
2. Confirm exact open/close times
3. Add Google Maps embed in footer
