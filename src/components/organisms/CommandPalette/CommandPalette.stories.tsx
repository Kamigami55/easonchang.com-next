import CommandPalette from './CommandPalette';

const Template = (args) => <CommandPalette {...args} />;

export const Default = Template.bind({});

export default {
  title: 'organisms/CommandPalette',
  component: CommandPalette,
};
