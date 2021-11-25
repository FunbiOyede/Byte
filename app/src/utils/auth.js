const { compareSync } = require("bcrypt");
const comparePasswords = (data, password) => {
  return compareSync(data.password, password);
};

module.exports = {
  comparePasswords,
};
