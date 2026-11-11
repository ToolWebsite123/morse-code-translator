# Audio Decoder Content Draft (V1)
## Route: `/audio-decoder`

**Document Version:** 1.0  
**Status:** Approved for Implementation  
**Primary Keyword:** morse code audio decoder  
**Secondary Keywords:** morse code audio converter, morse code audio translator, decode morse code audio, sound to morse code translator

---

## 1. Page Header & Hero Section

### Metadata
- **Title Tag:** `Morse Code Audio File Decoder | Morse Code Platform` (51 chars rendered)
- **Meta Description:** `Upload and decode Morse code audio files into plain text. Free browser-local analyzer supporting WAV, MP3, OGG, and WebM with speed and pitch detection.` (154 chars)
- **Canonical URL:** `/audio-decoder` (relative)

### Hero Copy
- **Breadcrumb:** `Home / Audio Decoder`
- **Telemetry Badge:** `Acoustic Signal Analyzer • Browser-Local Web Audio`
- **H1:** `Morse Code Audio File Decoder & Converter`
- **Introductory Paragraph:**  
  *Upload an audio recording of Morse code beeps to transcribe acoustic signals into written dots and dashes and plain English text. Our browser-local analyzer detects tone frequency, measures transmission speed in Words Per Minute (WPM), and decodes characters directly on your device without sending audio files to any external server.*

---

## 2. Interactive Tool Section (Above the Fold)
*(Embedded `AudioDecoderClient` with drag-and-drop dropzone, audio player preview, detected WPM, detected frequency, confidence percentage, Morse output, and text output).*

---

## 3. Section 1: How the Morse Code Audio Decoder Works

### Heading (H2):
`How the Morse Code Audio Decoder Works`

### Content:
Our **morse code audio decoder** converts audible telegraph beeps into readable text through client-side digital signal processing. When you select an audio file, your browser's native **HTML5 Web Audio API** decodes the raw audio container into an uncompressed PCM `AudioBuffer`. 

The decoding engine processes the primary audio channel entirely within your browser's local memory. It performs four continuous signal processing operations:
1. **Pitch Estimation:** Determines the dominant carrier frequency of the Morse tone (typically between 400 Hz and 800 Hz).
2. **Envelope Segmentation:** Samples signal energy across 10-millisecond time slices to distinguish active audio beeps from background silence.
3. **Timing Clustering:** Measures the duration of tone bursts and silent intervals against the International PARIS standard to differentiate dots, dashes, letter spaces, and word pauses.
4. **Character Translation:** Passes the reconstructed sequence of dots and dashes to our deterministic Morse engine, producing verified English sentences and reporting diagnostic warnings for unrecognized patterns.

Because all audio processing occurs directly on your computer or smartphone, your audio recordings are never transmitted over the internet or stored on an external server.

---

## 4. Section 2: How Audio Signals Are Converted into Morse Code

### Heading (H2):
`How Audio Signals Are Converted into Morse Code`

### Content:
Converting an acoustic audio recording into structured alphanumeric characters requires bridging analog sound waves and digital discrete symbols. The decoding pipeline follows a deterministic four-stage signal processing chain:

```
[ Audio File (WAV/MP3) ]
          │
          ▼
1. Web Audio Decoding ──► Uncompressed PCM AudioBuffer (Sample Rate: 44.1/48 kHz)
          │
          ▼
2. Frequency & Energy  ──► Zero-Crossing Pitch Check (300–1200 Hz) + 10ms RMS Envelope
          │
          ▼
3. PARIS Timing Model  ──► Dynamic Thresholding: Unit Dot (T), Dash (3T), Gaps (1T, 3T, 7T)
          │
          ▼
4. Symbolic Decoding   ──► Dot/Dash Clustering ──► International Morse Table ──► Plain Text
```

