const { logger } = require("../startup/logging");

module.exports = function (err, req, res, next) {
  console.log(err);
  logger.error(err.message, err);
  res.status(500).send("Something went wrong.");
};
