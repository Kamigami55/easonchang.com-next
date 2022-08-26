import { useRegisterActions } from 'kbar';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const useCommandPalettePostActions = (posts) => {
  const router = useRouter();
  const { t } = useTranslation(['common']);

  useRegisterActions(
    posts.map((post) => ({
      id: post.slug,
      name: post.title,
      perform: () => router.push(post.path),
      section: t('search-posts'),
      parent: 'search-posts',
    })),
    []
  );
};
