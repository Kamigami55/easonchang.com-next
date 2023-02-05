import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import { PostForPostList } from '@/components/organisms/PostList/PostList';
import { PageSEO } from '@/components/SEO';
import { LOCALES, POSTS_PER_PAGE } from '@/constants/siteMeta';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
import { allPostsOfLocaleNewToOld } from '@/lib/contentLayerAdapter';
import { allRedirects } from '@/utils/getAllRedirects';
import { unifyPath } from '@/utils/unifyPath';

type PathType = {
  params: {
    page: string;
  };
  locale: string;
};

export const getStaticPaths: GetStaticPaths = () => {
  let paths: PathType[] = [];
  LOCALES.forEach((locale) => {
    const totalPages = Math.ceil(
      allPostsOfLocaleNewToOld(locale).length / POSTS_PER_PAGE
    );
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
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { page } = params;
  const pageStr = typeof page === 'string' ? page : page.join('');

  const commandPalettePosts = getCommandPalettePosts(locale);

  // Handle redirect logic
  const path = unifyPath('/page/' + pageStr);
  const matchedRedirectRule = allRedirects.find((rule) => rule.source === path);
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    };
  }

  const posts = allPostsOfLocaleNewToOld(locale).map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    slug: post.slug,
    path: post.path,
  }));

  const pageNumber = parseInt(pageStr);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
      pageNumber,
      commandPalettePosts,
    },
  };
};

type PostForPostsPage = PostForPostList;

type Props = {
  posts: PostForPostsPage[];
  pageNumber: number;
  commandPalettePosts: PostForCommandPalette[];
};

export default function PostListPage({
  posts,
  pageNumber,
  commandPalettePosts,
}: Props) {
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
