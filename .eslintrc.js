// Mainly follow this tutorial for configuration
// https://dev.to/heyitsarpit/eslint-and-prettier-for-react-apps-bonus-next-js-and-typescript-3e46

module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/ignore': ['contentLayerAdapter.js'],
  },
  extends: [
    'eason',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  plugins: ['tailwindcss'],
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'tailwindcss/classnames-order': 'off',
  },
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      extends: ['eason/typescript'],
    },
  ],
};
