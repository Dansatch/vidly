const mongoose = require("mongoose");
const { logger } = require("./logging");
const config = require("config");

const dbUrl = process.env.DB_URL || config.get("db");

const dbConnect = () => {
  mongoose
    .connect(dbUrl, { useUnifiedTopology: true })
    .then(() => logger.info(`Connected to ${dbUrl}...`));
};

module.exports.dbUrl = dbUrl;
module.exports.dbConnect = dbConnect;
