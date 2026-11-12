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
    canonical: '/morse-code-audio-decoder',
  },
  openGraph: {
    title: 'Morse Code Audio File Decoder',
    description:
      'Decode Morse code audio into text online. Upload WAV, MP3, or OGG recordings to transcribe audio beeps into English text with 100% browser privacy.',
    url: getAbsoluteUrl('/morse-code-audio-decoder'),
    siteName: 'Morse Code Translator',
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
      'Currently, this tool is designed exclusively for pre-recorded audio file analysis (.wav, .mp3, .ogg, .webm). Live microphone input is not supported on this page; please upload or drag and drop an audio file for instant browser-local transcription.',
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
];

interface ComparisonRow {
  dimension: string;
  audioDecoder: string;
  textTranslator: string;
}

const COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    dimension: 'Primary Input Mode',
    audioDecoder: 'Acoustic sound files (.wav, .mp3, .ogg, .webm)',
    textTranslator: 'Typed English prose or dot-dash Morse code strings',
  },
  {
    dimension: 'Core Processing Algorithm',
    audioDecoder: 'Acoustic envelope segmentation, zero-crossing pitch, & PARIS clustering',
    textTranslator: 'Deterministic lookup table mapping characters to ITU-R Morse symbols',
  },
  {
    dimension: 'Execution Environment',
    audioDecoder: 'Client-side HTML5 Web Audio API and AudioBuffer decoding',
    textTranslator: 'Instant client-side string parsing in browser memory',
  },
  {
    dimension: 'Handling Ambiguity',
    audioDecoder: 'Calculates signal confidence metric based on element ratio consistency',
    textTranslator: 'Emits [?] warning tokens for unrecognized symbols without halting',
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
          name: 'Morse Code Audio Decoder',
          item: getAbsoluteUrl('/morse-code-audio-decoder'),
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
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[780px] overflow-hidden"
      >
        <div className="bg-grid mask-fade absolute inset-0 opacity-60" />
        <div className="absolute -top-32 left-1/2 h-[500px] w-[64rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-teal-500/15 via-emerald-500/10 to-transparent blur-3xl dark:from-teal-400/15 dark:via-emerald-400/8 dark:to-transparent" />
        <div className="absolute top-40 left-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-400/8" />
        <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-400/8" />
      </div>

      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 pt-2 pb-12 sm:px-6 sm:pt-3 sm:pb-16 lg:px-8">
        {/* Centered Breadcrumb Pill */}
        <nav aria-label="Breadcrumb" className="mb-3 flex justify-center">
          <ol className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1 text-xs text-slate-500 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <li>
              <Link href="/" className="transition-colors hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              Morse Code Audio Decoder
            </li>
          </ol>
        </nav>

        {/* =========================================================================
            TOOL STATION: AUDIO DECODER DROPZONE & RESULTS (PROMINENT AT TOP)
            ========================================================================= */}
        <section aria-label="Morse Code Audio File Upload and Transcription Station" className="mb-10 sm:mb-14 scroll-mt-20">
          <AudioDecoderClient />
        </section>

        {/* =========================================================================
            SECTION 1: HOW THE MORSE CODE AUDIO DECODER WORKS
            ========================================================================= */}
        <section id="how-it-works" aria-label="How the Morse code audio decoder works" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                How the Morse Code Audio Decoder Works
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Our <strong>morse code audio decoder</strong> converts audible telegraph beeps into readable text through client-side digital signal processing. When you upload an audio file, your browser&apos;s native <strong>HTML5 Web Audio API</strong> decodes the raw audio container into an uncompressed PCM AudioBuffer:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
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
                    ITU-R M.1677-1
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Maps assembled dot-dash sequences against official International Morse Code ITU-R M.1677-1 definitions, computing acoustic confidence metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: AUDIO DECODING ARCHITECTURE (From Buffer to Character Stream)
            ========================================================================= */}
        <section id="architecture" aria-label="Audio decoding pipeline architecture" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Audio Decoding Architecture: Buffer to Character Stream
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              The audio engine transforms acoustic wave pressure into symbolic telegraphy using a four-stage client-side pipeline:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Stage 1.</span>Container Ingestion &amp; Audio Decoding
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Web Audio API
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
        </section>

        {/* =========================================================================
            SECTION 3: SIGNAL ANALYSIS MATH — TONE, TIMING, CLUSTERING
            ========================================================================= */}
        <section id="signal-analysis" aria-label="Audio decoding process, tone detection, timing analysis, and dot dash identification" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                The Audio Decoding Process: Tone Detection, Timing &amp; Clustering
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Acoustic Morse decoding relies on mathematical timing ratios defined by International Morse Code standard Recommendation ITU-R M.1677-1:
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  1. Dominant Pitch &amp; Carrier Frequency Estimation
                </strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Telegraph audio is transmitted as an interrupted carrier tone pitched between 400 Hz and 800 Hz. The analyzer evaluates high-energy segments using a zero-crossing frequency estimator within the 300 Hz to 1200 Hz spectrum:
                </p>
                <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 font-mono text-xs text-slate-800 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  Frequency (Hz) = (Zero Crossings / 2) / (Active Window Duration in Seconds)
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Identifying the dominant tone verifies that the audio contains intentional telegraph signaling rather than non-tonal background noise.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  2. Dynamic RMS Envelope &amp; Adaptive Thresholding
                </strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Audio recordings often have fluctuating volume, ambient room noise, or varying microphone gain. To prevent missed quiet beeps or noise false alarms, the analyzer applies an adaptive decision threshold across minimum and maximum detected RMS energy:
                </p>
                <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 font-mono text-xs text-slate-800 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  Threshold = Min Energy + (Max Energy - Min Energy) &times; 0.35
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Any 10ms window with energy exceeding this threshold is registered as an active tone, while values below are treated as silence.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  3. Duration Clustering &amp; PARIS Standard Timing
                </strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Under the international PARIS calibration word (50 units), all pulse and silence lengths follow strict mathematical proportions based on unit dot duration (T):
                </p>
                <ul className="mt-3 grid gap-2.5 text-xs sm:grid-cols-2 lg:grid-cols-3 dark:text-slate-300">
                  <li className="rounded-lg border border-slate-200/70 bg-white p-3 dark:border-slate-700/70 dark:bg-slate-900/80">
                    <strong className="block text-slate-900 dark:text-slate-100">Dot (&bull;):</strong> 1 unit of tone (1T).
                  </li>
                  <li className="rounded-lg border border-slate-200/70 bg-white p-3 dark:border-slate-700/70 dark:bg-slate-900/80">
                    <strong className="block text-slate-900 dark:text-slate-100">Dash (&mdash;):</strong> 3 units of tone (3T).
                  </li>
                  <li className="rounded-lg border border-slate-200/70 bg-white p-3 dark:border-slate-700/70 dark:bg-slate-900/80">
                    <strong className="block text-slate-900 dark:text-slate-100">Intra-Letter Gap:</strong> 1 unit of silence (1T).
                  </li>
                  <li className="rounded-lg border border-slate-200/70 bg-white p-3 dark:border-slate-700/70 dark:bg-slate-900/80">
                    <strong className="block text-slate-900 dark:text-slate-100">Letter Pause:</strong> 3 units of silence (3T).
                  </li>
                  <li className="rounded-lg border border-slate-200/70 bg-white p-3 dark:border-slate-700/70 dark:bg-slate-900/80">
                    <strong className="block text-slate-900 dark:text-slate-100">Word Pause:</strong> 7 units of silence (7T).
                  </li>
                  <li className="rounded-lg border border-slate-200/70 bg-white p-3 dark:border-slate-700/70 dark:bg-slate-900/80">
                    <strong className="block text-slate-900 dark:text-slate-100">Speed Formula:</strong> WPM = 1200 / T (ms).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: SUPPORTED AUDIO FORMATS AND FILE LIMITS
            ========================================================================= */}
        <section id="supported-formats" aria-label="Supported audio formats and file limits" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Supported Audio Formats &amp; File Limits
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Clear technical boundaries ensure rapid processing and browser stability without memory exhaustion:
            </p>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40">
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

            {/* Mobile Touch-Friendly Card Grid (Visible on mobile, 0 horizontal clipping) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
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
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HOW TO GET BETTER DECODING RESULTS
            ========================================================================= */}
        <section id="tips-for-accuracy" aria-label="How to get better decoding results" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                How to Get Better Decoding Results
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Acoustic Morse decoding relies on clean signal-to-noise ratios and consistent element timing. Follow these four practical recording guidelines:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
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
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: COMMON AUDIO DECODING PROBLEMS & SOLUTIONS
            ========================================================================= */}
        <section id="troubleshooting" aria-label="Common audio decoding problems and solutions" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Common Audio Decoding Problems &amp; Solutions
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Diagnose real-world decoding obstacles and learn how to resolve them:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Issue 01.</span>Heavy Background Static or Radio QRN
                  </strong>
                  <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                    Signal Noise
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  <strong>Symptoms:</strong> Decoder inserts unexpected characters or reports low confidence.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-teal-800 dark:text-teal-300 font-medium">
                  <strong>Fix:</strong> Apply a narrow audio bandpass filter centered at the pitch frequency before uploading.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Issue 02.</span>Variable Speed or Hand-Keyed &quot;Fist&quot;
                  </strong>
                  <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                    Irregular Timing
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  <strong>Symptoms:</strong> Letters are merged together or split unexpectedly into separate characters.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-teal-800 dark:text-teal-300 font-medium">
                  <strong>Fix:</strong> Ensure steady transmission speed with consistent 3T letter pauses.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Issue 03.</span>Background Music or Voices
                  </strong>
                  <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                    Multi-Tonal Audio
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  <strong>Symptoms:</strong> Frequency estimator reports fluctuating pitch or fails to isolate the carrier.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-teal-800 dark:text-teal-300 font-medium">
                  <strong>Fix:</strong> Use clean audio clips containing only the Morse code sidetone.
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
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: AUDIO DECODER VS TEXT TRANSLATOR
            ========================================================================= */}
        <section id="decoder-vs-translator" aria-label="Audio decoder vs text translator comparison" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Audio Decoder vs. Text Morse Code Translator
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              While both utilities produce English text, they serve fundamentally different stages of Morse communication:
            </p>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40">
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

            {/* Mobile Touch-Friendly Card Grid (Visible on mobile, 0 horizontal clipping) */}
            <div className="grid grid-cols-1 gap-3.5 md:hidden">
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
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FREQUENTLY ASKED QUESTIONS (ACCORDIONS)
            ========================================================================= */}
        <section id="faq" aria-label="Frequently asked questions about Morse audio decoding" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Frequently Asked Questions About Audio Decoding
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Find answers to common questions about file compatibility, processing privacy, and signal analysis:
            </p>

            <div className="space-y-3.5">
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
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: EXPLORE MORSE CODE TOOLS & LEARNING HUBS
            ========================================================================= */}
        <section id="related-tools" aria-label="Explore Morse Code Tools & Learning Hubs" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Explore Additional Morse Code Decoding &amp; Learning Tools
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Deepen your telegraphy skills with our comprehensive collection of free browser-based Morse code tools and guides:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                href="/morse-code-practice"
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
                href="/morse-code-alphabet"
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
                href="/learn-morse-code"
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
                href="/morse-code-quiz"
                className="studio-card group flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
                  Knowledge Retention Quiz
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Assess your retention with 10 randomized evaluation questions covering timing rules, alphabet letters, and audio listening.
                </p>
                <span className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 dark:text-teal-400">
                  Take Quiz &rarr;
                </span>
              </Link>

              <Link
                href="/morse-code-sos"
                className="studio-card group flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-6 backdrop-blur-xs transition-all dark:border-slate-800 dark:bg-slate-900/95"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-amber-700 dark:text-slate-100 dark:group-hover:text-amber-400">
                  SOS Distress Signal
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Learn the universal distress call (... --- ...), emergency maritime protocols, optical signaling, and procedural prosign rules.
                </p>
                <span className="mt-4 inline-flex items-center text-xs font-bold text-amber-700 dark:text-amber-400">
                  Explore SOS Signal &rarr;
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: PRE-FOOTER ACTION BANNER (CTA)
            ========================================================================= */}
        <section aria-label="Ready to Master Morse Code" className="relative mt-8 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-teal-200/90 bg-gradient-to-br from-teal-50/80 via-white to-amber-50/40 p-6 sm:p-10 md:p-12 text-center dark:border-teal-900/60 dark:from-teal-950/40 dark:via-slate-900 dark:to-slate-900">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs dark:border-teal-800 dark:bg-slate-900/80 dark:text-teal-300">
            <span>CW TELEGRAPHY &bull; START LEARNING</span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
            Ready to Expand Your Morse Code Skills?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Whether you need to translate a single phrase, decode audio recordings, or want to build real telegraphy skills, our free learning curriculum and practice tools are ready when you are.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/learn-morse-code"
              className="rounded-xl bg-teal-800 px-5 py-2.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-teal-900 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500"
            >
              Start 10-Lesson Course
            </Link>
            <Link
              href="/morse-code-alphabet"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-xs transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              View Alphabet Chart
            </Link>
            <Link
              href="/morse-code-practice"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-xs transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Try Practice Drills
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
