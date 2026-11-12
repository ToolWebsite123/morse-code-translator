/**
 * Primary navigation shared by the header (desktop + mobile) and footer.
 * Only verified live routes belong here.
 */
export const PRIMARY_NAV = [
  { href: '/', label: 'Translator' },
  { href: '/learn-morse-code', label: 'Learn' },
  { href: '/morse-code-practice', label: 'Practice' },
  { href: '/morse-code-quiz', label: 'Quiz' },
  { href: '/morse-code-alphabet', label: 'Alphabet' },
  { href: '/morse-code-audio-decoder', label: 'Audio Decoder' },
] as const;

export function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
