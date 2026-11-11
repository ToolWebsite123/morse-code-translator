# Privacy Policy

**Effective Date:** `[EFFECTIVE DATE]`  
**Last Updated:** `[LAST UPDATED]`  
**Platform:** Morse Code Translator & Learning Platform (`[WEBSITE DOMAIN URL]`)  
**Operator:** `[WEBSITE OPERATOR / LEGAL ENTITY NAME]`

---

## 1. Introduction & Core Philosophy

Welcome to the Morse Code Translator & Learning Platform (referred to as "we," "us," or "our"). We provide an open, free, educational web resource dedicated to telegraphy, continuous wave (CW) communication, and International Morse Code translation.

We believe that privacy is a fundamental human right. Our website is built upon a **privacy-by-design architecture**:

- You are **never** required to create an account, register, or provide personal credentials.
- Your translation messages and audio files are **never** uploaded to our servers.
- We do **not** sell, monetize, rent, or trade your data.
- We do **not** run third-party advertising networks or tracking pixels.

This Privacy Policy explains in transparent, plain language what technical information is involved when you access our site, how local browser features function, and what you should understand regarding third-party hosting infrastructure.

---

## 2. Information We Do Not Collect

To avoid ambiguity, we explicitly state that we **do not** collect, store, or process any of the following categories of personal information:

- **Personal Identifiers:** No names, postal addresses, email addresses, phone numbers, or social media handles.
- **Account Credentials:** No usernames, passwords, authentication tokens, or biometric data.
- **Financial & Payment Data:** No credit card numbers, billing addresses, or bank account details. The platform is completely free.
- **Sensitive Personal Data:** No government identification numbers, demographic data, religious beliefs, health information, or biometric profiles.
- **User Message Transcripts:** No plain text or Morse code messages typed into the translator are captured, stored, or reviewed by us.

---

## 3. How Core Features Process Data (Browser-Local Architecture)

Our platform operates primarily as a client-side web application. All core analytical, algorithmic, and acoustic computations run strictly inside your device's web browser:

### 3.1 Text-to-Morse & Morse-to-Text Translation
When you type English text or input Morse code into the translator workbench, the translation algorithm (`src/lib/morse/`) runs entirely in your device's local memory (RAM). The text does not trigger an HTTP POST request or API call. Your text is evaluated instantly via client-side JavaScript and discarded when you close or refresh your browser tab.

### 3.2 Audio Tone Playback & Synthesis
When you play Morse code audio, tones are synthesized in real time using your browser's native **HTML5 Web Audio API** (`AudioContext`). The sine wave audio is generated on your local sound hardware. No external audio stream is fetched, and no recording of your playback is transmitted.

### 3.3 Audio File Decoder (`/audio-decoder`)
When you upload or drag an audio file (such as a WAV, MP3, or OGG recording) into our Audio Decoder:
- The file is read directly by your web browser's local file reader (`ArrayBuffer`).
- The audio envelope analysis and pitch detection algorithms run entirely within your local browser thread.
- The file is **never uploaded** to our server or any cloud processing service.
- When you navigate away from the page, the audio buffer is released from browser memory.

### 3.4 Live Microphone Input (`micDecoder.ts`)
If you explicitly grant microphone permissions to use the experimental live audio decoder, audio samples are streamed exclusively through local browser audio processing nodes. Microphone audio is never recorded to disk, never streamed to a remote server, and ceases immediately when you toggle off the microphone or close the tab.

### 3.5 WAV Audio Export
When you click the "WAV" export button, the binary audio file is assembled directly in your browser's memory using an uncompressed 16-bit PCM encoder. The resulting download link is generated via an in-memory `blob:` URL on your own device.

---

## 4. Local Browser Storage (`localStorage`)

Rather than maintaining a central user database, our platform uses your browser's native `localStorage` feature to save non-identifying preferences and learning achievements across visits.

### 4.1 Stored Keys
We store only two specific keys in your browser:

1. `morse_theme`: Contains the single string value `'light'` or `'dark'` representing your visual display preference.
2. `morse_learning_progress_v1`: Stores a structured JSON record containing:
   - A list of completed lesson identifier strings (e.g., `['what-is-morse-code', 'single-element-letters']`).
   - Numerical quiz performance history (score, total, timestamp).
   - Cumulative practice attempt counters (total attempts, correct attempts, and non-identifying symbol error counts for weak-character focus).

### 4.2 Characteristics & Limitations of Local Storage
- **Device-Specific:** Data stored in `localStorage` is confined strictly to the specific browser profile and device you are currently using. It does not synchronize to your other devices or browsers.
- **Unencrypted:** `localStorage` is an unencrypted browser convenience feature. We intentionally store only educational progress counters and never store sensitive personal information in `localStorage`.
- **In-Memory Fallback:** If you disable local storage or browse in private/incognito mode, our application automatically falls back to temporary in-memory variables that cleanly reset when the window is closed.
- **How to Clear Your Data:** You can delete all stored progress at any time by clicking the **"Reset Progress"** button on the Learning Hub page, or by clearing your browser's "Site Data" or "Cookies and Local Storage" through your browser's standard settings menu.

