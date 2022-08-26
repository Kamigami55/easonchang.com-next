import { useMDXComponent } from 'next-contentlayer/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getCommandPalettePosts } from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import PageTitle from '@/components/PageTitle';
import { LOCALES } from '@/constants/siteMeta';
import PostLayout from '@/layouts/PostLayout';
import { allPosts, allPostsNewToOld } from '@/lib/contentLayerAdapter';
import mdxComponents from '@/lib/mdxComponents';
import { allRedirects } from '@/utils/getAllRedirects';
import { unifyPath } from '@/utils/unifyPath';

export async function getStaticPaths() {
  const paths = [];
  LOCALES.forEach((locale) => {
    paths.push(...allPosts.map((post) => `/${locale}${post.path}`));
  });
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }) {
  const commandPalettePosts = getCommandPalettePosts();

  // Handle post redirect logic
  const path = unifyPath('/posts/' + params.slug.join('/'));
  const matchedRedirectRule = allRedirects.find((rule) => rule.source === path);
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    };
  }

  const postIndex = allPostsNewToOld.findIndex(
    (post) => post.slug === params.slug.join('/')
  );
  if (postIndex === -1) {
    return {
      notFound: true,
    };
  }
  const prevFull = allPostsNewToOld[postIndex + 1] || null;
  const prev = prevFull ? { title: prevFull.title, path: prevFull.path } : null;
  const nextFull = allPostsNewToOld[postIndex - 1] || null;
  const next = nextFull ? { title: nextFull.title, path: nextFull.path } : null;
  const postFull = allPostsNewToOld[postIndex];
  const post = {
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
}

export default function Blog({ post, prev, next, commandPalettePosts }) {
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
