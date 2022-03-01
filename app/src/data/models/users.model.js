const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const Users = bookshelf.Model.extend({
  tableName: "users",
  hasTimestamps: true,
});

module.exports = Users;
