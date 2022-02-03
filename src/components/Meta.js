import Head from 'next/head'

import { SITE_DESCRIPTION, SITE_TITLE } from '@/constants/siteMeta'

export default function Meta() {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{SITE_TITLE}</title>
      <meta name="description" content={SITE_DESCRIPTION} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
