'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV, isActivePath } from './navItems';

interface NavLinksProps {
  variant: 'desktop' | 'mobile';
}

/**
 * Navigation links with active-route highlighting.
 * Rendered inside a Suspense boundary by the Header (usePathname may suspend
 * under cacheComponents for unresolved dynamic params).
 */
export function NavLinks({ variant }: NavLinksProps) {
  const pathname = usePathname();
  return <NavLinkList variant={variant} pathname={pathname} />;
}

/** Static fallback (no active state) used while the pathname resolves. */
export function NavLinkList({ variant, pathname = null }: NavLinksProps & { pathname?: string | null }) {
  if (variant === 'mobile') {
    return (
      <ul className="grid gap-1">
        {PRIMARY_NAV.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`touch-target flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-teal-50 text-teal-800 dark:bg-teal-400/10 dark:text-teal-300'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
                <span aria-hidden="true" className="font-mono text-xs text-slate-400 dark:text-slate-500">
                  &rarr;
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex items-center gap-0.5 rounded-full border border-slate-200/80 bg-white/60 p-1 shadow-xs dark:border-white/10 dark:bg-white/[0.03]">
      {PRIMARY_NAV.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-all ${
                active
                  ? 'bg-teal-700 text-white shadow-xs font-semibold dark:bg-teal-400 dark:text-slate-950'
                  : 'text-slate-600 hover:bg-teal-50/60 hover:text-teal-800 dark:text-slate-300 dark:hover:bg-teal-950/40 dark:hover:text-teal-200'
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

