const { BadRequest } = require("../utils/error");
const { logger } = require("../utils/logger");

module.exports = (handler) => (request, response) =>
  handler(request, response).catch((error) => {
   logger.error(error.message, error.status, error);
    if (error instanceof Error) {
      return response.status(error.statusCode).json({
        status: "error",
        code: error.statusCode,
        success: false,
        message: error.message,
        error
      });
    } else if (error instanceof BadRequest) {
      return response.status(error.statusCode).json({
        status: "error",
        code: error.statusCode,
        success: false,
        message: error.message,
      });
    } else {
      return response.badRequest(error);
    }
  });
