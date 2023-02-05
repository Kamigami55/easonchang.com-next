/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-key */
import { GetStaticProps } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CustomLink from '@/components/CustomLink';
import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import PostList from '@/components/organisms/PostList';
import { PostForPostList } from '@/components/organisms/PostList/PostList';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import generateRSS from '@/lib/utils/generateRSS';

const MAX_DISPLAY = 10;

type PostForIndexPage = PostForPostList;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const commandPalettePosts = getCommandPalettePosts();
  const posts = allPostsNewToOld.slice(0, MAX_DISPLAY).map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
  })) as PostForIndexPage[];

  generateRSS();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
      posts,
      commandPalettePosts,
    },
  };
};

type Props = {
  posts: PostForIndexPage[];
  commandPalettePosts: PostForCommandPalette[];
};

export default function Index({ posts, commandPalettePosts }: Props) {
  const { t } = useTranslation(['indexPage', 'common']);
  useCommandPalettePostActions(commandPalettePosts);

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />

      <div className="prose my-12 space-y-2 transition-colors dark:prose-dark md:space-y-5 md:prose-lg">
        <h1 className="text-center sm:text-left">{t('intro-title')}</h1>
        <p>
          <Trans
            i18nKey="intro-1"
            t={t}
            components={[<CustomLink href="/projects" />]}
          />
        </p>
        <p>
          <Trans
            i18nKey="intro-2"
            t={t}
            components={[<CustomLink href="/posts" />]}
          />
        </p>
        <p>
          <Trans
            i18nKey="intro-3"
            t={t}
            components={[
              <a
                href="https://www.trendmicro.com/"
                target="_blank"
                rel="noreferrer"
              />,
            ]}
          />
        </p>
      </div>

      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>{t('latest-posts')}</h2>
        </div>

        <PostList posts={posts} />
      </div>

      <div className="flex justify-end text-base font-medium leading-6 md:text-lg">
        <CustomLink
          href="/posts"
          className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="all posts"
        >
          {t('view-all', { ns: 'common' })} &rarr;
        </CustomLink>
      </div>
    </>
  );
}
