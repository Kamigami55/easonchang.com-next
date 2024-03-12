const { format } = require('date-fns');

module.exports = [
  {
    type: 'select',
    name: 'type',
    choices: ['post', 'project'],
    message: 'Select post type: ',
  },
  {
    type: 'input',
    name: 'slug',
    message: 'Enter slug (ex: "my-post"): ',
  },
  {
    type: 'input',
    name: 'date',
    message: "Enter date (ex: '2021-01-01', leave empty to use today's date): ",
    result: (date) => format(date ? new Date(date) : new Date(), 'yyyy-MM-dd'),
  },
];
