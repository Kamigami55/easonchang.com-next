import PostBody from './PostBody'

const Template = (args) => <PostBody {...args} />

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'organisms/PostBody',
  component: PostBody,
}
