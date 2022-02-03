import Container from './Container'

const Template = (args) => <Container {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <h1>Page Content</h1>,
}

export default {
  title: 'molecules/Container',
  component: Container,
}
