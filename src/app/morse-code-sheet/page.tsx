import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { PrintButton } from '@/components/tools/PrintButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Printable Morse Code Cheat Sheet & PDF Chart (Alphabet, Numbers, Symbols)',
  description:
    'Free printable Morse code cheat sheet. High-contrast ink-friendly reference table with letters A–Z, numbers 0–9, punctuation, and timing rules. Print or save as PDF.',
  alternates: {
    canonical: '/morse-code-sheet',
  },
  openGraph: {
    title: 'Printable Morse Code Cheat Sheet & PDF Chart (Alphabet, Numbers, Symbols)',
    description:
      'Free printable Morse code cheat sheet. High-contrast ink-friendly reference table with letters A–Z, numbers 0–9, punctuation, and timing rules. Print or save as PDF.',
    url: getAbsoluteUrl('/morse-code-sheet'),
    siteName: 'Morse Code Translator',
    type: 'article',
  },
};

const LETTERS = [
  { char: 'A', morse: '.-', phonetic: 'Alpha' },
  { char: 'B', morse: '-...', phonetic: 'Bravo' },
  { char: 'C', morse: '-.-.', phonetic: 'Charlie' },
  { char: 'D', morse: '-..', phonetic: 'Delta' },
  { char: 'E', morse: '.', phonetic: 'Echo' },
  { char: 'F', morse: '..-.', phonetic: 'Foxtrot' },
  { char: 'G', morse: '--.', phonetic: 'Golf' },
  { char: 'H', morse: '....', phonetic: 'Hotel' },
  { char: 'I', morse: '..', phonetic: 'India' },
  { char: 'J', morse: '.---', phonetic: 'Juliet' },
  { char: 'K', morse: '-.-', phonetic: 'Kilo' },
  { char: 'L', morse: '.-..', phonetic: 'Lima' },
  { char: 'M', morse: '--', phonetic: 'Mike' },
  { char: 'N', morse: '-.', phonetic: 'November' },
  { char: 'O', morse: '---', phonetic: 'Oscar' },
  { char: 'P', morse: '.--.', phonetic: 'Papa' },
  { char: 'Q', morse: '--.-', phonetic: 'Quebec' },
  { char: 'R', morse: '.-.', phonetic: 'Romeo' },
  { char: 'S', morse: '...', phonetic: 'Sierra' },
  { char: 'T', morse: '-', phonetic: 'Tango' },
  { char: 'U', morse: '..-', phonetic: 'Uniform' },
  { char: 'V', morse: '...-', phonetic: 'Victor' },
  { char: 'W', morse: '.--', phonetic: 'Whiskey' },
  { char: 'X', morse: '-..-', phonetic: 'X-ray' },
  { char: 'Y', morse: '-.--', phonetic: 'Yankee' },
  { char: 'Z', morse: '--..', phonetic: 'Zulu' },
];

const NUMBERS = [
  { char: '1', morse: '.----', desc: '1 dit, 4 dahs' },
  { char: '2', morse: '..---', desc: '2 dits, 3 dahs' },
  { char: '3', morse: '...--', desc: '3 dits, 2 dahs' },
  { char: '4', morse: '....-', desc: '4 dits, 1 dah' },
  { char: '5', morse: '.....', desc: '5 dits' },
  { char: '6', morse: '-....', desc: '1 dah, 4 dits' },
  { char: '7', morse: '--...', desc: '2 dahs, 3 dits' },
  { char: '8', morse: '---..', desc: '3 dahs, 2 dits' },
  { char: '9', morse: '----.', desc: '4 dahs, 1 dit' },
  { char: '0', morse: '-----', desc: '5 dahs' },
];

const PUNCTUATION = [
  { char: 'Period (.)', morse: '.-.-.-' },
  { char: 'Comma (,)', morse: '--..--' },
  { char: 'Question (?)', morse: '..--..' },
  { char: 'Slash (/)', morse: '-..-.' },
  { char: 'Equals (=)', morse: '-...-' },
  { char: 'At Symbol (@)', morse: '.--.-.' },
  { char: 'Hyphen (-)', morse: '-....-' },
  { char: 'Apostrophe (\')', morse: '.----.' },
];

const PROSIGNS = [
  { code: 'SOS', morse: '...---...', meaning: 'Universal Distress Call' },
  { code: 'AR', morse: '.-.-.', meaning: 'End of Transmission' },
  { code: 'SK', morse: '...-.-', meaning: 'End of Contact / Work Complete' },
  { code: 'BT', morse: '...-', meaning: 'New Section / Paragraph Break' },
  { code: 'AS', morse: '.-...', meaning: 'Wait / Stand By (1-2 minutes)' },
  { code: 'K', morse: '-.-', meaning: 'Invitation to Transmit (Go Ahead)' },
];

