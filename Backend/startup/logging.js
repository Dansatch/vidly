const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

function log() {
  process.on("unhandledRejection", (ex) => {
    logger.error(ex);
  });

  process.on("uncaughtException", (ex) => {
    logger.error(ex);
  });
}

module.exports.logger = logger;
module.exports.log = log;
