import { useTranslation } from 'next-i18next';

import CustomLink from '@/components/CustomLink';

export type PaginationType = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationType) {
  const { t } = useTranslation(['common']);

  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
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
            <button>{t('previous-page')}</button>
          </CustomLink>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            {t('next-page')}
          </button>
        )}
        {nextPage && (
          <CustomLink href={`/posts/page/${currentPage + 1}`}>
            <button>{t('next-page')}</button>
          </CustomLink>
        )}
      </nav>
    </div>
  );
}
