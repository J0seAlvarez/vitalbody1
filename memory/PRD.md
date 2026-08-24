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

## Notes / Placeholders
- Business hours shown are placeholders (Tue–Sat 9–6, Sun–Mon by appointment) — confirm with owner
- No pricing displayed (none on old site) — can be added per service

## Backlog
- P0: Confirm real business hours; add per-service pricing/duration
- P1: Admin view of enquiries (or email notification on new enquiry via Resend)
- P1: Photo gallery of the actual salon interior
- P2: Testimonials section, Google Maps embed, SEO meta/OG tags, online booking calendar integration

## Next Tasks
1. Confirm hours + pricing with the owner
2. Add email notification on enquiry
3. Add testimonials
