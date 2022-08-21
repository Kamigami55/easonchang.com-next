import PostList from './PostList';

const Template = (args) => <PostList {...args} />;

export const Default = Template.bind({});
Default.args = {
  aProp: 'placeholder',
};

export default {
  title: 'organisms/PostList',
  component: PostList,
};
