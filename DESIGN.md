---
version: 1.0
name: DoctorFomin-design-system
description: A clean, trustworthy medical interface for Dr. Fomin's clinic website. The system anchors on a pure white canvas with medical-blue primary accents (#00bfff), creating an atmosphere of sterility, clarity, and calm professionalism. The brand's voltage comes from the blue-white pairing — deliberately clinical and trustworthy, contrasting with the warmer, more humanist tones common in lifestyle medicine brands. Type voice runs a dual-family system: Raleway (sans-serif) for display headlines, Open Sans for body text, signaling both modernity and readability. The logo is a clean wordmark on white.
---

## Overview

DoctorFomin.com is a **medical practice website** — the visual language prioritizes clarity, trust, and calm professionalism over flash or creativity.

The base atmosphere is a **pure white canvas** (`#ffffff`) — deliberately sterile, intentionally not tinted. This signals medical-grade cleanliness and clinical precision.

The brand's defining color is **medical blue** (`#00bfff`) — used exclusively for primary CTAs ("Записаться на прием"), link accents, and input borders. This is the visual "trust signal" — the color of health, water, and clarity.

**Headlines** run **Raleway** (modern geometric sans) at weights 300–600. **Body text** runs **Open Sans** (humanist sans) at sizes from 56px (hero) down to 11px (links). The Raleway/Open Sans pairing creates a clean, editorial but approachable voice — modern medical, not cold institutional.

The system uses **two primary surface modes**:
1. **White canvas** (`#ffffff`) — default for all pages
2. **Black surfaces** (`#000000`, `#303030`) — used sparingly for text, never as backgrounds

**Key Characteristics:**
- Pure white canvas (`#ffffff`) — zero tint, zero warmth. Medical-grade sterility.
- Medical blue primary (`#00bfff`) — used on every CTA, input border, and link hover.
- Raleway sans-serif headlines (300–600 weight) — modern, geometric, confident.
- Open Sans body text (400–600 weight) — humanist, highly readable, approachable.
- Minimal decorative elements — no gradients, no shadows, no embellishments.
- 8px spacing system — everything is consistent and mathematically clean.
- 5px border radius on all interactive elements — subtle, not playful.
- Grey text (`#969696`) for body copy — softer than pure black, easier to read.

---

## Colors

### Brand & Accent

| Token | Hex | RGB | Use |
|-------|-----|-----|-----|
| `primary` | `#00bfff` | rgb(0, 191, 255) | All primary CTAs, link accents, input borders, button borders |
| `primary-active` | `#0099cc` | *inferred* | Press/hover state (darker cyan-blue) |
| `background` | `#ffffff` | rgb(255, 255, 255) | Default page floor — pure white |
| `surface` | `#000000` | rgb(0, 0, 0) | Reserved for primary headlines and dark text |
| `neutral` | `#303030` | rgb(48, 48, 48) | Secondary text, headings |
| `text` | `#969696` | rgb(150, 150, 150) | Body text, muted content |
| `text-light` | `#818181` | rgb(129, 129, 129) | Footer text, fine print |
| `border` | `#969696` | rgb(150, 150, 150) | Hairline dividers, list separators |
| `border-primary` | `#00bfff` | rgb(0, 191, 255) | Input focus, button outlines |

### Semantic (Inferred)

| Token | Hex | Use |
|-------|-----|-----|
| `success` | `#4caf50` | *Not in system* — would use if needed |
| `error` | `#f44336` | *Not in system* — would use if needed |
| `warning` | `#ff9800` | *Not in system* — would use if needed |

---

## Typography

### Font Families

The system runs a dual-family setup:

- **Raleway** — Geometric sans-serif for display headlines (H1–H4). Modern, clean, confident.
- **Open Sans** — Humanist sans-serif for body text, navigation, and UI labels. Highly readable, approachable.
- **Times New Roman** — Serif fallback (used only once at 16px — likely a legacy element).

The fallback stack walks `Raleway, Arial, sans-serif` for headlines and `Open Sans, Helvetica, Arial, sans-serif` for body.

### Hierarchy

| Token | Font Family | Size | Weight | Line Height | Use |
|-------|-------------|------|--------|-------------|-----|
| `display` | Raleway | 56px | 300 | ~1.1 | Hero H1 |
| `heading-2` | Raleway | 24px | 500 | ~1.3 | Section titles |
| `heading-4` | Raleway | 18px | 600 | ~1.4 | Sub-section titles |
| `body-large` | Open Sans | 22px | 400 | 1.5 | Lead paragraphs |
| `body` | Open Sans | 20px | 400 | 1.55 | Default running text |
| `body-small` | Open Sans | 16px | 300 | 1.5 | Description text |
| `body-smaller` | Open Sans | 14px | 400 | 1.5 | Footer body, labels |
| `caption` | Open Sans | 13px | 400 | 1.4 | Captions, metadata |
| `caption-small` | Raleway | 13px | 400 | 1.4 | Alternative caption |
| `link` | Open Sans | 11px | 400 | 1.4 | Small links, legal text |
| `text-16` | Times New Roman | 16px | 400 | 1.5 | Legacy element — do not replicate |

