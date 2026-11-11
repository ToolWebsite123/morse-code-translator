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
    title: lesson.title,
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
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={lessonSchemas} />
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

      <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Centered Breadcrumb Navigation Pill */}
        <div className="mb-6 flex justify-center">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-1 text-xs text-slate-500 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-300 dark:text-slate-600">/</li>
              <li>
                <Link href="/learn" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
                  Learn
                </Link>
              </li>
              <li className="text-slate-300 dark:text-slate-600">/</li>
              <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
                Lesson {lesson.order}
              </li>
            </ol>
          </nav>
        </div>

        {/* 2026 Lesson Header Card */}
        <div className="table-box-glow mb-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-teal-50 px-2.5 py-1 font-mono text-xs font-extrabold text-teal-800 dark:bg-teal-950/70 dark:text-teal-300">
                Lesson {String(lesson.order).padStart(2, '0')} of {String(LESSONS.length).padStart(2, '0')}
              </span>
              <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wide dark:border-slate-700 dark:text-slate-400">
                {lesson.category}
              </span>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              ⏱ ~{lesson.estimatedMinutes} min read
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-slate-100">
            {lesson.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {lesson.subtitle}
          </p>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-teal-200/80 bg-teal-50/70 p-4 text-xs text-teal-950 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-200">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[11px] font-bold text-white dark:bg-teal-500">
              ✓
            </span>
            <div className="space-y-0.5">
              <strong className="font-bold text-teal-900 dark:text-teal-200">Learning Objective:</strong>
              <p className="leading-relaxed text-teal-800 dark:text-teal-300">{lesson.objective}</p>
            </div>
          </div>
        </div>

        {/* Lesson Body Content Sections */}
        <div className="space-y-6">
          {lesson.sections.map((section, idx) => (
            <section
              key={idx}
              className="box-glow rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/90 sm:p-8"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-full bg-teal-600 dark:bg-teal-400" />
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {section.heading}
                </h2>
              </div>
              <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {/* Interactive Examples with Audio Preview */}
          {lesson.examples.length > 0 && (
            <section className="box-glow rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-full bg-teal-600 dark:bg-teal-400" />
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Interactive Audio Drills &amp; Examples
                </h2>
              </div>
              <p className="mt-2 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Click <strong className="text-teal-700 dark:text-teal-300">Listen</strong> to hear the acoustic cadence and timing of each Morse pattern at 15 WPM:
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {lesson.examples.map((example, eIdx) => (
                  <div
                    key={eIdx}
                    className="box-glow flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 p-4.5 dark:border-slate-700/80 dark:bg-slate-800/60"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                          {example.text}
                        </span>
                        <AudioPreviewButton morse={example.morse} label="Listen" />
                      </div>
                      <p className="mt-2 font-mono text-xl font-bold tracking-widest text-teal-700 dark:text-teal-300">
                        {example.morse}
                      </p>
                    </div>
                    <p className="mt-3.5 border-t border-slate-200/70 pt-2.5 text-xs leading-relaxed text-slate-600 dark:border-slate-700/70 dark:text-slate-400">
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
              className="btn-tactile touch-target inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs hover:border-teal-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:bg-slate-700 sm:text-sm"
            >
              &larr; Prev: {prev.title.split('.')[1]?.trim() || prev.title}
            </Link>
          ) : (
            <Link
              href="/learn"
              className="btn-tactile touch-target inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs hover:border-teal-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:bg-slate-700 sm:text-sm"
            >
              &larr; All Lessons Hub
            </Link>
          )}

          <Link
            href="/learn"
            className="btn-tactile text-xs font-semibold text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300"
          >
            Curriculum Overview
          </Link>

          {next ? (
            <Link
              href={`/learn/${next.slug}`}
              className="btn-tactile touch-target inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
            >
              Next: {next.title.split('.')[1]?.trim() || next.title} &rarr;
            </Link>
          ) : (
            <Link
              href="/practice"
              className="btn-tactile touch-target inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
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

