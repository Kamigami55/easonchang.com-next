import { useMDXComponent } from 'next-contentlayer/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getCommandPalettePosts } from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import AuthorLayout from '@/layouts/AuthorLayout';
import { allPages } from '@/lib/contentLayerAdapter';
import mdxComponents from '@/lib/mdxComponents';

const LOCALE_TO_PAGE_NAME = {
  en: 'about-en',
  'zh-TW': 'about-zh',
};

export async function getStaticProps({ locale }) {
  const commandPalettePosts = getCommandPalettePosts();

  const aboutPage = allPages.find(
    (page) => page.name === LOCALE_TO_PAGE_NAME[locale]
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      aboutPage,
      commandPalettePosts,
    },
  };
}

export default function About({ aboutPage, commandPalettePosts }) {
  useCommandPalettePostActions(commandPalettePosts);

  const MDXContent = useMDXComponent(aboutPage.body.code);

  return (
    <AuthorLayout>
      <MDXContent components={mdxComponents} />
    </AuthorLayout>
  );
}
