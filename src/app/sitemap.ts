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
      url: getAbsoluteUrl('/learn'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/practice'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/quiz'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/reference'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/audio-decoder'),
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
