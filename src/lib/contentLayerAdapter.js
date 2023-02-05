import { allPages, allPosts, Page, Post } from 'contentlayer/generated';
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import { compareDesc } from 'date-fns';

export { allPages, allPosts, defineDocumentType, defineNestedType, makeSource, Page, Post };

export const allPostsNewToOld = allPosts?.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
}) || [];

export const allPostsOfLocaleNewToOld = (locale) =>
  allPosts
    ?.filter((post) => post.language === locale)
    ?.sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    }) || [];
