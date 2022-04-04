import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageSEO } from '@/components/SEO'
import { POSTS_PER_PAGE } from '@/constants/siteMeta'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter, POSTS_FOLDER } from '@/lib/mdx'

export async function getStaticProps({ locale }) {
  const posts = await getAllFilesFrontMatter(POSTS_FOLDER, locale)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      initialDisplayPosts,
      posts,
      pagination,
    },
  }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.title}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
