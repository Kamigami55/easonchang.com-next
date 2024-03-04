import 'nprogress/nprogress.css';
import '@fontsource/inter/variable-full.css';
import '@/styles/index.css';
import '@/styles/prism-dracula.css';
import '@/styles/prism-plus.css';
import '@/styles/nprogress-custom.css';

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer';

// import { ClientReload } from '@/components/ClientReload'
import LayoutWrapper from '@/components/LayoutWrapper';
import CommandPalette from '@/components/organisms/CommandPalette';
import { PageSEO } from '@/components/SEO';
// import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from '@/constants/envValues'
import siteMetadata from '@/data/siteMetadata';

// const isDevelopment = process.env.NODE_ENV === 'development'
// const isSocket = process.env.SOCKET
NProgress.configure({ showSpinner: false });

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Integrate nprogress
  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, []);

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     window?.gtag?.('config', NEXT_PUBLIC_GOOGLE_ANALYTICS, {
  //       page_path: url,
  //     })
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <CommandPalette>
          <ReactWrapBalancerProvider>
            <Head>
              <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
              />
            </Head>
            <PageSEO
              title={siteMetadata.title}
              description={siteMetadata.description}
            />
            <LayoutWrapper>
              <Component {...pageProps} />
            </LayoutWrapper>
          </ReactWrapBalancerProvider>
        </CommandPalette>
      </ThemeProvider>

      <Analytics />
    </>
  );
}

export default appWithTranslation(App);
