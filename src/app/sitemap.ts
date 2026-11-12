import type { MetadataRoute } from 'next';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';
import { LESSONS } from '@/lib/learning/lessons';

export const dynamic = 'force-static';

/**
 * Generates the XML sitemap dynamically from published canonical pages only.
 * Adheres strictly to PRD Section 17.4 and FR-021.
 * Excludes redirect routes (/translator).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Primary static tool and feature routes
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl('/'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: getAbsoluteUrl('/learn-morse-code'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/morse-code-practice'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/morse-code-quiz'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/morse-code-alphabet'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/morse-code-audio-decoder'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/morse-code-sos'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/morse-code-sheet'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/morse-code-numbers'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/morse-code-q-codes'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/history-of-morse-code'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/about'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl('/privacy'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl('/contact'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl('/terms'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: getAbsoluteUrl('/disclaimer'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 10 canonical lesson routes
  const lessonRoutes: MetadataRoute.Sitemap = LESSONS.map((lesson) => ({
    url: getAbsoluteUrl(`/learn/${lesson.slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...mainRoutes, ...lessonRoutes];
}
