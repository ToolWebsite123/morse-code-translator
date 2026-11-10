import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ReferenceChart } from '@/components/reference/ReferenceChart';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'International Morse Code Alphabet Chart & Reference',
  description:
    'Searchable character lookup table for International Morse Code letters (A-Z), numbers (0-9), and official punctuation marks according to ITU-R M.1677-1.',
  alternates: {
    canonical: '/reference',
  },
};

const referenceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'International Morse Code Alphabet Chart & Reference',
    url: getAbsoluteUrl('/reference'),
    description:
      'Searchable character lookup table for International Morse Code letters (A-Z), numbers (0-9), and official punctuation marks.',
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
        name: 'Reference Chart',
        item: getAbsoluteUrl('/reference'),
      },
    ],
  },
];

export default function ReferencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={referenceSchemas} />
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb / Navigation back */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              Reference Chart
            </li>
          </ol>
        </nav>

        {/* Section Header */}
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            International Morse Code Chart
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Official International Morse Code (ITU-R M.1677-1) character table.
            Search by character, Morse sequence, or description, and copy any code to your clipboard.
          </p>
        </section>

        {/* Interactive Searchable Reference Table */}
        <ReferenceChart />
      </main>

      <Footer />
    </div>
  );
}
