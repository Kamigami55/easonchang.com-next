import { allPages } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
} from '@/components/CustomHeading'
import CustomLink from '@/components/CustomLink'
import AuthorLayout from '@/layouts/AuthorLayout'

const components = {
  a: CustomLink,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  h5: CustomH5,
  h6: CustomH6,
}

const LOCALE_TO_PAGE_NAME = {
  en: 'about-en',
  'zh-TW': 'about-zh',
}

export async function getStaticProps({ locale }) {
  const aboutPage = allPages.find((page) => page.name === LOCALE_TO_PAGE_NAME[locale])
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      aboutPage,
    },
  }
}

export default function About({ aboutPage }) {
  const MDXContent = useMDXComponent(aboutPage.body.code)

  return (
    <AuthorLayout>
      <MDXContent />
    </AuthorLayout>
  )
}
