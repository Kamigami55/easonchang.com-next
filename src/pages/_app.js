import '@/styles/index.css'
import '@/styles/prism-dracula.css'
import '@fontsource/inter/variable-full.css'

import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

// import Analytics from '@/components/analytics'
// import { ClientReload } from '@/components/ClientReload'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

// const isDevelopment = process.env.NODE_ENV === 'development'
// const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
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
