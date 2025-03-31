const fs = require("fs");

const logger = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile("server.log", log, (err) => {
    if (err) console.error("Logging failed", err);
  });
  next();
};

module.exports = logger;
