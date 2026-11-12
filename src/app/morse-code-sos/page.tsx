import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { OpticalBeacon } from '@/components/tools/OpticalBeacon';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'SOS in Morse Code: ... --- ... Audio Tone, Meaning & Beacon Guide',
  description:
    'Learn SOS in Morse code (... --- ...). Listen to authentic audio tones, simulate optical light flashes, discover its Titanic maritime history, and debunk common myths.',
  alternates: {
    canonical: '/morse-code-sos',
  },
  openGraph: {
    title: 'SOS in Morse Code: ... --- ... Audio Tone, Meaning & Beacon Guide',
    description:
      'Learn SOS in Morse code (... --- ...). Listen to authentic audio tones, simulate optical light flashes, discover its Titanic maritime history, and debunk common myths.',
    url: getAbsoluteUrl('/morse-code-sos'),
    siteName: 'Morse Code Translator',
    type: 'article',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const SOS_FAQS: readonly FAQItem[] = [
  {
    question: 'What is SOS in Morse code?',
    answer:
      'SOS in Morse code is represented as three dots, three dashes, and three dots (... --- ...). In official radiotelegraphy, it is transmitted as an unbroken procedural signal (prosign), meaning there is no standard letter pause between the S, O, and S characters.',
  },
  {
    question: 'Does SOS stand for "Save Our Souls" or "Save Our Ship"?',
    answer:
      'No. "Save Our Souls" and "Save Our Ship" are backronyms created after the code was adopted. The letters S-O-S were chosen at the 1906 Berlin International Radiotelegraphic Convention strictly because three dots, three dashes, and three dots create an unmistakable acoustic rhythm that is easily recognized through heavy atmospheric noise.',
  },
  {
    question: 'How do you flash SOS with a flashlight or mirror?',
    answer:
      'To signal SOS visually: flash the light 3 times quickly (dots, ~1 second each), pause briefly for 1 second, flash 3 times slowly (dashes, ~3 seconds each), pause for 1 second, and flash 3 times quickly (dots). Wait 3 to 7 seconds before repeating the full SOS cycle.',
  },
  {
    question: 'Was SOS used on the RMS Titanic in 1912?',
    answer:
      'Yes. When the RMS Titanic struck an iceberg on the night of April 14, 1912, senior wireless operator Jack Phillips initially transmitted CQD (the Marconi company distress call). Junior operator Harold Bride jokingly suggested sending SOS, saying "it\'s the new call, and it may be your last chance to send it." Phillips then alternated CQD and SOS until the power failed.',
  },
  {
    question: 'What is the difference between CQD and SOS?',
    answer:
      'CQD was the Marconi Telegraph Company distress code introduced in 1904, where "CQ" was the general call to all stations and "D" represented Distress. SOS was introduced by German regulations in 1905 and ratified internationally in 1906 to replace proprietary company codes with a single, universally recognized standard.',
  },
];

export default function MorseCodeSosPage() {
  const sosSchemas = [
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
          name: 'SOS in Morse Code',
          item: getAbsoluteUrl('/morse-code-sos'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'SOS in Morse Code: ... --- ... Audio Tone, Meaning & Beacon Guide',
      description:
        'Authoritative technical and historical guide to the international Morse code SOS distress signal, covering timing rules, optical flasher simulation, and Titanic radio logs.',
      mainEntityOfPage: getAbsoluteUrl('/morse-code-sos'),
      author: {
        '@type': 'Organization',
        name: 'Morse Code Translator',
        url: getAbsoluteUrl('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: SOS_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={sosSchemas} />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&bull;</li>
              <li className="font-semibold text-slate-800 dark:text-slate-200" aria-current="page">
                SOS in Morse Code
              </li>
            </ol>
          </nav>

          {/* Hero Banner */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-xs font-bold text-rose-800 shadow-2xs dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-300">
              <span className="flex h-2 w-2">
                <span className="h-2 w-2 rounded-full bg-rose-600 dark:bg-rose-400 animate-pulse" />
              </span>
              <span>International Distress Signal &bull; ITU Prosign</span>
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              SOS in{' '}
              <span className="bg-gradient-to-r from-rose-600 via-amber-600 to-rose-500 bg-clip-text text-transparent dark:from-rose-400 dark:via-amber-400 dark:to-rose-300">
                Morse Code
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              The universal radiotelegraph distress call: <strong className="font-mono text-lg text-slate-900 dark:text-white">... --- ...</strong> (three short, three long, three short). Learn how to hear it, flash it, and transmit it accurately.
            </p>
          </div>

          {/* Instant Audio / Light Beacon Card */}
          <div className="mt-10">
            <OpticalBeacon initialMorse="... --- ..." label="SOS Visual Strobe & Audio Tone Beacon" />
          </div>

          {/* Technical Anatomy of the Signal */}
          <section className="mt-12 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Technical Anatomy: Why SOS is a Continuous &ldquo;Prosign&rdquo;
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                In everyday conversation, Morse code characters have a <strong>3-unit time gap</strong> between letters. However, under official International Telecommunication Union (ITU) regulations, SOS is not transmitted as three separate words or letters. Instead, it is an unbroken <strong>procedural signal (prosign)</strong> written with an overbar (<span className="font-mono font-bold">&oline;SOS&oline;</span>).
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950">
                  <span className="font-mono text-2xl font-black text-teal-700 dark:text-teal-400">...</span>
                  <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-300">3 Short Pulses (S)</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">1 unit on, 1 unit off</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950">
                  <span className="font-mono text-2xl font-black text-amber-600 dark:text-amber-400">---</span>
                  <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-300">3 Long Pulses (O)</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">3 units on, 1 unit off</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950">
                  <span className="font-mono text-2xl font-black text-teal-700 dark:text-teal-400">...</span>
                  <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-300">3 Short Pulses (S)</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">1 unit on, 1 unit off</p>
                </div>
              </div>
              <p>
                Because there is only a 1-unit intra-symbol gap between the pulses rather than the standard 3-unit letter gap, the signal sounds like a single continuous 9-element rhythmic melody: <em>dit-dit-dit-dah-dah-dah-dit-dit-dit</em>.
              </p>
            </div>
          </section>

          {/* Myth Debunking vs Reality */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Common Myths vs. Historical Reality
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 sm:p-5 dark:border-rose-900/50 dark:bg-rose-950/40">
                <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
                  <span aria-hidden="true">❌</span>
                  <span>Popular Myth</span>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  SOS stands for &ldquo;Save Our Souls,&rdquo; &ldquo;Save Our Ship,&rdquo; or &ldquo;Stop Other Signals.&rdquo;
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 dark:border-emerald-900/50 dark:bg-emerald-950/40">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <span aria-hidden="true">✅</span>
                  <span>Documented Reality</span>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  SOS has no linguistic meaning. It was selected at the 1906 Berlin Radiotelegraphic Convention because its continuous symmetrical cadence (3 dots, 3 dashes, 3 dots) cut through static interference and was impossible to confuse with standard commercial messages.
                </p>
              </div>
            </div>
          </section>

          {/* Emergency Signaling Field Guide */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              How to Transmit SOS in an Emergency
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  🔦
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">Flashlight / Mirror</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Flash 3 rapid pulses, 3 long pulses (held ~3 seconds), and 3 rapid pulses. Pause 5 seconds before repeating.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  🔊
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">Whistle / Car Horn</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  3 short blasts (1s each), 3 long blasts (3s each), 3 short blasts (1s each). Standard distress whistle protocol.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  🔨
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">Tapping on Metal / Pipes</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Tap 3 quick taps, 3 slower heavier taps, 3 quick taps. Acoustic vibrations travel long distances through pipes and rubble.
                </p>
              </div>
            </div>
          </section>

          {/* Historical Chronicle: Titanic 1912 */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Historical Chronicle: The Night the Titanic Sent SOS
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Prior to 1912, British ships operated by the Marconi Wireless Telegraph Company primarily used their own proprietary code: <strong>CQD</strong> (&ldquo;CQ&rdquo; meaning general broadcast, &ldquo;D&rdquo; for distress). At 12:15 AM on April 15, 1912, Titanic wireless operator Jack Phillips began transmitting <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">CQD MGY</code> (MGY being Titanic&apos;s callsign).
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              At 12:45 AM, second operator Harold Bride pointed out that the newer international code SOS had been ratified, saying: <em>&ldquo;Send SOS, it&apos;s the new call, and it may be your last chance to send it.&rdquo;</em> Phillips laughed and sent <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-rose-700 dark:bg-slate-800 dark:text-rose-400">CQD CQD SOS DE MGY</code>. This historic event solidified SOS as the undisputed global maritime distress signal.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Frequently Asked Questions About SOS in Morse Code
            </h2>
            <div className="mt-6 space-y-4">
              {SOS_FAQS.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-slate-700"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900 dark:text-slate-100">
                    <span>{faq.question}</span>
                    <span className="ml-2 font-mono text-teal-700 transition-transform group-open:rotate-180 dark:text-teal-400">
                      &darr;
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Cross-Tool Navigation Hub */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-teal-200 bg-teal-50/70 p-4 sm:p-6 dark:border-teal-900/60 dark:bg-teal-950/40">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Explore More Morse Code Tools &amp; Guides
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Convert live text, drill Morse characters, or decode audio files locally.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                Translator Tool &rarr;
              </Link>
              <Link
                href="/morse-code-alphabet"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                54-Character Chart &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
