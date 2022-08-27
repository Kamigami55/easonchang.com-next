import { compareDesc } from 'date-fns';

import { allPosts } from '@/lib/contentLayerAdapter';

export type PostForCommandPalette = {
  slug: string;
  title: string;
  path: string;
};

export const getCommandPalettePosts = (): PostForCommandPalette[] => {
  const commandPalettePosts = allPosts
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      path: post.path,
    }));
  return commandPalettePosts;
};
