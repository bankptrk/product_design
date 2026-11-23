---
name: Farmart
description: Modern Grocery & Organic Food Market Design System
colors:
  primary: "#fab528"
  primary-dark: "#e59d12"
  primary-light: "#fef3c7"
  primary-tint: "#fffbeb"
  primary-text: "#92400e"
  canvas: "#f7f8fa"
  surface: "#ffffff"
  surface-subtle: "#f9fafb"
  border-subtle: "#f3f4f6"
  border-default: "#e5e7eb"
  text-primary: "#191c1f"
  text-secondary: "#4b5563"
  text-muted: "#9ca3af"
  text-inverse: "#ffffff"
  success: "#10b981"
  success-bg: "#ecfdf5"
  danger: "#ef4444"
  danger-bg: "#fef2f2"
  warning: "#f59e0b"
  info: "#0284c7"
  dept-lavender: "#e8e4f8"
  dept-sand: "#eee9df"
  dept-sky: "#d8eef5"
  dept-mint: "#d9ede2"
  dept-peach: "#ffe8df"
  dept-lemon: "#fef9c3"
typography:
  display:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "2.625rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "20px"
  space-6: "24px"
  space-8: "32px"
  space-12: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-secondary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  card-product:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.2xl}"
    padding: "16px"
---

# Design System: Farmart

## Overview

**Creative North Star: "The Sunlit Organic Market"**

Farmart is an organic grocery e-commerce design system built around fresh produce, scannable pricing, and effortless daily shopping. Clean white cards sit on a cool-gray canvas (`#f7f8fa`), energized by warm golden-amber accents (`#fab528`) and pastel department backdrops.

**Key Characteristics:**
- **Clarity First**: Prices, discounts, units, and stock levels use tabular numerals for instant scanning.
- **Warm & Welcoming**: Friendly rounded corners (`16px` cards), cheerful amber CTAs, and pastel department tints.
- **High Affordance**: Distinct hierarchy for primary CTAs, quantity steppers (`[- 1 +]`), and wishlist toggles.
- **Responsive Grids**: Fluid 12-column layouts and `40px` minimum touch targets.

## Colors

### Primary
- **Sunshine Amber (`primary`)** (`#fab528`): Primary CTAs, category menu trigger, and active route accents.
- **Deep Harvest Amber (`primary-dark`)** (`#e59d12`): Hover/active states for primary buttons.
- **Honey Tint (`primary-light`)** (`#fef3c7`) & **Orchard Cream (`primary-tint`)** (`#fffbeb`): Badges, icon frames, and text selection.
- **Roasted Amber Ink (`primary-text`)** (`#92400e`): Accessible dark text on light amber surfaces.

### Secondary
- **Fresh Emerald (`success`)** (`#10b981`, bg `#ecfdf5`): In-stock pills and verified badges.
- **Sale Coral Red (`danger`)** (`#ef4444`, bg `#fef2f2`): Discount stickers (`-20%`), countdown timers, and destructive alerts.
- **Star Gold (`warning`)** (`#f59e0b`): Rating stars and low-stock flame icons.
- **Cold-Chain Sky (`info`)** (`#0284c7`): Seafood badges, cold-chain delivery tags, and breadcrumb return links.

### Tertiary
- **Department Pastels**: Lavender (`#e8e4f8`), Sand (`#eee9df`), Sky (`#d8eef5`), Mint (`#d9ede2`), Peach (`#ffe8df`), and Lemon (`#fef9c3`).

### Neutral
- **Surfaces & Borders**: Canvas (`#f7f8fa`), White (`#ffffff`), Subtle Gray (`#f9fafb`), Subtle Border (`#f3f4f6`), Default Border (`#e5e7eb`).
- **Typography Ink**: Primary (`#191c1f`), Secondary (`#4b5563`), Muted (`#9ca3af`), Inverse (`#ffffff`).

### Named Rules
**The Sunshine CTA Rule.** Reserve `#fab528` with `#191c1f` text for primary conversion actions and active route states.

