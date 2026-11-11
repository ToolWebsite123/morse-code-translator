import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

const CONTACT_EMAIL = 'morecodetranslator@gmail.com';

export const metadata: Metadata = {
  title: 'Terms of Use & Service Rules',
  description:
    'Review the Terms of Use for Morse Code Platform. Understand permitted educational use, client-side execution, intellectual property, and service rules.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Use & Service Rules',
    description:
      'Review the Terms of Use for Morse Code Platform. Understand permitted educational use, client-side execution, intellectual property, and service rules.',
    url: getAbsoluteUrl('/terms'),
    siteName: 'Morse Code Platform',
    type: 'website',
  },
};

const termsSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use',
    url: getAbsoluteUrl('/terms'),
    description:
      'Terms of Use and conditions governing access to the Morse Code Translator & Learning Platform.',
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
        name: 'Terms of Use',
        item: getAbsoluteUrl('/terms'),
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={termsSchemas} />
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

      <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-4 pt-3 pb-12 sm:px-6 sm:pt-4 sm:pb-16 lg:px-8">
        {/* Centered Breadcrumb Pill */}
        <nav aria-label="Breadcrumb" className="mb-2.5 flex justify-center">
          <ol className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1 text-xs text-slate-500 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <li>
              <Link href="/" className="transition-colors hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              Terms of Use
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <section className="mb-8 text-center sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs transition-colors hover:border-teal-400 dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Legal Agreement</span>
            <span className="text-teal-300 dark:text-teal-700">&bull;</span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-teal-800 dark:text-teal-200">
              Free Access
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            Terms of{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Use
            </span>
          </h1>

          <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            Effective Date: [EFFECTIVE DATE] &bull; Last Updated: [LAST UPDATED]
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Please read these terms carefully before accessing or using our free online Morse Code translation and educational learning platform.
          </p>
        </section>

        {/* Structured Terms Sections */}
        <div className="space-y-6">
          {/* Section 1: Acceptance */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              By accessing, browsing, or using the Morse Code Translator &amp; Learning Platform (referred to as the &ldquo;Service,&rdquo; &ldquo;Website,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) acknowledge that you have read, understood, and agree to be bound by these Terms of Use (&ldquo;Terms&rdquo;), along with our{' '}
              <Link href="/privacy" className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800 dark:text-teal-400">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/disclaimer" className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800 dark:text-teal-400">
                Disclaimer
              </Link>.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              If you do not agree to all provisions contained within these Terms, you must immediately cease accessing and using this Website.
            </p>
          </section>

          {/* Section 2: Description of Service */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              2. Description of the Service &amp; Free Access
            </h2>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              2.1 Free Educational Utility
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              This Website provides free, accessible online tools and educational content related to International Morse Code, telegraphy, and continuous wave (CW) communication. Features include:
            </p>
            <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>Instant bidirectional text-to-Morse and Morse-to-text translation.</li>
              <li>Interactive Web Audio API tone synthesis and adjustable WPM speed playback.</li>
              <li>On-screen visual light signal beacon simulation.</li>
              <li>Uncompressed 16-bit PCM WAV audio file generation and export.</li>
              <li>Browser-local audio file decoding (<Link href="/audio-decoder" className="text-teal-700 underline dark:text-teal-400">/audio-decoder</Link>).</li>
              <li>Self-paced Morse code curriculum (10 lessons), interactive quizzes, and speed drills.</li>
            </ul>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              2.2 No Account or Registration Required
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              The Service is provided without user registration, accounts, passwords, or subscription fees. We do not require, charge for, or collect payment for access to any part of this platform.
            </p>
          </section>

          {/* Section 3: Permitted & Acceptable Use */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              3. Permitted &amp; Acceptable Use
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              You are granted a limited, revocable, non-exclusive, non-transferable license to access and use the Website solely for lawful, non-commercial, educational, and personal evaluation purposes in accordance with these Terms.
            </p>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              Prohibited Conduct
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              When using the Service, you agree that you will <strong>not</strong>:
            </p>
            <ol className="mt-2.5 list-decimal space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>
                <strong>Unlawful Use:</strong> Violate any applicable local, national, or international law, treaty, or regulation.
              </li>
              <li>
                <strong>Infrastructure Interference:</strong> Use any automated device, script, spider, robot, scraper, or crawl mechanism in a manner that places an unreasonable, disproportionate, or disruptive load on our hosting infrastructure, edge network, or bandwidth.
              </li>
              <li>
                <strong>Malicious Attacks:</strong> Introduce viruses, Trojan horses, worms, logic bombs, or other technologically harmful or malicious materials into the platform or against other users.
              </li>
              <li>
                <strong>Denial of Service:</strong> Attempt to gain unauthorized access to, interfere with, damage, disrupt, or launch denial-of-service (DoS/DDoS) attacks against any part of the Website, server network, or hosting infrastructure.
              </li>
              <li>
                <strong>Circumvention of Limits:</strong> Attempt to circumvent technical boundaries, rate limits, file size caps (e.g., the 10 MB audio decoder limit), or security safeguards.
              </li>
              <li>
                <strong>Harassment &amp; Defamation:</strong> Use the platform to generate, transmit, or disseminate content that is unlawful, defamatory, harassing, abusive, threatening, obscene, or fraudulent.
              </li>
              <li>
                <strong>Deceptive Framing:</strong> Frame, mirror, or wrap the Website or its core toolsets within another commercial interface in a manner that deceives consumers regarding the origin or ownership of the Service.
              </li>
            </ol>
          </section>

          {/* Section 4: User Responsibilities & Data */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              4. User Responsibilities &amp; Data Retention
            </h2>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              4.1 Client-Side Execution &amp; Message Content
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              Because all translation calculations and audio operations execute locally within your device&apos;s web browser, <strong>you retain sole responsibility for all text and audio inputs you enter or process through the Service.</strong> We do not monitor, inspect, log, or maintain records of your inputs. You are responsible for ensuring that you have all necessary rights to any audio files or text you decode or translate.
            </p>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              4.2 Browser Storage (<code className="font-mono text-xs">localStorage</code>)
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              Any educational progress (such as lesson completions, quiz score records, or practice attempt statistics) is stored exclusively on your local device via your web browser&apos;s <code className="font-mono text-xs">localStorage</code> mechanism.
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>Clearing your browser cookies, storage, cache, or site data will erase this saved progress.</li>
              <li>We do not possess backup copies of your local learning data and cannot recover lost local browser data.</li>
            </ul>
          </section>

          {/* Section 5: Intellectual Property */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              5. Intellectual Property Rights
            </h2>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              5.1 Public Domain Standards (Morse Code)
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              International Morse Code—including the standard 54-character mapping codified under International Telecommunication Union Recommendation ITU-R M.1677-1—resides firmly in the public domain. We do not claim ownership of the Morse code alphabet, standard timing ratios (PARIS standard), or historical continuous wave conventions.
            </p>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              5.2 Proprietary Content &amp; Platform Assets
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              Except for public domain standards and third-party open-source components, all original software code, website architecture, page layout and design system, user interface assets, typography configurations, illustrations, original lesson text, quiz questions, interactive exercise prompts, logos, and compilation of content on the Website are the intellectual property of [WEBSITE OPERATOR / LEGAL ENTITY NAME] or its licensors and are protected by applicable copyright, trademark, and unfair competition laws.
            </p>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              5.3 Personal &amp; Educational Use License
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              You may print, download, or bookmark individual lessons, reference charts, or practice guides solely for personal, educational, classroom, or amateur radio training purposes, provided that you preserve all original copyright and attribution notices. You may not republish, sell, redistribute, or commercially exploit our original curriculum or design assets without prior written authorization from [WEBSITE OPERATOR / LEGAL ENTITY NAME].
            </p>
          </section>

          {/* Section 6: Service Availability */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              6. Service Availability &amp; Modifications
            </h2>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              6.1 &ldquo;As-Is&rdquo; Availability
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              We provide the Website and its toolsets on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis. We do not warrant that the Website will be available at any particular time, without interruption, or that bugs will be immediately corrected.
            </p>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              6.2 Right to Modify or Discontinue
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              We reserve the right at our sole discretion, with or without notice, to modify, update, pause, or permanently discontinue any feature, tool, lesson, or portion of the Website.
            </p>
          </section>

          {/* Section 7: Accuracy Limitations */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              7. Accuracy &amp; Performance Limitations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              While we strive to implement rigorous standards (such as ITU-R M.1677-1 and accurate time-domain envelope analysis for audio decoding):
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>The translation, playback, and decoding engines are automated tools provided for educational and recreational convenience.</li>
              <li>Audio file decoding depends upon signal-to-noise ratio, frequency purity, background interference, and recording quality.</li>
              <li>The platform is <strong>not certified or intended for life-critical, medical, military defense, maritime distress, or legal evidence applications.</strong></li>
            </ul>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              For further reliability disclosures, please review our comprehensive{' '}
              <Link href="/disclaimer" className="font-semibold text-teal-700 underline dark:text-teal-400">
                Disclaimer
              </Link>.
            </p>
          </section>

          {/* Section 8: Third-Party Links */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              8. Third-Party Links &amp; External References
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              The Website may provide hyperlinks to third-party websites or organizations for informational purposes (e.g., itu.int or amateur radio documentation). We do not inspect, endorse, guarantee, or assume legal responsibility for the content, privacy practices, terms, or operational reliability of any third-party websites.
            </p>
          </section>

          {/* Section 9: Disclaimer of Warranties */}
          <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-amber-900/60 dark:bg-amber-950/30">
            <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300">
              <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-lg font-bold sm:text-xl">
                9. Disclaimer of Warranties
              </h2>
            </div>
            <p className="mt-3 text-xs font-semibold leading-relaxed uppercase text-amber-950 sm:text-sm dark:text-amber-200">
              To the maximum extent permitted by applicable law, the Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis, without warranties of any kind, either express, implied, statutory, or otherwise. We expressly disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, non-infringement, and quiet enjoyment.
            </p>
          </section>

          {/* Section 10: Limitation of Liability */}
          <section className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-rose-900/60 dark:bg-rose-950/30">
            <div className="flex items-center gap-2.5 text-rose-800 dark:text-rose-300">
              <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg font-bold sm:text-xl">
                10. Limitation of Liability
              </h2>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-rose-950 sm:text-sm dark:text-rose-200">
              To the maximum extent permitted by applicable law, in no event shall [WEBSITE OPERATOR / LEGAL ENTITY NAME], its creators, developers, contributors, or hosting providers be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Service.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-rose-950 sm:text-sm dark:text-rose-200">
              If, notwithstanding the foregoing, liability is found against us under applicable law, our aggregate liability for all claims arising out of or relating to these Terms or the Service shall not exceed the total amount of <strong>One Hundred United States Dollars ($100.00 USD)</strong> or the amount you paid to us in the preceding twelve months ($0.00).
            </p>
          </section>

          {/* Section 11: Indemnification */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              11. Indemnification
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              You agree to defend, indemnify, and hold harmless [WEBSITE OPERATOR / LEGAL ENTITY NAME], its contributors, developers, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or reasonable legal fees arising out of your violation of these Terms of Use or your misuse of the Service.
            </p>
          </section>

          {/* Section 12: Governing Law & Dispute Resolution */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              12. Governing Law &amp; Dispute Resolution
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>
                <strong>Governing Law:</strong> These Terms and any dispute arising from them shall be governed by and construed in accordance with the laws of [GOVERNING JURISDICTION / COUNTRY OR STATE], without giving effect to any principles of conflicts of law.
              </li>
              <li>
                <strong>Competent Jurisdiction:</strong> Any legal action arising out of these Terms shall be instituted exclusively in the competent courts located in [COMPETENT COURTS / CITY OR REGION].
              </li>
              <li>
                <strong>Informal Resolution First:</strong> Before initiating formal proceedings, you and we agree to attempt in good faith to resolve any dispute through informal written notice by contacting{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-teal-700 underline dark:text-teal-400">
                  {CONTACT_EMAIL}
                </a>.
              </li>
            </ul>
          </section>

          {/* Section 13: Severability & Entire Agreement */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              13. Severability &amp; Entire Agreement
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              If any provision of these Terms is determined to be invalid, illegal, or unenforceable, that provision shall be enforced to the maximum extent permissible, and the remaining provisions shall continue in full force and effect.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              These Terms, together with our Privacy Policy, Cookie Policy, and Disclaimer, constitute the sole and entire agreement between you and us regarding the Service.
            </p>
          </section>

          {/* Section 14: Changes to Terms */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              14. Changes to Terms
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              We reserve the right to revise or amend these Terms at any time in our sole discretion. When updates occur, we will revise the &ldquo;Last Updated&rdquo; date at the top of this page. Continued use of our Service after revisions become effective constitutes your acceptance of the revised terms.
            </p>
          </section>

          {/* Section 15: Contact Information */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
              15. Contact Information
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              If you have questions, feedback, or legal inquiries concerning these Terms of Use, please reach out to us:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
              <li>
                <strong>Entity / Project Name:</strong> [WEBSITE OPERATOR / LEGAL ENTITY NAME]
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono text-teal-700 underline dark:text-teal-400">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <strong>Mailing Address:</strong> [PHYSICAL / MAILING ADDRESS]
              </li>
              <li>
                <strong>Official Website:</strong>{' '}
                <a href="https://morsecodetranslatores.com/" className="font-mono text-teal-700 underline dark:text-teal-400">
                  https://morsecodetranslatores.com/
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Pre-Footer Action Banner */}
        <section aria-label="Legal Disclosures & Related Policies" className="mt-12 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-white to-teal-50/40 p-8 text-center shadow-lg shadow-teal-900/5 sm:p-10 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/30">
          <div className="mx-auto max-w-xl">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Related Policies
            </span>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
              Transparency &amp; Legal Disclosures
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
              Explore our technical disclaimers, data retention commitments, and support contact channels.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/privacy"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 sm:text-sm dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
              >
                Privacy Policy &rarr;
              </Link>
              <Link
                href="/disclaimer"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Technical Disclaimer &rarr;
              </Link>
              <Link
                href="/contact"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Contact Support &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

