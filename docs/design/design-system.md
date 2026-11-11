# Unified Design System & UI Specification
## Morse Code Translator & Learning Platform

**Document Version:** 1.0  
**Status:** Approved Architectural Specification  
**Design Philosophy:** Modern, minimal, and premium educational technology platform. Clean engineering aesthetic, precision typography, tactile interactive controls, and accessible contrast.

---

## 1. Brand Identity & Visual Language

### 1.1. Core Identity Principles
1. **Precision Telecommunications Heritage:** Inspired by mid-century telegraphy instrumentation and modern signal-processing workstations. Clean lines, monospace data readouts, and rhythm-based visual feedback.
2. **Pedagogical Clarity:** Designed for self-paced students, amateur radio operators, and educators. Content is structured into digestible modular cards with clear visual milestones.
3. **Pure Client-Side Transparency:** Visual styling reinforces that all computation occurs client-side in the browser. Zero mystery loading states; instant, deterministic feedback.

---

## 2. Color Palette & Token Architecture

The design system establishes a cohesive palette centered around **Teal/Emerald** as the primary brand anchor, supported by a **Restrained Amber** accent for telemetry and timing alerts, grounded in clean slate neutrals.

### 2.1. Light Theme Tokens (`html`)
| Token Name | Hex Value | Semantic Role / Usage |
| :--- | :--- | :--- |
| `--primary` | `#0F766E` (Teal 700) | Primary brand color, main CTAs, active tab backgrounds, key link hovers |
| `--primary-hover` | `#115E59` (Teal 800) | Hover state for primary buttons and active elements |
| `--primary-surface` | `#F0FDFA` (Teal 50) | Subdued background tint for active cards, badges, and selected options |
| `--primary-border` | `#CCFBF1` (Teal 100) | Subtle borders for primary callouts and active tool containers |
| `--accent` | `#D97706` (Amber 600) | Restrained telemetry highlight, active signal beacon, emergency SOS marker |
| `--accent-hover` | `#B45309` (Amber 700) | Hover state for accent actions |
| `--accent-surface` | `#FFFBEB` (Amber 50) | Subdued background for warnings and cautionary callouts |
| `--background` | `#F8FAFC` (Slate 50) | Primary application canvas background |
| `--surface` | `#FFFFFF` (White) | Primary card and workbench surface |
| `--surface-elevated`| `#FFFFFF` (White) | Modals, dropdown menus, floating tooltips with elevated shadow |
| `--text-primary` | `#0F172A` (Slate 900) | High-contrast body text, primary headings, labels |
| `--text-muted` | `#475569` (Slate 600) | Secondary body text, descriptions, footnotes, metadata |
| `--border` | `#E2E8F0` (Slate 200) | Standard component borders, table dividers, card boundaries |
| `--border-subtle` | `#F1F5F9` (Slate 100) | Inner row dividers, quiet borders |
| `--error` | `#B91C1C` (Red 700) | Validation errors, malformed Morse alerts |
| `--success` | `#047857` (Emerald 700) | Correct quiz/practice answers, completed lesson badges |
| `--focus-ring` | `#0F766E` (Teal 700) | Accessible 2px outline for keyboard navigation (`:focus-visible`) |

### 2.2. Dark Theme Tokens (`html.dark`)
| Token Name | Hex Value | Semantic Role / Usage |
| :--- | :--- | :--- |
| `--primary` | `#2DD4BF` (Teal 400) | Primary brand color, main CTAs in dark mode, active indicators |
| `--primary-hover` | `#5EEAD4` (Teal 300) | Hover state for primary actions |
| `--primary-surface` | `#0D3331` (Teal 950/80)| Subdued dark tint for active cards, badges, and selected options |
| `--primary-border` | `#134E4A` (Teal 900) | Subtle dark borders for primary callouts and active containers |
| `--accent` | `#FBBF24` (Amber 400) | Restrained telemetry highlight, active signal beacon, emergency SOS marker |
| `--accent-hover` | `#F59E0B` (Amber 500) | Hover state for accent actions |
| `--accent-surface` | `#2D2006` (Amber 950/60)| Subdued dark background for warnings and cautionary callouts |
| `--background` | `#0B1220` (Deep Navy) | Primary dark application canvas background |
| `--surface` | `#111827` (Slate 900) | Primary card and workbench surface |
| `--surface-elevated`| `#1E293B` (Slate 800) | Modals, dropdown menus, floating toolbars |
| `--text-primary` | `#F1F5F9` (Slate 100) | High-contrast body text, headings, data readouts |
| `--text-muted` | `#94A3B8` (Slate 400) | Secondary body text, descriptions, footnotes |
| `--border` | `#1E293B` (Slate 800) | Standard component borders, table dividers, card boundaries |
| `--border-subtle` | `#162032` (Slate 900) | Inner row dividers, quiet borders |
| `--error` | `#FCA5A5` (Red 300) | Validation errors, malformed Morse alerts |
| `--success` | `#34D399` (Emerald 400) | Correct quiz/practice answers, completed lesson badges |
| `--focus-ring` | `#2DD4BF` (Teal 400) | Accessible 2px outline for keyboard navigation (`:focus-visible`) |

