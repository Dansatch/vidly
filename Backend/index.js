const express = require("express");
const config = require("config");

const { log, logger } = require("./startup/logging");
const { dbConnect } = require("./startup/db");

const app = express();
log();
dbConnect();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}....`)
);

module.exports = server;
