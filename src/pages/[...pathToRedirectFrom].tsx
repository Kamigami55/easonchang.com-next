import { GetStaticPaths, GetStaticProps } from 'next';

import { allRedirects, Redirect } from '@/utils/getAllRedirects';
import { unifyPath } from '@/utils/unifyPath';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = ({
  params: { pathToRedirectFrom },
}) => {
  // Handle redirect logic
  const path = unifyPath(
    typeof pathToRedirectFrom === 'string'
      ? pathToRedirectFrom
      : pathToRedirectFrom.join('/')
  );
  const matchedRedirectRule: Redirect | undefined = allRedirects.find(
    (rule) => rule.source === path
  );
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
};

export default () => null;
