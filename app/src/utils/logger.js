const winston = require("winston");

const { format, transports, createLogger } = winston;
const { combine, timestamp, simple, json, colorize, label, printf } = format;
const transport = [];
const console = {
  level: "debug",
  handleExceptions: true,
  format: simple(),
  colorize: true,
};
transport.push(new transports.Console(console));

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json(),
    colorize()
  ),
  transports: transport,
});

const httpLogger = () => {
  return {
    transports: transport,
    level: "info",
    format: combine(
      label({
        label: "HTTP Requests",
      }),
      timestamp(),
      printf((info) => {
        return `  ${info.timestamp} - ${info.label}:[${info.level}] - ${info.message}  `;
      })
    ),
    msg: "method={{req.method}}, route={{req.url}}, code={{res.statusCode}}, response-time={{res.responseTime}}ms.",
  };
};

module.exports = {
  logger,
  httpLogger,
};
