import '@/styles/index.css'
import '@/styles/prism-dracula.css'
import '@/styles/prism-plus.css'
import '@fontsource/inter/variable-full.css'

import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
// import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'

// import { useEffect } from 'react'
// import { ClientReload } from '@/components/ClientReload'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
// import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from '@/constants/envValues'
import siteMetadata from '@/data/siteMetadata'

// const isDevelopment = process.env.NODE_ENV === 'development'
// const isSocket = process.env.SOCKET

function App({ Component, pageProps }) {
  // const router = useRouter()

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
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
