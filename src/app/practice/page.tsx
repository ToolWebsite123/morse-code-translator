import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { PracticeClient } from '@/components/learning/PracticeClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Interactive Morse Code Practice Drills',
  description:
    'Train your Morse code recognition with instant feedback. Practice converting letters to Morse, reading dots and dashes, or listening to audio tones.',
  alternates: {
    canonical: '/practice',
  },
};

const practiceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Interactive Morse Code Practice Drills',
    url: getAbsoluteUrl('/practice'),
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
        name: 'Practice',
        item: getAbsoluteUrl('/practice'),
      },
    ],
  },
];

export default function PracticePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={practiceSchemas} />
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Practice Header */}
        <section className="mb-6">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
            Interactive Training Drills
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Morse Code Practice
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Reinforce your character memory through rapid recall. Choose your direction, filter by category, and receive instant explanations for every attempt.
          </p>
        </section>

        {/* Practice Client Component */}
        <PracticeClient />
      </main>

      <Footer />
    </div>
  );
}

