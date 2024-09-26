const { Audits } = require("./audits.class");
const createModel = require("../../models/audits.model");
const hooks = require("./audits.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use("/audits", new Audits(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("audits");

  service.hooks(hooks);
};
