import { Suspense } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NavLinks, NavLinkList } from './NavLinks';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-white/[0.06] dark:bg-[#0B1220]/70 dark:supports-[backdrop-filter]:bg-[#0B1220]/55">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-focus"
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-500 to-teal-800 text-white shadow-md shadow-teal-900/20 ring-1 ring-inset ring-white/20 dark:from-teal-400 dark:to-teal-700">
            <span aria-hidden="true" className="flex items-center gap-[3px]">
              <span className="h-[5px] w-[5px] rounded-full bg-white" />
              <span className="h-[5px] w-3 rounded-full bg-white" />
              <span className="h-[5px] w-[5px] rounded-full bg-white" />
            </span>
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-sm min-[360px]:text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
              Morse Code Translator
            </span>
            <span className="hidden text-[11px] font-medium text-slate-600 sm:block dark:text-slate-300">
              International Standard &bull; Free &amp; Private
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <Suspense fallback={<NavLinkList variant="desktop" />}>
            <NavLinks variant="desktop" />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile navigation (zero-JS disclosure) */}
          <details className="group relative lg:hidden">
            <summary
              className="summary-clean touch-target inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              aria-label="Open navigation menu"
            >
              <svg className="h-5 w-5 group-open:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <svg className="hidden h-5 w-5 group-open:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 dark:shadow-black/40"
            >
              <Suspense fallback={<NavLinkList variant="mobile" />}>
                <NavLinks variant="mobile" />
              </Suspense>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