### Principles

- **Headlines use Raleway 300–600** — never bold (700+). The light weight (300) on hero text creates an elegant, airy feel.
- **Body uses Open Sans 400** — weight 600 reserved for emphasis, not default.
- **No serif display** — Times New Roman is a legacy fallback, not a design choice.
- **Line height increases with text size** — larger text is more spaced (1.05–1.55), improving readability.

---

## Spacing System

Base unit: **8px** (derived from the Dembrandt output where 8px = 0.50rem).

| Token | Value | Rem | Use |
|-------|-------|-----|-----|
| `xxs` | 3px | 0.19rem | Minimal spacing, dividers |
| `xs` | 5px | 0.31rem | Tight padding |
| `sm` | 7px | 0.44rem | Small gaps |
| `md` | 8px | 0.50rem | **Base unit** — standard gap |
| `lg` | 9px | 0.56rem | Slightly larger gap |
| `xl` | 10px | 0.63rem | Input padding |
| `xxl` | 11px | 0.69rem | Layout spacing |
| `xxxl` | 15px | 0.94rem | Card padding |
| `section-sm` | 17px | 1.06rem | Small section spacing |
| `section-md` | 20px | 1.25rem | Standard section spacing |
| `section-lg` | 22px | 1.38rem | Large section spacing |
| `section-xl` | 25px | 1.56rem | Hero padding |
| `section-xxl` | 30px | 1.88rem | Major section spacing |
| `section-xxxl` | 47px | 2.94rem | Largest section spacing |

### Principles

- Everything is built on the **8px grid** — spacing tokens are multiples or near-multiples of 8px.
- Consistency over creativity — the system uses a limited set of spacing values across all layouts.

---

## Borders & Radius

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `rounded-sm` | 5px | Inputs, buttons, spans, links — all interactive elements |

**The system uses a single radius value (5px) everywhere.** No card radius, no pill badges — just 5px on every clickable/tappable element. This is minimal and functional.

### Border Styles

| Token | Value | Use |
|-------|-------|-----|
| `border-hairline` | 1px solid `#969696` | Dividers (`<div>`, `<li>`) — separates sections |
| `border-primary` | 2px solid `#00bfff` | Inputs (focus), buttons (outline), active links |

### Principles

