const mongoose = require("mongoose");
const logger = require("./logger");

if (!process.env.MONGODB_URL)
  throw { message: "Environmental variable 'MONGODB_URL' is required." };

if (!process.env.MAIL_MAILER)
  throw { message: "Environmental variable 'MAIL_MAILER' is required." };

if (!process.env.MAIL_HOST)
  throw { message: "Environmental variable 'MAIL_HOST' is required." };

if (!process.env.MAIL_PORT)
  throw { message: "Environmental variable 'MAIL_PORT' is required." };

if (!process.env.MAIL_USERNAME)
  throw { message: "Environmental variable 'MAIL_USERNAME' is required." };

if (!process.env.MAIL_USERNAME)
  throw { message: "Environmental variable 'MAIL_USERNAME' is required." };

if (!process.env.MAIL_PASSWORD)
  throw { message: "Environmental variable 'MAIL_PASSWORD' is required." };

if (!process.env.MAIL_ENCRYPTION)
  throw { message: "Environmental variable 'MAIL_ENCRYPTION' is required." };

module.exports = function (app) {
  mongoose.connect(process.env.MONGODB_URL).catch((err) => {
    logger.error(err);
    process.exit(1);
  });
  mongoose.set("strictQuery", false);
  app.set("mongooseClient", mongoose);
};
