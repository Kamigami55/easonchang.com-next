import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'

import Image from '@/components/Image'
import Link from '@/components/Link'

export default function ProjectCard({ project }) {
  const {
    title,
    description,
    links: { post: href, github: githubHref, site: siteHref },
    image: { src: imgSrc, alt: imgAlt },
  } = project
  const { t } = useTranslation(['common'])

  return (
    <div>
      <div
        className={
          'h-full overflow-hidden rounded-md border-2 border-gray-300/60 transition-colors transition-colors dark:border-gray-700/60'
        }
      >
        <Link
          href={href}
          aria-label={`Link to ${title}`}
          className="relative block aspect-video w-full"
        >
          <Image
            alt={imgAlt}
            src={imgSrc}
            className="bg-gray-300 object-cover object-center dark:bg-gray-700"
            layout="fill"
            objectFit="cover"
            quality="30"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 344px, 472px"
          />
        </Link>
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          </h2>
          <p
            className="prose mb-3 max-w-none text-gray-500 transition-colors dark:text-gray-400"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            {t('learn-more')} &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    links: PropTypes.shape({
      post: PropTypes.string,
      github: PropTypes.string,
      site: PropTypes.string,
    }),
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }).isRequired,
}
