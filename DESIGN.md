# Farmart Design System & Design Tokens Specification (`DESIGN.md`)

Welcome to the **Farmart Design System** documentation. This document establishes the foundational design tokens, visual guidelines, typography scales, color palettes, and component blueprints for the Farmart grocery e-commerce platform.

---

## 1. Design Philosophy & Brand Identity

* **Brand Character**: Fresh, Friendly, Nutritious, Modern, and Reliable.
* **Core Aesthetics**: Clean white cards set against a gentle cool-gray canvas (`#f7f8fa`), energized by warm golden-amber accents (`#fab528`) reminiscent of ripe produce and sunny farm orchards.
* **Design Principles**:
  1. **Clarity First**: Essential purchase metrics (pricing, discounts, unit quantities, stock levels) must be scannable at a glance.
  2. **Warm & Welcoming**: Friendly rounded corners, cheerful amber touches, and soft pastel category backgrounds.
  3. **High Affordance**: Clear visual hierarchy for call-to-action buttons, interactive steppers, and wishlists.
  4. **Performance & Responsiveness**: Fluid grids, accessible touch targets (minimum 40px), and seamless desktop-to-mobile adaptation.

---

## 2. Color Palette & Token System

### 2.1 Brand Primary (Warm Amber / Sunshine)
The signature color of Farmart, evoking warmth, honey, and fresh morning harvests.

| Token Name | Hex Code | Tailwind Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| `color-primary` | `#fab528` | `bg-[#fab528]` / `text-[#fab528]` | Primary CTA buttons, category menu button, badge accents |
| `color-primary-dark` | `#e59d12` | `bg-[#e59d12]` / `text-[#e59d12]` | Hover state for primary buttons and interactive accents |
| `color-primary-light`| `#fef3c7` | `bg-amber-100` / `border-amber-200`| Subtle chip backgrounds, icon containers, highlights |
| `color-primary-tint` | `#fffbeb` | `bg-amber-50` / `bg-amber-50/50`   | Card badges, soft notification backgrounds, icon frames |
| `color-primary-text` | `#92400e` | `text-amber-800` / `text-amber-900`| Text on light amber backgrounds for WCAG AA compliance |

### 2.2 Neutral & Surface Tokens

| Token Name | Hex Code | Tailwind Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| `color-canvas` | `#f7f8fa` | `bg-[#f7f8fa]` | Main application page background |
| `color-surface` | `#ffffff` | `bg-white` | Product cards, navigation bars, dropdown containers |
| `color-surface-subtle` | `#f9fafb` | `bg-gray-50` | Input backgrounds, alternate table rows, badge backdrops |
| `color-border-subtle` | `#f3f4f6` | `border-gray-100` | Subtle card borders, dividers, list separators |
| `color-border-default` | `#e5e7eb` | `border-gray-200` | Input outlines, standard button borders |
| `color-border-focus` | `#fab528` | `focus:border-amber-400` | Active input outline, focused element ring |
| `color-text-primary` | `#191c1f` | `text-gray-900` | Headlines, primary product names, main navigation |
| `color-text-secondary`| `#4b5563` | `text-gray-600` | Body copy, secondary links, descriptions |
| `color-text-muted` | `#9ca3af` | `text-gray-400` | Strikethrough pricing, placeholder text, breadcrumbs |
| `color-text-inverse` | `#ffffff` | `text-white` | Text on dark buttons, toast alerts, discount badges |

### 2.3 Semantic & Feedback Tokens

| Token Name | Hex Code | Tailwind Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| `color-success` | `#10b981` | `text-emerald-500` / `bg-emerald-500` | In Stock status, completed checks, verified badges |
| `color-success-bg` | `#ecfdf5` | `bg-emerald-50` | In stock pills, success alert container |
| `color-danger` | `#ef4444` | `text-red-500` / `bg-red-500` | Discount stickers (`-15%`), low stock alerts, errors |
| `color-danger-bg` | `#fef2f2` | `bg-red-50` | Discount container, error banners |
| `color-warning` | `#f59e0b` | `text-amber-500` | Star ratings, deal countdown fire icon |
| `color-info` | `#0284c7` | `text-sky-600` / `bg-sky-500` | Seafood badges, info tooltips, active filters |

### 2.4 Department Pastel Palette
Subtle tint backgrounds used for promo hero tiles, category icons, and department cards.

