import { GetStaticPaths, GetStaticProps } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import PageTitle from '@/components/PageTitle';
import { LOCALES } from '@/constants/siteMeta';
import PostLayout, {
  PostForPostLayout,
  RelatedPostForPostLayout,
} from '@/layouts/PostLayout';
import { allPosts, allPostsOfLocaleNewToOld } from '@/lib/contentLayerAdapter';
import mdxComponents from '@/lib/mdxComponents';
import { allRedirects } from '@/utils/getAllRedirects';
import { unifyPath } from '@/utils/unifyPath';

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  LOCALES.forEach((locale) => {
    paths.push(...allPosts.map((post) => `/${locale}${post.path}`));
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  locale,
}) => {
  const commandPalettePosts = getCommandPalettePosts();
  const fullSlug = typeof slug === 'string' ? slug : slug.join('/');

  // Handle post redirect logic
  const path = unifyPath('/posts/' + fullSlug);
  const matchedRedirectRule = allRedirects.find((rule) => rule.source === path);
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    };
  }

  const allPosts = allPostsOfLocaleNewToOld(locale);

  const postIndex = allPosts.findIndex((post) => post.slug === fullSlug);
  if (postIndex === -1) {
    return {
      notFound: true,
    };
  }
  const prevFull = allPosts[postIndex + 1] || null;
  const prev: RelatedPostForPostLayout = prevFull
    ? { title: prevFull.title, path: prevFull.path }
    : null;
  const nextFull = allPosts[postIndex - 1] || null;
  const next: RelatedPostForPostLayout = nextFull
    ? { title: nextFull.title, path: nextFull.path }
    : null;
  const postFull = allPosts[postIndex];
  const post: PostForPostPage = {
    title: postFull.title,
    path: postFull.path,
    date: postFull.date,
    description: postFull.description,
    socialImage: postFull.socialImage,
    isDraft: postFull.isDraft || null,
    body: {
      raw: postFull.body.raw,
      code: postFull.body.code,
    },
  };

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post,
      prev,
      next,
      commandPalettePosts,
    },
  };
};

type PostForPostPage = PostForPostLayout & {
  isDraft: boolean;
  body: {
    code: string;
  };
};

type Props = {
  post: PostForPostPage;
  next: RelatedPostForPostLayout;
  prev: RelatedPostForPostLayout;
  commandPalettePosts: PostForCommandPalette[];
};

export default function Blog({ post, prev, next, commandPalettePosts }: Props) {
  useCommandPalettePostActions(commandPalettePosts);

  const MDXContent = useMDXComponent(post.body.code);

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
  );
}
