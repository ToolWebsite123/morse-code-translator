import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Ham Radio CW Q-Codes & Prosigns Guide (QTH, QRM, QSL, 73, 88)',
  description:
    'Complete guide to amateur radio CW Q-codes and telegraphy prosigns. Learn QTH, QRM, QSL, 73, 88, and explore a real-world two-way QSO radio contact script.',
  alternates: {
    canonical: '/morse-code-q-codes',
  },
  openGraph: {
    title: 'Ham Radio CW Q-Codes & Prosigns Guide (QTH, QRM, QSL, 73, 88)',
    description:
      'Complete guide to amateur radio CW Q-codes and telegraphy prosigns. Learn QTH, QRM, QSL, 73, 88, and explore a real-world two-way QSO radio contact script.',
    url: getAbsoluteUrl('/morse-code-q-codes'),
    siteName: 'Morse Code Translator',
    type: 'article',
  },
};

const Q_CODES = [
  { code: 'QTH', morse: '--.- - ....', question: 'What is your location?', answer: 'My location is [City/Grid].' },
  { code: 'QRM', morse: '--.- .-. --', question: 'Is your transmission being interfered with?', answer: 'I am troubled by man-made interference.' },
  { code: 'QRN', morse: '--.- .-. -.', question: 'Are you troubled by static noise?', answer: 'I am troubled by static / atmospheric noise.' },
  { code: 'QRO', morse: '--.- .-. ---', question: 'Shall I increase transmitter power?', answer: 'Increase power / Operating high power.' },
  { code: 'QRP', morse: '--.- .-. .--.', question: 'Shall I decrease transmitter power?', answer: 'Decrease power / Operating low power (≤5W).' },
  { code: 'QRS', morse: '--.- .-. ...', question: 'Shall I send slower?', answer: 'Send slower (speed down).' },
  { code: 'QRQ', morse: '--.- .-. --.-', question: 'Shall I send faster?', answer: 'Send faster (speed up).' },
  { code: 'QRT', morse: '--.- .-. -', question: 'Shall I stop sending?', answer: 'Stop sending / Closing station down.' },
  { code: 'QRX', morse: '--.- .-. -..-', question: 'When will you call me again?', answer: 'Stand by / Wait [X] minutes.' },
  { code: 'QRZ', morse: '--.- .-. --..', question: 'Who is calling me?', answer: 'You are being called by [Callsign].' },
  { code: 'QSB', morse: '--.- ... -...', question: 'Is my signal fading?', answer: 'Your signal strength is fading.' },
  { code: 'QSL', morse: '--.- ... .-..', question: 'Can you acknowledge receipt?', answer: 'I acknowledge receipt (QSL card confirmation).' },
  { code: 'QSO', morse: '--.- ... ---', question: 'Can you communicate with me?', answer: 'Direct two-way conversation in progress.' },
  { code: 'QSY', morse: '--.- ... -.--', question: 'Shall I change transmission frequency?', answer: 'Change frequency to [kHz/MHz].' },
  { code: 'QTC', morse: '--.- - -.-.', question: 'How many telegrams have you to send?', answer: 'I have [number] messages to forward.' },
];

const PROSIGNS_LIST = [
  { symbol: '73', morse: '--... ...--', meaning: 'Best regards (friendly sign-off between radio amateurs)' },
  { symbol: '88', morse: '---.. ---..', meaning: 'Love and kisses (traditional affectionate sign-off)' },
  { symbol: 'CQ', morse: '-.-. --.-', meaning: 'General call to all stations ("Seek you")' },
  { symbol: 'DE', morse: '-.. .', meaning: 'From / This is (e.g., "CQ DE W1AW")' },
  { symbol: 'K', morse: '-.-', meaning: 'Invitation to transmit (Over / Any station go ahead)' },
  { symbol: 'KN', morse: '-.- -.', meaning: 'Invitation to named station only (Only addressed station reply)' },
  { symbol: 'SK', morse: '...-.-', meaning: 'End of work / Final transmission of contact (Silent Key)' },
  { symbol: 'AR', morse: '.-.-.', meaning: 'End of message / transmission' },
  { symbol: 'BT', morse: '-...-', meaning: 'Break / Equal sign (pause between message sections)' },
  { symbol: 'RST', morse: '.-. ... -', meaning: 'Readability (1-5), Strength (1-9), Tone (1-9)' },
];

const Q_CODE_FAQS = [
  {
    question: 'What are Q-codes in Morse code and amateur radio?',
    answer:
      'Q-codes are standardized 3-letter operating codes developed in 1909 by the British government and later adopted by the ITU. When followed by a question mark, a Q-code asks a question (e.g., "QTH?" = Where are you located?). Without a question mark, it provides the answer (e.g., "QTH BOSTON" = My location is Boston).',
  },
  {
    question: 'Why do all Q-codes start with the letter Q?',
    answer:
      'The letter Q was chosen because it occurs infrequently in ordinary spoken words and was not used in early maritime callsign assignments, preventing accidental confusion with vessel identification or plain text telegrams.',
  },
  {
    question: 'What does "73" mean in amateur radio telegraphy?',
    answer:
      '"73" originated in the 1859 National Telegraphic Convention "92 Code" as a standard telegraphic wire abbreviation meaning "Best regards." Today, it is the universal friendly closing used by radio amateurs worldwide at the conclusion of a contact.',
  },
  {
    question: 'What is the format of a basic two-way CW radio contact (QSO)?',
    answer:
      'A standard CW contact begins with a general call: "CQ CQ CQ DE [YourCall] K". Another operator replies: "[YourCall] DE [TheirCall] K". Both stations exchange signal reports (RST 599), names, locations (QTH), and sign off with "73" and "SK".',
  },
];

