import { unifyPath } from '@/utils/unifyPath'
import { allRedirects } from '@/utils/getAllRedirects'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  // Handle redirect logic
  const path = unifyPath(params.pathToRedirectFrom.join('/'))
  const matchedRedirectRule = allRedirects.find((rule) => rule.source === path)
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    }
  }

  return  {
    notFound: true,
  }
}

export default () => null
