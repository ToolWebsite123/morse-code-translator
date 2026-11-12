import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/seo/siteConfig';
import { JsonLd } from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-app',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-app',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.defaultDescription,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.defaultDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Morse Code Translator — Free Translator & Audio Decoder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.defaultDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F766E' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_CONFIG.name,
  alternateName: ['morsecodetranslatores.com', 'Morse Code Translatores'],
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.defaultDescription,
  inLanguage: 'en',
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('morse_theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0B1220] dark:text-slate-100">
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
