import ProjectCard from './ProjectCard';

const Template = (args) => <ProjectCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  aProp: 'placeholder',
};

export default {
  title: 'organisms/ProjectCard',
  component: ProjectCard,
};
