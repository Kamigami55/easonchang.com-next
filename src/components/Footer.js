import siteMetadata from '@/data/siteMetadata'

import Link from './Link'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 transition-colors dark:text-gray-400">
          <div>{`Copyright © 2015 - ${new Date().getFullYear()}`}</div>
          <Link href="/">{siteMetadata.author}</Link>
        </div>
      </div>
    </footer>
  )
}
