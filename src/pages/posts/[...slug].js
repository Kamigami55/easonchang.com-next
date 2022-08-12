import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'
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
import { unifyPath } from '@/utils/unifyPath'
import { allRedirects } from '@/utils/getAllRedirects'

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
    paths.push(...allPosts.map((post) => `/${locale}${post.path}`))
  })
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, locale }) {
  // Handle post redirect logic
  const path = unifyPath('/posts/' + params.slug.join('/'))
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
  const postIndex = allPosts.findIndex((post) => post.slug === params.slug.join('/'))
  if (postIndex === -1) {
    return  {
      notFound: true,
    }
  }
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
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      {post.isDraft !== true ? (
        <PostLayout post={post} prev={prev} next={next}>
          <MDXContent />
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
