import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { defineDocumentType, makeSource } from './src/lib/contentLayerAdapter';
import imageMetadata from './src/plugins/image-metadata';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `content/posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    socialImage: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    isDraft: {
      type: 'boolean',
      description: 'Whether the post is a draft',
      default: false,
    },
    language: {
      type: 'enum',
      options: ['en', 'zh-TW'],
      default: 'zh-TW',
    },
    redirect_from: {
      type: 'list',
      of: { type: 'string' },
    },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (post) => `/posts/${post.slug}`,
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `content/pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    name: {
      type: 'string',
      description: 'The name of page',
      required: true,
    },
    path: {
      type: 'string',
      required: true,
    },
    redirect_from: {
      type: 'list',
      of: { type: 'string' },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [rehypePrism, { ignoreMissing: true }],
      imageMetadata,
    ],
  },
});
