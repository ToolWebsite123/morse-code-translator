import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { AudioDecoderClient } from '@/components/decoder/AudioDecoderClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Morse Code Audio File Decoder',
  description:
    'Decode Morse code audio into text online. Upload WAV, MP3, or OGG recordings to transcribe audio beeps into English text with 100% browser privacy.',
  alternates: {
    canonical: '/audio-decoder',
  },
  openGraph: {
    title: 'Morse Code Audio File Decoder',
    description:
      'Decode Morse code audio into text online. Upload WAV, MP3, or OGG recordings to transcribe audio beeps into English text with 100% browser privacy.',
    url: getAbsoluteUrl('/audio-decoder'),
    siteName: 'Morse Code Platform',
    type: 'website',
  },
};

interface AudioFaqItem {
  question: string;
  answer: string;
}

const AUDIO_DECODER_FAQS: readonly AudioFaqItem[] = [
  {
    question: 'What audio file formats can I decode with this tool?',
    answer:
      'You can decode standard audio file formats including WAV (.wav), MP3 (.mpeg, .mp3), OGG (.ogg), and WebM (.webm). Uncompressed WAV files provide the highest timing accuracy because they contain raw PCM samples without compression artifacts.',
  },
  {
    question: 'Are my uploaded audio files sent to or stored on an external server?',
    answer:
      'No. All audio decoding and signal processing occurs entirely within your web browser using the HTML5 Web Audio API. Zero audio bytes, recordings, or transcribed text strings are transmitted over the internet or saved on an external server.',
  },
  {
    question: 'What is the maximum file size and audio length allowed?',
    answer:
      'The decoder supports audio files up to 10 MB in file size and up to 120 seconds (2 minutes) in duration. Limiting the duration prevents browser memory strain and ensures instant, responsive analysis.',
  },
  {
    question: 'Why did the decoder report low confidence or unrecognized symbols?',
    answer:
      'Low confidence occurs when the audio recording contains background static, volume fluctuations, echo, or irregular element lengths. If the pause between letters is too short, the decoder may combine adjacent letters into an invalid sequence.',
  },
  {
    question: 'Can I decode audio directly from my computer or phone microphone?',
    answer:
      "Yes. Our platform includes an optional Live Microphone Decoder tab that listens to ambient room audio through your device's microphone, using real-time bandpass filtering to decode live Morse beeps as they play.",
  },
  {
    question: 'How does this web decoder compare to specialized amateur radio software?',
    answer:
      'Specialized desktop programs like fldigi or CW Skimmer use advanced multi-channel narrow-band DSP filters designed for high-frequency radio contests under severe noise. Our web tool is an accessible, zero-install utility designed for transcribing clean CW recordings, learning clips, and challenge files directly in any modern browser.',
  },
];

interface SpecRow {
  param: string;
  value: string;
  guidance: string;
}

const SPEC_ROWS: readonly SpecRow[] = [
  {
    param: 'Supported File Formats',
    value: 'WAV, MP3, OGG, WebM, FLAC, M4A',
    guidance: 'Decoded natively via HTML5 Web Audio API. Clean uncompressed .wav files deliver the highest timing precision.',
  },
  {
    param: 'Maximum File Size',
    value: '10 MB',
    guidance: 'Enforces safe in-browser array buffer allocation without page lag or memory exhaustion.',
  },
  {
    param: 'Maximum Audio Duration',
    value: '120 Seconds (2 Minutes)',
    guidance: 'Optimizes sliding-window RMS computation while accommodating standard telegraph transmissions and drills.',
  },
  {
    param: 'Detected Speed Range',
    value: '5 to 35 WPM',
    guidance: 'Calibrated to the international PARIS standard to accommodate both slow practice beeps and fast CW signals.',
  },
  {
    param: 'Pitch Detection Spectrum',
    value: '300 Hz to 1200 Hz',
    guidance: 'Zero-crossing rate frequency estimator accurately identifies standard telegraph sidetones (default 600 Hz).',
  },
  {
    param: 'Channel Processing',
    value: 'Mono / Primary Channel (0)',
    guidance: 'Multi-channel files are processed on their primary channel for maximum signal clarity.',
  },
  {
    param: 'Network & Privacy',
    value: 'Browser-Local Execution',
    guidance: 'Audio samples are analyzed in local device memory. No audio bytes or transcripts are uploaded to any server.',
  },
];

interface ComparisonRow {
  dimension: string;
  audioDecoder: string;
  textTranslator: string;
}

const COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    dimension: 'Input Source',
    audioDecoder: 'Recorded audio files (.wav, .mp3, .ogg, .webm)',
    textTranslator: 'Typed Latin characters or written dots and dashes (., -)',
  },
  {
    dimension: 'Primary Challenge',
    audioDecoder: 'Acoustic signal analysis, carrier pitch estimation & noise filtering',
    textTranslator: 'Deterministic syntax parsing and international dictionary mapping',
  },
  {
    dimension: 'Timing Sensitivity',
    audioDecoder: 'Highly sensitive to physical pulse length, tempo drift, and pause ratios',
    textTranslator: 'Insensitive to audio timing; evaluates visual spacing characters',
  },
  {
    dimension: 'Speed Detection',
    audioDecoder: 'Automatically calculates transmission speed (WPM) from pulse statistics',
    textTranslator: 'Speed is selected manually via the audio player controls (5–30 WPM)',
  },
  {
    dimension: 'Primary Use Case',
    audioDecoder: 'Transcribing recorded radio transmissions, CTF challenges & audio clips',
    textTranslator: 'Composing Morse messages, translating homework & studying letter patterns',
  },
  {
    dimension: 'Audio Capability',
    audioDecoder: 'Previews and analyzes the uploaded source audio recording',
    textTranslator: 'Synthesizes clean sine wave Morse code tones via Web Audio API',
  },
];

