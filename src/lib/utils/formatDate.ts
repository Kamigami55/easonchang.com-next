import { DEFAULT_LOCALE } from '@/constants/siteMeta';

const formatDate = (date, locale = DEFAULT_LOCALE) => {
  const now = new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return now;
};

export default formatDate;
