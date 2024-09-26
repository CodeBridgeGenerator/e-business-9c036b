// Application hooks that run for every service
const logErrors = require('../src/utils/logErrors');
const audit = require('../src/utils/audit');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [audit.before.update],
    patch: [audit.before.patch],
    remove: [audit.before.remove],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [audit.after.update],
    patch: [audit.after.patch],
    remove: [audit.after.remove],
  },

  error: {
    all: [logErrors()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
