import Link from 'next/link'
import { useRouter } from 'next/router'

const LanguageSwitch = () => {
  const router = useRouter()
  const { pathname, query } = router
  const nextLocale = router.locale === 'en' ? 'zh-TW' : 'en'

  return (
    <Link locale={nextLocale} href={{ pathname, query }}>
      <a aria-label="Toggle Language" className="mx-1 rounded p-1 text-2xl sm:ml-4">
        {router.locale === 'en' ? '🇺🇸' : '🇹🇼'}
      </a>
    </Link>
  )
}

export default LanguageSwitch
