import SocialIcon from './SocialIcon';

const Template = (args) => <SocialIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  aProp: 'placeholder',
};

export default {
  title: 'atoms/SocialIcon',
  component: SocialIcon,
};
