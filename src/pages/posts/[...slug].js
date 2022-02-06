// import fs from 'fs'

import { MDXRemote } from 'next-mdx-remote'

// const DEFAULT_LAYOUT = 'PostLayout'
import {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
} from '@/components/CustomHeading'
// import { MDXLayoutRenderer } from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import PostLayout from '@/layouts/PostLayout'
// import generateRss from '@/lib/generate-rss'
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
  POSTS_FOLDER,
} from '@/lib/mdx'

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
  const posts = getFiles(POSTS_FOLDER)
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter(POSTS_FOLDER)
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug(POSTS_FOLDER, params.slug.join('/'))
  // const authorList = post.frontMatter.authors || ['default']
  // const authorPromise = authorList.map(async (author) => {
  //   const authorResults = await getFileBySlug('authors', [author])
  //   return authorResults.frontMatter
  // })
  // const authorDetails = await Promise.all(authorPromise)

  // rss
  // if (allPosts.length > 0) {
  //   const rss = generateRss(allPosts)
  //   fs.writeFileSync('./public/feed.xml', rss)
  // }

  return { props: { post, prev, next } }
}

export default function Blog({ post, prev, next }) {
  const { mdxSource, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <PostLayout frontMatter={frontMatter} prev={prev} next={next}>
          <MDXRemote {...mdxSource} components={components} />
        </PostLayout>
      ) : (
        // <MDXLayoutRenderer
        //   layout={frontMatter.layout || DEFAULT_LAYOUT}
        //   // toc={toc}
        //   mdxSource={mdxSource}
        //   frontMatter={frontMatter}
        //   // authorDetails={authorDetails}
        //   prev={prev}
        //   next={next}
        // />
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
