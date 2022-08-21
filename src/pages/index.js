/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-key */
import { compareDesc } from 'date-fns'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Link from '@/components/Link'
import PostList from '@/components/organisms/PostList'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { allPosts } from '@/lib/contentLayerAdapter'
import generateRSS from '@/lib/utils/generateRSS'

const MAX_DISPLAY = 5

export default function Index({ posts }) {
  const { t } = useTranslation(['indexPage', 'common'])
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <div className="prose my-12 space-y-2 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
        <h1 className="text-center sm:text-left">{t('intro-title')}</h1>
        <p>
          <Trans i18nKey="intro-1" t={t} components={[<Link href="/projects" />]} />
        </p>
        <p>
          <Trans i18nKey="intro-2" t={t} components={[<Link href="/posts" />]} />
        </p>
        <p>
          <Trans
            i18nKey="intro-3"
            t={t}
            components={[<a href="https://www.trendmicro.com/" target="_blank" rel="noreferrer" />]}
          />
        </p>
      </div>

      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>{t('latest-posts')}</h2>
        </div>

        <PostList posts={posts.slice(0, MAX_DISPLAY)} />
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6 md:text-lg">
          <Link
            href="/posts"
            className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            {t('view-all', { ns: 'common' })} &rarr;
          </Link>
        </div>
      )}
    </>
  )
}

export async function getStaticProps({ locale }) {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  await generateRSS()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
      posts,
    },
  }
}
