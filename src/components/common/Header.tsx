import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-teal-700 text-white shadow-xs font-mono font-bold tracking-tighter dark:bg-teal-600">
            .-.
          </div>
          <div>
            <span className="block text-sm font-bold text-slate-900 sm:text-lg dark:text-slate-100 whitespace-nowrap">
              Morse Code Platform
            </span>
            <span className="hidden text-xs text-slate-600 sm:block dark:text-slate-400">
              International Standard &bull; Free &amp; Private
            </span>
          </div>
        </Link>

        {/* Navigation & Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-6">
          <nav className="flex items-center gap-0.5 sm:gap-2">
            <Link
              href="/"
              className="touch-target inline-flex items-center rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:px-3 sm:py-2 sm:text-sm"
            >
              Translator
            </Link>
            <Link
              href="/learn"
              className="touch-target inline-flex items-center rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:px-3 sm:py-2 sm:text-sm"
            >
              Learn
            </Link>
            <Link
              href="/reference"
              className="touch-target inline-flex items-center rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:px-3 sm:py-2 sm:text-sm"
            >
              Reference
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
