// Mainly follow this tutorial for configuration
// https://dev.to/heyitsarpit/eslint-and-prettier-for-react-apps-bonus-next-js-and-typescript-3e46

module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx'],
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
};
