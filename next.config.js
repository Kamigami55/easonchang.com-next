const { withContentlayer } = require('next-contentlayer')

const { i18n } = require('./next-i18next.config')

module.exports = withContentlayer({
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n,
})
