import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/translator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/#faq',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
