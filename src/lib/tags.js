import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { DEFAULT_LOCALE } from '@/constants/siteMeta'

import { CONTENT_ROOT_FOLDER, getFiles, POSTS_FOLDER } from './mdx'

const root = process.cwd()

export async function getAllTags() {
  const files = await getFiles(POSTS_FOLDER).filter((file) => file.locale === DEFAULT_LOCALE)

  let tagCount = {}
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    const source = fs.readFileSync(
      path.join(root, CONTENT_ROOT_FOLDER, POSTS_FOLDER, DEFAULT_LOCALE, file.slug),
      'utf8'
    )
    const { data } = matter(source)
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag) => {
        if (tag in tagCount) {
          tagCount[tag] += 1
        } else {
          tagCount[tag] = 1
        }
      })
    }
  })

  return tagCount
}
