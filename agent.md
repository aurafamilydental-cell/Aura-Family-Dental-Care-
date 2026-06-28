# Aura Family Dental Care — AI Agent Guidelines (Next.js & Tailwind)

This file governs all AI-assisted development (Claude, Cursor, Gemini, Copilot) for the Aura Family Dental Care website. AI agents must read and adhere to these guidelines strictly before modifying or adding code.

---

## 1. Core Stack Rules

- **Framework:** Next.js App Router (TypeScript, React Server/Client Components).
- **Styling:** Tailwind CSS. Do not write arbitrary inline styles or use raw CSS unless adding custom `@font-face` declarations.
- **Vercel Optimization:** Leverage Next.js built-in features: `<Image>` for images, `<Link>` for navigation, and standard metadata objects for SEO. Use standard HTML5 `<video>` for the background video hero with appropriate optimization options (muted, playsinline, autoplay, loop).

---

## 2. Tailwind Design Token Boundaries

Do not use arbitrary Tailwind values (e.g., `text-[#a819dd]` or `p-[15px]`). You must use the configured theme extensions:

### Color Classes
- **Primary Violet:** `text-primary` / `bg-primary` / `border-primary` (maps to `#a819dd`)
- **Background:** `bg-background` (maps to `#ffffff`)
- **Text & Accents:** `text-accent` / `bg-accent` / `border-accent` (maps to `#141414`)
- **Subtle borders:** `border-border-subtle`

### Typography Classes
- **Header Font:** `font-heading` (maps to `"M Saans 652"`)
- **Body Font:** `font-body` (maps to `"M Saans Variable Light"`)
- **Font Sizes:**
  - Hero Header: `text-h1` (maps to `80px` / clamp)
  - Section Header: `text-h2` (maps to `56px` / clamp)
  - Body copy: `text-body` (maps to `14px`)

### Radius & Spacing
- **Border Radius:** Always use `rounded-brand` (maps to `10px`). Do not use `rounded-md`, `rounded-lg`, etc.
- **Spacing Scale:** Maintain the base-4 spacing scale (`p-1`, `p-2`, `p-4`, `p-8`, `p-12`, `p-16`, `p-24`, etc.).

---

## 3. Psychological Storytelling Structure (Homepage)

The `src/app/page.tsx` file must map to the 5-stage Trust Ladder narrative. Do not alter this flow:

1. **Recognition (Hero Section):** Screen-filling immersive video showing real clinic spaces, game consoles, and welcoming faces. Overlaid with anti-anxiety copy that speaks directly to the patient's internal fears/shame.
2. **Relief (Environment Section):** Highlight cards showing the physical space (gaming consoles, free food, comfortable lobby layout). Shifts the emotional vibe from a clinic to hospitality.
3. **Belief (Human Connection Section):** Vulnerable quotes and story from the friendly CEO/Founder, detailing his own dental fears. Builds human trust.
4. **Desire (Ethical Oath Section):** Details Aura's stance on ethics (no upselling trending gimmicks, customized plans only) + before-and-after smile transformation gallery.
5. **Action (Booking Section):** Frictionless NexHealth scheduling widget setup, insurance details, and transparent pricing policies.

---

## 4. Code Quality & Standards

- **TypeScript:** Explicitly type all component props. Avoid using `any`.
- **Interactivity:** Isolate client-side state (interactive sliders, mobile menus, booking widgets) into separate client components using `'use client'` at the top of the file.
- **Accessibility:** Maintain full semantic structure (`<header>`, `<main>`, `<section>`, `<footer>`). Ensure all interactive elements have labels and visible focus rings.