- **Hairlines are soft** (#969696) — they divide without screaming.
- **Primary borders are 2px** — emphasis through thickness, not color saturation alone.

---

## Components

### Buttons

#### `button-primary`
- Background: `primary` (`#00bfff`)
- Text: `background` (`#ffffff`)
- Typography: `link` (Open Sans 11px / 400)
- Border: `border-primary` (2px solid `#00bfff`)
- Border radius: `rounded-sm` (5px)
- Padding: 10px 20px (inferred)
- Height: Auto

#### `button-primary-hover`
- Background: `primary-active` (`#0099cc` — inferred darkening)
- All other properties same as `button-primary`

#### `button-text-link`
- Background: transparent
- Text: `text` (`#969696`) or `surface` (`#000000`)
- Typography: `link` (Open Sans 11px / 400)
- Decoration: None (inherits color on hover)

### Navigation Links

| State | Color | Decoration |
|-------|-------|------------|
| Default | `#969696` or `#303030` or `#000000` or `#ffffff` | None |
| Hover | `inherit` | None |

Links appear in multiple colors depending on context, but **always inherit on hover** — never change color or add underline.

### Cards (Inferred)

The system appears to use minimal card styling:
- No shadows
- No background differentiation (all cards likely share the white canvas)
- Separation via borders (`border-hairline`)

### Inputs

#### `text-input`
- Background: `background` (`#ffffff`)
- Text: `text` (`#969696`)
- Typography: `body-small` (Open Sans 16px)
- Border: `border-hairline` (1px solid `#969696`)
- Border radius: `rounded-sm` (5px)
- Padding: 10px 14px (inferred)
- Height: 40px (inferred)

#### `text-input-focused`
- Border: `border-primary` (2px solid `#00bfff`)
- All other properties same

### Lists

- Dividers: `border-hairline` (1px solid `#969696`) between items

---

## Layout & Grid

### Container
- Max width: ~1200px (inferred from industry standard)
- Centered with side padding

### Responsive Breakpoints

The system has **37 breakpoints** (from 1921px down to 320px). This is excessive — likely inherited from a WordPress theme. For practical purposes:

| Breakpoint | Behavior |
|------------|----------|
| **> 1200px** | Desktop — full layout |
| **992px – 1199px** | Tablet landscape — adjusted spacing |
| **768px – 991px** | Tablet portrait — stacked layouts |
| **< 768px** | Mobile — single column, reduced padding |

### Principles
- **Fluid, not fixed** — the system adapts to every screen size.
- **No grid system documented** — likely uses WordPress's native grid or a lightweight custom solution.

---

## Icons

- **Font Awesome** — icon-font library
- Used throughout the site for social icons, decorative elements

---

## Motion & Animation

| Token | Duration | Easing | Property | Use |
|-------|----------|--------|----------|-----|
| `media` | 0.001s | ease | transform | Media elements (images/videos) |
| `hero` | 0.001s | ease | left | Hero elements |
| `link` | 0.001s | linear | color, background-color, border-color | All links |
| `nav` | 0.001s | ease | unspecified | Navigation items |
| `card` | 0.001s | ease | unspecified | Card elements |

**Key observation:** Durations are `0.001s` — essentially instant. The site has **almost no animation**. Everything appears instantly, which aligns with the "clean, functional, medical" aesthetic.

### Hover Patterns
1. **"Записаться на прием" (Schedule Appointment)** — color-shift on hover
2. **"Мы лечим" (We Treat)** — fade-out on hover

---

## Do's and Don'ts

### Do

- **Use pure white canvas (#ffffff)** — no tint, no warmth. Medical-grade sterility is the brand.
- **Apply medical blue (#00bfff) sparingly** — only on CTAs, link accents, and input borders. This keeps the color "charged."
- **Use Raleway for all headlines** — the modern geometric sans signals confidence and clarity.
- **Use Open Sans for all body text** — humanist, readable, approachable.
- **Keep radius at 5px everywhere** — consistency is more important than creativity.
- **Apply borders sparingly** — use `border-hairline` (#969696, 1px) for dividers; reserve `border-primary` (#00bfff, 2px) for interactive elements.
- **Keep links simple** — default color matches surrounding text; hover inherits with no decoration.
- **Maintain the 8px spacing system** — consistency in whitespace is a trust signal.

### Don't

- **Don't use pure black (#000000) as a background** — surface black is reserved for text only.
- **Don't add shadows or gradients** — the site is flat, clean, medical. No embellishments.
- **Don't use warm tones** — no coral, no cream, no yellow. Warmth undermines medical credibility.
- **Don't animate anything** — all transitions are virtually instant (0.001s). No delays, no surprises.
- **Don't change link colors on hover** — inherit is the rule. Color-shift is disorienting.
- **Don't use serif fonts for display** — Times New Roman is a legacy fallback, not a design choice.
- **Don't overuse the primary blue** — scarcity creates voltage. Too much blue dilutes the brand.

---

## Known Gaps

1. **Logo color** — the logo is provided as a PNG, but no color specification is given. If the logo uses the blue `#00bfff`, it should remain consistent.
2. **Hero images** — no image specifications beyond "media" elements. The site likely uses medical stock photography — clean, professional, emotionally neutral.
3. **Form validation states** — not extracted from the Dembrandt output. Would need to infer from semantic colors if implemented.
4. **Modal / overlay patterns** — not documented in the current scan.
5. **Mobile-specific components** — hamburger menu, mobile nav behavior, etc. — not in the current data.
6. **Typography font weights** — Raleway shows 300, 500, 600; Open Sans shows 300, 500, 600. The exact mapping to elements is inferred from the context.

---

## Iteration Guide

- **Focus on one component at a time** — buttons first, then inputs, then cards.
- **Use `{token.refs}` in code** — never inline hex values.
- **Keep the 8px spacing system sacred** — deviations break the visual rhythm.
- **When in doubt: white background, blue CTA, grey text.** This is the unbreakable trinity.
- **Test on mobile first** — the 37 breakpoints suggest a mobile-first approach in the theme.

---

## Comparison with Claude.com DESIGN.md

| Aspect | Claude.com (Anthropic) | DoctorFomin.com |
|--------|------------------------|-----------------|
| **Canvas** | Cream (#faf9f5) — warm, editorial | White (#ffffff) — sterile, medical |
| **Primary** | Coral (#cc785c) — warm, humanist | Blue (#00bfff) — cool, clinical |
| **Headlines** | Serif (Copernicus) — literary | Sans (Raleway) — modern, clean |
| **Body** | Sans (StyreneB/Inter) — humanist | Sans (Open Sans) — readable |
| **Spacing** | 4px base, 96px sections | 8px base, varied sections |
| **Radius** | 4–16px + pill | 5px (uniform) |
| **Animation** | Present (subtle) | None (instant) |
| **Vibe** | "Literary publication" | "Medical clinic" |

**Conclusion:** The two systems are philosophical opposites. Claude is warm, editorial, and humanist. DoctorFomin is cool, clinical, and sterile. This is *correct* — medical brands should not look like tech brands.

---

## Next Steps

1. **Fill the gaps** — add logo specs, image guidelines, and mobile components.
2. **Validate with the actual site** — compare the inferred values (like `primary-active`) with what's actually rendered.
3. **Export to Figma** — use the `tokens` to generate a theme in Figma Tokens or Theme Builder.
4. **Use in Cursor/Copilot** — drop this file in your project root and reference it when generating new pages.
5. **Monitor drift** — re-run Dembrandt quarterly and compare against this file.

---

**Version:** 1.0  
**Based on:** Dembrandt extraction (doctorfomin.com) + Claude.com DESIGN.md structure  
**Status:** Ready for implementation