## Typography

**Display & Body Font:** Geist Sans (`var(--font-geist-sans), system-ui, sans-serif`)
**Label & Numeric Font:** Geist Mono (`var(--font-geist-mono), monospace`)

### Hierarchy
- **Display Hero** (`800`, `42px`, `1.15`, `-0.025em`): Main promotional banner headlines.
- **Heading 1–3**: H1 (`700`, `32px`), H2 (`700`, `24px`), H3 (`700`, `18px`).
- **Product Title & Body**: Product Title (`600`, `14px`, 2-line clamp), Body (`400`, `14px`, `1.5`, `65–75ch`).
- **Prices & Badges**: Price Hero (`900`, `24px`), Price Regular (`700`, `15px`), Badge (`800`, `10px`, uppercase).

## Layout

- **Base Unit**: `4px` scale (`4px` to `48px`).
- **Container**: Max width `1360px` (`1440px` on `/overview`) with `px-4 sm:px-6 lg:px-8`.
- **Grids**: 12-column hero split (8+4), 4-column catalog split (1 sidebar + 3 product grid), 12-column detail split (5 gallery + 7 buy box).

## Elevation & Depth

- **Resting (`shadow-2xs` / `shadow-sm`)**: `0 1px 2px rgba(0,0,0,0.03)` on controls; `0 1px 3px rgba(0,0,0,0.05)` on cards.
- **Hover (`shadow-md`)**: `0 4px 6px -1px rgba(0,0,0,0.07)` on hovered cards and sticky header.
- **Overlays (`shadow-xl`)**: `0 20px 25px -5px rgba(0,0,0,0.1)` on mega menus, dialogs, and cart toasts.

## Shapes

- **Radii Scale**: `sm` (`4px`), `md` (`6px`), `lg` (`8px` buttons/inputs), `xl` (`12px` toasts), `2xl` (`16px` cards/modals/flow nodes), `full` (`9999px` pills).

## Components

### Buttons & Steppers
- **Primary:** `#fab528` bg, `#191c1f` bold text, `8px` radius, `#e59d12` hover.
- **Secondary & Outline:** `#191c1f` dark button; white outline button with `#e5e7eb` border.
- **Quantity Stepper (`[- 1 +]`):** Rounded `8px` container with `28px` buttons and tabular counter.

### Cards, Inputs & Chips
- **Product Card (`<ProductCard />`):** White `16px` card, `1px solid #f3f4f6` border (`#fcd34d` on hover), discount badge, wishlist toggle, stock progress bar, and Add to Cart CTA.
- **Inputs:** `8px` radius, `#e5e7eb` border shifting to `#fab528` with a soft 20% amber focus ring.
- **Badges (`<Badge />`):** Supports `discount`, `brand`, `stock`, `out-of-stock`, and `category` variants.

### Navigation, Dialogs & Flow Nodes
- **Header & Breadcrumbs:** Two-tier sticky header with category search, mega menu, and quick links to `/`, `/products`, `/design`, and `/overview`.
- **Dialog (`<Dialog />`):** WAI-ARIA modal (`sm` to `2xl`) with backdrop blur, `Escape` dismiss, and scroll lock.
- **UI Page Node (`<UIPageNode />`):** React Flow browser-window card (`360px`) with route badge, live `MiniPageWireframe`, section link triggers, and incoming/outgoing counters.

## Do's and Don'ts

### Do:
- **Do** pair `#fab528` backgrounds with dark `#191c1f` or `#92400e` text for WCAG AA contrast.
- **Do** use `tabular-nums` on all prices, timers, and route counters.
- **Do** update `/overview` (`src/data/uiFlowData.ts`, `src/components/UIPageNode.tsx`, `src/app/overview/page.tsx`) whenever adding or modifying routes.

### Don't:
- **Don't** use white text on `#fab528` amber backgrounds.
- **Don't** use off-brand neon violet/cyan gradients or dark cyberpunk banners.
- **Don't** place decorative kicker/eyebrow badges above section headings.
