// @ts-check

import { withContentlayer } from 'next-contentlayer';

import i18nConfig from './next-i18next.config.js';

const { i18n } = i18nConfig;

/**
 * @type {import('next').NextConfig}
 **/
export default withContentlayer({
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // For migration period
    ignoreBuildErrors: true,
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
  // Enable SWC minification for building time performance
  // https://nextjs.org/docs/advanced-features/compiler#minification
  swcMinify: true,
});
