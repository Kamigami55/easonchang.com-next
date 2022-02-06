import { POSTS_PER_PAGE } from '@/constants/siteMeta'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter, POSTS_FOLDER } from '@/lib/mdx'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter(POSTS_FOLDER)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