| Category | Hex Code | Tailwind Class | Semantic Context |
| :--- | :--- | :--- | :--- |
| Soft Lavender | `#e8e4f8` | `bg-[#e8e4f8]` | Food Pouch / Snack release |
| Soft Sand Beige | `#eee9df` | `bg-[#eee9df]` | Organic Tea / Grains / Bakery |
| Soft Sky Blue | `#d8eef5` | `bg-[#d8eef5]` | Soda drinks / Frozen seafoods |
| Soft Mint Sage | `#d9ede2` | `bg-[#d9ede2]` | Fresh meats / Farm vegetables |
| Soft Peach | `#ffe8df` | `bg-[#ffe8df]` | Fresh fruits / Summer specialities |
| Soft Lemon | `#fef9c3` | `bg-[#fef9c3]` | Dairies, butter & fresh cheese |

---

## 3. Typography Hierarchy

The Farmart design system utilizes **Geist Sans** for user interface readability, with **Geist Mono** for numbers, stock counts, and timer displays.

| Level | Size (px / rem) | Weight | Line Height | Tracking | Token / CSS Class |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | 42px / 2.625rem | ExtraBold (800) | 1.15 | -0.025em | `text-[42px] font-extrabold tracking-tight leading-[1.15]` |
| **Heading 1 (H1)** | 32px / 2.0rem | Bold (700) | 1.2 | -0.02em | `text-3xl font-bold tracking-tight` |
| **Heading 2 (H2)** | 24px / 1.5rem | Bold (700) | 1.25 | -0.015em | `text-2xl font-bold tracking-tight text-gray-900` |
| **Heading 3 (H3)** | 18px / 1.125rem | Bold (700) | 1.3 | -0.01em | `text-lg font-bold text-gray-900` |
| **Product Title** | 14px / 0.875rem | SemiBold (600) | 1.35 | normal | `text-sm font-semibold text-gray-800 line-clamp-2` |
| **Body (Regular)** | 14px / 0.875rem | Normal (400) | 1.5 | normal | `text-sm text-gray-600 leading-relaxed` |
| **Price Hero** | 24px / 1.5rem | Black (900) | 1.0 | -0.02em | `text-2xl font-black text-amber-600` |
| **Price Regular** | 15px / 0.9375rem | Bold (700) | 1.1 | -0.01em | `text-[15px] font-bold text-gray-900` |
| **Price Strikethrough** | 12px / 0.75rem | Medium (500) | 1.0 | normal | `text-xs text-gray-400 line-through` |
| **Caption / Helper** | 12px / 0.75rem | Medium (500) | 1.4 | normal | `text-xs text-gray-400` |
| **Badge / Overline** | 10px / 0.625rem | ExtraBold (800) | 1.0 | 0.05em | `text-[10px] font-extrabold tracking-wider uppercase` |

---

## 4. Spacing, Grid & Sizing Scale

