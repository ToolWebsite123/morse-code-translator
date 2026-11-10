import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              International Morse Code Translator &amp; Learning Platform
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Privacy-first open utility &bull; Pure browser-local execution &bull; No accounts required
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
              Translator
            </Link>
            <Link href="/learn" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
              Learn
            </Link>
            <Link href="/practice" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
              Practice
            </Link>
            <Link href="/quiz" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
              Quiz
            </Link>
            <Link href="/reference" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
              Reference Chart
            </Link>
            <Link href="/about" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
              Privacy
            </Link>
            <Link href="/faq" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
              FAQ
            </Link>
          </nav>
        </div>

        <div className="mt-6 border-t border-slate-200/80 pt-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          <p>
            Adheres to the International Morse Code standard (ITU-R M.1677-1). Built for students, radio hobbyists, and educators.
          </p>
        </div>
      </div>
    </footer>
  );
}