export default function AudioDecoderPage() {
  const audioSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Morse Code Audio File Decoder',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All modern web browsers',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Acoustic signal analyzer that transcribes Morse code audio files into plain text locally inside the web browser.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getAbsoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Audio Decoder',
          item: getAbsoluteUrl('/audio-decoder'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: AUDIO_DECODER_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={audioSchemas} />
      <Header />

      {/* Atmospheric Background Glow & Engineering Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] overflow-hidden"
      >
        <div className="bg-grid mask-fade absolute inset-0 opacity-60" />
        <div className="absolute -top-32 left-1/2 h-[480px] w-[64rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-teal-500/15 via-emerald-500/10 to-transparent blur-3xl dark:from-teal-400/15 dark:via-emerald-400/8 dark:to-transparent" />
        <div className="absolute top-36 left-1/4 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-400/8" />
        <div className="absolute top-24 right-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-400/8" />
      </div>

      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 pt-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        {/* Centered Breadcrumb Pill */}
        <nav aria-label="Breadcrumb" className="mb-4 flex justify-center">
          <ol className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1 text-xs text-slate-500 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <li>
              <Link href="/" className="transition-colors hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              Audio Decoder
            </li>
          </ol>
        </nav>

        {/* =========================================================================
            TOOL STATION: AUDIO DECODER DROPZONE & RESULTS (PROMINENT AT TOP)
            ========================================================================= */}
        <section aria-label="Morse Code Audio File Upload and Transcription Station">
          <AudioDecoderClient />
        </section>

        {/* =========================================================================
            SECTION 1: HOW THE MORSE CODE AUDIO DECODER WORKS
            ========================================================================= */}
        <section
          id="how-it-works"
          aria-label="How the Morse code audio decoder works"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Architecture &bull; Digital Signal Processing
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              How the Morse Code Audio Decoder Works
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Our <strong>morse code audio decoder</strong> converts audible telegraph beeps into readable text through client-side digital signal processing. When you upload an audio file, your browser&apos;s native <strong>HTML5 Web Audio API</strong> decodes the raw audio container into an uncompressed PCM AudioBuffer.
            </p>
          </div>

          <div className="mt-10 grid gap-4 grid-cols-1">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">01.</span>Pitch Estimation &amp; Carrier Detection
                </strong>
                <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                  Carrier Analysis
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Measures the dominant carrier frequency of the Morse audio tone across active segments within the 300 Hz to 1200 Hz spectrum using zero-crossing analysis.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">02.</span>Envelope Segmentation &amp; Energy Profiling
                </strong>
                <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                  RMS Windows
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Samples Root-Mean-Square (RMS) amplitude energy in consecutive 10ms sliding time windows to clearly distinguish active tone bursts from background silence.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">03.</span>PARIS Clustering &amp; Timing Analysis
                </strong>
                <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                  ITU-R Ratios
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Clusters pulse durations into dots and dashes and analyzes silence intervals to detect character spaces and word boundaries calibrated to standard PARIS timing.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">04.</span>Character Translation &amp; Confidence Scoring
                </strong>
                <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                  Deterministic
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Passes the reconstructed Morse sequence to our deterministic engine to output plain English text while scoring confidence based on valid recognized characters.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: HOW AUDIO SIGNALS ARE CONVERTED INTO MORSE CODE (PIPELINE)
            ========================================================================= */}
        <section
          id="conversion-process"
          aria-label="How audio signals are converted into Morse code"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Signal Pipeline &bull; Analog to Digital
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              How Audio Signals Are Converted into Morse Code
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Bridging continuous acoustic sound waves into discrete digital characters requires a deterministic four-stage conversion chain:
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-xs dark:border-slate-800 dark:bg-slate-900/95">
            <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/60">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Acoustic Signal Processing Chain
              </h3>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid gap-4 grid-cols-1">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                      <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Stage 1.</span>Audio Ingestion &amp; PCM Decoding
                    </strong>
                    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                      44.1 / 48 kHz
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                    File container (.wav, .mp3, .ogg, .webm) is unpacked into floating-point PCM samples at native sample rate (44.1 kHz / 48 kHz).
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                      <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Stage 2.</span>Energy Profiling &amp; Micro-Click Filtering
                    </strong>
                    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                      10ms RMS
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                    10ms RMS windowing computes smooth amplitude envelopes to strip momentary micro-clicks while preserving real beeps.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                      <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Stage 3.</span>State Segmentation &amp; Otsu Thresholding
                    </strong>
                    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                      Duration Timestamps
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                    Adaptive Otsu-like thresholding marks transition timestamps, logging exact durations of tone bursts and silence gaps.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                      <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Stage 4.</span>Symbolic Assembly &amp; PARIS Delimiters
                    </strong>
                    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                      1T / 3T / 7T
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                    Statistical pulse clustering maps short tones to dots, long tones to dashes, and pauses to letter/word delimiters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: AUDIO DECODING PROCESS — TONE, TIMING, CLUSTERING
            ========================================================================= */}
        <section
          id="signal-analysis"
          aria-label="Audio decoding process, tone detection, timing analysis, and dot dash identification"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Technical Analysis &bull; Signal Math
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              The Audio Decoding Process: Tone Detection, Timing &amp; Clustering
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Acoustic Morse decoding relies on mathematical timing ratios defined by International Morse Code standard Recommendation ITU-R M.1677-1.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <div className="studio-card rounded-2xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                1. Dominant Pitch &amp; Carrier Frequency Estimation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Telegraph audio is transmitted as an interrupted carrier tone pitched between 400 Hz and 800 Hz. The analyzer evaluates high-energy segments using a zero-crossing frequency estimator within the 300 Hz to 1200 Hz spectrum:
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 sm:text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                Frequency (Hz) = (Zero Crossings / 2) / (Active Window Duration in Seconds)
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Identifying the dominant tone verifies that the audio contains intentional telegraph signaling rather than non-tonal background noise.
              </p>
            </div>

            <div className="studio-card rounded-2xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                2. Dynamic RMS Envelope &amp; Adaptive Thresholding
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Audio recordings often have fluctuating volume, ambient room noise, or varying microphone gain. To prevent missed quiet beeps or noise false alarms, the analyzer applies an adaptive decision threshold across minimum and maximum detected RMS energy:
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 sm:text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                Threshold = Min Energy + (Max Energy - Min Energy) &times; 0.35
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Any 10ms window with energy exceeding this threshold is registered as an active tone, while values below are treated as silence.
              </p>
            </div>

            <div className="studio-card rounded-2xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                3. Duration Clustering &amp; PARIS Standard Timing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Under the international PARIS calibration word (50 units), all pulse and silence lengths follow strict mathematical proportions based on unit dot duration (T):
              </p>
              <ul className="mt-4 grid gap-3 text-xs sm:grid-cols-2 lg:grid-cols-3 dark:text-slate-300">
                <li className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                  <strong className="block text-slate-900 dark:text-slate-100">Dot (&bull;):</strong> 1 unit of tone (1T).
                </li>
                <li className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                  <strong className="block text-slate-900 dark:text-slate-100">Dash (&mdash;):</strong> 3 units of tone (3T).
                </li>
                <li className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                  <strong className="block text-slate-900 dark:text-slate-100">Intra-Letter Gap:</strong> 1 unit of silence (1T).
                </li>
                <li className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                  <strong className="block text-slate-900 dark:text-slate-100">Letter Pause:</strong> 3 units of silence (3T).
                </li>
                <li className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                  <strong className="block text-slate-900 dark:text-slate-100">Word Pause:</strong> 7 units of silence (7T).
                </li>
                <li className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                  <strong className="block text-slate-900 dark:text-slate-100">Speed Formula:</strong> WPM = 1200 / T (ms).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: SUPPORTED AUDIO FORMATS AND FILE LIMITS
            ========================================================================= */}
        <section
          id="supported-formats"
          aria-label="Supported audio formats and file limits"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Technical Specifications &bull; Operating Limits
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Supported Audio Formats &amp; File Limits
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Clear technical boundaries ensure rapid processing and browser stability without memory exhaustion:
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block mt-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-xs dark:border-slate-800 dark:bg-slate-900/95">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
                    <th scope="col" className="px-5 py-3.5">Parameter</th>
                    <th scope="col" className="px-5 py-3.5">System Specification</th>
                    <th scope="col" className="px-5 py-3.5">Technical Guidance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {SPEC_ROWS.map((row) => (
                    <tr key={row.param} className="table-row-hover">
                      <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-slate-100">
                        {row.param}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-teal-800 dark:text-teal-400">
                        {row.value}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                        {row.guidance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Touch-Friendly Card Grid (Visible on mobile, 0 horizontal clipping) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 md:hidden">
            {SPEC_ROWS.map((row) => (
              <div key={row.param} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  {row.param}
                </div>
                <div className="mt-1 font-mono text-xs font-bold text-teal-800 dark:text-teal-300">
                  {row.value}
                </div>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {row.guidance}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HOW TO GET BETTER DECODING RESULTS
            ========================================================================= */}
        <section
          id="tips-for-accuracy"
          aria-label="How to get better decoding results"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Optimization Guide &bull; Audio Quality
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              How to Get Better Decoding Results
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Acoustic Morse decoding relies on clean signal-to-noise ratios and consistent element timing. Follow these four practical recording guidelines:
            </p>
          </div>

          <div className="mt-10 grid gap-4 grid-cols-1">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Tip 01.</span>Use a Pure, Unchanging Audio Pitch
                </strong>
                <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                  Single Carrier
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Decoders expect a stable audio tone (such as a 600 Hz sine wave). Avoid clips where the pitch shifts, bends, or contains background music and vocal hums.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Tip 02.</span>Minimize Background Static &amp; Room Hum
                </strong>
                <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                  Noise Isolation
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                While adaptive thresholding tolerates mild ambient room noise, heavy radio static (QRN) or loud fan hum can bridge silent pauses, causing characters to merge.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Tip 03.</span>Prevent Audio Clipping &amp; Harmonic Distortion
                </strong>
                <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                  Gain Control
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Overdriven audio recordings that flatline create acoustic harmonics that disrupt frequency detection. Record at moderate volume levels where peaks remain below 0 dB.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Tip 04.</span>Maintain 1:3 Dot-to-Dash Ratio (PARIS Timing)
                </strong>
                <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                  Standard Timing
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Recordings produced with electronic keyers decode with near-perfect confidence. Hand-keyed straight key audio with irregular operator &quot;swing&quot; may produce misclassified letters.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: COMMON AUDIO DECODING PROBLEMS
            ========================================================================= */}
        <section
          id="troubleshooting"
          aria-label="Common audio decoding problems and solutions"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Troubleshooting &bull; Error Diagnosis
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Common Audio Decoding Problems &amp; Solutions
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Diagnose real-world decoding obstacles and learn how to resolve them:
            </p>
          </div>

          <div className="mt-10 grid gap-4 grid-cols-1">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Issue 01.</span>Vocal Whistling or Ambient Background Music
                </strong>
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                  Polyphonic Audio
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                <strong>Symptoms:</strong> The decoder fails to detect an active carrier pitch or outputs erratic characters. Whistled audio fluctuates naturally in frequency and creates breath wind noise.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-teal-800 dark:text-teal-300 font-medium">
                <strong>Fix:</strong> Use synthesized tones from our <Link href="/" className="underline hover:text-teal-900 dark:hover:text-teal-200">Morse Translator</Link> or record directly from an electronic sidetone generator.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Issue 02.</span>Letters Combined into Invalid Sequences
                </strong>
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                  Merged Characters
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                <strong>Symptoms:</strong> Output contains warning badges for unrecognized Morse patterns (e.g., &quot;..-.-&quot;).
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-teal-800 dark:text-teal-300 font-medium">
                <strong>Fix:</strong> The operator paused less than 3 timing units between letters. Ensure a full 3T pause between letters so the engine registers character breaks.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Issue 03.</span>Words Run Together Without Spaces
                </strong>
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                  Missing Word Spaces
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                <strong>Symptoms:</strong> Sentences are decoded into one long continuous character block without forward slashes or spaces.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-teal-800 dark:text-teal-300 font-medium">
                <strong>Fix:</strong> Word boundaries require a 7-unit silent pause. In rapid transmissions, operators must allow sufficient pause length between words.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Issue 04.</span>File Exceeds 10 MB or 120 Seconds
                </strong>
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                  Buffer Limits
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                <strong>Symptoms:</strong> Upload displays an error notice rejecting the audio clip.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-teal-800 dark:text-teal-300 font-medium">
                <strong>Fix:</strong> Use a simple audio editor (e.g., Audacity) to trim the recording to the active Morse segment before uploading.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: AUDIO DECODER VS TEXT TRANSLATOR
            ========================================================================= */}
        <section
          id="decoder-vs-translator"
          aria-label="Audio decoder vs text translator comparison"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Tool Comparison &bull; Feature Matrix
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Audio Decoder vs. Text Morse Code Translator
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              While both utilities produce English text, they serve fundamentally different stages of Morse communication:
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block mt-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-xs dark:border-slate-800 dark:bg-slate-900/95">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
                    <th scope="col" className="px-5 py-3.5">Comparison Dimension</th>
                    <th scope="col" className="px-5 py-3.5">Audio Decoder (/audio-decoder)</th>
                    <th scope="col" className="px-5 py-3.5">Text Translator (/)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.dimension} className="table-row-hover">
                      <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-slate-100">
                        {row.dimension}
                      </td>
                      <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300">
                        {row.audioDecoder}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                        {row.textTranslator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Touch-Friendly Card Grid (Visible on mobile, 0 horizontal clipping) */}
          <div className="grid grid-cols-1 gap-3.5 mt-8 md:hidden">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.dimension} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  {row.dimension}
                </div>
                <div className="mt-2 space-y-1.5 text-xs">
                  <div className="rounded-lg bg-white p-2.5 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-teal-800 dark:text-teal-300 block mb-0.5">Audio Decoder:</span>
                    <span className="text-slate-700 dark:text-slate-300">{row.audioDecoder}</span>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-400 block mb-0.5">Text Translator:</span>
                    <span className="text-slate-600 dark:text-slate-400">{row.textTranslator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FREQUENTLY ASKED QUESTIONS (ACCORDIONS)
            ========================================================================= */}
        <section
          id="faq"
          aria-label="Frequently asked questions about Morse audio decoding"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Q&amp;A &bull; Clear Answers
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Frequently Asked Questions About Audio Decoding
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Find answers to common questions about file compatibility, processing privacy, and signal analysis:
            </p>
          </div>

          <div className="mt-10 mx-auto max-w-4xl space-y-4">
            {AUDIO_DECODER_FAQS.map((faq, index) => (
              <details
                key={faq.question}
                className="accordion-card group rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-2xs backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100">
                  <span className="text-sm sm:text-base">
                    {index + 1}. {faq.question}
                  </span>
                  <span className="chevron-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-transform group-open:rotate-180 dark:border-slate-700 dark:text-slate-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3.5 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-800 dark:text-slate-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: RELATED MORSE CODE TOOLS
            ========================================================================= */}
        <section
          id="related-tools"
          aria-label="Related Morse code tools"
          className="mt-20 border-t border-slate-200/80 pt-16 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Tool Suite &bull; Exploration
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Explore Related Morse Code Tools
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Continue your Morse code journey with our suite of free, browser-local utilities:
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/"
              className="studio-card group flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
                Morse Code Translator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Instant bidirectional text-to-Morse conversion with adjustable tone speed (5–30 WPM), pitch controls, and visual light beacon.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 dark:text-teal-400">
                Open Translator &rarr;
              </span>
            </Link>

            <Link
              href="/practice"
              className="studio-card group flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
                Interactive Practice Drills
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Train your recognition speed with flashcards, audio tone playback drills, and adaptive weak-character practice.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 dark:text-teal-400">
                Start Practice &rarr;
              </span>
            </Link>

            <Link
              href="/reference"
              className="studio-card group flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
                Alphabet Reference Chart
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Look up all 54 official International Morse Code characters: letters, numbers, and punctuation with rhythmic guides.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 dark:text-teal-400">
                View Reference &rarr;
              </span>
            </Link>

            <Link
              href="/learn"
              className="studio-card group flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
                10-Lesson Beginner Course
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Step-by-step curriculum teaching Morse code from single-element letters to full sentences and audio rhythm.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 dark:text-teal-400">
                Start Learning &rarr;
              </span>
            </Link>

            <Link
              href="/quiz"
              className="studio-card group flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
                Knowledge Quiz
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Assess your retention with 10 randomized evaluation questions covering timing rules, alphabet letters, and audio listening.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 dark:text-teal-400">
                Take Quiz &rarr;
              </span>
            </Link>

            <Link
              href="/practice"
              className="studio-card group flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
                Practice Drills
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Train your speed and character recall with interactive flashcard drills, audio feedback, and error focus.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 dark:text-teal-400">
                Start Drills &rarr;
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
