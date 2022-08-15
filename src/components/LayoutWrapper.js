import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

import Footer from './Footer'
import LanguageSwitch from './LanguageSwitch'
import Link from './Link'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <div>
        <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/70 py-3 backdrop-blur transition-colors dark:border-slate-50/[0.06] dark:bg-gray-900/60">
          <SectionContainer>
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" aria-label={siteMetadata.headerTitle}>
                  <div className="flex items-center justify-between">
                    {typeof siteMetadata.headerTitle === 'string' ? (
                      <div className="h-6 text-2xl font-semibold sm:block">
                        {siteMetadata.headerTitle}
                      </div>
                    ) : (
                      siteMetadata.headerTitle
                    )}
                  </div>
                </Link>
              </div>
              <div className="flex items-center text-base leading-5 sm:gap-1">
                <div className="hidden gap-1 sm:flex">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="rounded p-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <LanguageSwitch />
                <ThemeSwitch />
                <MobileNav />
              </div>
            </div>
          </SectionContainer>
        </header>

        <SectionContainer>
          <main className="mb-auto">{children}</main>
        </SectionContainer>
      </div>

      <Footer />
    </div>
  )
}

export default LayoutWrapper