#### The Four Stages of Conversion:
1. **Container Demuxing:** The browser unpacks the audio file container (such as `.wav`, `.mp3`, or `.ogg`) and decompresses the stream into linear floating-point amplitude samples.
2. **Acoustic Energy Profiling:** Rather than analyzing complex harmonics, the engine calculates the Root-Mean-Square (RMS) amplitude across consecutive 10ms windows to produce a smooth energy envelope.
3. **State Transition Detection:** The analyzer registers state changes where energy crosses an adaptive threshold, recording the exact duration of each tone state (`isTone = true`) and silence state (`isTone = false`).
4. **Symbolic Assembly:** Tone durations are matched against statistical clusters representing short elements (dots) and long elements (dashes), while silence durations determine character and word boundaries.

---

## 5. Section 3: The Audio Decoding Process — Tone Detection, Timing & Clustering

### Heading (H2):
`The Audio Decoding Process: Tone Detection, Timing Analysis & Clustering`

### Content:
Understanding the mathematical rules behind digital CW (Continuous Wave) decoding clarifies how acoustic sound becomes written text.

### Heading (H3):
`1. Dominant Pitch & Carrier Frequency Estimation`
In radio telegraphy, Morse code is transmitted as an interrupted audio carrier tone—commonly pitched between 500 Hz and 800 Hz. The analyzer scans high-energy regions of the audio buffer using a zero-crossing frequency estimator within the 300 Hz to 1200 Hz spectrum:

$$\text{Frequency (Hz)} = \frac{\text{Zero Crossings} / 2}{\text{Active Duration (Seconds)}}$$

Identifying the carrier pitch allows the system to verify that the audio contains intentional tonal signaling rather than non-tonal background noise.

### Heading (H3):
`2. Dynamic RMS Envelope & Adaptive Thresholding`
Real-world audio recordings often feature varying volume levels, microphone distance changes, and ambient hiss. A rigid volume threshold would clip quiet beeps or register noise as signal. 

To prevent this, the engine calculates an adaptive decision threshold based on the minimum and maximum RMS energy detected across the recording:

$$\text{Threshold} = \text{Min Energy} + (\text{Max Energy} - \text{Min Energy}) \times 0.35$$

Any 10ms audio window with energy exceeding this threshold is categorized as an active Morse tone, while windows below the threshold are registered as silence.

### Heading (H3):
`3. Duration Clustering & PARIS Timing Standard`
International Morse Code (Recommendation ITU-R M.1677-1) governs pulse timing using strict mathematical ratios calibrated to the standard word **"PARIS"**:
- **Dot ($\cdot$):** 1 basic unit of time ($1T$).
- **Dash (—):** Exactly 3 units of time ($3T$).
- **Intra-Character Space:** 1 unit of silence ($1T$) between dots and dashes in the same letter.
- **Inter-Character Space:** 3 units of silence ($3T$) between letters.
- **Word Space:** Standard 7 units of silence ($7T$) between words.

The decoder determines the baseline unit duration ($T$) by analyzing the median duration of the shortest tone pulses. It then establishes dynamic decision boundaries:
- **Tones shorter than $2T$** $\rightarrow$ Transcribed as a Dot (`.`)
- **Tones equal to or longer than $2T$** $\rightarrow$ Transcribed as a Dash (`-`)
- **Silences between $2T$ and $5T$** $\rightarrow$ Transcribed as a letter space (` `)
- **Silences equal to or longer than $5T$** $\rightarrow$ Transcribed as a word separator (` / `)

Transmission speed in Words Per Minute (WPM) is then computed as:
$$\text{WPM} = \frac{1200}{T\text{ (milliseconds)}}$$

---

## 6. Section 4: Supported Audio Formats and Operating Limits

### Heading (H2):
`Supported Audio Formats and Operating Specifications`

### Content:
To ensure stable and responsive in-browser performance, the audio decoder enforces clear file boundary limits:

