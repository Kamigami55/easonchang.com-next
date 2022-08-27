import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import ProjectLayout from '@/layouts/ProjectLayout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const commandPalettePosts = getCommandPalettePosts();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      commandPalettePosts,
    },
  };
};

type Props = {
  commandPalettePosts: PostForCommandPalette[];
};

export default function Projects({ commandPalettePosts }: Props) {
  useCommandPalettePostActions(commandPalettePosts);

  return <ProjectLayout />;
}
