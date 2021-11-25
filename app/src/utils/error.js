const httpStatus = require("http-status-codes");
const { logger } = require("../utils/logger");


/**
 * Error 404
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    (this.type = "NOT FOUND"),
      (this.statusCode = httpStatus.NOT_FOUND),
      (this.message = message);
  }
}


/**
 * Error 400
 */
class BadRequest extends Error {
  constructor(message) {
    super(message);
    (this.statusCode = httpStatus.BAD_REQUEST), (this.message = message);
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    (this.statusCode = httpStatus.BAD_REQUEST), (this.message = message);
  }
}

const handleError = (error, res) => {
  error.statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  error.status = error.status || "error";
  error.message = error.message || "Internal Server Error";

  logger.error(error.message, error.status, error);
  return res.status(error.statusCode).json({
    status: error.status,
    code: error.statusCode,
    success: false,
    message: error.message,
  });
};

module.exports = {
  handleError,
  NotFoundError,
  BadRequest,
};
