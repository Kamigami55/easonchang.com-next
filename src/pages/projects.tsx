import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/organisms/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/organisms/CommandPalette/useCommandPalettePostActions';
import { Project, PROJECTS_EN, PROJECTS_ZH } from '@/data/projects';
import ProjectLayout from '@/layouts/ProjectLayout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const commandPalettePosts = getCommandPalettePosts(locale);

  const projects = locale === 'en' ? PROJECTS_EN : PROJECTS_ZH;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      commandPalettePosts,
      projects,
    },
  };
};

type Props = {
  commandPalettePosts: PostForCommandPalette[];
  projects: Project[];
};

export default function Projects({ commandPalettePosts, projects }: Props) {
  useCommandPalettePostActions(commandPalettePosts);

  return <ProjectLayout projects={projects} />;
}
