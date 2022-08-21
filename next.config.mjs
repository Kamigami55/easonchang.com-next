import { withContentlayer } from 'next-contentlayer';

import i18nConfig from './next-i18next.config.js';

const { i18n } = i18nConfig;

export default withContentlayer({
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'imgur.com',
      'i.imgur.com',
      'img.youtube.com',
      'i.creativecommons.org',
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
