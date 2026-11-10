import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { LESSONS, getLessonBySlug, getAdjacentLessons } from '@/lib/learning/lessons';
import { AudioPreviewButton } from '@/components/learning/AudioPreviewButton';
import { LessonExerciseCard } from '@/components/learning/LessonExerciseCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LESSONS.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: `${lesson.title} — Morse Code Course`,
    description: `${lesson.subtitle}. ${lesson.objective}`,
    alternates: {
      canonical: `/learn/${lesson.slug}`,
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(slug);

  const lessonSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lesson.title,
      description: lesson.subtitle,
      educationalLevel: 'Beginner',
      learningResourceType: 'Lesson',
      inLanguage: 'en',
      url: getAbsoluteUrl(`/learn/${lesson.slug}`),
      isPartOf: {
        '@type': 'Course',
        name: 'International Morse Code Beginner Course',
        url: getAbsoluteUrl('/learn'),
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
          name: 'Learn',
          item: getAbsoluteUrl('/learn'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: lesson.title,
          item: getAbsoluteUrl(`/learn/${lesson.slug}`),
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={lessonSchemas} />
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/learn" className="hover:text-teal-700 dark:hover:text-teal-400">
                Learn
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              Lesson {lesson.order}
            </li>
          </ol>
        </nav>

        {/* Lesson Header Card */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-mono font-bold text-teal-800 uppercase dark:text-teal-400">
              Lesson {lesson.order} of {LESSONS.length} &bull; {lesson.category}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              ~{lesson.estimatedMinutes} min read
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-slate-100">
            {lesson.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {lesson.subtitle}
          </p>

          <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50/60 p-3 text-xs text-teal-900 dark:border-teal-900/60 dark:bg-teal-950/30 dark:text-teal-200">
            <strong>Learning Objective:</strong> {lesson.objective}
          </div>
        </div>

        {/* Lesson Body Content Sections */}
        <div className="space-y-6">
          {lesson.sections.map((section, idx) => (
            <section
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {/* Interactive Examples with Audio Preview */}
          {lesson.examples.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Interactive Examples &amp; Audio
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Listen to the acoustic timing of each pattern:
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {lesson.examples.map((example, eIdx) => (
                  <div
                    key={eIdx}
                    className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/60"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {example.text}
                        </span>
                        <AudioPreviewButton morse={example.morse} label="Listen" />
                      </div>
                      <p className="mt-1 font-mono text-base font-bold tracking-widest text-teal-800 dark:text-teal-300">
                        {example.morse}
                      </p>
                    </div>
                    <p className="mt-3 text-xs text-slate-600 leading-relaxed dark:text-slate-400 border-t border-slate-200/60 pt-2 dark:border-slate-700/60">
                      {example.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interactive Comprehension Exercise Card */}
          <LessonExerciseCard lessonSlug={lesson.slug} exercise={lesson.exercise} />
        </div>

        {/* Previous / Next Lesson Navigation Footer */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
          {prev ? (
            <Link
              href={`/learn/${prev.slug}`}
              className="touch-target inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
            >
              &larr; Prev: {prev.title.split('.')[1] || prev.title}
            </Link>
          ) : (
            <Link
              href="/learn"
              className="touch-target inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
            >
              &larr; Back to Learning Hub
            </Link>
          )}

          {next ? (
            <Link
              href={`/learn/${next.slug}`}
              className="touch-target inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
            >
              Next: {next.title.split('.')[1] || next.title} &rarr;
            </Link>
          ) : (
            <Link
              href="/practice"
              className="touch-target inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
            >
              Start Practice Drills &rarr;
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

