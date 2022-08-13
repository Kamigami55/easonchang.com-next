import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

const MAX_DISPLAY = 5

export default function Index({ posts }) {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <div className="prose prose-lg space-y-2 pt-6 pb-8 transition-colors dark:prose-dark md:space-y-5">
        <h1 className="text-center sm:text-left">
          Hey, I am Eason Chang{' '}
          <span role="img" aria-label="Hi">
            👋
          </span>
        </h1>
        <p>
          I am a Fullstack Developer. I love building <Link href="/projects">cool stuff</Link>!
        </p>
        <p>
          Here I write <Link href="/posts">posts</Link> about <b>Software Engineering</b>,{' '}
          <b>Web Dev</b>, <b>Maker</b>, and <b>Productivity</b>
        </p>
        <p>
          I currently live in Taiwan and work at{' '}
          <a href="https://www.trendmicro.com/" target="_blank" rel="noreferrer">
            Trend Micro
          </a>
        </p>
      </div>

      <div className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="prose prose-lg mb-4 dark:prose-dark">
          <h2>{t('latest-posts')}</h2>
        </div>

        <ul className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, description, path } = post
            return (
              <li key={slug}>
                <Link href={path}>
                  <article className="space-y-2 py-4 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 transition-colors dark:text-gray-100">
                          {title}
                        </h3>
                      </div>
                      <div className="prose max-w-none text-gray-500 transition-colors dark:text-gray-400">
                        {description}
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/posts"
            className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            View all &rarr;
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

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
    },
  }
}
