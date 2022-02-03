---
to: src/components/<%= type %>/<%= name %>/<%= name %>.stories.js
---
import <%= name %> from './<%= name %>'

const Template = (args) => <<%= name %> {...args} />

export const Default = Template.bind({})
Default.args = {
  aProp: 'placeholder',
}

export default {
  title: '<%= type %>/<%= name %>',
  component: <%= name %>,
}
