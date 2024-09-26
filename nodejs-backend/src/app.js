const path = require("path");
const favicon = require("serve-favicon");
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger");
const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");

const middleware = require("./middleware");
const services = require("./services");
const appHooks = require("./app.hooks");
const channels = require("./channels");
const createWorker = require("./workersQue");
const genAi = require("./routes/genAi");
const redis = require("./services/redis");
const authentication = require("./authentication");
const mongoose = require("./mongoose");
const setup = require("./setup");
const redisCache = require("feathers-redis-cache");
const redisClient = require("./services/redis/config");

const app = express(feathers());
// Load app socketio
app.configure(
  socketio((io) => {
    io.on("connection", (socket) => {
      console.log(socket);
    });

    // Registering Socket.io middleware
    io.use(function (socket, next) {
      // Exposing a request property to services and hooks
      socket.feathers.referrer = socket.request.referrer;
      // console.log(socket);
      next();
    });
  }),
);
// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(app.get("public")));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Set up Plugins and providers
app.configure(express.rest());
app.configure(mongoose);
// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);
// Set up job queues
createWorker(app);
// Configure a middleware for 404s and the error handler
app.configure(genAi);
app.configure(redis);
app.configure(redisCache.client({ client: redisClient }));
app.configure(redisCache.services({ pathPrefix: "/cache" }));
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
// Initialize setup on app start
setup(app).catch((err) => console.error("Setup error:", err));
app.hooks(appHooks);
module.exports = app;
