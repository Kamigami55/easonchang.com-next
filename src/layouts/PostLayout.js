// import Comments from '@/components/comments'
import Giscus from '@giscus/react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import CustomLink from '@/components/CustomLink';
import PostBody from '@/components/organisms/PostBody';
import PageTitle from '@/components/PageTitle';
import ScrollTop from '@/components/ScrollTop';
import { BlogSEO } from '@/components/SEO';
import TableOfContents from '@/components/TableOfContents';
import siteMetadata from '@/data/siteMetadata';
import formatDate from '@/lib/utils/formatDate';

export default function PostLayout({ post, next, prev, children }) {
  const { date, title, path, description, socialImage } = post;

  const { locale } = useRouter();
  const { theme } = useTheme();

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}${path}`}
        title={`${title} - ${siteMetadata.title}`}
        description={description}
        date={date}
        socialImage={socialImage}
      />

      <ScrollTop />

      <article>
        <div className="transition-colors xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div className="mb-4">
                <PageTitle>{title}</PageTitle>
              </div>

              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <div
            className="pb-8 transition-colors lg:grid lg:grid-cols-4 lg:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 pt-10 pb-8 transition-colors dark:divide-gray-700 lg:col-span-3">
              <PostBody>{children}</PostBody>
            </div>

            {/* DESKTOP TABLE OF CONTENTS */}
            <aside>
              <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
                <TableOfContents source={post.body.raw} />
              </div>
            </aside>
          </div>

          <div
            className="divide-y divide-gray-200 pb-8 transition-colors dark:divide-gray-700"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="mx-auto max-w-prose py-6">
              <Giscus
                repo={siteMetadata.giscusConfig.repo}
                repoId={siteMetadata.giscusConfig.repoId}
                category={siteMetadata.giscusConfig.category}
                categoryId={siteMetadata.giscusConfig.categoryId}
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme === 'dark' ? 'transparent_dark' : 'light'}
                lang={locale}
                loading="lazy"
              />
            </div>

            <footer>
              <div className="flex flex-col gap-4 pt-4 text-sm font-medium sm:flex-row sm:justify-between sm:text-base xl:gap-8 xl:pt-8">
                {prev && (
                  <div className="basis-6/12">
                    <h2 className="mb-1 text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400">
                      Previous Article
                    </h2>
                    <CustomLink
                      href={prev.path}
                      className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </CustomLink>
                  </div>
                )}
                {next && (
                  <div className="basis-6/12">
                    <h2 className="mb-1 text-left text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400 sm:text-right">
                      Next Article
                    </h2>
                    <CustomLink
                      href={next.path}
                      className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </CustomLink>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}
