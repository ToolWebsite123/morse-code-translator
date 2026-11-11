# Audio Decoder SEO Content Strategy & Architecture
## Route: `/audio-decoder`

**Document Version:** 1.0  
**Target Route:** `/audio-decoder`  
**Primary Keyword:** morse code audio decoder (and morse code audio converter)  
**Secondary Keywords:** morse code audio translator, morse code translator from audio, sound to morse code translator, audio morse code translator, decode morse code audio  
**Search Intent:** Transactional / Utility & Technical Informational  
**Canonical Path:** `/audio-decoder` (relative, resolves dynamically with `metadataBase`)

---

## 1. Search Intent & Audience Analysis

### 1.1. User Types & Intent Profiles
1. **Amateur Radio Operators (HAM) & SWL Listeners:** Have recorded CW audio transmissions from shortwave receivers and want to transcribe the callsigns or messages into readable text.
2. **Students & Puzzle Solvers (CTF / Geocaching):** Have an audio file (e.g. `.wav` or `.mp3`) containing Morse code beeps and need an instant, reliable transcription tool without installing native software like fldigi.
3. **Audio Engineers & Hobbyists:** Want to understand how acoustic signals are converted into digital Morse symbols, what audio conditions produce high-accuracy decoding, and why noisy recordings fail.

### 1.2. Intent Fulfillment Criteria
To fully satisfy this search intent, the page must provide:
- An immediate, accessible, browser-local upload tool at the top of the page.
- Clear technical boundaries (formats, max file size, duration limit).
- Deep, educational, and accurate documentation explaining the signal processing steps.
- Practical troubleshooting advice for audio with background noise or uneven keying.
- FAQ addressing real user concerns (privacy, polyphonic audio, microphone vs. file).
- Internal links connecting the decoder to the translator, learning hub, practice drills, and reference chart.

---

## 2. Strict Technical Accuracy Guardrails

All content must align with the actual code in [`src/lib/audio/audioDecoder.ts`](file:///d:/Project/Morse%20Code%20Translator%20Website/src/lib/audio/audioDecoder.ts) and [`src/components/decoder/AudioDecoderClient.tsx`](file:///d:/Project/Morse%20Code%20Translator%20Website/src/components/decoder/AudioDecoderClient.tsx):

| Technical Specification | Verified Code Value | Strict Content Rule |
| :--- | :--- | :--- |
| **Supported File Formats** | WAV, MP3, OGG, WebM, FLAC, M4A | Explicitly state supported formats; emphasize standard uncompressed WAV or clean MP3 for optimal results. |
| **Maximum File Size** | 10 MB (`MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024`) | Do not claim unlimited file uploads. State the 10 MB limit clearly. |
| **Maximum Duration** | 120 seconds (`MAX_DURATION_SECONDS = 120`) | State the 2-minute limit clearly. |
| **Audio Processing Location**| Browser-local Web Audio API (`AudioContext.decodeAudioData`) | Factual privacy wording: audio files are processed locally in browser memory and are not uploaded to any remote server. Avoid "100% private" or absolute security claims. |
| **Pitch Detection Range** | 300 Hz to 1200 Hz via zero-crossing rate | Explain the dominant tone frequency detection algorithm accurately. |
| **Envelope Analysis** | Sliding RMS energy window in 10ms steps | Detail the 10ms energy sampling window and adaptive thresholding. |
| **Timing Standard** | PARIS standard: $T = 1200 / \text{WPM}$ | Detail the 5–35 WPM range and unit dot duration calculation. |
| **Clustering Thresholds** | Dot $< 2T$, Dash $\ge 2T$; Char Gap $2T$–$5T$, Word Gap $\ge 5T$ | Explain how duration clustering distinguishes dots from dashes and spaces. |

---

## 3. Page Structure & 9 Required Content Sections

The `/audio-decoder` page will follow this approved structure:

1. **Interactive Tool Station (Above the Fold):**
   - Breadcrumb navigation (`Home / Audio Decoder`)
   - Telemetry badge: `Acoustic Signal Analyzer • Browser-Local Web Audio`
   - Page H1: `Morse Code Audio File Decoder & Converter`
   - Compact introductory description
   - `AudioDecoderClient` interactive dropzone with immediate file feedback, audio player preview, detected WPM, detected frequency, confidence percentage, Morse string, and translated text.
2. **Section 1: How the Morse Code Audio Decoder Works:**
   - Architectural overview of in-browser acoustic decoding via Web Audio API.
   - Flow of audio data: File Input $\rightarrow$ AudioBuffer decoding $\rightarrow$ Signal analysis $\rightarrow$ Morse transcription $\rightarrow$ English text.
3. **Section 2: How Audio Signals Are Converted into Morse Code:**
   - Visual step-by-step pipeline card: Analog sound waves to digital amplitude envelopes, tone segmentation, and symbol mapping.
4. **Section 3: Audio Decoding Process — Tone Detection, Timing & Clustering:**
   - Three core algorithms:
     - Pitch & Tone Detection: Zero-crossing rate within 300–1200 Hz.
     - Energy Envelope Calculation: 10ms sliding RMS window with dynamic Otsu-like adaptive thresholding.
     - PARIS Timing & Duration Clustering: Calculating unit dot duration ($T$), classifying short pulses ($< 2T$) as dots and long pulses ($\ge 2T$) as dashes.
5. **Section 4: Supported Audio Formats and Operating Limits:**
   - Comprehensive specifications table: File types (WAV, MP3, OGG, WebM), 10 MB size limit, 120s duration, single-channel analysis, speed range (5–35 WPM).
6. **Section 5: How to Get Better Decoding Results:**
   - 4 actionable audio preparation tips: Single continuous tone frequency, minimal background noise, balanced volume levels, and standardized telegraph keying rhythm.
7. **Section 6: Common Audio Decoding Problems and Solutions:**
   - Analysis of real-world decoding hurdles: Multi-tone/polyphonic audio, vocal whistling, noisy radio static, and variable hand-keying swing.
8. **Section 7: Audio Decoder vs. Text Morse Code Translator:**
   - Comparative analysis table contrasting acoustic audio decoding with symbolic text translation across input types, timing variance, noise tolerance, and optimal use cases.
9. **Section 8: Frequently Asked Questions (FAQ):**
   - 6 high-value questions with verbatim JSON-LD FAQPage schema parity:
     - What audio file formats can I decode?
     - Are my uploaded audio files sent to an external server?
     - What is the maximum audio length and file size?
     - Why did the decoder report low confidence or unrecognized symbols?
     - Can the tool decode microphone audio directly?
     - What is the difference between this tool and amateur radio software?
10. **Section 9: Related Morse Code Tools & Cross-Links:**
    - Actionable links to Translator (`/`), Reference Chart (`/reference`), Practice Drills (`/practice`), Quiz (`/quiz`), and Learn Hub (`/learn`).

---

## 4. SEO Metadata Specifications

- **Page Title:** `Morse Code Audio File Decoder | Morse Code Platform` (51 chars rendered)
- **Meta Description:** `Upload and decode Morse code audio files into plain text. Free browser-local analyzer supporting WAV, MP3, OGG, and WebM with speed and pitch detection.` (154 chars)
- **H1:** `Morse Code Audio File Decoder & Converter`
- **Canonical URL:** `/audio-decoder` (relative)
- **Structured Data:** `SoftwareApplication` + `FAQPage` + `BreadcrumbList`