export default function MorseCodeSheetPage() {
  const sheetSchemas = [
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
          name: 'Morse Code Printable Cheat Sheet',
          item: getAbsoluteUrl('/morse-code-sheet'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Printable Morse Code Cheat Sheet & PDF Chart',
      description:
        'Ink-friendly single-page printable reference sheet for International Morse Code letters, numbers, punctuation, and radio timing rules.',
      mainEntityOfPage: getAbsoluteUrl('/morse-code-sheet'),
      author: {
        '@type': 'Organization',
        name: 'Morse Code Translator',
        url: getAbsoluteUrl('/'),
      },
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={sheetSchemas} />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 print:hidden">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&bull;</li>
              <li className="font-semibold text-slate-800 dark:text-slate-200" aria-current="page">
                Morse Code Printable Cheat Sheet
              </li>
            </ol>
          </nav>

          {/* Action Bar & Headline (Hidden on Print) */}
          <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left print:hidden">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 dark:border-teal-900/60 dark:bg-teal-950/60 dark:text-teal-300">
                <span>Printable Educational Resource &bull; ITU-R M.1677-1</span>
              </span>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl">
                Morse Code Cheat Sheet
              </h1>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                Optimized for single-page printing, scout meetings, classrooms, and amateur radio stations.
              </p>
            </div>
            <div className="flex justify-center sm:justify-end">
              <PrintButton />
            </div>
          </div>

          {/* Printable Sheet Canvas Container */}
          <div className="mt-8 rounded-3xl border border-slate-300/80 bg-white p-4 shadow-xs sm:p-6 md:p-10 print:m-0 print:border-none print:p-0 print:shadow-none text-slate-900">
            {/* Sheet Header for Printed Page */}
            <div className="border-b-2 border-slate-900 pb-4 text-center">
              <h2 className="text-xl font-black uppercase tracking-wider text-slate-950 sm:text-2xl">
                International Morse Code Reference Sheet
              </h2>
              <p className="mt-1 font-mono text-[11px] text-slate-700 sm:text-xs">
                Recommendation ITU-R M.1677-1 &bull; Standard PARIS Timing &bull; morsecodetranslatores.com
              </p>
            </div>

            {/* Timing Rules Quick Bar */}
            <div className="mt-4 grid grid-cols-2 gap-2 border border-slate-300 bg-slate-50 p-2.5 text-[11px] sm:grid-cols-4 sm:p-3 sm:text-xs print:bg-slate-50">
              <div>
                <strong>Dot (&bull;):</strong> 1 Time Unit
              </div>
              <div>
                <strong>Dash (&mdash;):</strong> 3 Time Units
              </div>
              <div>
                <strong>Letter Space:</strong> 3 Time Units
              </div>
              <div>
                <strong>Word Space:</strong> 7 Time Units
              </div>
            </div>

            {/* Section 1: Latin Letters A-Z */}
            <div className="mt-6">
              <h3 className="border-b border-slate-300 pb-1 text-sm font-black uppercase tracking-wider text-slate-900">
                Alphabet (Letters A &ndash; Z)
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 print:grid-cols-4">
                {LETTERS.map((item) => (
                  <div
                    key={item.char}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-2 text-xs"
                  >
                    <div className="font-bold text-slate-950">
                      <span className="text-base">{item.char}</span>
                      <span className="hidden min-[380px]:inline ml-1 text-[10px] text-slate-500 font-normal">({item.phonetic})</span>
                    </div>
                    <span className="font-mono text-sm font-black tracking-widest text-teal-800 print:text-black">
                      {item.morse}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Numbers 0-9 */}
            <div className="mt-6">
              <h3 className="border-b border-slate-300 pb-1 text-sm font-black uppercase tracking-wider text-slate-900">
                Digits (Numbers 0 &ndash; 9)
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-5 print:grid-cols-5">
                {NUMBERS.map((item) => (
                  <div
                    key={item.char}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-2 text-xs"
                  >
                    <span className="text-base font-bold text-slate-950">{item.char}</span>
                    <span className="font-mono text-sm font-black tracking-widest text-teal-800 print:text-black">
                      {item.morse}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Essential Punctuation & Prosigns */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 print:grid-cols-2">
              <div>
                <h3 className="border-b border-slate-300 pb-1 text-sm font-black uppercase tracking-wider text-slate-900">
                  Common Punctuation
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {PUNCTUATION.map((item) => (
                    <div
                      key={item.char}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-2 text-xs"
                    >
                      <span className="font-medium text-slate-800">{item.char}</span>
                      <span className="font-mono text-xs font-black tracking-widest text-teal-800 print:text-black">
                        {item.morse}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="border-b border-slate-300 pb-1 text-sm font-black uppercase tracking-wider text-slate-900">
                  Operating Prosigns
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {PROSIGNS.map((item) => (
                    <div
                      key={item.code}
                      className="flex flex-col justify-between rounded-lg border border-slate-200 p-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-950">{item.code}</span>
                        <span className="font-mono text-xs font-black tracking-widest text-teal-800 print:text-black">
                          {item.morse}
                        </span>
                      </div>
                      <span className="mt-1 text-[10px] text-slate-500">{item.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="mt-6 border-t border-slate-200 pt-3 text-center font-mono text-[11px] text-slate-500">
              Free educational tool provided by Morse Code Translator &bull; No signups required &bull; Print directly from your browser.
            </div>
          </div>

          {/* Classroom & Field Exercises (Screen only) */}
          <section className="mt-12 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8 print:hidden">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Classroom &amp; Scout Troop Practice Activities
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
                <span className="text-2xl">🔦</span>
                <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">Flashlight Relay</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Divide scouts into two teams across a room or campsite. Transmit 3-letter words using light pulses. The receiving team decodes using this printed sheet.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
                <span className="text-2xl">📝</span>
                <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">Cipher Hunt</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Hide clues around the classroom encoded in dots and dashes. Students use the cheat sheet to decode instructions leading to the final prize.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
                <span className="text-2xl">🎧</span>
                <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">Acoustic Bingo</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Play random Morse audio tones using our online practice tool while students mark off the corresponding letters on their printed cards.
                </p>
              </div>
            </div>
          </section>

          {/* Cross-linking Hub */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-teal-200 bg-teal-50/70 p-4 sm:p-6 print:hidden dark:border-teal-900/60 dark:bg-teal-950/40">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Want interactive audio and speed training?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Test your memory with real-time drills or convert messages instantly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/morse-code-practice"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                Speed Trainer Drills &rarr;
              </Link>
              <Link
                href="/morse-code-alphabet"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Interactive 54-Char Chart &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
