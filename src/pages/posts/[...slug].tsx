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
import {
  allPosts,
  allPostsOfLocaleNewToOld,
  Post,
} from '@/lib/contentLayerAdapter';
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
  const commandPalettePosts = getCommandPalettePosts(locale);
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

  const allPostsOfCurrentLocaleNewToOld = allPostsOfLocaleNewToOld(locale);

  const postIndex = allPostsOfCurrentLocaleNewToOld.findIndex(
    (post) => post.slug === fullSlug
  );
  let onlyPostInAnotherLocale: Post | undefined = undefined;
  if (postIndex === -1) {
    onlyPostInAnotherLocale = allPosts.find((post) => post.slug === fullSlug);
    if (!onlyPostInAnotherLocale) {
      return {
        notFound: true,
      };
    }
  }
  const onlyHavePostInAnotherLocale = !!onlyPostInAnotherLocale;

  const prevFull =
    postIndex !== -1
      ? allPostsOfCurrentLocaleNewToOld[postIndex + 1] || null
      : null;
  const prev: RelatedPostForPostLayout = prevFull
    ? { title: prevFull.title, path: prevFull.path }
    : null;
  const nextFull =
    postIndex !== -1
      ? allPostsOfCurrentLocaleNewToOld[postIndex - 1] || null
      : null;
  const next: RelatedPostForPostLayout = nextFull
    ? { title: nextFull.title, path: nextFull.path }
    : null;
  const postFull =
    postIndex !== -1
      ? allPostsOfCurrentLocaleNewToOld[postIndex]
      : onlyPostInAnotherLocale;
  const post: PostForPostPage = {
    title: postFull.title,
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
      onlyHavePostInAnotherLocale: onlyHavePostInAnotherLocale,
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
  onlyHavePostInAnotherLocale: boolean;
};

export default function Blog({
  post,
  prev,
  next,
  commandPalettePosts,
  onlyHavePostInAnotherLocale,
}: Props) {
  useCommandPalettePostActions(commandPalettePosts);

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      {post.isDraft !== true ? (
        <PostLayout
          post={post}
          prev={prev}
          next={next}
          onlyHavePostInAnotherLocale={onlyHavePostInAnotherLocale}
        >
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
