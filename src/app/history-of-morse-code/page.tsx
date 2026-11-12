import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'History of Morse Code: Telegraphy Timeline (1837 to Present)',
  description:
    'Discover the history of Morse code and telegraphy. Explore the 1837–2004 timeline, Samuel Morse and Alfred Vail, transatlantic cables, and ITU standardization.',
  alternates: {
    canonical: '/history-of-morse-code',
  },
  openGraph: {
    title: 'History of Morse Code: Telegraphy Timeline (1837 to Present)',
    description:
      'Discover the history of Morse code and telegraphy. Explore the 1837–2004 timeline, Samuel Morse and Alfred Vail, transatlantic cables, and ITU standardization.',
    url: getAbsoluteUrl('/history-of-morse-code'),
    siteName: 'Morse Code Translator',
    type: 'article',
  },
};

const TIMELINE_EVENTS = [
  {
    year: '1837',
    title: 'The Electromagnetic Telegraph Patent',
    description:
      'American portrait painter and inventor Samuel F.B. Morse patents the single-wire electromagnetic recording telegraph, partnering with machinist Alfred Vail and Leonard Gale.',
  },
  {
    year: '1844',
    title: '"What Hath God Wrought"',
    description:
      'On May 24, 1844, Samuel Morse transmits the world\'s first official intercity telegraph from the Supreme Court chamber in Washington, D.C., to Alfred Vail at the Mount Clare depot in Baltimore, Maryland.',
  },
  {
    year: '1848',
    title: 'The Continental (International) Revision',
    description:
      'German inspector Friedrich Clemens Gerke adapts the original American code for the Hamburg-Cuxhaven telegraph line, eliminating irregular internal spaces and establishing the foundation for modern International Morse Code.',
  },
  {
    year: '1858',
    title: 'First Transatlantic Telegraph Cable',
    description:
      'Financed by Cyrus West Field, the first underwater transatlantic telegraph cable connects Valentia Island, Ireland, with Heart\'s Content, Newfoundland, allowing messages between Queen Victoria and President Buchanan.',
  },
  {
    year: '1865',
    title: 'Founding of the International Telegraph Union (ITU)',
    description:
      'Representatives of 20 European nations convene in Paris to sign the first International Telegraph Convention, creating the ITU and officially standardizing International Morse Code across national boundaries.',
  },
  {
    year: '1899',
    title: 'Wireless Radiotelegraphy Born',
    description:
      'Italian inventor Guglielmo Marconi sends the first wireless Morse code signals across the English Channel, freeing telegraphy from copper landlines and enabling ship-to-shore maritime communication.',
  },
  {
    year: '1906',
    title: 'Adoption of the Universal SOS Prosign',
    description:
      'The Berlin International Radiotelegraphic Convention ratifies SOS (... --- ...) as the worldwide maritime distress signal, replacing proprietary company codes like the Marconi Company\'s CQD.',
  },
  {
    year: '1912',
    title: 'The Titanic Disaster & 24/7 Radio Watches',
    description:
      'Following the loss of RMS Titanic, the 1914 International Convention for the Safety of Life at Sea (SOLAS) mandates 24-hour radio watches for all passenger vessels and standardized distress frequencies.',
  },
  {
    year: '1999',
    title: 'Retirement from Maritime Safety (GMDSS)',
    description:
      'Commercial maritime shipping officially transitions from radiotelegraphy to satellite and automated digital systems under the Global Maritime Distress and Safety System (GMDSS).',
  },
  {
    year: '2004',
    title: 'The @ (Commercial At) Symbol Added',
    description:
      'In December 2003, the ITU adopts recommendation ITU-R M.1677, introducing the first new Morse character in over 60 years: the @ symbol (.--.-., combining A and C), allowing telegraphers to exchange email addresses.',
  },
];

const HISTORY_FAQS = [
  {
    question: 'Who really invented Morse code?',
    answer:
      'While Samuel Morse conceived the electromagnetic telegraph and secured the funding and patents, historical records show that mechanical engineer Alfred Vail was primarily responsible for inventing the dot-and-dash code and the mechanical sending key. Vail visited a local Morristown newspaper printing office to count the letters in the type cases, giving the most frequent letters (like E and T) the shortest codes.',
  },
  {
    question: 'What was the very first message sent by Morse code?',
    answer:
      'The first official intercity message transmitted over Morse\'s electric telegraph line on May 24, 1844, was: "What hath God wrought" (Numbers 23:23). It was chosen by Annie Ellsworth, daughter of U.S. Patent Commissioner Henry Leavitt Ellsworth.',
  },
  {
    question: 'Why was American Morse code replaced by International Morse code?',
    answer:
      'The original American Morse code contained three different dash lengths and internal pauses inside letters (such as C being dot-dot space dot). When transmitting over underwater cables or noisy wireless radio, these spaces caused frequent operator misunderstandings. The International (Continental) code eliminated intra-character pauses and standardized dashes to exactly three units.',
  },
  {
    question: 'Is Morse code still used today?',
    answer:
      'Yes. While military and commercial maritime fleets have retired Morse code for satellite GMDSS, it remains vibrantly active among hundreds of thousands of licensed amateur radio operators worldwide (Continuous Wave or CW), in aviation navigation radio beacons (VOR/NDB stations transmit their identifiers in Morse), and among survivalists and assistive technology communicators.',
  },
];

