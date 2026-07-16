## Goal

Make every element on the landing page "appear" via motion instead of sitting statically. No layout/design changes.

## Approach

Use Framer Motion (already installed). Reuse the existing `<Reveal>` wrapper for scroll-driven reveals, plus add a small `<HeroIntro>` wrapper for on-mount hero animations. Stagger is achieved via the `delay={i * 0.08}` prop already passed in grid loops.

## Changes

### 1. `src/components/reveal.tsx` (already updated last turn)
- Confirm spec: `initial { opacity: 0, y: 40 }` → `whileInView { opacity: 1, y: 0 }`, `once: true`, duration 0.7s, ease-out cubic. Bump `y` from 20 → 40 per the new spec.

### 2. New `src/components/motion/hero-intro.tsx`
- Small wrapper that animates on mount (not on scroll), `initial { opacity: 0, y: 30 }` → `animate { opacity: 1, y: 0 }`, duration 0.8s.
- Accepts a `delay` prop so the headline → subtext → buttons cascade (0s, 0.15s, 0.3s).

### 3. `src/routes/index.tsx` — Hero section only
- Wrap the H1, the subtitle `<p>`, the CTA row, and the "Latest case study / +23%" row in `<HeroIntro>` with staggered delays.
- Replace the existing `<TextReveal>` on the headline with a single `<HeroIntro>` so the whole line glides in together (TextReveal currently does its own per-word animation which conflicts with the requested 0.8s fade+slide).

### 4. Grids already covered
- `Section01` pillars, `HowWeWork` steps, `Section02` solutions, etc. already map with `<Reveal delay={i * 0.05}>` or similar — the updated Reveal makes them cascade automatically. No further edits needed.

### 5. Sections without Reveal wrappers
- Audit `Section03`, `Section04`, `Section06`, `Section08`, `Section09`, `FinalCta` and wrap any bare headings / paragraphs / card grids that currently render without a `<Reveal>` so they also fade-slide on entry.

## Out of scope

- No design token, color, spacing, copy, or layout changes.
- No new animation libraries (Framer Motion already present).
- Respects `prefers-reduced-motion` (Reveal short-circuits; HeroIntro will too).
