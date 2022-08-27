import { allPages, allPosts } from '@/lib/contentLayerAdapter';

import { unifyPath } from './unifyPath';

export type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

export const getAllRedirects = () => {
  const redirects: Redirect[] = [];

  allPosts.forEach((post) => {
    const allRedirectFrom = (
      post.redirect_from?.map((from) => unifyPath(from)) || []
    ).concat(
      unifyPath('/posts/' + post._raw.sourceFileName.replace(/\.mdx?$/, ''))
    );
    allRedirectFrom.forEach((from) => {
      redirects.push({
        source: from,
        destination: post.path,
        permanent: false,
      });
    });
  });

  allPages.forEach((page) => {
    const allRedirectFrom =
      page.redirect_from?.map((from) => unifyPath(from)) || [];
    allRedirectFrom.forEach((from) => {
      redirects.push({
        source: from,
        destination: page.path,
        permanent: false,
      });
    });
  });

  return redirects;
};

export const allRedirects = getAllRedirects();
