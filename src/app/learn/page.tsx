import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { LearningHubClient } from '@/components/learning/LearningHubClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';
import { LESSONS } from '@/lib/learning/lessons';

export const metadata: Metadata = {
  title: 'Morse Code Learning Hub — 10 Beginner Lessons',
  description:
    'Free interactive Morse code course. Master dots, dashes, the 26 Latin letters, numbers, punctuation, and timing with structured lessons and instant exercises.',
  alternates: {
    canonical: '/learn',
  },
};

const learnHubSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'International Morse Code Beginner Course',
    description:
      'A structured 10-lesson interactive curriculum teaching Morse code fundamentals, timing, alphabet, numbers, punctuation, and listening skills.',
    provider: {
      '@type': 'Organization',
      name: 'Morse Code Platform',
      sameAs: getAbsoluteUrl('/'),
    },
    educationalLevel: 'Beginner',
    isAccessibleForFree: true,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT40M',
    },
    itemListElement: LESSONS.map((lesson) => ({
      '@type': 'ListItem',
      position: lesson.order,
      name: lesson.title,
      url: getAbsoluteUrl(`/learn/${lesson.slug}`),
    })),
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
        name: 'Learn',
        item: getAbsoluteUrl('/learn'),
      },
    ],
  },
];

export default function LearnHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={learnHubSchemas} />
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <section className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
            Structured Learning Curriculum
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Learn International Morse Code
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            A beginner-friendly 10-lesson sequence designed to take you from basic timing rules to decoding complete messages.
            100% free, interactive, and private — your progress stays on your device.
          </p>
        </section>

        {/* Interactive Client Component */}
        <LearningHubClient />
      </main>

      <Footer />
    </div>
  );
}