export default function MorseCodeQCodesPage() {
  const qCodeSchemas = [
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
          name: 'CW Q-Codes & Prosigns',
          item: getAbsoluteUrl('/morse-code-q-codes'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Ham Radio CW Q-Codes & Prosigns Guide (QTH, QRM, QSL, 73, 88)',
      description:
        'Technical handbook for amateur radio CW telegraphy operators covering the top 15 Q-signals, procedural prosigns, and sample QSO contact transcripts.',
      mainEntityOfPage: getAbsoluteUrl('/morse-code-q-codes'),
      author: {
        '@type': 'Organization',
        name: 'Morse Code Translator',
        url: getAbsoluteUrl('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: Q_CODE_FAQS.map((faq) => ({
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
      <JsonLd data={qCodeSchemas} />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&bull;</li>
              <li className="font-semibold text-slate-800 dark:text-slate-200" aria-current="page">
                Ham Radio CW Q-Codes &amp; Prosigns
              </li>
            </ol>
          </nav>

          {/* Hero Banner */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800 shadow-2xs dark:border-teal-900/60 dark:bg-teal-950/60 dark:text-teal-300">
              <span>Amateur Radio CW &bull; ITU Operating Signals &amp; Abbreviations</span>
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              CW Q-Codes &amp;{' '}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
                Radio Prosigns
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              In radiotelegraphy, shorthand codes bridge international language barriers. Master the 15 essential Q-signals, ham radio abbreviations (73, 88, CQ, DE), and live contact etiquette.
            </p>
          </div>

          {/* Section 1: Top 15 Q-Signals */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              The Top 15 Amateur Radio Q-Signals
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Add a question mark (<span className="font-mono">..--..</span>) to ask the question. Send the code alone to state the condition:
            </p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
              <table className="min-w-[580px] w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                    <th className="py-3 px-4">Q-Code</th>
                    <th className="py-3 px-4">Morse Pattern</th>
                    <th className="py-3 px-4">When Sent as Question (Q-Code?)</th>
                    <th className="py-3 px-4">When Sent as Answer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {Q_CODES.map((item) => (
                    <tr key={item.code} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-black text-teal-800 dark:text-teal-300">{item.code}</td>
                      <td className="py-3 px-4 font-mono text-xs font-bold text-slate-600 dark:text-slate-400">{item.morse}</td>
                      <td className="py-3 px-4 text-xs font-medium text-slate-700 dark:text-slate-300">{item.question}</td>
                      <td className="py-3 px-4 text-xs font-medium text-slate-900 dark:text-slate-100">{item.answer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 sm:hidden">
              &larr; Swipe table horizontally to view all columns &rarr;
            </p>
          </section>

          {/* Section 2: Essential Prosigns & CW Abbreviations */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Essential Telegraphy Prosigns &amp; Number Codes
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PROSIGNS_LIST.map((p) => (
                <div
                  key={p.symbol}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/70"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-black text-slate-900 dark:text-white">{p.symbol}</span>
                    <span className="font-mono text-xs font-bold tracking-widest text-teal-800 dark:text-teal-400">{p.morse}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{p.meaning}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Authentic Two-Way CW Contact Breakdown (QSO) */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Anatomy of a Real Amateur Radio Contact (QSO)
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Here is how two radio telegraphers conduct a quick, efficient over-the-air contact on the 40-meter amateur band:
            </p>

            <div className="mt-6 space-y-4 font-mono text-xs sm:text-sm">
              <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-4 dark:border-teal-900/60 dark:bg-teal-950/40">
                <span className="font-bold text-teal-900 dark:text-teal-200">1. Station A Calls CQ:</span>
                <p className="mt-1 text-slate-800 dark:text-slate-200 break-words">
                  CQ CQ CQ DE W1AW W1AW K
                </p>
                <p className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">
                  Meaning: Calling any station, this is station W1AW, go ahead.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <span className="font-bold text-slate-900 dark:text-slate-100">2. Station B Replies:</span>
                <p className="mt-1 text-slate-800 dark:text-slate-200 break-words">
                  W1AW DE K6RA K6RA K
                </p>
                <p className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">
                  Meaning: W1AW, this is K6RA responding, over.
                </p>
              </div>

              <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-4 dark:border-teal-900/60 dark:bg-teal-950/40">
                <span className="font-bold text-teal-900 dark:text-teal-200">3. Station A Exchanges Signal &amp; Location:</span>
                <p className="mt-1 text-slate-800 dark:text-slate-200 break-words">
                  K6RA DE W1AW GM UR RST 599 5NN BT QTH NEWINGTON CT BT NAME JOE JOE K
                </p>
                <p className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">
                  Meaning: Good morning, your signal is 599. My location is Newington, CT. My name is Joe, over.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <span className="font-bold text-slate-900 dark:text-slate-100">4. Station B Confirms &amp; Signs Off:</span>
                <p className="mt-1 text-slate-800 dark:text-slate-200 break-words">
                  W1AW DE K6RA QSL UR 599 QSL BT TNX QSO JOE 73 SK
                </p>
                <p className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">
                  Meaning: Acknowledged your report. Thanks for the contact Joe, best regards, ending contact.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Frequently Asked Questions About CW Q-Codes
            </h2>
            <div className="mt-6 space-y-4">
              {Q_CODE_FAQS.map((faq, index) => (
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

          {/* Cross Link Hub */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-teal-200 bg-teal-50/70 p-4 sm:p-6 dark:border-teal-900/60 dark:bg-teal-950/40">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Want to build your CW copying speed?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Train your ear with audio recognition drills or review the full 54-character reference.
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
                href="/morse-code-numbers"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Numbers &amp; Cut Codes &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