* **Base Unit**: 4px
* **Page Layout Container**: Maximum width `1360px` with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`).
* **Column Grids**:
  - Desktop: 12-column layout (e.g., 8 cols main hero + 4 cols promo sidecard).
  - Product Grids: 4-5 columns on large desktop (`lg:grid-cols-4` or `xl:grid-cols-5`), 2 columns on mobile.

| Token | Size (px) | Tailwind | Usage Context |
| :--- | :--- | :--- | :--- |
| `space-1` | 4px | `p-1`, `gap-1` | Micro-badge padding, star rating gaps |
| `space-2` | 8px | `p-2`, `gap-2` | Wishlist button padding, tag gaps, inline icon margins |
| `space-3` | 12px | `p-3`, `gap-3` | Category button padding, stepper component sizing |
| `space-4` | 16px | `p-4`, `gap-4` | Standard card internal padding, form input spacing |
| `space-5` | 20px | `p-5`, `gap-5` | Product card body padding, section header gaps |
| `space-6` | 24px | `p-6`, `gap-6` | Major card inner padding, trust badge grid padding |
| `space-8` | 32px | `py-8`, `gap-8` | Section vertical spacing, footer link columns |
| `space-12` | 48px | `py-12` | Major hero banners, footer container spacing |

---

## 5. Border Radii & Elevation Scale

### 5.1 Border Radii
* `radius-sm` (`4px` / `rounded`): Quantity stepper counters, small tooltips.
* `radius-md` (`6px` / `rounded-md`): Action buttons, discount percentage badges.
* `radius-lg` (`8px` / `rounded-lg`): Search input box, dropdown menus, tab buttons.
* `radius-xl` (`12px` / `rounded-xl`): Feature icon containers, trust badge boxes, toast alerts.
* `radius-2xl` (`16px` / `rounded-2xl`): Product cards, deal showcase panels, hero banners.
* `radius-full` (`9999px` / `rounded-full`): Wishlist circular buttons, avatar indicators, pill tags.

### 5.2 Elevation & Shadows
* `shadow-2xs`: `0 1px 2px rgba(0,0,0,0.03)` - Subtle borders on light elements.
* `shadow-sm`: `0 1px 3px rgba(0,0,0,0.05)` - Base product card resting state.
* `shadow-md`: `0 4px 6px -1px rgba(0,0,0,0.07)` - Product card hover state, sticky navigation bar.
* `shadow-xl`: `0 20px 25px -5px rgba(0,0,0,0.1)` - Floating mega menu, category select popup.
* `shadow-amber`: `0 4px 14px 0 rgba(250,181,40,0.35)` - Primary CTA button elevation on hover.

---

## 6. Component Specification & Blueprints

### 6.1 Buttons
1. **Primary Button (Farmart Yellow)**:
   * Class: `bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg transition-all duration-200 active:scale-[0.98]`
   * Role: "Shop Now", "Add to Cart", "Shop By Category", "Subscribe".
2. **Secondary Button (Dark Charcoal)**:
   * Class: `bg-gray-900 hover:bg-black text-white font-bold px-5 py-2.5 rounded-lg transition-colors`
   * Role: High contrast secondary callouts.
3. **Outline Button**:
   * Class: `border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg transition-colors`
   * Role: Filter tabs, secondary browsing, "Discover Flavors".
4. **Icon Action Button (Wishlist / Quickview)**:
   * Class: `w-9 h-9 rounded-full bg-white hover:bg-amber-500 hover:text-white border border-gray-100 shadow-sm flex items-center justify-center transition-all`
5. **Quantity Stepper `[- 1 +]`**:
   * Container: `inline-flex items-center border border-gray-200 rounded-lg bg-gray-50/60 p-1`
   * Buttons: `w-7 h-7 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs`
   * Counter: `w-9 text-center text-xs font-bold text-gray-900`

### 6.2 Badges & Indicators
1. **Discount Badge**: `bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md`
2. **Deal Pill**: `inline-flex items-center gap-1 bg-amber-400/20 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase`
3. **Stock Status Pill**: `inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full`
4. **Category Count Chip**: `bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full`

### 6.3 Form Controls
1. **Universal Search Bar with Category Select**:
   * Compound input containing category dropdown button on left, border divider, placeholder input, and right search action button.
2. **Email Subscription Form**:
   * Clean inline container with mail icon, rounded inputs, and integrated `#fab528` action trigger.
3. **Standard Input Field**:
   * Border `border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg py-2.5 px-3.5 text-sm`.

### 6.4 Product Cards
* **Standard Grid Card**:
  * White card with `border border-gray-100 hover:border-amber-300 rounded-2xl p-4 transition-all hover:shadow-md`.
  * Top bar: Discount badge (left) + Wishlist heart toggle button (right).
  * Center: Centered product image (`aspect-square object-contain`).
  * Meta: Category tag / brand, 2-line title, 5-star rating with review count.
  * Price bar: Main price (bold) + old price (strikethrough).
  * Stock progress bar: Subtle gray track with amber/emerald progress indicator + "Sold: X / Total: Y".
  * Bottom CTA: Full-width or compact "Add to Cart" button.
* **Deal of the Day Hero Card**:
  * Highlighted deal panel featuring animated countdown timer `[HH : MM : SS]`, product spotlight, stock availability meter, quantity stepper, and prominent CTA.

### 6.5 Feedback & Notifications
* **Cart Floating Toast**:
  * Dark charcoal container (`bg-gray-900 text-white rounded-xl shadow-2xl p-4`) with emerald or amber checkmark icon and dismiss button.

### 6.6 Dialogs & Modals
* **Overlay Backdrop**:
  * Semi-transparent dark overlay (`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4`) centering the dialog with safe viewport padding.
* **Dialog Container**:
  * Clean white surface card (`bg-white rounded-2xl shadow-2xl border border-gray-100`) with entry zoom animation (`animate-in zoom-in-95`).
  * Sizing Presets:
    - `sm` (`max-w-sm` ~384px): Confirmation alerts, destructive action prompts.
    - `md` (`max-w-md` ~448px): Standard alerts, newsletter signups, feedback prompts.
    - `lg` (`max-w-lg` ~512px): Rich forms, address inputs, multi-step actions.
    - `xl` (`max-w-xl` ~576px): Data tables, medium detail panels.
    - `2xl` (`max-w-2xl` ~672px): Product Quick View, wide media, rich order details.