### 2.3. Atmospheric Lighting & Depth Tokens
- `--glow-primary`: `rgb(15 118 110 / 0.12)` (light) / `rgb(45 212 191 / 0.12)` (dark)
- `--glow-accent`: `rgb(217 119 6 / 0.08)` (light) / `rgb(251 191 36 / 0.08)` (dark)
- `--grid-line`: `rgb(15 23 42 / 0.04)` (light) / `rgb(148 163 184 / 0.05)` (dark)

---

## 3. Typography Hierarchy & Font System

### 3.1. Font Families
- **UI & Prose Font (`var(--font-sans)`):** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`. Clean, highly readable neo-grotesque design with superior legibility at all UI scales.
- **Telegraph & Technical Font (`var(--font-mono)`):** `JetBrains Mono`, `ui-monospace`, `Consolas`, `monospace`. Fixed-pitch alignment for dots, dashes, timing ratios, and ASCII waveforms.

### 3.2. Modular Type Scale
| Element | Mobile Size | Desktop Size | Font Weight | Line Height | Tracking | Text-Wrap |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Page H1** | `28px (1.75rem)` | `38px–44px` | ExtraBold (800) | `1.15` | `-0.025em` | `balance` |
| **Section H2** | `22px (1.375rem)`| `28px–32px` | ExtraBold (800) | `1.2` | `-0.02em` | `balance` |
| **Card H3** | `17px (1.0625rem)`| `20px (1.25rem)` | Bold (700) | `1.3` | `-0.01em` | `balance` |
| **Sub-item H4** | `15px (0.9375rem)`| `16px (1.0rem)` | Bold (700) | `1.35` | `normal` | `balance` |
| **Body Large** | `15px (0.9375rem)`| `16px (1.0rem)` | Regular / Medium | `1.6` | `normal` | `pretty` |
| **Body Default**| `14px (0.875rem)` | `14px (0.875rem)` | Regular / Medium | `1.6` | `normal` | `pretty` |
| **Caption / Small**| `12px (0.75rem)`| `12px (0.75rem)` | Medium / SemiBold | `1.5` | `normal` | `pretty` |
| **Code / Morse**| `13px (0.8125rem)`| `14px (0.875rem)` | Bold (700) Mono | `1.4` | `+0.05em` | `nowrap` |

---

## 4. Spacing, Container & Border-Radius Standards

### 4.1. Page Containers
To achieve visual unity across the platform:
- **Interactive Tools & Catalog Hubs (`/`, `/practice`, `/quiz`, `/reference`, `/audio-decoder`, `/learn`):** Standardized to `max-w-6xl` (`1152px`) with responsive horizontal padding:
  - Mobile: `px-4` (`16px`)
  - Tablet: `px-6` (`24px`)
  - Desktop: `lg:px-8` (`32px`)
- **Long-Form Reading & Focused Curriculum (`/learn/[slug]`, `/about`, `/faq`, `/privacy`):** Calibrated to `max-w-4xl` (`896px`) for optimal typographical line length (65–75 characters per line).

### 4.2. Vertical Rhythm
- Hero to Tool Spacing: `mb-6` to `mb-8`
- Primary Section Divider: `mt-16 pt-12` or `mt-20 pt-16` with a subtle divider border (`border-t border-slate-200/80 dark:border-slate-800/80`)
- Grid Gap: `gap-6` (desktop), `gap-4` (mobile)
- Inner Card Padding: `p-5 sm:p-6 lg:p-7`

### 4.3. Border-Radius Tokens
- **Container Workbench:** `rounded-2xl` (`16px`) to `rounded-3xl` (`24px`)
- **Standard Card:** `rounded-xl` (`12px`) to `rounded-2xl` (`16px`)
- **Interactive Controls / Inputs:** `rounded-lg` (`8px`) to `rounded-xl` (`12px`)
- **Badges, Filter Pills, Breadcrumb Capsules:** `rounded-full` (`9999px`)

---

## 5. Component Design Standards

### 5.1. Header & Global Navigation
- **Height & Stickiness:** `h-16`, sticky top with backdrop blur (`backdrop-blur-xl bg-white/80 dark:bg-[#0B1220]/80`).
- **Brand Mark:** Dual-circle + dash geometric icon embedded in a teal gradient square with subtle drop shadow and white outline.
- **Navigation Links:** Horizontal pill-style layout. Active route highlighted with a subtle teal tint (`bg-teal-50/80 text-teal-800 font-bold dark:bg-teal-950/70 dark:text-teal-300`). Non-active links feature smooth color transitions on hover.
- **Mobile Menu:** Non-blocking zero-JS `<details>` capsule with animated chevron, backdrop blur, rounded-2xl dropdown container, and touch-target compliant links.

### 5.2. Footer
- **Structure:** Two-tiered layout. Top tier contains the platform brand mission and categorized quick-links. Bottom tier displays the international standard compliance notice (ITU-R M.1677-1) and PARIS 50-unit timing badge.
- **Aesthetics:** Clean border-t, muted slate text, clear hover states with teal accent.

### 5.3. Hero Sections
- **Atmospheric Background:** Subtle radial gradient overlay with engineering grid background (`bg-grid mask-fade`) fading smoothly towards edges. Zero visual distraction from primary tool actions.
- **Telemetry Pill Badge:** Centered capsule pill displaying active standard or route category with an animated live status beacon dot.
- **Headline Balance:** Balanced line wrapping (`text-wrap: balance`) with teal/emerald gradient clip for primary keyword emphasis.
- **Description:** Concise, 14–16px readable copy without hyperbole or unsupported claims.

### 5.4. Cards & Workbenches
- **Level 1 — Elevated Studio Workbench (`.studio-workbench`):**
  - Light: Pure white surface, subtle 1px border (`border-slate-200/90`), deep diffused shadow (`0 25px 60px -15px rgba(15, 23, 42, 0.08)`), inset top highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.9)`).
  - Dark: `#111827` surface, subtle luminous border (`border-white/10`), ambient teal halo on hover.
