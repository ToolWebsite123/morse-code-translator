import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

const CONTACT_EMAIL = 'morecodetranslator@gmail.com';

export const metadata: Metadata = {
  title: 'Technical & Operational Disclaimer',
  description:
    'Important technical and operational disclaimers for Morse Code Platform. Details on educational use, no emergency reliance, ITU-R M.1677-1 standards, and audio limits.',
  alternates: {
    canonical: '/disclaimer',
  },
  openGraph: {
    title: 'Technical & Operational Disclaimer | Morse Code Platform',
    description:
      'Important technical and operational disclaimers for Morse Code Platform. Details on educational use, no emergency reliance, ITU-R M.1677-1 standards, and audio limits.',
    url: getAbsoluteUrl('/disclaimer'),
    siteName: 'Morse Code Platform',
    type: 'website',
  },
};

const disclaimerSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Technical & Operational Disclaimer',
    url: getAbsoluteUrl('/disclaimer'),
    description:
      'Technical accuracy, educational scope, and operational limitations of the Morse Code Translator & Learning Platform.',
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
        name: 'Disclaimer',
        item: getAbsoluteUrl('/disclaimer'),
      },
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={disclaimerSchemas} />
      <Header />

      {/* Atmospheric Background Glow & Engineering Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden"
      >
        <div className="bg-grid mask-fade absolute inset-0 opacity-60" />
        <div className="absolute -top-24 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-teal-500/12 blur-3xl dark:bg-teal-400/10" />
        <div className="absolute top-28 left-1/3 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-400/8" />
      </div>

      <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-4 pt-3 pb-12 sm:px-6 sm:pt-4 sm:pb-16 lg:px-8">
        {/* Centered Breadcrumb Pill */}
        <nav aria-label="Breadcrumb" className="mb-2.5 flex justify-center">
          <ol className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1 text-xs text-slate-500 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <li>
              <Link href="/" className="transition-colors hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              Disclaimer
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <section className="mb-8 text-center sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs transition-colors hover:border-teal-400 dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Legal &amp; Technical Disclosures</span>
            <span className="text-teal-300 dark:text-teal-700">&bull;</span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-teal-800 dark:text-teal-200">
              Educational Scope
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            Technical &amp; Operational{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Disclaimer
            </span>
          </h1>

          <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            Effective Date: [EFFECTIVE DATE] &bull; Last Updated: [LAST UPDATED]
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Please review the technical parameters, emergency limitations, and educational scope governing the tools and content provided on this platform.
          </p>
        </section>

        {/* Structured Disclaimer Sections */}
        <div className="space-y-6">
          {/* Section 1: General Educational Purpose */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              1. General Educational &amp; Informational Purpose
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              All materials, tools, software converters, interactive drills, lessons, quizzes, and reference guides provided on the Morse Code Translator &amp; Learning Platform (referred to as the &ldquo;Website,&rdquo; &ldquo;Service,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) are provided exclusively for <strong>general educational, informational, self-study, and recreational purposes</strong>.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              The content and tools on this Website are designed to help students, amateur radio hobbyists (ham radio operators), telegraphy historians, and puzzle enthusiasts understand the history, timing conventions, and rhythmic mechanics of International Morse Code.
            </p>
          </section>

          {/* Section 2: Critical Life Safety Notice */}
          <section className="rounded-2xl border border-rose-300 bg-rose-50/80 p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-rose-900/70 dark:bg-rose-950/40">
            <div className="flex items-center gap-3 text-rose-800 dark:text-rose-300">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-xs">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold sm:text-xl">
                2. No Emergency, Maritime, or Mission-Critical Reliance
              </h2>
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-rose-900 sm:text-sm dark:text-rose-200">
              Critical Life Safety Notice: This platform is NOT certified for maritime search and rescue, military defense dispatch, aviation radio navigation, emergency calling, public safety response, or critical life-safety communications.
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs text-rose-950 sm:text-sm dark:text-rose-200">
              <li>
                <strong>Distress Signals (SOS):</strong> While our documentation accurately describes the historical international distress prosign <strong>SOS</strong> (<code className="font-mono font-bold">... --- ...</code>), this Website is not connected to any emergency dispatch infrastructure, coast guard monitoring center, or 911/112 public safety answering point (PSAP).
              </li>
              <li>
                <strong>Never Rely on This Tool in Emergencies:</strong> In any real-world emergency, distress situation, maritime crisis, or medical event, you must immediately contact local emergency services using certified communication channels (e.g., VHF Marine Radio Channel 16, 911, 112, 999, satellite distress beacons / EPIRB, or standard telephone service).
              </li>
              <li>
                <strong>No Safety-of-Life Warranty:</strong> We disclaim all liability for any loss of life, personal injury, property damage, rescue delay, or operational casualty resulting from reliance upon this Website or its outputs during an emergency or perilous situation.
              </li>
            </ol>
          </section>

          {/* Section 3: Translation Limitations */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              3. Translation Limitations &amp; Character Support
            </h2>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              3.1 Standard ITU-R M.1677-1 Catalog
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              Our translation engine strictly adheres to the standard Latin-based International Morse Code specification codified under Recommendation ITU-R M.1677-1:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>26 basic Latin letters (A–Z).</li>
              <li>10 Arabic digits (0–9).</li>
              <li>18 standard punctuation marks and prosigns.</li>
            </ul>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              3.2 Unsupported Characters &amp; Diacritics
            </h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Non-Latin Alphabets:</strong> International Morse Code as implemented here does not natively encode non-Latin scripts (such as Cyrillic, Greek, Arabic, Hebrew, Devanagari, or East Asian characters).</li>
              <li><strong>Accented Letters:</strong> Accented Latin characters (such as é, ñ, ü, ç) are not standardized in the universal 54-symbol ITU-R catalog and are flagged by our diagnostic engine.</li>
              <li><strong>Visual Diagnostics:</strong> When unsupported characters are detected in your text input, our engine highlights their position. In decoded output, unrecognized Morse sequences are safely substituted with a non-blocking <code className="font-mono text-xs">[?]</code> fallback symbol.</li>
              <li><strong>Case Neutrality:</strong> Morse code does not preserve letter capitalization. Text converted to Morse code and decoded back to English will be standardized without case distinction.</li>
            </ul>
          </section>

          {/* Section 4: Audio Playback Timing */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              4. Audio Playback &amp; Acoustic Timing Limitations
            </h2>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              4.1 PARIS Standard Calibration
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              Our Web Audio engine synthesizes audio tones based upon the international reference word <strong>PARIS</strong> (50 total unit intervals):
            </p>
            <div className="my-3 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              Dot Duration (T) = 1200 / WPM milliseconds<br />
              Dot (Dit) = 1T &bull; Dash (Dah) = 3T &bull; Intra-character space = 1T &bull; Inter-letter space = 3T &bull; Inter-word space = 7T
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              4.2 Browser &amp; Hardware Timing Variance
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              Although our Web Audio scheduler uses hardware-clock timestamps (<code className="font-mono text-xs">AudioContext.currentTime</code>) to ensure millisecond-accurate tone duration, high system CPU load, device power-saving modes, background tab throttling, or operating system audio buffer latencies may introduce subtle acoustic jitter. The visual light beacon is rendered using <code className="font-mono text-xs">requestAnimationFrame</code>, which may vary slightly from real-time audio on low-refresh displays.
            </p>
          </section>

          {/* Section 5: Audio File Decoder Limitations */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              5. Audio File Decoder Limitations (/audio-decoder)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              Our audio file decoder employs digital signal processing algorithms (including Root-Mean-Square energy envelope calculation, adaptive noise thresholds, and pitch estimation) to transcribe Morse code recordings into text directly within your web browser.
            </p>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              Acoustic Variables Affecting Transcription Accuracy
            </h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Background Noise &amp; Low SNR:</strong> Low signal-to-noise ratios, wind noise, engine rumble, static, or electrical hum decrease recognition accuracy.</li>
              <li><strong>Reverberation &amp; Room Echo:</strong> Echoes that blur the distinct silences between dots and dashes can cause misdetections.</li>
              <li><strong>Speed Inconsistency (&ldquo;Fist&rdquo; Variations):</strong> Morse transmitted with human swing, uneven spacing, or fluctuating speeds may result in split characters.</li>
              <li><strong>Frequency Drift &amp; Multiple Tones:</strong> Audio files containing multiple concurrent tones, chordal harmonics, or voice interference.</li>
              <li><strong>Lossy Compression Artifacts:</strong> Heavily compressed MP3 or OGG files with low bitrates that smudge high-frequency transient tone edges.</li>
            </ol>
            <p className="mt-3 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
              For highest accuracy, audio recordings should feature a single, clear, steady tone (between 500 Hz and 800 Hz) with a clean signal-to-noise ratio and consistent rhythm.
            </p>
          </section>

          {/* Section 6: User Verification Responsibility */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              6. User Verification Responsibility
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              <strong>You are solely responsible for verifying the accuracy of any critical text or Morse code sequences.</strong> If you intend to use Morse code for amateur radio transmission, examination preparation, educational instruction, historical archiving, public performances, or physical signage, you must independently cross-reference the output against primary reference documentation and manual inspection.
            </p>
          </section>

          {/* Section 7: No Certified Advice */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              7. No Professional, Legal, or Certified Advice
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              The informational content on this Website:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>Does <strong>not</strong> constitute licensed legal, nautical, aeronautical, military, or telecommunications engineering advice.</li>
              <li>Does <strong>not</strong> replace formal training or certified study courses required for official amateur radio licenses (such as FCC, OFCOM, or ITU radio operator licenses).</li>
              <li>Does <strong>not</strong> guarantee passing any official amateur radio licensing exam, continuous wave proficiency test, or academic assessment.</li>
            </ul>
          </section>

          {/* Section 8: Service Availability */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              8. Service Availability &amp; Network Operations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              We endeavor to maintain high website availability and clean performance. However, we do not warrant that access to the Website will be continuous, uninterrupted, defect-free, or entirely secure. We are not responsible for technical malfunctions of your device, hardware sound card issues, operating system audio permission blocks, web browser incompatibility, or internet service provider outages.
            </p>
          </section>

          {/* Section 9: Contact for Clarification */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              9. Contact for Clarification
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              If you require technical clarification regarding our algorithms, ITU-R M.1677-1 standard compliance, or the disclosures contained within this Disclaimer, please contact:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
              <li>
                <strong>Entity / Project:</strong> [WEBSITE OPERATOR / LEGAL ENTITY NAME]
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono text-teal-700 underline dark:text-teal-400">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <strong>Mailing Address:</strong> [PHYSICAL / MAILING ADDRESS]
              </li>
              <li>
                <strong>Official Website:</strong>{' '}
                <a href="https://morsecodetranslatores.com/" className="font-mono text-teal-700 underline dark:text-teal-400">
                  https://morsecodetranslatores.com/
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Pre-Footer Action Banner */}
        <section aria-label="Related Policies and Disclosures" className="mt-12 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-white to-teal-50/40 p-8 text-center shadow-lg shadow-teal-900/5 sm:p-10 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/30">
          <div className="mx-auto max-w-xl">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Related Documents
            </span>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
              Read Our Service Terms &amp; Privacy Policy
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
              Explore our full conditions of use, data protection practices, and direct support channels.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/terms"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 sm:text-sm dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
              >
                Terms of Use &rarr;
              </Link>
              <Link
                href="/privacy"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Privacy Policy &rarr;
              </Link>
              <Link
                href="/contact"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Contact Us &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

