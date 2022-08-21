import { useTranslation } from 'next-i18next';

import CustomLink from '@/components/CustomLink';

export default function Pagination({ totalPages, currentPage }) {
  const { t } = useTranslation(['common']);

  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            rel="previous"
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            {t('previous-page')}
          </button>
        )}
        {prevPage && (
          <CustomLink
            href={
              currentPage - 1 === 1
                ? `/posts/`
                : `/posts/page/${currentPage - 1}`
            }
          >
            <button rel="previous">{t('previous-page')}</button>
          </CustomLink>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>
        {!nextPage && (
          <button
            rel="next"
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            {t('next-page')}
          </button>
        )}
        {nextPage && (
          <CustomLink href={`/posts/page/${currentPage + 1}`}>
            <button rel="next">{t('next-page')}</button>
          </CustomLink>
        )}
      </nav>
    </div>
  );
}
