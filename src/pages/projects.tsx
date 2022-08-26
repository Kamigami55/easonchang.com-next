import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ProjectLayout from '@/layouts/ProjectLayout';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import { getCommandPalettePosts } from '@/components/organisms/CommandPalette/getCommandPalettePosts';

export async function getStaticProps({ locale }) {
  const commandPalettePosts = getCommandPalettePosts();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      commandPalettePosts,
    },
  };
}

export default function Projects({commandPalettePosts}) {
  useCommandPalettePostActions(commandPalettePosts);

  return <ProjectLayout />;
}