- **Level 2 — Structured Card (`.studio-card`):**
  - Smooth hover elevation (`transition-all duration-200`), subtle border luminescence (`hover:border-teal-500/40`), clean header bar with step/category indicator.
- **Level 3 — Data Callout Tiles:**
  - Neutral or tinted backgrounds, monospace data headers, high-contrast labels.

### 5.5. Buttons & Form Controls
- **Primary CTA Button:**
  - Solid Teal background (`bg-teal-700 hover:bg-teal-800 text-white dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950`).
  - Tactile active feedback (`active:scale-[0.98]`).
  - Minimum 44px height for mobile accessibility.
- **Secondary / Ghost Button:**
  - Subdued slate border (`border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800`).
- **Telegraph Input Keys (Dot / Dash / Space):**
  - Specially styled tactile buttons with clear auditory/visual active states, rounded corners, and clear symbol indicators.

### 5.6. Range Sliders (Audio Dock Controls)
- **Track:** 6px rounded bar with high contrast (`#E2E8F0` light, `#334155` dark).
- **Thumb:** 18px circle in solid Teal with white border (light) or dark border with teal glow (dark). Hover scales up smoothly (`scale-115`).

### 5.7. Accordions (FAQ & Expandable Disclosures)
- **Container:** Rounded-xl border card.
- **Header:** Interactive summary with clean hover highlight, bold question title, and smooth animated SVG chevron that rotates 180 degrees upon expansion.
- **Content:** Smoothly reveals readable answer body with comfortable line height and contextual internal links.

---

## 6. Theme Switching & Accessibility Guarantees

### 6.1. Theme Preservation
- System-safe script in `<head>` executes before hydration to prevent theme flickering.
- Zero layout shift during theme toggling.
- Full color-contrast compliance (WCAG 2.1 AA minimum 4.5:1 for normal text, 3:1 for large text and UI components) in both themes.

### 6.2. Motion & Accessibility
- Respects `prefers-reduced-motion`: all card glow transitions, background pulse animations, and transforms collapse to instant zero-motion states.
- Visible, high-contrast focus rings (`*:focus-visible`) across all interactive elements.
- Screen-reader friendly skip link (`#main-content`) prominently anchored at the start of the DOM.