export default function HistoryOfMorseCodePage() {
  const historySchemas = [
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
          name: 'History of Morse Code',
          item: getAbsoluteUrl('/history-of-morse-code'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'History of Morse Code: Telegraphy Timeline (1837 to Present)',
      description:
        'Comprehensive historical overview of the invention of Morse code, Alfred Vail\'s frequency discovery, transatlantic telegraphy, and the evolution of ITU-R M.1677-1.',
      mainEntityOfPage: getAbsoluteUrl('/history-of-morse-code'),
      author: {
        '@type': 'Organization',
        name: 'Morse Code Translator',
        url: getAbsoluteUrl('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HISTORY_FAQS.map((faq) => ({
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
      <JsonLd data={historySchemas} />
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
                History of Morse Code
              </li>
            </ol>
          </nav>

          {/* Hero Banner */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800 shadow-2xs dark:border-teal-900/60 dark:bg-teal-950/60 dark:text-teal-300">
              <span>Telecommunications Heritage &bull; 1837 to Present</span>
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              The History of{' '}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
                Morse Code &amp; Telegraphy
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              From the first copper wire strung between Washington and Baltimore to modern satellite communications, discover how a sequence of electrical pulses connected human civilization.
            </p>
          </div>

          {/* Interactive Chronological Timeline */}
          <section className="mt-12 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-10">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Chronological Telegraphy Timeline (1837 &ndash; 2004)
            </h2>
            <div className="mt-8 relative border-l-2 border-teal-600/30 pl-5 space-y-8 sm:pl-8 dark:border-teal-400/30">
              {TIMELINE_EVENTS.map((event, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot on Timeline */}
                  <div className="absolute -left-[27px] top-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-teal-600 bg-white shadow-xs group-hover:scale-125 transition-transform dark:border-teal-400 dark:bg-slate-950 sm:-left-[39px]" />
                  
                  <span className="font-mono text-sm font-black text-teal-800 dark:text-teal-300">
                    {event.year}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Historical Deep Dive: Alfred Vail & Letter Frequency */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              The Unsung Genius: Alfred Vail &amp; Letter Frequency
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Although Samuel F.B. Morse became the household name, historical correspondence confirms that his mechanical partner, <strong>Alfred Vail</strong>, revolutionized the telegraph system.
              </p>
              <p>
                Morse originally planned to transmit numbers corresponding to a complete printed dictionary, requiring operators to look up each word in a reference book. Vail recognized this was impractical and designed an alphabet-based code. To make transmission as fast as possible, Vail visited a local newspaper printing office in Morristown, New Jersey, and examined the compositor type cases.
              </p>
              <p>
                He counted which movable lead letters the printers kept in the greatest quantity. Finding that <strong>E</strong> and <strong>T</strong> were the most common letters in English, he assigned them the shortest symbols: <span className="font-mono font-bold">.</span> for E and <span className="font-mono font-bold">-</span> for T. Less common letters, such as Q and Z, received longer sequences. This information-theoretic insight predated Claude Shannon&apos;s data compression principles by over a century.
              </p>
            </div>
          </section>

          {/* American vs International Morse Comparison */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              American Morse vs. International Morse Code
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Two distinct codes developed historically. The American version powered domestic railroads, while International Morse conquered oceanic cables and wireless radio:
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                  American Railroad Morse (1844)
                </span>
                <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li>&bull; Designed for mechanical click-clack sounders on landlines.</li>
                  <li>&bull; Included internal pauses inside letters (e.g., C was <span className="font-mono">.. .</span>).</li>
                  <li>&bull; Used dashes of varying lengths (L was a long dash, 0 was extra-long).</li>
                  <li>&bull; Prone to severe distortion over transatlantic cables.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-4 sm:p-5 dark:border-teal-900/60 dark:bg-teal-950/40">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300">
                  International Morse Code (ITU-R M.1677-1)
                </span>
                <ul className="mt-3 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li>&bull; Standardized by Friedrich Clemens Gerke (1848) and the ITU (1865).</li>
                  <li>&bull; Standardized timing: Dot = 1, Dash = 3, strictly no intra-letter pauses.</li>
                  <li>&bull; Optimized for acoustic tone beeps and radio frequencies.</li>
                  <li>&bull; Universal global standard across ham radio, aviation, and emergency signaling.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Frequently Asked Questions About Telegraphy History
            </h2>
            <div className="mt-6 space-y-4">
              {HISTORY_FAQS.map((faq, index) => (
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
                Want to learn the code yourself?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Start with our free 10-lesson interactive beginner curriculum.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/learn-morse-code"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                10-Lesson Curriculum &rarr;
              </Link>
              <Link
                href="/morse-code-sos"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                SOS Distress History &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
