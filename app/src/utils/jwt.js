const { sign } = require("jsonwebtoken");

const getPayload = (user) => {
  return {
    id: user.id,
  };
};

getTokenSecret = () => {
  return "byteJwt";
};

getTokenExpiration = (rememberMe = false) => {
  return rememberMe ? "30d" : "5d";
};

const generateAccessToken = (user, rememberMe) => {
  return sign(getPayload(user), getTokenSecret(), {
    expiresIn: getTokenExpiration(rememberMe),
  });
};

module.exports = {
  generateAccessToken,
  getTokenSecret,
};
