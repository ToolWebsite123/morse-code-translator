import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { QuizClient } from '@/components/learning/QuizClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Morse Code Quiz & Knowledge Assessment',
  description:
    'Test your International Morse Code skills with our 10-question standardized quiz. Review timing, letters, digits, and auditory recognition with instant score explanations.',
  alternates: {
    canonical: '/quiz',
  },
};

const quizSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Morse Code Quiz & Knowledge Assessment',
    url: getAbsoluteUrl('/quiz'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
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
        name: 'Quiz',
        item: getAbsoluteUrl('/quiz'),
      },
    ],
  },
];

export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={quizSchemas} />
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <section className="mb-6">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
            Standardized Assessment
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Morse Code Quiz
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Evaluate your Morse code comprehension across fundamentals, character recognition, timing, and sound signals.
            Receive comprehensive feedback with zero account creation required.
          </p>
        </section>

        {/* Quiz Client Component */}
        <QuizClient />
      </main>

      <Footer />
    </div>
  );
}

