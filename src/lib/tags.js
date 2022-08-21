import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { CONTENT_ROOT_FOLDER, getFiles, POSTS_FOLDER } from './mdx';

const root = process.cwd();

export function getAllTags(locale) {
  const files = getFiles(POSTS_FOLDER).filter((file) => file.locale === locale);

  let tagCount = {};
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    const source = fs.readFileSync(
      path.join(root, CONTENT_ROOT_FOLDER, POSTS_FOLDER, locale, file.slug),
      'utf8'
    );
    const { data } = matter(source);
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag) => {
        if (tag in tagCount) {
          tagCount[tag] += 1;
        } else {
          tagCount[tag] = 1;
        }
      });
    }
  });

  return tagCount;
}
