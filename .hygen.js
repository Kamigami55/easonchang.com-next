const { format } = require('date-fns');

module.exports = {
  helpers: {
    getDateTime: function (formatStr) {
      return format(new Date(), formatStr);
    },
  },
};
