import { DEFAULT_LOCALE } from '@/constants/siteMeta'

const formatDate = (date, locale = DEFAULT_LOCALE) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = new Date(date).toLocaleDateString(locale, options)

  return now
}

export default formatDate
