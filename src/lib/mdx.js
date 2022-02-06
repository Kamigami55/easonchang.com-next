import fs from 'fs'
import matter from 'gray-matter'
// import Head from 'next/head'
// import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
// import { bundleMDX } from 'mdx-bundler'
import path from 'path'
import rehypeSlug from 'rehype-slug'
import prism from 'remark-prism'

// import readingTime from 'reading-time'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeCitation from 'rehype-citation'
// import rehypeKatex from 'rehype-katex'
// import rehypePresetMinify from 'rehype-preset-minify'
// import rehypePrismPlus from 'rehype-prism-plus'
// // Rehype packages
// import rehypeSlug from 'rehype-slug'
// import remarkFootnotes from 'remark-footnotes'
// // Remark packages
// import remarkGfm from 'remark-gfm'
// import remarkMath from 'remark-math'
// import { visit } from 'unist-util-visit'
// import remarkCodeTitles from './remark-code-title'
// import remarkExtractFrontmatter from './remark-extract-frontmatter'
// import remarkImgToJsx from './remark-img-to-jsx'
// import remarkTocHeadings from './remark-toc-headings'
import getAllFilesRecursively from './utils/files'

const root = process.cwd()

export function getFiles() {
  const prefixPaths = path.join(root, 'posts')
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(slug) {
  const mdxPath = path.join(root, 'posts', `${slug}.mdx`)
  const mdPath = path.join(root, 'posts', `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  // if (process.platform === 'win32') {
  //   process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
  // } else {
  //   process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
  // }

  // let toc = []

  // const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  // const source = fs.readFileSync(postFilePath)

  const { content, data: frontmatter } = matter(source)
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [prism],
      rehypePlugins: [rehypeSlug],
    },
    scope: frontmatter,
  })

  // return {
  //   props: {
  //     source: mdxSource,
  //     frontMatter: data,
  //   },
  // }

  // Parsing frontmatter here to pass it in as options to rehype plugin
  // const { data: frontmatter } = matter(source)
  // const { code } = await bundleMDX({
  //   source,
  //   // mdx imports can be automatically source from the components directory
  //   cwd: path.join(root, 'components'),
  //   xdmOptions(options) {
  //     // this is the recommended way to add custom remark/rehype plugins:
  //     // The syntax might look weird, but it protects you in case we add/remove
  //     // plugins in the future.
  //     options.remarkPlugins = [
  //       ...(options.remarkPlugins ?? []),
  //       remarkExtractFrontmatter,
  //       [remarkTocHeadings, { exportRef: toc }],
  //       remarkGfm,
  //       remarkCodeTitles,
  //       [remarkFootnotes, { inlineNotes: true }],
  //       remarkMath,
  //       remarkImgToJsx,
  //     ]
  //     options.rehypePlugins = [
  //       ...(options.rehypePlugins ?? []),
  //       rehypeSlug,
  //       rehypeAutolinkHeadings,
  //       rehypeKatex,
  //       [rehypeCitation, { path: path.join(root, 'data') }],
  //       [rehypePrismPlus, { ignoreMissing: true }],
  //       rehypePresetMinify,
  //     ]
  //     return options
  //   },
  //   esbuildOptions: (options) => {
  //     options.loader = {
  //       ...options.loader,
  //       '.js': 'jsx',
  //     }
  //     return options
  //   },
  // })

  return {
    mdxSource,
    // toc,
    frontMatter: {
      // readingTime: readingTime(code),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}

export async function getAllFilesFrontMatter() {
  const prefixPaths = path.join(root, 'posts')

  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter = []

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
