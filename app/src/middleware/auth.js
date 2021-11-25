const { verify } = require("jsonwebtoken");
const { Container } = require("typedi");
const { USER_MODEL } = require("../utils/constant");
const { getTokenSecret } = require("../utils/jwt");

module.exports = jwtAuthMiddleware = async (request, response, next) => {
  const bearer = request.headers["authorization"];
  if (!bearer) {
    return response.unauthorized(
      "Missing token header. Unable to authenticate request"
    );
  }

  try {
    const token = bearer.slice(7, bearer.length);
    const user = verify(token, getTokenSecret());
    if (!user.id) {
      return response.unauthorized("Invalid authentication token.");
    }

    const authenticatedUser = await Container.get(USER_MODEL)
      .forge({
        id: user.id,
      })
      .fetch({
        require: false,
      });
    request.user = authenticatedUser;
    next();
  } catch (error) {
    next(error);
  }
};
