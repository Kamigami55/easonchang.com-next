import { allPostsOfLocaleNewToOld } from '@/lib/contentLayerAdapter';

export type PostForCommandPalette = {
  slug: string;
  title: string;
  path: string;
};

export const getCommandPalettePosts = (
  locale: string
): PostForCommandPalette[] => {
  const commandPalettePosts = allPostsOfLocaleNewToOld(locale).map((post) => ({
    slug: post.slug,
    title: post.title,
    path: post.path,
  }));
  return commandPalettePosts;
};
