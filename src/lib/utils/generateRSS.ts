import { Feed } from 'feed';
import { writeFileSync } from 'fs';

import { getPostOGImage } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { allPosts } from '@/lib/contentLayerAdapter';

export default function generateRSS() {
  const author = {
    name: siteMetadata.author,
    email: siteMetadata.email,
    link: siteMetadata.siteUrl,
  };

  const feed = new Feed({
    title: siteMetadata.title,
    description: siteMetadata.description,
    id: siteMetadata.siteUrl,
    link: siteMetadata.siteUrl,
    image: siteMetadata.siteUrl + siteMetadata.siteLogo,
    favicon: `${siteMetadata.siteUrl}/favicon.ico`,
    copyright: `Copyright © 2015 - ${new Date().getFullYear()} Eason Chang`,
    feedLinks: {
      rss2: `${siteMetadata.siteUrl}/feed.xml`,
      json: `${siteMetadata.siteUrl}/feed.json`,
      atom: `${siteMetadata.siteUrl}/atom.xml`,
    },
    author: author,
  });

  allPosts.forEach((post) => {
    feed.addItem({
      id: siteMetadata.siteUrl + post.path,
      title: post.title,
      link: siteMetadata.siteUrl + post.path,
      description: post.description,
      image: getPostOGImage(
        post.socialImage,
        post.title,
        post.description
      ).replace('&', '&amp;'),
      // content: post.body.html,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  writeFileSync('./public/feed.xml', feed.rss2());
  writeFileSync('./public/atom.xml', feed.atom1());
  writeFileSync('./public/feed.json', feed.json1());
}
