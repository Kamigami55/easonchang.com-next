import { allPages } from 'contentlayer/generated'
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
import ProjectLayout from '@/layouts/ProjectLayout'

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
  en: 'projects-en',
  'zh-TW': 'projects-zh',
}

export async function getStaticProps({ locale }) {
  const projectsPage = allPages.find((page) => page.name === LOCALE_TO_PAGE_NAME[locale])

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      projectsPage,
    },
  }
}

export default function About({ projectsPage }) {
  return (
    <ProjectLayout>
      <div dangerouslySetInnerHTML={{ __html: projectsPage.body.html }} />
    </ProjectLayout>
  )
}
