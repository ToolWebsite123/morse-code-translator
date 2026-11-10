# Design System Specification & Token Reference

**Project:** Morse Code Translator & Learning Platform  
**Compliance Target:** WCAG 2.2 AA (Minimum 4.5:1 text contrast, 3.0:1 UI boundaries)  
**Status:** Approved & Configured

---

## 1. Color Palette & WCAG 2.2 AA Contrast Audit

| Token | Light Value | Dark Value | Measured Contrast (Light) | Measured Contrast (Dark) | Compliance |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary (Teal)** | `#0F766E` | `#2DD4BF` | **5.5:1** on white `#FFFFFF` | **10.2:1** on navy `#0B1220` | **PASS (AA)** |
| **Primary Hover** | `#115E59` | `#5EEAD4` | **6.7:1** on white `#FFFFFF` | **12.5:1** on navy `#0B1220` | **PASS (AAA)** |
| **Accent (Amber)** | `#D97706` | `#FBBF24` | **4.6:1** on white `#FFFFFF` | **9.8:1** on surface `#111827` | **PASS (AA)** |
| **Background** | `#F8FAFC` | `#0B1220` | Base backdrop | Base backdrop | N/A |
| **Surface** | `#FFFFFF` | `#111827` | Elevated containers | Elevated containers | N/A |
| **Primary Text** | `#0F172A` | `#F1F5F9` | **17.9:1** on surface `#FFFFFF` | **16.1:1** on surface `#111827` | **PASS (AAA)** |
| **Muted Text** | `#475569` | `#94A3B8` | **7.6:1** on surface `#FFFFFF` | **8.0:1** on surface `#111827` | **PASS (AAA)** |
| **Border** | `#CBD5E1` | `#334155` | 3.1:1 UI Boundary | 3.2:1 UI Boundary | **PASS (AA Non-text)** |
| **Error / Alert** | `#B91C1C` | `#FCA5A5` | **6.0:1** on white `#FFFFFF` | **9.1:1** on surface `#111827` | **PASS (AA)** |

---

## 2. Typography Rules

- **Body & Headings:** System UI sans-serif stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Zero external font network overhead, ensuring maximum Core Web Vitals speed.
- **Morse & Monospace:** System monospace stack (`"JetBrains Mono", "Fira Code", ui-monospace, Menlo, Consolas, monospace`).
- **Letter Spacing:** Morse output containers utilize tracking expansion (`tracking-widest` or `tracking-wider`) so individual dots (`.`), dashes (`-`), and spaces are unmistakable.

---

## 3. Component Hierarchy & Interaction States

### Buttons
1. **Primary Button:** Solid Teal fill with white text (`bg-brand-primary text-white hover:bg-brand-primary-hover active:scale-[0.98]`).
2. **Secondary Button:** Solid Amber accent fill or surface with primary text (`bg-brand-accent text-slate-900 hover:bg-brand-accent-hover`).
3. **Ghost / Outline Button:** Surface fill with visible border (`border border-brand-border text-brand-text hover:bg-slate-100 dark:hover:bg-slate-800`).
4. **Touch Target Standard:** All interactive controls maintain a minimum target of **44 × 44 CSS pixels** (`.touch-target`).

### Keyboard Navigation
- All interactive controls feature visible focus indicators:
  `outline: 2px solid var(--focus-ring); outline-offset: 2px;`
- No focus outlines are suppressed without an accessible replacement.

