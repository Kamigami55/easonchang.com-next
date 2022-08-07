import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
} from '@/components/CustomHeading'
import PageTitle from '@/components/PageTitle'
import { LOCALES } from '@/constants/siteMeta'
import PostLayout from '@/layouts/PostLayout'

import CustomLink from '../../components/CustomLink'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  h5: CustomH5,
  h6: CustomH6,
}

export async function getStaticPaths() {
  const paths = []
  LOCALES.forEach((locale) => {
    paths.push(...allPosts.map((post) => `/${locale}/posts/${post.slug}`))
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params, locale }) {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  const postIndex = allPosts.findIndex((post) => post.slug === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = posts[postIndex]

  // rss
  // if (allPosts.length > 0) {
  //   const rss = generateRss(allPosts)
  //   fs.writeFileSync('./public/feed.xml', rss)
  // }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post,
      prev,
      next,
    },
  }
}

export default function Blog({ post, prev, next }) {
  return (
    <>
      {post.isDraft !== true ? (
        <PostLayout post={post} prev={prev} next={next}>
          <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
        </PostLayout>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
