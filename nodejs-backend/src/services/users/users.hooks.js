const { authenticate } = require("@feathersjs/authentication").hooks;
const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [authenticate("jwt")],
    create: [hashPassword("password")],
    update: [authenticate("jwt"), hashPassword("password")],
    patch: [hashPassword("password")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [protect("password")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
