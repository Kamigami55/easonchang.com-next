import Head from 'next/head';
import { useRouter } from 'next/router';

import siteMetadata from '@/data/siteMetadata';

type CommonSEOProps = {
  title: string;
  description: string;
  ogType: string;
  ogImage: string;
};
const CommonSEO = ({ title, description, ogType, ogImage }: CommonSEOProps) => {
  const router = useRouter();
  const locale = router.locale;
  const url = `${siteMetadata.siteUrl}${locale === 'en' ? '/' : `/${locale}`}${
    router.asPath
  }`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" key="description" content={description} />
      <link rel="canonical" key="canonical" href={url} />
      <meta property="og:url" key="og:url" content={url} />
      <meta property="og:type" key="og:type" content={ogType} />
      <meta
        property="og:site_name"
        key="og:site_name"
        content={siteMetadata.title}
      />
      <meta
        property="og:description"
        key="og:description"
        content={description}
      />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:image" key="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitterID} />
      <meta name="twitter:creator" content={siteMetadata.twitterID} />
      <meta name="twitter:title" key="twitter:title" content={title} />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={description}
      />
      <meta name="twitter:image" key="twitter:image" content={ogImage} />
    </Head>
  );
};

type PageSEOProps = {
  title: string;
  description: string;
};

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const ogImage = siteMetadata.siteUrl + siteMetadata.socialBanner;
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImage}
    />
  );
};

export const getPostOGImage = (
  socialImage: string,
  title: string,
  description: string
): string => {
  if (socialImage) {
    if (socialImage.startsWith('http')) {
      return socialImage;
    } else {
      return siteMetadata.siteUrl + socialImage;
    }
  }
  return `${siteMetadata.siteUrl}/api/og?title=${encodeURIComponent(
    title
  )}&desc=${encodeURIComponent(description)}`;
};

type BlogSEOProps = {
  postTitle: string;
  description: string;
  date: string;
  lastmod?: string;
  images?: string[];
  socialImage: string;
};

export const BlogSEO = ({
  postTitle,
  description,
  date,
  lastmod = undefined,
  images = [],
  socialImage,
}: BlogSEOProps) => {
  const router = useRouter();
  const locale = router.locale;
  const url = `${siteMetadata.siteUrl}${locale === 'en' ? '/en' : ''}${
    router.asPath
  }`;
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();
  const imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
      ? [images]
      : images;

  const fullTitle = `${postTitle} - ${siteMetadata.title}`;

  // TODO get images from post content
  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}${img}`,
    };
  });

  const authorList = {
    '@type': 'Person',
    name: siteMetadata.author,
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: fullTitle,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: description,
  };

  const ogImage = getPostOGImage(socialImage, postTitle, description);

  return (
    <>
      <CommonSEO
        title={fullTitle}
        description={description}
        ogType="article"
        ogImage={ogImage}
      />
      <Head>
        {date && (
          <meta property="article:published_time" content={publishedAt} />
        )}
        {lastmod && (
          <meta property="article:modified_time" content={modifiedAt} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
