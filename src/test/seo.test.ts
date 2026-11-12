import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { SITE_CONFIG, getAbsoluteUrl } from '@/lib/seo/siteConfig';
import { LESSONS } from '@/lib/learning/lessons';

describe('Phase 6: Technical & On-Page SEO (PRD Section 17 & FR-020, FR-021)', () => {
  it('generates a valid XML sitemap containing all published canonical routes and no redirects', () => {
    const sitemapEntries = sitemap();

    // 16 primary & expansion routes + 10 lessons = 26 canonical routes
    expect(sitemapEntries).toHaveLength(26);

    const urls = sitemapEntries.map((e) => e.url);

    // Core routes present
    expect(urls).toContain(getAbsoluteUrl('/'));
    expect(urls).toContain(getAbsoluteUrl('/morse-code-alphabet'));
    expect(urls).toContain(getAbsoluteUrl('/morse-code-audio-decoder'));
    expect(urls).toContain(getAbsoluteUrl('/morse-code-sos'));
    expect(urls).toContain(getAbsoluteUrl('/morse-code-sheet'));
    expect(urls).toContain(getAbsoluteUrl('/morse-code-numbers'));
    expect(urls).toContain(getAbsoluteUrl('/morse-code-q-codes'));
    expect(urls).toContain(getAbsoluteUrl('/history-of-morse-code'));
    expect(urls).toContain(getAbsoluteUrl('/learn-morse-code'));
    expect(urls).toContain(getAbsoluteUrl('/morse-code-practice'));
    expect(urls).toContain(getAbsoluteUrl('/morse-code-quiz'));
    expect(urls).toContain(getAbsoluteUrl('/about'));
    expect(urls).toContain(getAbsoluteUrl('/privacy'));
    expect(urls).toContain(getAbsoluteUrl('/contact'));
    expect(urls).toContain(getAbsoluteUrl('/terms'));
    expect(urls).toContain(getAbsoluteUrl('/disclaimer'));

    // All 10 lessons present
    for (const lesson of LESSONS) {
      expect(urls).toContain(getAbsoluteUrl(`/learn/${lesson.slug}`));
    }

    // Redirect routes /translator and /faq must NOT be in sitemap
    expect(urls).not.toContain(getAbsoluteUrl('/translator'));
    expect(urls).not.toContain(getAbsoluteUrl('/faq'));

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
    expect(getAbsoluteUrl('/morse-code-alphabet')).toBe(`${SITE_CONFIG.url}/morse-code-alphabet`);
    expect(getAbsoluteUrl('morse-code-practice')).toBe(`${SITE_CONFIG.url}/morse-code-practice`);
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

  it('validates /morse-code-alphabet metadata, canonical tag, and OpenGraph specification', async () => {
    const { metadata } = await import('@/app/morse-code-alphabet/page');
    expect(metadata.title).toBe('Morse Code Alphabet Chart & Letters');
    expect(typeof metadata.title).toBe('string');
    expect((metadata.title as string).length).toBeLessThanOrEqual(60);
    expect(metadata.description).toContain('Complete International Morse Code alphabet chart');
    expect(metadata.alternates?.canonical).toBe('/morse-code-alphabet');
    expect((metadata.openGraph as { type?: string })?.type).toBe('article');
    expect(metadata.openGraph?.url).toBe(getAbsoluteUrl('/morse-code-alphabet'));
  });

  it('validates /learn-morse-code metadata, canonical tag, and OpenGraph specification', async () => {
    const { metadata } = await import('@/app/learn-morse-code/page');
    expect(metadata.title).toBe('Learn Morse Code: 10-Lesson Course');
    expect((metadata.title as string).length).toBeLessThanOrEqual(60);
    expect(metadata.description).toContain('Learn International Morse Code with our free, interactive 10-lesson course');
    expect(metadata.alternates?.canonical).toBe('/learn-morse-code');
    expect(metadata.openGraph?.title).toBe('Learn Morse Code: 10-Lesson Course');
    expect(metadata.openGraph?.url).toBe(getAbsoluteUrl('/learn-morse-code'));
  });

  it('validates /morse-code-practice metadata, canonical tag, and OpenGraph specification', async () => {
    const { metadata } = await import('@/app/morse-code-practice/page');
    expect(metadata.title).toBe('Morse Code Practice & Speed Trainer');
    expect(typeof metadata.title).toBe('string');
    expect((metadata.title as string).length).toBeLessThanOrEqual(60);
    expect(metadata.description).toContain('Practice Morse code with free interactive speed drills');
    expect(metadata.alternates?.canonical).toBe('/morse-code-practice');
    expect(metadata.openGraph?.title).toBe('Morse Code Practice & Speed Trainer');
    expect(metadata.openGraph?.url).toBe(getAbsoluteUrl('/morse-code-practice'));
  });

  it('validates /morse-code-quiz metadata, canonical tag, and OpenGraph specification', async () => {
    const { metadata } = await import('@/app/morse-code-quiz/page');
    expect(metadata.title).toBe('Morse Code Quiz & Knowledge Test');
    expect(typeof metadata.title).toBe('string');
    expect((metadata.title as string).length).toBeLessThanOrEqual(60);
    expect(metadata.description).toContain('Test your Morse code knowledge with our free 10-question standardized quiz');
    expect(metadata.alternates?.canonical).toBe('/morse-code-quiz');
    expect(metadata.openGraph?.title).toBe('Morse Code Quiz & Knowledge Test');
    expect(metadata.openGraph?.url).toBe(getAbsoluteUrl('/morse-code-quiz'));
  });

  it('validates 54-character reference mappings and categories match canonical source of truth', async () => {
    const { CANONICAL_REFERENCE_LIST } = await import('@/lib/morse');
    const { LETTER_MAPPINGS, DIGIT_MAPPINGS, PUNCTUATION_MAPPINGS } = await import('@/lib/morse/mapping');

    expect(CANONICAL_REFERENCE_LIST).toHaveLength(54);
    expect(Object.keys(LETTER_MAPPINGS)).toHaveLength(26);
    expect(Object.keys(DIGIT_MAPPINGS)).toHaveLength(10);
    expect(Object.keys(PUNCTUATION_MAPPINGS)).toHaveLength(18);

    // Verify literal slash mapping is -..-. and not /
    expect(PUNCTUATION_MAPPINGS['/']).toBe('-..-.');

    // Verify SOS components are in mapping
    expect(LETTER_MAPPINGS['S']).toBe('...');
    expect(LETTER_MAPPINGS['O']).toBe('---');
  });
});

