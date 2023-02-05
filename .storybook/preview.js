import '../src/styles/index.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
  },
}

// Mock Next.js <Image/> component in storybook
// https://github.com/vercel/next.js/issues/18393#issuecomment-783269086
import * as NextImage from 'next/image'
const OriginalNextImage = NextImage.default
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

// Mock NextI18Next
// https://gist.github.com/justincy/c1075650b1d5ba448c50eaf83cbb4ffe#adding-a-storybook-decorator
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

addDecorator(storyFn => (
  <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
));
