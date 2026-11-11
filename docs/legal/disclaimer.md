# Technical & Operational Disclaimer

**Effective Date:** `[EFFECTIVE DATE]`  
**Last Updated:** `[LAST UPDATED]`  
**Platform:** Morse Code Platform (`https://morsecodetranslatores.com/`)  
**Operator:** `[WEBSITE OPERATOR / LEGAL ENTITY NAME]`

---

## 1. General Educational & Informational Purpose

All materials, tools, software converters, interactive drills, lessons, quizzes, and reference guides provided on the Morse Code Translator & Learning Platform (referred to as the "Website," "Service," "we," "us," or "our") are provided exclusively for **general educational, informational, self-study, and recreational purposes**.

The content and tools on this Website are designed to help students, amateur radio hobbyists (ham radio operators), telegraphy historians, and puzzle enthusiasts understand the history, timing conventions, and rhythmic mechanics of International Morse Code.

---

## 2. No Emergency, Maritime, or Mission-Critical Reliance

> [!WARNING]
> **CRITICAL LIFE SAFETY NOTICE:**  
> THIS PLATFORM IS **NOT** CERTIFIED FOR MARITIME SEARCH AND RESCUE, MILITARY DEFENSE DISPATCH, AVIATION RADIO NAVIGATION, EMERGENCY CALLING, PUBLIC SAFETY RESPONSE, OR CRITICAL LIFE-SAFETY COMMUNICATIONS.

1. **Distress Signals (SOS):** While our documentation accurately describes the historical international distress prosign **SOS** (`... --- ...`), this Website is not connected to any emergency dispatch infrastructure, coast guard monitoring center, or 911/112 public safety answering point (PSAP).
2. **Never Rely on This Tool in Emergencies:** In any real-world emergency, distress situation, maritime crisis, or medical event, you must immediately contact local emergency services using certified communication channels (e.g., VHF Marine Radio Channel 16, 911, 112, 999, satellite distress beacons / EPIRB, or standard telephone service).
3. **No Safety-of-Life Warranty:** We disclaim all liability for any loss of life, personal injury, property damage, rescue delay, or operational casualty resulting from reliance upon this Website or its outputs during an emergency or perilous situation.

---

## 3. Translation Limitations & Character Support

### 3.1 Standard ITU-R M.1677-1 Catalog
Our translation engine strictly adheres to the standard Latin-based International Morse Code specification codified under Recommendation ITU-R M.1677-1:
- 26 basic Latin letters (A–Z).
- 10 Arabic digits (0–9).
- 18 standard punctuation marks and prosigns (period, comma, colon, question mark, apostrophe, hyphen, fraction bar, parentheses, quotation marks, equals sign, addition sign, multiplication cross, at-sign, etc.).

### 3.2 Unsupported Characters & Diacritics
- **Non-Latin Alphabets:** International Morse Code as implemented here does not natively encode non-Latin scripts (such as Cyrillic, Greek, Arabic, Hebrew, Devanagari, or East Asian characters).
- **Accented Letters:** Accented Latin characters (such as `é`, `ñ`, `ü`, `ç`) are not standardized in the universal 54-symbol ITU-R catalog and are flagged by our diagnostic engine.
- **Visual Diagnostics:** When unsupported characters are detected in your text input, our engine highlights their position and alerts you. In decoded output, unrecognized Morse sequences are safely substituted with a non-blocking `[?]` fallback symbol.
- **Case Neutrality:** Morse code does not preserve letter capitalization. Text converted to Morse code and decoded back to English will be standardized without case distinction.

---

## 4. Audio Playback & Acoustic Timing Limitations

### 4.1 PARIS Standard Calibration
Our Web Audio engine synthesizes audio tones based upon the international reference word **PARIS** (50 total unit intervals):
$$\text{Dot Duration } (T) = \frac{1200}{\text{WPM}} \text{ milliseconds}$$
- Dot (Dit) = $1T$
- Dash (Dah) = $3T$
- Intra-character space = $1T$
- Inter-letter space = $3T$
- Inter-word space = $7T$

### 4.2 Browser & Hardware Timing Variance
Although our Web Audio scheduler uses hardware-clock timestamps (`AudioContext.currentTime`) to ensure millisecond-accurate tone duration:
- High system CPU load, device power-saving modes, background tab throttling, or operating system audio buffer latencies may introduce subtle acoustic jitter.
- The visual light beacon is rendered using the browser's graphical animation subsystem (`requestAnimationFrame`), which may vary slightly from real-time audio on low-refresh displays or when device battery-saver mode is active.

---

## 5. Audio File Decoder Limitations (`/audio-decoder`)

Our audio file decoder employs digital signal processing algorithms (including Root-Mean-Square energy envelope calculation, adaptive noise thresholds, and pitch estimation) to transcribe Morse code recordings into text directly within your web browser.

### Important Acoustic Variables Affecting Accuracy
Audio transcription accuracy varies dramatically based on real-world recording conditions. We do not guarantee accurate transcription when audio contains:
1. **Background Noise & Low SNR:** Low signal-to-noise ratios, wind noise, engine rumble, white noise, static, or electrical hum.
2. **Reverberation & Room Echo:** Echoes and reverberant room acoustics that blur the distinct silences between dots and dashes.
3. **Speed Inconsistency ("Fist" Variations):** Morse transmitted with human "swing", uneven rhythmic spacing, or fluctuating WPM speeds.
4. **Frequency Drift & Multiple Tones:** Audio files containing multiple concurrent tones, chordal harmonics, voice interference, or frequency drifting.
5. **Lossy Compression Artifacts:** Heavily compressed MP3, OGG, or WebM files with low bitrates that smudge high-frequency transient tone edges.

For highest accuracy, audio recordings should feature a single, clear, steady tone (between 500 Hz and 800 Hz) with a clean signal-to-noise ratio and consistent rhythm.

---

## 6. User Verification Responsibility

**You are solely responsible for verifying the accuracy of any critical text or Morse code sequences.**

If you intend to use Morse code for amateur radio transmission, examination preparation, educational instruction, historical archiving, public performances, or physical signage, you must independently cross-reference the output against primary reference documentation and manual inspection.

---

## 7. No Professional, Legal, or Certified Advice

The informational content on this Website:
- Does **not** constitute licensed legal, nautical, aeronautical, military, or telecommunications engineering advice.
- Does **not** replace formal training or certified study courses required for official amateur radio licenses (such as FCC, OFCOM, or ITU radio operator licenses).
- Does **not** guarantee passing any official amateur radio licensing exam, continuous wave proficiency test, or academic assessment.

---

## 8. Service Availability & Network Operations

We endeavor to maintain high website availability and clean performance:
- However, we do not warrant that access to the Website will be continuous, uninterrupted, defect-free, or entirely secure.
- We are not responsible for technical malfunctions of your device, hardware sound card issues, operating system audio permission blocks, web browser incompatibility, or internet service provider outages.

---

## 9. Contact for Clarification

If you require technical clarification regarding our algorithms, ITU-R M.1677-1 standard compliance, or the disclosures contained within this Disclaimer, please contact:

- **Entity / Project:** `[WEBSITE OPERATOR / LEGAL ENTITY NAME]`
- **Email:** `morecodetranslator@gmail.com`
- **Mailing Address:** `[PHYSICAL / MAILING ADDRESS]`
- **Official Website:** `https://morsecodetranslatores.com/`

