import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo/siteConfig';

/**
 * Generates the robots.txt file for search engine crawlers.
 * Adheres to PRD Section 17.4 and FR-021.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}

