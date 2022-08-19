import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ProjectLayout from '@/layouts/ProjectLayout'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default function Projects() {
  return <ProjectLayout />
}