| Specification Parameter | System Value | Technical Rationale & Guidance |
| :--- | :--- | :--- |
| **Supported File Formats** | WAV, MP3, OGG, WebM, FLAC, M4A | Decoded natively via browser HTML5 Web Audio codecs. Clean uncompressed `.wav` files deliver the highest timing precision. |
| **Maximum File Size** | 10 MB | Prevents browser memory exhaustion and UI freezing during array buffer allocation. |
| **Maximum Audio Duration**| 120 Seconds (2 Minutes) | Optimizes sliding-window RMS computation while supporting typical telegraph messages, callsigns, and training drills. |
| **Supported Speed Range** | 5 to 35 WPM | Covers standard slow training transmissions up to rapid amateur radio CW speeds. |
| **Pitch Detection Spectrum**| 300 Hz to 1200 Hz | Encompasses standard Morse sidetone frequencies (default 600 Hz). |
| **Channel Processing** | Mono / Primary Channel | Stereo recordings are processed using the primary audio channel (Channel 0). |
| **Network & Privacy** | 100% Client-Side | Audio files remain strictly in local browser memory. No audio bytes are uploaded to remote servers. |

---

## 7. Section 5: How to Get Better Decoding Results

### Heading (H2):
`How to Get Better Decoding Results`

### Content:
Acoustic Morse decoding relies on clean signal-to-noise ratios and consistent element timing. If your audio file fails to decode accurately or shows low confidence, apply these four audio preparation guidelines:

1. **Use a Single, Steady Tone Frequency:**
   Morse decoders expect a consistent carrier frequency (such as a 600 Hz sine wave). Avoid audio clips where the tone shifts pitch, slides, or incorporates musical chords.
2. **Minimize Background Noise and Static:**
   While the adaptive threshold compensates for mild room ambiance, loud background speech, air conditioner hum, or radio atmospheric static (QRN) can bridge the silence between dots and dashes, causing letters to merge.
3. **Prevent Microphone Clipping and Distortion:**
   Extremely loud recordings can overdrive the microphone, creating harmonic distortion and square-wave clipping that confuses frequency estimation. Record at moderate input volumes where the waveform does not flatline.
4. **Maintain Standard PARIS Keying Ratios:**
   Transmissions keyed by an electronic keyer or computer generator decode with near-perfect accuracy because their dot-to-dash ratios are exactly 1:3. Hand-keyed straight key recordings with significant operator "swing" (irregular dot or dash lengths) may require cleaner re-recording.

---

## 8. Section 6: Common Audio Decoding Problems and Solutions

### Heading (H2):
`Common Audio Decoding Problems and How to Solve Them`

### Content:

#### 1. Polyphonic Sounds or Vocal Whistling
- **The Issue:** Attempting to decode someone whistling Morse code or recording over background music. Whistled tones naturally fluctuate in pitch and produce variable breath noise.
- **The Solution:** Use an electronic tone generator (such as our [Homepage Morse Translator](/) audio player) or record clean sidetone audio directly from an oscillator or radio transceiver.

#### 2. Letters Merged into Unrecognized Symbols
- **The Issue:** The decoder displays warning indicators for unrecognized character groups (such as `..--.` or `---.-`).
- **The Solution:** This usually indicates that the pauses between letters were shorter than the required 3-unit duration ($3T$), leading the analyzer to interpret two separate letters as one invalid character. Ensure distinct pauses between letters.

#### 3. Missed Words and Squeezed Spaces
- **The Issue:** Multiple words are decoded into one long unbroken string without word breaks.
- **The Solution:** The inter-word silence must equal or exceed 5 to 7 timing units ($5T$ to $7T$). In fast recordings, if the operator pauses only briefly between words, the system classifies the gap as a letter pause.

#### 4. File Size or Duration Error
- **The Issue:** The upload rejects the file with an error message indicating the file exceeds 10 MB or 120 seconds.
- **The Solution:** Trim the recording using a simple audio editor (e.g., Audacity) to isolate the active Morse code segment before uploading.

---

## 9. Section 7: Audio Decoder vs. Text Morse Code Translator

### Heading (H2):
`Audio Decoder vs. Text Morse Code Translator`

