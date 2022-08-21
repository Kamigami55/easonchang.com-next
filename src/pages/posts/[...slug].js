import { compareDesc } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageTitle from '@/components/PageTitle'
import { LOCALES } from '@/constants/siteMeta'
import PostLayout from '@/layouts/PostLayout'
import { unifyPath } from '@/utils/unifyPath'
import { allRedirects } from '@/utils/getAllRedirects'

import { allPosts } from '@/lib/contentLayerAdapter'
import mdxComponents from '@/lib/mdxComponents'

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
          <MDXContent components={mdxComponents} />
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
