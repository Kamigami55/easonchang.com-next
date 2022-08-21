// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'select',
    choices: ['atoms', 'molecules', 'organisms', 'templates'],
    name: 'type',
    message: 'Select component type: ',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Enter component name (ex: Button): ',
  },
];
