import { useTranslation } from 'next-i18next'

import PostBody from '@/components/organisms/PostBody'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function AuthorLayout({ children }) {
  const { t } = useTranslation(['common'])

  return (
    <>
      <PageSEO
        title={`${t('about-me')} - ${siteMetadata.title}`}
        description={t('about-me-description')}
      />

      <div>
        <div className="space-y-2 pt-12 pb-6 md:space-y-5">
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:leading-10 md:text-6xl md:leading-14">
            {t('about-me')}
          </h1>
        </div>

        <div className="items-start space-y-2 py-8">
          <PostBody className="max-w-none">{children}</PostBody>
        </div>
      </div>
    </>
  )
}
