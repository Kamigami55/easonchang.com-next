// import Comments from '@/components/comments'
import { useRouter } from 'next/router'

import Link from '@/components/Link'
import PostBody from '@/components/organisms/PostBody'
import PageTitle from '@/components/PageTitle'
import ScrollTop from '@/components/ScrollTop'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

export default function PostLayout({ post, next, prev, children }) {
  const { date, title, slug, description, socialImage } = post

  const { locale } = useRouter()

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/posts/${slug}`}
        title={title}
        description={description}
        date={date}
        socialImage={socialImage}
      />

      <ScrollTop />

      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div className="mb-4">
                <PageTitle>{title}</PageTitle>
              </div>

              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0">
              <PostBody>{children}</PostBody>
            </div>

            <footer>
              <div className="flex flex-col gap-4 pt-4 text-sm font-medium sm:flex-row sm:justify-between sm:text-base xl:gap-8 xl:pt-8">
                {prev && (
                  <div className="basis-6/12">
                    <h2 className="mb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Previous Article
                    </h2>
                    <Link
                      href={`/posts/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="basis-6/12">
                    <h2 className="mb-1 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-right">
                      Next Article
                    </h2>
                    <Link
                      href={`/posts/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
