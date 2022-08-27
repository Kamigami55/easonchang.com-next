import { allRedirects } from '@/utils/getAllRedirects';
import { unifyPath } from '@/utils/unifyPath';

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export function getStaticProps({ params }) {
  // Handle redirect logic
  const path = unifyPath(params.pathToRedirectFrom.join('/'));
  const matchedRedirectRule = allRedirects.find((rule) => rule.source === path);
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    };
  }

  return {
    notFound: true,
  };
}

export default () => null;
