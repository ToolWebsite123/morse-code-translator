/**
 * Primary navigation shared by the header (desktop + mobile) and footer.
 * Only verified live routes belong here.
 */
export const PRIMARY_NAV = [
  { href: '/', label: 'Translator' },
  { href: '/learn', label: 'Learn' },
  { href: '/practice', label: 'Practice' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/reference', label: 'Reference' },
  { href: '/audio-decoder', label: 'Decoder' },
] as const;

export function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

