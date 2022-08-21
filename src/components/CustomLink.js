/* eslint-disable jsx-a11y/anchor-has-content */

import Link from 'next/link';

export default function CustomLink({ href, ...otherProps }) {
  if (href.startsWith('/')) {
    return (
      <Link href={href}>
        <a {...otherProps} />
      </Link>
    );
  }
  return <a href={href} {...otherProps} />;
}
