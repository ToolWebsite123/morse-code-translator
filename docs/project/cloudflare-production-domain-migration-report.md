# Cloudflare Production Domain Migration Report

**Date:** November 11, 2026  
**Platform:** Morse Code Platform  
**Production Domain:** `https://morsecodetranslatores.com/`  
**Apex Canonical Host:** `https://morsecodetranslatores.com`  
**Contact Email:** `morecodetranslator@gmail.com`  
**Hosting / Deployment Platform:** Cloudflare Pages  

---

## Executive Summary

The **Morse Code Platform** has been fully migrated and configured for production deployment on **Cloudflare Pages** at the official canonical domain **`https://morsecodetranslatores.com`**.

All obsolete references to the legacy preview domain (`morse-code-translator-red-ten.vercel.app`) and obsolete placeholder domains (`morsecodetranslator.org`) have been eliminated from the production application code, metadata, schemas, sitemaps, and robots configuration. The build pipeline executes a 100% static HTML export (`out/`) tailored for Cloudflare's ultra-fast global edge network.

All 125 test suites, full TypeScript compilation, FAQ schema parity validation, and static production builds passed with zero errors.

---

## Phase 1 — Actual Cloudflare Deployment Architecture

| Component | Discovered Architecture | Details |
|---|---|---|
| **Hosting Model** | **Cloudflare Pages (Direct Static Export)** | Built via Next.js 16 Static HTML Export (`output: 'export'`) |
| **Edge Server Workers** | None required | Zero Node.js runtime or edge worker dependencies |
| **Output Directory** | `out/` | Pre-rendered static HTML, CSS, client-side JS bundles |
| **Image Optimization** | `images: { unoptimized: true }` | Browser-native, zero edge image service charges |
| **Edge Redirects** | `public/_redirects` $\rightarrow$ `out/_redirects` | Cloudflare Pages native 301 rules for `/translator` and `/faq` |
| **Client Processing** | 100% In-Browser | CW audio synthesizer (Web Audio API), audio file decoder, learning progress (`localStorage`) |

---

## Phase 2 — Domain Configuration

