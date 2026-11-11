# Cookie & Browser Storage Policy

**Effective Date:** `[EFFECTIVE DATE]`  
**Last Updated:** `[LAST UPDATED]`  
**Platform:** Morse Code Platform (`https://morsecodetranslatores.com/`)  
**Operator:** `[WEBSITE OPERATOR / LEGAL ENTITY NAME]`

---

## 1. Direct Summary: We Set Zero Cookies

In the interest of full transparency and plain language:

> [!NOTE]
> **OUR APPLICATION DOES NOT SET OR USE COOKIES.**  
> When you browse, translate, practice, or read lessons on the Morse Code Translator & Learning Platform, our application code sets **zero HTTP cookies** on your device. We do not use cookies for tracking, analytics, personalization, sessions, or advertising.

Many websites display confusing "cookie preference banners" that describe complex tracking categories. Because our application does not use cookies, we do not present intrusive cookie banners or track your web activity across sites.

---

## 2. Technical Distinctions: Cookies vs. Local Browser Storage

To help you understand how web technologies function, this policy clarifies the technical distinctions between different forms of data storage:

| Storage Type | How It Operates | Is It Used on This Website? | Purpose / Function on This Website |
| :--- | :--- | :---: | :--- |
| **HTTP Cookies** | Small text files stored by the browser that are automatically transmitted to the server with *every* HTTP request header. | **NO** | Our application code sets zero cookies (`document.cookie` is never executed). |
| **Local Storage (`localStorage`)** | A browser-contained key-value store that persists locally on your device across sessions and is **never** sent to the web server over the network. | **YES** | Used solely for 2 non-identifying keys: display theme preference and educational learning progress. |
| **Session Storage (`sessionStorage`)** | A temporary browser storage area that automatically erases completely the moment you close the current tab. | **NO** | Not utilized by our platform. |
| **IndexedDB / WebSQL** | Complex client-side client databases for heavy offline data caching. | **NO** | Not utilized by our platform. |
| **Third-Party Tracking Pixels / Beacons** | Invisible scripts loaded from external ad servers to profile user behavior across the web. | **NO** | Strictly prohibited in our codebase. |

---

## 3. How We Use Browser Local Storage (`localStorage`)

Instead of requiring you to register an account or storing your progress on an external database, our website relies exclusively on your browser's local storage feature.

The data remains 100% on your own physical computer, smartphone, or tablet:

### 3.1 `morse_theme`
- **Purpose:** Stores your preferred visual interface mode (`'light'` or `'dark'`).
- **Data Value:** A single plain-text string: either `"light"` or `"dark"`.
- **Duration:** Persists until you toggle the theme, reset your settings, or clear your browser data.
- **Why It Matters:** Without this local key, the website would reset to your operating system's default color mode on every page navigation.

### 3.2 `morse_learning_progress_v1`
- **Purpose:** Tracks your self-paced educational journey across our 10 Morse code lessons, interactive quizzes, and practice drills.
- **Data Structure:** A structured JSON object containing:
  - `completedLessons`: An array of text strings identifying completed lesson modules (e.g., `["what-is-morse-code"]`).
  - `quizHistory`: Numerical records of past quiz scores (score count, total questions, timestamp).
  - `practiceStats`: Cumulative practice attempt numbers (total questions answered, correct answers, and symbol error counters used exclusively to power the "Weak Character Focus" trainer).
  - `lastActiveDate`: A date string recording your last study session.
- **Duration:** Persists locally until you reset your progress or clear your browser site data.
- **Why It Matters:** Enables you to resume study sessions over days or weeks without ever needing to sign up, log in, or disclose your personal identity.

---

## 4. Hosting Infrastructure & Edge Delivery Technologies

While our application code sets no cookies, our website is delivered through cloud infrastructure and a Content Delivery Network (CDN) (such as `[HOSTING PROVIDER NAME, e.g., Cloudflare / Vercel / Netlify]`).

### 4.1 Edge Routing & Security Tokens
In certain configurations, CDN edge providers may automatically generate short-lived, privacy-preserving HTTP headers or security cookies (such as Cloudflare's `__cf_bm` or bot-mitigation tokens) strictly to:
- Distinguish legitimate human web browsers from malicious automated bots and scrapers.
- Defend the platform against Distributed Denial of Service (DDoS) cyberattacks.
- Optimize asset caching and route requests to the nearest edge data center.

These technical infrastructure mechanisms are strictly functional, operate independently of our application, do not track you across unrelated websites, and do not harvest personal identity details.

---

## 5. How You Can Manage or Clear Browser Storage

Because your theme and progress data live entirely on your device, **you have complete control over them at all times.**

### 5.1 In-App Reset
You can wipe all saved learning progress instantly by navigating to the Learning Hub (`/learn`) and clicking the **"Reset Progress"** button. This immediately removes `morse_learning_progress_v1` from your browser's local memory.

### 5.2 Browser Settings Menu
You can view, inspect, or delete all storage entries at any time using your browser's built-in privacy tools:

- **Google Chrome / Microsoft Edge / Brave:**
  1. Open **Settings** $\rightarrow$ **Privacy and Security** $\rightarrow$ **Site Settings** $\rightarrow$ **View permissions and data stored across sites**.
  2. Search for our domain name (`morsecodetranslatores.com`).
  3. Click the trash can icon or **Clear Data**.
- **Mozilla Firefox:**
  1. Open **Settings** $\rightarrow$ **Privacy & Security** $\rightarrow$ **Cookies and Site Data**.
  2. Click **Manage Data**, search for our domain, and click **Remove Selected**.
- **Apple Safari (macOS / iOS):**
  1. Open **Settings** $\rightarrow$ **Safari** $\rightarrow$ **Advanced** $\rightarrow$ **Website Data**.
  2. Search for our domain and click **Delete**.

### 5.3 Developer Tools Inspection
For technically minded users, you can verify our compliance directly in your browser:
1. Press `F12` (or right-click and select **Inspect**) to open Browser Developer Tools.
2. Select the **Application** (or **Storage**) tab.
3. Inspect the **Cookies** section: verify that **zero cookies** are set by our domain.
4. Inspect the **Local Storage** section: verify that only `morse_theme` and `morse_learning_progress_v1` exist.

---

## 6. Updates to This Policy

If we ever introduce new technical storage mechanisms or modify our local storage keys, we will revise this policy and update the **"Last Updated"** date above. Because we remain committed to zero-tracking architecture, we will not introduce third-party advertising cookies or profiling trackers.

---

## 7. Contact Us

If you have questions or require technical assistance regarding our browser storage practices, please contact:

- **Entity / Project Name:** `[WEBSITE OPERATOR / LEGAL ENTITY NAME]`
- **Attn:** Privacy & Technology Inquiries
- **Email:** `morecodetranslator@gmail.com`
- **Official Website:** `https://morsecodetranslatores.com/`

