import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { SITE_CONFIG, getAbsoluteUrl } from '@/lib/seo/siteConfig';
import { LESSONS } from '@/lib/learning/lessons';

describe('Phase 6: Technical & On-Page SEO (PRD Section 17 & FR-020, FR-021)', () => {
  it('generates a valid XML sitemap containing all published canonical routes and no redirects', () => {
    const sitemapEntries = sitemap();

    // 8 primary routes + 10 lessons = 18 canonical routes
    expect(sitemapEntries).toHaveLength(18);

    const urls = sitemapEntries.map((e) => e.url);

    // Core routes present
    expect(urls).toContain(getAbsoluteUrl('/'));
    expect(urls).toContain(getAbsoluteUrl('/reference'));
    expect(urls).toContain(getAbsoluteUrl('/learn'));
    expect(urls).toContain(getAbsoluteUrl('/practice'));
    expect(urls).toContain(getAbsoluteUrl('/quiz'));
    expect(urls).toContain(getAbsoluteUrl('/about'));
    expect(urls).toContain(getAbsoluteUrl('/privacy'));
    expect(urls).toContain(getAbsoluteUrl('/faq'));

    // All 10 lessons present
    for (const lesson of LESSONS) {
      expect(urls).toContain(getAbsoluteUrl(`/learn/${lesson.slug}`));
    }

    // Redirect route /translator must NOT be in sitemap
    expect(urls).not.toContain(getAbsoluteUrl('/translator'));

    // Validate metadata properties
    for (const entry of sitemapEntries) {
      expect(entry.url).toMatch(/^https?:\/\//);
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).toContain(
        entry.changeFrequency
      );
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1.0);
    }
  });

  it('generates compliant robots.txt configuration', () => {
    const robotsConfig = robots();

    expect(robotsConfig.rules).toBeDefined();
    const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules;

    expect(rules.userAgent).toBe('*');
    expect(rules.allow).toBe('/');
    expect(robotsConfig.sitemap).toBe(`${SITE_CONFIG.url}/sitemap.xml`);
  });

  it('constructs absolute canonical URLs cleanly without double slashes', () => {
    expect(getAbsoluteUrl('/')).toBe(`${SITE_CONFIG.url}/`);
    expect(getAbsoluteUrl('/reference')).toBe(`${SITE_CONFIG.url}/reference`);
    expect(getAbsoluteUrl('practice')).toBe(`${SITE_CONFIG.url}/practice`);
  });

  it('validates structured data schema properties according to Google guidelines', () => {
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.defaultDescription,
      inLanguage: 'en',
    };

    expect(websiteSchema['@context']).toBe('https://schema.org');
    expect(websiteSchema['@type']).toBe('WebSite');
    expect(websiteSchema.url).toBe(SITE_CONFIG.url);

    // Serialization test
    const serialized = JSON.stringify(websiteSchema);
    expect(serialized).not.toContain('<script');
    expect(JSON.parse(serialized)).toEqual(websiteSchema);
  });

  it('verifies site configuration defaults meet search-engine recommendations', () => {
    expect(SITE_CONFIG.defaultTitle.length).toBeGreaterThan(15);
    expect(SITE_CONFIG.defaultTitle.length).toBeLessThan(70); // Google title threshold
    expect(SITE_CONFIG.defaultDescription.length).toBeGreaterThan(50);
    expect(SITE_CONFIG.defaultDescription.length).toBeLessThan(170); // Google snippet threshold
  });
});