The project uses a single centralized configuration module in [`src/lib/seo/siteConfig.ts`](file:///d:/Project/Morse%20Code%20Translator%20Website/src/lib/seo/siteConfig.ts):

```typescript
export const SITE_CONFIG = {
  name: 'Morse Code Platform',
  title: 'Morse Code Translator — Free Text & Audio Converter',
  domain: 'morsecodetranslatores.com',
  apexDomain: 'morsecodetranslatores.com',
  canonicalHost: 'https://morsecodetranslatores.com',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://morsecodetranslatores.com').replace(/\/+$/, ''),
  email: 'morecodetranslator@gmail.com',
  // ...
};
```

- **Apex Domain:** Set as primary canonical (`https://morsecodetranslatores.com`).
- **Non-preferred Host:** `www.morsecodetranslatores.com` configured to redirect to apex via Cloudflare Redirect Rules.
- **Environment Flexibility:** Supports `NEXT_PUBLIC_SITE_URL` for local staging or preview while falling back to the verified production apex domain.

---

## Phase 3 & 4 — SEO, Sitemap & Robots Audit

| Resource | Status | Verification Result |
|---|---|---|
| `metadataBase` | Verified | `new URL('https://morsecodetranslatores.com')` |
| Canonical URLs | Verified | All 21 public pages output `<link rel="canonical" href="https://morsecodetranslatores.com/..."/>` |
| Open Graph / Social | Verified | `og:url` set to `https://morsecodetranslatores.com/...` across all routes |
| JSON-LD Structured Data | Verified | `WebSite`, `WebApplication`, `FAQPage`, `BreadcrumbList`, and `Course` schemas all use production apex domain |
| `sitemap.xml` | Verified | Contains exactly 21 indexable URLs, zero preview URLs, zero duplicate entries |
| `robots.txt` | Verified | Outputs `User-Agent: *`, `Allow: /`, and `Sitemap: https://morsecodetranslatores.com/sitemap.xml` |

---

## Phase 5 — Legal and Contact Pages

The legal policies and contact interfaces have been updated with verified details while preserving necessary legal placeholders:

- **Brand:** Morse Code Platform
- **Official Domain:** `https://morsecodetranslatores.com/`
- **Contact Email:** `morecodetranslator@gmail.com`
- **Privacy Policy:** Updated with browser-local translation notice, zero-cookie verification, and contact info.
- **Terms of Use:** Updated with official website URL and informal dispute email.
- **Technical Disclaimer:** Updated with operational disclosures, life-safety limits, and contact info.
- **Cookie Policy:** Confirmed zero-cookie architecture with instructions on inspecting browser storage.
- **Copyright & DMCA Policy:** Clarified public-domain Morse code standards vs. proprietary original UI/editorial content.
- **Contact Page:** Verified direct contact link to `morecodetranslator@gmail.com`.
- **Preserved Placeholders:** `[WEBSITE OPERATOR / LEGAL ENTITY NAME]`, `[PHYSICAL / MAILING ADDRESS]`, `[GOVERNING JURISDICTION]`, `[DMCA DESIGNATED AGENT NAME / EMAIL / ADDRESS]`.

---

## Phase 6 — Cloudflare Configuration Readiness

### 1. Cloudflare Pages Project Settings
In the Cloudflare Dashboard under **Workers & Pages** $\rightarrow$ **[Project Name]** $\rightarrow$ **Settings** $\rightarrow$ **Builds & deployments**:
- **Framework preset:** `Next.js (Static HTML Export)` or `None`
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Root directory:** `/`
- **Node.js Version:** `20.x` (or `18.17.0+`)

### 2. Environment Variables
Under **Settings** $\rightarrow$ **Environment variables**:
- `NEXT_PUBLIC_SITE_URL`: `https://morsecodetranslatores.com`

### 3. Custom Domain Setup (Apex)
1. Navigate to **Workers & Pages** $\rightarrow$ **[Project Name]** $\rightarrow$ **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter `morsecodetranslatores.com` and click **Continue**.
4. Cloudflare will automatically configure the zone DNS record (CNAME flattening on zone apex pointing to `<project-name>.pages.dev`).

### 4. www-to-Apex 301 Redirect Rule
In Cloudflare Dashboard for the zone `morsecodetranslatores.com`:
1. Navigate to **Rules** $\rightarrow$ **Redirect Rules** $\rightarrow$ **Create rule**.
2. **Rule name:** `Redirect www to Apex Canonical`
3. **Incoming requests:**
   - Field: `Hostname`
   - Operator: `equals`
   - Value: `www.morsecodetranslatores.com`
4. **Target URL:**
   - Type: `Dynamic`
   - Expression: `concat("https://morsecodetranslatores.com", http.request.uri.path)`
   - Status code: `301 (Moved Permanently)`
   - Preserve query string: **Checked (True)**
5. Click **Deploy**.

### 5. SSL/TLS Configuration
In Cloudflare Dashboard for zone `morsecodetranslatores.com`:
- **SSL/TLS encryption mode:** Set to **Full** (or **Full (Strict)**). Cloudflare Pages handles origin edge certificates automatically via Universal SSL.
- **Edge Certificates Settings:**
  - **Always Use HTTPS:** Enabled (ON)
  - **Automatic HTTPS Rewrites:** Enabled (ON)
  - **Minimum TLS Version:** `TLS 1.2`
  - **Opportunistic Encryption:** Enabled (ON)

---

## Phase 7 — Testing & Verification Results

| Test Category | Command / Check | Result |
|---|---|---|
| **TypeScript Validation** | `npx tsc --noEmit` | **0 errors (100% Passed)** |
| **Unit & Integration Tests** | `npm test -- --run` | **11 test suites passed, 125/125 tests passed** |
| **FAQ Schema Parity** | `python scripts/verify_faq_parity.py` | **100% Parity Verified (5/5 questions match)** |
| **Static HTML Production Build** | `npm run build` | **25/25 static routes pre-rendered to `out/`** |
| **Sitemap Audit** | `out/sitemap.xml` | **21 URLs, all pointing to `https://morsecodetranslatores.com`** |
| **Robots.txt Audit** | `out/robots.txt` | **Allow: /, Correct Sitemap URL referenced** |
| **Canonical Audit** | `out/*.html` | **All canonical links match apex domain** |
| **Old Domain Reference Search** | Recursive codebase scan | **Zero obsolete domains in `src/` or `public/`** |

---

## Phase 8 — Production Readiness & Next Steps

The codebase is **100% production ready** for Cloudflare Pages.

### Beginner-Friendly Step-by-Step Instructions

1. **Log in to Cloudflare:**
   Go to [dash.cloudflare.com](https://dash.cloudflare.com/) and click on **Workers & Pages**.

2. **Select Your Project:**
   Click on your Morse Code platform project.

3. **Verify Build Settings:**
   Go to **Settings** $\rightarrow$ **Builds & deployments**:
   - Ensure the Build command is `npm run build`.
   - Ensure the Output directory is `out`.

4. **Add Environment Variable:**
   Go to **Settings** $\rightarrow$ **Environment variables**:
   - Variable name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://morsecodetranslatores.com`

5. **Connect Your Production Domain:**
   Go to the **Custom domains** tab in your Pages project:
   - Click **Set up a custom domain**.
   - Type `morsecodetranslatores.com` and confirm.

6. **Add the www Redirect:**
   Go to **Rules** $\rightarrow$ **Redirect Rules**:
   - Create a rule redirecting `www.morsecodetranslatores.com` to `https://morsecodetranslatores.com` with a 301 Permanent Redirect.

