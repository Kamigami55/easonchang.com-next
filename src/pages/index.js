import Layout from '@/components/Layout'
import IndexPageTemplate from '@/components/templates/IndexPageTemplate'

export default function IndexPage() {
  return (
    <Layout>
      <IndexPageTemplate />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 60,
  }
}
