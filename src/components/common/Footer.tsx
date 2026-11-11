import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 border-t border-slate-200/90 bg-white dark:border-slate-800/90 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10">
          {/* Column 1: Brand & Purpose */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-lg font-bold text-teal-800 transition-colors hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-800 font-mono text-xs font-bold text-white shadow-2xs dark:bg-teal-500 dark:text-slate-950">
                .-.
              </span>
              <span>Morse Code Platform</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Free International Morse Code translator, real-time Web Audio synthesizer, audio file decoder, and comprehensive CW telegraphy learning curriculum.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 dark:border-teal-900/60 dark:bg-teal-950/60 dark:text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
              <span>Recommendation ITU-R M.1677-1</span>
            </div>
          </div>

          {/* Column 2: Tools */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400">
              Online Tools
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Morse Code Translator
                </Link>
              </li>
              <li>
                <Link href="/audio-decoder" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Audio File Decoder (.wav/.mp3)
                </Link>
              </li>
              <li>
                <Link href="/reference" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  54-Character Alphabet Chart
                </Link>
              </li>
              <li>
                <Link href="/#timing" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  PARIS Standard Timing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Learning & Practice */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400">
              Learn &amp; Practice
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/learn" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  10-Lesson Curriculum
                </Link>
              </li>
              <li>
                <Link href="/practice" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Interactive Practice Drills
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Knowledge Evaluation Quiz
                </Link>
              </li>
              <li>
                <Link href="/learn/what-is-morse-code" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Telegraphy Foundations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About, Legal & Contact */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400">
              About &amp; Legal
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/about" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  About Our Platform
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Technical Disclaimer
                </Link>
              </li>
              <li className="pt-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  100% In-Browser Execution &bull; Zero Accounts
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="mt-8 border-t border-slate-200/80 pt-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left dark:border-slate-800/80">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            &copy; 2026 Morse Code Platform. Free educational resource.
          </p>
          <p className="mt-2 text-xs text-slate-500 sm:mt-0 dark:text-slate-400">
            Designed for students, amateur radio hobbyists, and educators worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
