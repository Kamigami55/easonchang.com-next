import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getCommandPalettePosts } from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import { PageSEO } from '@/components/SEO';
import { POSTS_PER_PAGE } from '@/constants/siteMeta';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';

export async function getStaticProps({ locale }) {
  const commandPalettePosts = getCommandPalettePosts();

  const posts = allPostsNewToOld.map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    slug: post.slug,
    path: post.path,
  }));

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
      commandPalettePosts,
    },
  };
}

export default function Posts({ posts, commandPalettePosts }) {
  const { t } = useTranslation(['common']);
  useCommandPalettePostActions(commandPalettePosts);

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

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
  );
}
