import { compareDesc } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageSEO } from '@/components/SEO'
import { LOCALES, POSTS_PER_PAGE } from '@/constants/siteMeta'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allPosts } from '@/lib/contentLayerAdapter'
import { allRedirects } from '@/utils/getAllRedirects'
import { unifyPath } from '@/utils/unifyPath'

export async function getStaticPaths() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  let paths = []
  LOCALES.forEach((locale) => {
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    const pathsToAppend = Array.from({ length: totalPages }, (_, i) => ({
      params: { page: (i + 1).toString() },
      locale: locale,
    }))
    paths = [...paths, ...pathsToAppend]
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params, locale }) {
  const { page } = params

  // Handle redirect logic
  const path = unifyPath('/page/' + page)
  const matchedRedirectRule = allRedirects.find((rule) => rule.source === path)
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    }
  }

  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostListPage({ posts, initialDisplayPosts, pagination }) {
  const { t } = useTranslation(['common'])

  return (
    <>
      <PageSEO
        title={`${t('all-posts')} - ${siteMetadata.title}`}
        description={t('about-me-description')}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </>
  )
}