### Content:
While both utilities produce English text, they serve fundamentally different stages of Morse code communication:

| Dimension | Morse Audio File Decoder (`/audio-decoder`) | Text Morse Code Translator (`/`) |
| :--- | :--- | :--- |
| **Input Source** | Recorded acoustic sound files (`.wav`, `.mp3`, `.ogg`) | Typed Latin characters or written dots and dashes (`.`, `-`) |
| **Primary Challenge** | Acoustic signal analysis, carrier pitch detection, and noise filtering | Exact dictionary mapping and syntax validation |
| **Timing Sensitivity** | Highly sensitive to physical pulse length, tempo drift, and pause ratios | Insensitive to audio timing; evaluates visual spacing characters |
| **Speed Detection** | Automatically calculates transmission speed (WPM) from pulse statistics | Speed is user-selected via the audio player controls (5–30 WPM) |
| **Primary Use Case** | Transcribing recorded shortwave transmissions, CTF challenge audio, and sound clips | Composing Morse messages, translating homework, and studying character patterns |
| **Audio Playback** | Previews the uploaded source audio file | Synthesizes custom Morse code audio tones in real time via Web Audio API |

---

## 10. Section 8: Frequently Asked Questions (FAQ)

### Heading (H2):
`Frequently Asked Questions About Morse Audio Decoding`

### Question 1:
**What audio file formats can I decode with this tool?**
> You can decode standard audio file formats including WAV (`.wav`), MP3 (`.mpeg`, `.mp3`), OGG (`.ogg`), and WebM (`.webm`). Uncompressed WAV files provide the highest timing accuracy because they contain raw PCM samples without compression artifacts.

### Question 2:
**Are my uploaded audio files sent to or stored on an external server?**
> No. All audio decoding and signal processing occurs entirely within your web browser using the HTML5 Web Audio API. Zero audio bytes, recordings, or transcribed text strings are transmitted over the internet or saved on an external server.

### Question 3:
**What is the maximum file size and audio length allowed?**
> The decoder supports audio files up to 10 MB in file size and up to 120 seconds (2 minutes) in duration. Limiting the duration prevents browser memory strain and ensures instant, responsive analysis.

### Question 4:
**Why did the decoder report low confidence or unrecognized symbols?**
> Low confidence occurs when the audio recording contains background static, volume fluctuations, echo, or irregular element lengths. If the pause between letters is too short, the decoder may combine adjacent letters into an invalid sequence.

### Question 5:
**Can I decode audio directly from my computer or phone microphone?**
> Yes. Our platform includes an optional Live Microphone Decoder tab that listens to ambient room audio through your device's microphone, using real-time bandpass filtering to decode live Morse beeps as they play.

### Question 6:
**How does this web decoder compare to specialized amateur radio software?**
> Specialized desktop programs like fldigi or CW Skimmer use advanced multi-channel narrow-band DSP filters designed for high-frequency radio contests under severe noise. Our web tool is an accessible, zero-install utility designed for transcribing clean CW recordings, learning clips, and challenge files directly in any modern browser.

---

## 11. Section 9: Related Morse Code Tools & Educational Resources

### Heading (H2):
`Explore Related Morse Code Tools`

### Content:
Expand your Morse code knowledge and practice with our suite of free, browser-local educational utilities:
- **[Morse Code Translator](/)** — Instant bidirectional text-to-Morse and Morse-to-text translation with custom speed and pitch audio synthesis.
- **[Interactive Practice Drills](/practice)** — Train your ear with audio tone drills, flashcards, and accuracy-based weak character focus.
- **[Morse Code Alphabet Reference](/reference)** — Complete ITU-R M.1677-1 reference chart for all 54 letters, numbers, and punctuation symbols.
- **[10-Lesson Beginner Course](/learn)** — Step-by-step curriculum teaching Morse fundamentals, rhythm, and timing rules from scratch.
- **[Standardized Knowledge Quiz](/quiz)** — Test your Morse recall and auditory transcription skills with 10 random assessment questions.