* **Header & Icon Badge**:
  * Title (`text-lg sm:text-xl font-bold tracking-tight text-gray-900`) and optional descriptive subtitle (`text-sm text-gray-600 leading-relaxed`).
  * Top-right circular dismiss button (`w-9 h-9 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-gray-700`).
  * Semantic icon badge (`w-12 h-12 rounded-2xl border shadow-2xs`) supporting variants:
    - Brand Warm Amber: `bg-amber-50 text-amber-600 border-amber-200`
    - Success Emerald: `bg-emerald-50 text-emerald-600 border-emerald-200`
    - Danger Coral Red: `bg-red-50 text-red-600 border-red-200`
    - Warning Amber: `bg-amber-50 text-amber-500 border-amber-200`
    - Info Sky Blue: `bg-sky-50 text-sky-600 border-sky-200`
* **Footer Actions**:
  * Anchored action shelf (`px-6 py-4 bg-gray-50/80 border-t border-gray-100 rounded-b-2xl flex items-center justify-end gap-3`).
  * Secondary dismiss button (`border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase`).
  * Primary confirm button (`bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase`).
  * Destructive confirm button (`bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase`).
* **Accessibility & UX**:
  * WAI-ARIA compliant: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.
  * Keyboard dismiss via `Escape` key.
  * Backdrop click dismissal (configurable).
  * Automatic body scroll locking while open.
  * React 19 / Next.js hydration-safe Portal rendering via `createPortal` to `document.body`.

### 6.7 Navigation & Breadcrumbs (`Breadcrumbs.tsx`)
* **Container**: `flex items-center text-xs text-gray-500`
* **Hierarchy**:
  * Home link with icon (`Home` icon + `text-gray-500 hover:text-gray-900`)
  * Separator chevron (`ChevronRight text-gray-300 w-3.5 h-3.5`)
  * Intermediate department links (`hover:text-amber-600 transition-colors`)
  * Active terminal breadcrumb (`font-semibold text-gray-900` with `aria-current="page"`)

### 6.8 Pagination Controls (`Pagination.tsx`)
* **Summary Text**: `text-xs text-gray-500` with high-emphasis quantities (`text-gray-900 font-bold`).
* **Page Buttons**:
  * Active page: `bg-[#fab528] text-gray-900 font-black shadow-sm scale-105 rounded-lg w-9 h-9`
  * Inactive page: `bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-900 rounded-lg w-9 h-9`
  * Disabled arrow buttons: `border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50`
* **Items Per Page**: Inline dropdown selector supporting 12, 24, 48 items per view.

### 6.9 Catalog Filter Sidebar (`ProductFilters.tsx`)
* **Department Category List**: Item rows with category name and count chips (`bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full`, active in `bg-amber-400 text-gray-900`).
* **Price Range Inputs**: Number inputs with quick price tier pills (`Under $5`, `$5 - $10`, `$10 - $20`, `$20+`).
* **Brand Checkboxes**: Clean checkboxes with custom amber accent (`accent-[#fab528]`) and product count counts.
* **Rating Filter**: 5-star, 4-star, and 3-star filters with star icons and checkmarks.
* **Reset All**: Top right subtle action trigger with `RotateCcw` icon.

---

## 7. Interactive Style Guide & Catalog Routes

1. **Interactive Style Guide**: **`http://localhost:3000/design`**
   * Live color swatch preview with single-click hex code copying.
   * Typography spec tester and weight showcase.
   * Interactive component playground for all button variants, steppers, badges, and form elements.
   * Live responsive Product Card previews (Grid & List modes) with functioning wishlist toggling and cart interaction.
   * Interactive Dialog & Modal showcase featuring standard alerts, product quick view, confirmation dialogs, and size matrix.
   * Design token mapping table linking CSS variables to Tailwind utility classes.

2. **Full Product Catalog**: **`http://localhost:3000/products`**
   * Department pastel category banners matching DESIGN.md Section 2.4.
   * Live search, multi-facet filtering (categories, price range, brands, ratings, in-stock, sale).
   * Grid View & List View responsive toggling.
   * Quick View interactive modal powered by `Dialog`.
   * Complete pagination controls.
