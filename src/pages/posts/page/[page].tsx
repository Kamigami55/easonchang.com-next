import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getCommandPalettePosts } from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import { PageSEO } from '@/components/SEO';
import { LOCALES, POSTS_PER_PAGE } from '@/constants/siteMeta';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import { allRedirects } from '@/utils/getAllRedirects';
import { unifyPath } from '@/utils/unifyPath';

export async function getStaticPaths() {
  let paths = [];
  LOCALES.forEach((locale) => {
    const totalPages = Math.ceil(allPostsNewToOld.length / POSTS_PER_PAGE);
    const pathsToAppend = Array.from({ length: totalPages }, (_, i) => ({
      params: { page: (i + 1).toString() },
      locale: locale,
    }));
    paths = [...paths, ...pathsToAppend];
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const { page } = params;

  const commandPalettePosts = getCommandPalettePosts();

  // Handle redirect logic
  const path = unifyPath('/page/' + page);
  const matchedRedirectRule = allRedirects.find((rule) => rule.source === path);
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    };
  }

  const posts = allPostsNewToOld.map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    slug: post.slug,
    path: post.path,
  }));

  const pageNumber = parseInt(page);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
      pageNumber,
      commandPalettePosts,
    },
  };
}

export default function PostListPage({
  posts,
  pageNumber,
  commandPalettePosts,
}) {
  const { t } = useTranslation(['common']);
  useCommandPalettePostActions(commandPalettePosts);

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );

  const pagination = {
    currentPage: pageNumber,
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
