import { allPages } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ProjectLayout from '@/layouts/ProjectLayout'
import mdxComponents from '@/lib/mdxComponents'

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
  const MDXContent = useMDXComponent(projectsPage.body.code)

  return (
    <ProjectLayout>
      <MDXContent components={mdxComponents} />
    </ProjectLayout>
  )
}