---

## 5. Cookies & Similar Technologies

- **We set zero cookies:** Our application does not generate, store, or inspect HTTP cookies (`document.cookie` is not called).
- **No Third-Party Cookies:** We do not partner with third-party tracking firms, advertising retargeters, or cross-site behavioral profilers.
- For complete technical details on our browser storage mechanisms, please review our separate [Cookie Policy](cookie-policy.md).

---

## 6. Hosting Infrastructure & Technical Edge Server Logs

While our application code does not collect personal data, like all websites connected to the public Internet, our site is hosted on third-party cloud infrastructure and Content Delivery Networks (CDNs) (such as `[HOSTING PROVIDER NAME, e.g., Cloudflare / Vercel / Netlify]`).

### 6.1 Standard Technical Server Logs
When your web browser requests our web pages, styles, or scripts, the hosting infrastructure automatically receives standard network transmission data. This commonly includes:
- Your device's Internet Protocol (IP) address.
- The date and time of the request.
- The specific web page or file requested.
- The HTTP response status code.
- Your browser type, version, and operating system (User-Agent string).
- The referring web address (HTTP Referer header), if provided by your browser.

### 6.2 Purpose of Infrastructure Logs
These automated logs are generated by the hosting network for:
- Delivering web assets to your nearest geographic edge server.
- Defending against malicious traffic, automated denial-of-service (DDoS) attacks, and security intrusions.
- Ensuring network uptime, fault diagnosis, and server performance.

We do not maintain an application database to correlate edge server logs with individual users, nor do we attempt to identify individual visitors from these logs.

---

## 7. Data Security Limitations

We take reasonable technical precautions to protect our platform:
- **HTTPS Encryption in Transit:** All communications between your web browser and our edge servers are encrypted using modern Transport Layer Security (TLS/HTTPS).
- **Client-Side Isolation:** By performing translation, audio synthesis, and file decoding directly in your browser, we minimize data transmission risks entirely.

### Important Limitation
No method of digital transmission over the Internet or local computer storage is 100% impenetrable. While we transmit zero message text over the wire, the security of data processed locally in your browser depends upon the security of your own device, operating system, and installed browser extensions. We urge you to keep your web browser updated and protect your physical devices against unauthorized access.

---

## 8. Third-Party Links & External Resources

Our website may occasionally contain links to external, third-party resources (such as the International Telecommunication Union standard documentation at `itu.int` or educational references).

We do not operate, control, or endorse external websites, and we are not responsible for their privacy practices, content, or data collection policies. When you leave our website via an external link, we encourage you to read the privacy disclosures of each destination website.

---

## 9. Children's Online Privacy Protection

Our platform provides educational utility and history instruction for students, hobbyists, and educators of all ages.

- We **do not knowingly collect or solicit personal information** from children under the age of 13 (or under 16 where applicable by law, including under the U.S. Children's Online Privacy Protection Act "COPPA" or EU General Data Protection Regulation "GDPR").
- Because our website has no account registration, no contact forms, and no database, we do not have technical means to gather or store personal details of minors.
- If a parent or guardian believes their child has somehow provided personal data through an external communication channel (such as sending an email to our support address), please contact us at `morecodetranslator@gmail.com`, and we will promptly delete any such communication records.

---

## 10. Rights for International Users (GDPR, UK GDPR, CCPA/CPRA)

Various data protection laws around the world grant individuals specific rights regarding their personal information:

- **European Union & United Kingdom (GDPR / UK GDPR):** Rights to access, rectify, erase, restrict processing, data portability, and object to processing.
- **California & Other U.S. States (CCPA / CPRA):** Rights to know what personal information is collected, right to delete, right to opt-out of the "sale" or "sharing" of personal data, and right to non-discrimination.

### How We Comply:
Because we **do not collect, hold, monetize, or process personal data**, we do not maintain personal profiles to view, rectify, or export. 
- You have full autonomy over your local data: you can erase all saved learning progress and theme preferences instantly on your own device by clicking "Reset Progress" or clearing your browser's site storage.
- We do not "sell" or "share" personal information under any statutory definition of those terms.

---

## 11. Changes & Updates to This Privacy Policy

We may periodically revise this Privacy Policy to reflect technical enhancements, architectural updates, or evolving regulatory requirements. 

When changes occur:
- We will update the **"Last Updated"** date at the top of this document.
- Significant modifications will be summarized clearly in our platform release notes or on-page documentation.
- Your continued use of the website following the posting of an updated policy indicates your awareness and acceptance of the revised terms.

---

## 12. Contact Information

If you have questions, comments, or technical inquiries regarding this Privacy Policy or our architectural privacy measures, please reach out to:

- **Entity / Project Name:** `[WEBSITE OPERATOR / LEGAL ENTITY NAME]`
- **Attn:** Privacy Officer / Legal Inquiry
- **Email:** `morecodetranslator@gmail.com`
- **Mailing Address:** `[PHYSICAL / MAILING ADDRESS]`
- **Official Website:** `[WEBSITE DOMAIN URL]`

